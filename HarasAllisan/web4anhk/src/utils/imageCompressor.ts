/**
 * Utility for processing and compressing user uploaded avatar images from phones and desktop.
 * Resizes to 256x256 square with centered cover crop to prevent storage quota issues
 * and maintain crisp performance across all email components.
 */
export async function compressAvatarImage(
  file: File,
  maxDimension = 256,
  quality = 0.85
): Promise<{ dataUrl: string; originalSize: number; compressedSize: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('الملف المحدد ليس صورة صالحة (Selected file is not an image)'));
    }

    const originalSize = file.size;
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('فشل قراءة ملف الصورة (Failed to read image file)'));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('تعذر تحميل الصورة (Could not decode image)'));

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = maxDimension;
          canvas.height = maxDimension;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            return reject(new Error('تعذر تشغيل معالج الرسوم (Canvas context unavailable)'));
          }

          // Center crop (cover behavior)
          const srcWidth = img.width;
          const srcHeight = img.height;
          const minDim = Math.min(srcWidth, srcHeight);
          const startX = (srcWidth - minDim) / 2;
          const startY = (srcHeight - minDim) / 2;

          // Enable high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw cropped & scaled square
          ctx.drawImage(
            img,
            startX,
            startY,
            minDim,
            minDim,
            0,
            0,
            maxDimension,
            maxDimension
          );

          // Export as JPEG for high compatibility and low footprint
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          // Estimate byte size from dataUrl
          const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
          const compressedSize = Math.round((base64Length * 3) / 4);

          resolve({
            dataUrl,
            originalSize,
            compressedSize,
          });
        } catch (err) {
          reject(err);
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes to readable string (e.g. 24 KB, 1.2 MB)
 */
export function formatByteSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
