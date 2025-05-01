import React, { useState } from 'react';
import uploadToCloudinary from '../utils/cloudinaryHelper';

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a video file.');
      return;
    }

    try {
      setIsUploading(true);
      const videoUrl = await uploadToCloudinary(file);
      onUploadSuccess({ title, description, tags: tags.split(','), videoUrl });
    } catch (error) {
      alert('Failed to upload video.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Tags (comma-separated):</label>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

      <label>Video File:</label>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} required />

      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default UploadForm;
