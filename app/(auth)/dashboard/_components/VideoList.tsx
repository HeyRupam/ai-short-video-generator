import React, { useState } from 'react'
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import { title } from 'process';
import PlayerDialog from './PlayerDialog';

type VideoDataType = {
  id: number;
  script: any;
  audioFileUrl: string; 
  captions: any;
  imageList: string[] | null;
  createdBy: string;
 }
 function VideoList({ videoList }: { videoList: VideoDataType[] }) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState<number | undefined>();
  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      {videoList.map((video, index) => (
        <div key={index} className='cursor-pointer hover:scale-105 transition-all' 
            onClick={() => {
              setOpenPlayerDialog(true); 
              setVideoId(video.id)
            }}>
          <Thumbnail
            component={RemotionVideo as React.ComponentType<any>}
            compositionWidth={250}
            compositionHeight={400}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              script: video.script,
              imageList: video.imageList,
              audioFileUrl: video.audioFileUrl,
              captions: video.captions,
              setDurationFrame: (v:any) => console.log(v)
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  )
}

export default VideoList