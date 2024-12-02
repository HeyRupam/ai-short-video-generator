"use client"
import React, { useState, useEffect } from "react";

interface VideoPlayerProps {
  videoPath: string;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, videoProps }) => {
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load video file and create a blob URL
    const loadVideo = async () => {
      try {
        const response = await fetch(videoPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.statusText}`);
        }
        const videoBlob = await response.blob();
        const blobUrl = URL.createObjectURL(videoBlob);
        setVideoBlobUrl(blobUrl);
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };

    loadVideo();

    // Cleanup blob URL on component unmount
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, [videoPath]);

  if (!videoBlobUrl) {
    return <p className="text-center text-gray-600">Loading video...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg">
        <video
          {...videoProps}
          controls
          className={`w-full rounded-lg shadow-lg ${videoProps?.className || ""}`}
          src={videoBlobUrl}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
