import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    const isRaw = file.type === "application/pdf" || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx');
    
    cloudinary.uploader.upload_stream(
      { 
        resource_type: isRaw ? "raw" : "auto", 
        folder: "portfolio",
        use_filename: true,
        unique_filename: true,
        format: isRaw ? undefined : (file.name.includes('.') ? file.name.split('.').pop() : undefined)
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
}
