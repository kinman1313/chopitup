import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const { updateAvatar } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      await updateAvatar(formData);
    }
  };

  return (
    <div>
      <h4>Update Avatar</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AvatarUpload;