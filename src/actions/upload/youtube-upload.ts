'use server'

import { getIndividualYoutubeClient } from '@/lib/auth/google';
import { convertAudioToMp4 } from '@/lib/encoding/video';
import { saveFile } from '@/lib/storage/local';
import { createReadStream, unlink } from 'fs';

export type UploadMusicData = {
    title: string;
    artist: string;
    album?: string;
    description?: string;
    privacyStatus: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
    audioFile: File;
}

export async function uploadMusicToYouTube(
    data: UploadMusicData,
    accessToken: string,
    refreshToken: string
) {
    let audioPath: string | undefined;
    let videoPath: string | undefined;

    try {
        audioPath = await saveFile(data.audioFile);

        // Convert to MP4
        videoPath = await convertAudioToMp4(audioPath);

        // Get YouTube client with service account
        const youtube = await getIndividualYoutubeClient(
            accessToken,
            refreshToken
        );

        // Upload to YouTube
        const res = await youtube.videos.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: data.title,
                    description: data.description || '',
                    tags: [data.artist, data.album].filter(Boolean) as string[], // Add type assertion
                },
                status: {
                    privacyStatus: data.privacyStatus.toLowerCase() as 'private' | 'public' | 'unlisted', // Add proper type
                    madeForKids: false,
                },
            },
            media: {
                body: createReadStream(videoPath),
            },
        });

        return {
            success: true,
            videoId: res.data.id,
            message: 'Video uploaded successfully'
        };

    } catch (error) {
        console.error('Upload failed:', error);
        const handleYouTubeError = (error: any) => {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 403:
                        return 'Permission denied. Please contact support.';
                    case 429:
                        return 'Upload limit reached. Please try again later.';
                    default:
                        return `Upload failed: ${data.error.message}`;
                }
            }
            return 'Upload failed. Please try again.';
        };
        return {
            success: false,
            message: handleYouTubeError(error)
        };
    } finally {
        if (audioPath) {
            try {
                await unlink(audioPath, (err) => {
                    if (err) {
                        console.error('Failed to delete temporary audio file:', err);
                    }
                });
            } catch (error) {
                console.error('Failed to delete temporary audio file:', error);
            }
        }
        if (videoPath) {
            try {
                await unlink(videoPath, (err) => {
                    if (err) {
                        console.error('Failed to delete temporary video file:', err);
                    }
                });
            } catch (error) {
                console.error('Failed to delete temporary video file:', error);
            }
        }
    }
}
