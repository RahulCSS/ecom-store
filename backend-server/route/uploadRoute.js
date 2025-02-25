import { Router } from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config'

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('file'); 
const s3Client = new S3Client({
  region: process.env.aws_region, 
  credentials: {
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_access_secret_key,
  },
});

const uploadRoute = Router();

uploadRoute.post('/', upload, async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  const params = {
    Bucket: process.env.aws_bucket, 
    Key: `${process.env.aws_bucket_folder}${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    const fileUrl = `https://${process.env.aws_bucket}.s3.${process.env.aws_region}.amazonaws.com/${params.Key}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'File upload failed.', error: error.message });
  }
});

export { uploadRoute };
