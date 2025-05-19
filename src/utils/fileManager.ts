
// Utility functions for managing file uploads and downloads

/**
 * Gets the file extension from a filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Validates if a file is an allowed image type
 */
export function validateImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type);
}

/**
 * Validates if a file is an allowed resume type (PDF)
 */
export function validateResumeFile(file: File): boolean {
  return file.type === 'application/pdf';
}

/**
 * Validates file size (max 5MB)
 */
export function validateFileSize(file: File): boolean {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}

/**
 * Creates an object URL for file preview
 */
export function createFilePreview(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Frees up the object URL to avoid memory leaks
 */
export function revokeFilePreview(previewUrl: string): void {
  URL.revokeObjectURL(previewUrl);
}

/**
 * Converts a base64 string to a Blob
 */
export function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

/**
 * Simulates a file download by creating a temporary link and clicking it
 */
export function downloadFile(fileUrl: string, fileName: string): void {
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
