'use client';

import React from 'react';
import { YOUTUBE_DOWNLOADS_SLUG } from '@/service/env';

interface VideoLocalProps {
    videoName: string;
    subtitleName?: string | null;
    slug?: string;
}

export default function VideoLocal({videoName, subtitleName=null, slug=YOUTUBE_DOWNLOADS_SLUG}: VideoLocalProps) {
    const title = videoName.split('_').slice(0, -1).join('.')
    const videoUrl = `${slug}${videoName}`
    subtitleName = subtitleName ?? videoName.replace('.mp4', '.vtt')
    const subtitleUrl = `${slug}${subtitleName}`
    // console.log(videoUrl, subtitleUrl)

    return (
      <div className="container mx-auto p-4">
        <div className="w-full min-w-[320px] md:max-w-[80vw] lg:max-w-[85vw] xl:max-w-[90vw] mx-auto">
          <video 
            controls 
            className="w-full h-auto rounded-lg shadow-lg"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <track 
              kind="subtitles" 
              src={subtitleUrl} 
              srcLang="ko" 
              label="Korean" 
              default 
            />
            Your browser does not support the video tag.
          </video>
          <h1 className="text-xl font-semibold mt-4">
            {title}
          </h1>
        </div>
      </div>
    );
  }