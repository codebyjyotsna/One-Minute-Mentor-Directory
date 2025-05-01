import React, { useEffect, useState } from 'react';
import FilterBar from '../components/FilterBar';
import axios from 'axios';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [filters, setFilters] = useState({ category: '', search: '' });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos', {
          params: filters,
        });
        setVideos(response.data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, [filters]);

  return (
    <div>
      <FilterBar
        categories={['Tech', 'Design', 'Business']}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />
      <div className="video-list">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <p>Tags: {video.tags.join(', ')}</p>
            <video src={video.videoUrl} controls width="300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
