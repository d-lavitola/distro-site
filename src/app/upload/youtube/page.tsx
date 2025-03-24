'use client';

import { uploadMusicToYouTube } from '@/actions/upload/youtube-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FileInput, Select, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSession, signIn } from "next-auth/react";

// Define the form validation schema
const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    artist: z.string().min(1, 'Artist is required'),
    album: z.string().optional(),
    description: z.string().optional(),
    privacyStatus: z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']),
    audioFile: z.any(),
});

type UploadFormValues = z.infer<typeof formSchema>;

// Add separate file validation
function validateFile(file: File | undefined) {
    if (!file) {
        throw new Error('Audio file is required');
    }
    if (!file.type.startsWith('audio/')) {
        throw new Error('File must be an audio file');
    }
    // Add size validation (e.g., 50MB limit)
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > MAX_SIZE) {
        throw new Error('File size must be less than 50MB');
    }
}

export default function YouTubeMusicUploadPage() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<UploadFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            artist: '',
            album: '',
            description: '',
            privacyStatus: 'PRIVATE',
        },
    });
    
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">YouTube Music Uploader</h1>
                <p className="mb-4">Please sign in to upload music</p>
                <button
                    onClick={() => signIn("google")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Sign in with Google
                </button>
            </div>
        );
    }

    async function onSubmit(data: UploadFormValues) {
        setIsLoading(true);
        try {
            validateFile(data.audioFile);
            const result = await uploadMusicToYouTube(data, session.accessToken, session.refreshToken);
            if (result.success) {
                // Show success message
                notifications.show({
                    title: 'Upload successful',
                    message: 'Your music has been uploaded to YouTube successfully!',
                    color: 'green',
                });
            } else {
                notifications.show({
                    title: 'Upload failed',
                    message: result.message,
                    color: 'red',
                });
            }
        } catch (error) {
            console.error('Upload failed:', error);
            notifications.show({
                title: 'Upload failed',
                message: `Error: ${error} Please try again.`,
                color: 'red',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Upload Music to YouTube</h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Controller
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <TextInput
                            label="Title"
                            placeholder="Enter song title"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="artist"
                    render={({ field }) => (
                        <TextInput
                            label="Artist"
                            placeholder="Enter artist name"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="album"
                    render={({ field }) => (
                        <TextInput
                            label="Album (Optional)"
                            placeholder="Enter album name"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <Textarea
                            placeholder="Enter description"
                            className="h-32"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="privacyStatus"
                    render={({ field }) => (
                        <Select
                            label="Privacy Status"
                            placeholder="Select privacy status"
                            data={['PRIVATE', 'PUBLIC', 'UNLISTED']}
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="audioFile"
                    render={({ field }) => (
                        <FileInput
                            label="Audio File"
                            placeholder="Select audio file"
                            accept="audio/*"
                            {...field}
                        />
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload to YouTube'}
                </Button>
            </form>
        </div>
    );
}
