import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
        console.error('Failed to create upload directory:', error);
        throw error;
    }
}

export async function saveFile(file: File): Promise<string> {
    await ensureUploadDir();

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${randomUUID()}.${fileExtension}`;
    const filePath = join(UPLOAD_DIR, fileName);

    try {
        // Convert File to Buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        return filePath;
    } catch (error) {
        console.error('File save failed:', error);
        throw new Error('Failed to save file');
    }
} 
