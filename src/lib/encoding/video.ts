import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';

const TEMP_DIR = join(process.cwd(), 'tmp');

export async function convertAudioToMp4(inputPath: string): Promise<string> {
  // Ensure temp directory exists
  await mkdir(TEMP_DIR, { recursive: true });
  
  const outputFileName = `${randomUUID()}.mp4`;
  const outputPath = join(TEMP_DIR, outputFileName);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:a aac',          // Audio codec
        '-b:a 192k',         // Audio bitrate
        '-filter_complex', 
        '[0:a]showwaves=s=1280x720:mode=line,format=yuv420p[v]', // Generate waveform video
        '-map', '[v]',       // Map the video
        '-map', '0:a',       // Map the audio
        '-r', '30'          // 30 fps
      ])
      .on('start', (commandLine) => {
        console.log('FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        console.log('Processing: ', progress.percent, '% done');
      })
      .on('end', () => {
        console.log('Conversion finished');
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      })
      .save(outputPath);
  });
} 
