'use client';

import React from 'react';
import VideoPage from '@/components/video';

const videoName = '[SEF2024] AI 어디까지 왔나, 앞으로 어떻게 될까ᅵ박태웅(녹서포럼 의장)_fFIlEGnziMg.mp4'
const subtitleName = '[SEF2024] AI 어디까지 왔나, 앞으로 어떻게 될까ᅵ박태웅(녹서포럼 의장)_fFIlEGnziMg.vtt'

export default function ViewVideoPage() {
    return <VideoPage videoName={videoName} />
}

// export default function ViewVideoPage() {
//     return <VideoPage videoName={videoName} subtitleName={subtitleName} />
// }

