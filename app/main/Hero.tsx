'use client'

import { useEffect, useState } from "react";

type VideoData = {
  videoUrl: string;
  poster?: string;
};

export default function Hero() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.projectVideo) {
          setVideoData({
            videoUrl: data.projectVideo.videoUrl,
            poster: data.projectVideo.poster,
          });
        }
      });
  }, []);

  if (!videoData) return null;

  return (
    <section className="relative h-[81vh] w-full flex justify-center items-center bg-white px-4">
      <div className="w-[1300px] h-full rounded-[30px] overflow-hidden shadow-lg relative">
        <video
          src={videoData.videoUrl}
          poster={videoData.poster}
          className="w-full h-full object-cover rounded-[30px]"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
