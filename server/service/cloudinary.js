import { v2 } from "cloudinary";
import { config } from "dotenv";

config();
v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function uploadImage(path) {
  try {
    const { secure_url } = await v2.uploader.upload(path);

    return secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default uploadImage;
