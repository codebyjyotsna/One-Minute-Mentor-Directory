import axios from 'axios';

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset
  formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/your_cloud_name/video/upload',
      formData
    );
    return response.data.secure_url; // Return the video URL
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};

export default uploadToCloudinary;
