import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => {
  return {
    S3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_BUCKET_NAME,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_NAME,
      apiKey: process.env.CLOUDINARY_KEY,
      apiSecret: process.env.CLOUDINARY_SECRET,
    },
  };
});
