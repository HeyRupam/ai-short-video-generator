import React from 'react'
import { AbsoluteFill, Img, Sequence, useCurrentFrame, useVideoConfig, Audio, interpolate } from 'remotion'

interface RemotionVideoProps {
  script: any;
  imageList: string[];
  audioFileUrl: string;
  captions: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  setDurationFrame: (duration: number) => void;
}

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationFrame }: RemotionVideoProps) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getDurationFrame = () => {
    if (!captions?.length) return 0;
    setDurationFrame(captions[captions.length - 1].end / 1000 * fps);
    return captions[captions.length - 1].end / 1000 * fps;
  }

  const getCurrentCaptions = () => {
    const currentTime = frame / 30 * 1000;
    const currentCaption = captions?.find(caption => caption.start <= currentTime && caption.end >= currentTime);
    return currentCaption ? currentCaption.text : "";
  }

  return script && (
    <AbsoluteFill>
      {imageList?.map((item, index) => 
      { 
        const startTime = (index * getDurationFrame() / imageList.length);
        const duration = getDurationFrame();
        const scale =(index: number) => interpolate(frame, [startTime, startTime + duration/2, startTime + duration], index %2==0 ? [1, 1.8,1]: [1.8, 1, 1.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
        <Sequence 
          key={index} 
          from={startTime} 
          durationInFrames={getDurationFrame() / imageList.length}
        >
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <Img src={item} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale(index)})` }} />
            <AbsoluteFill 
              style={{ 
                justifyContent: "center", 
                textAlign: "center",
                top: "auto", 
                bottom: 50, 
                height: 150, 
                width: "100%", 
                color: "white" 
              }}
            >
              <h2 className='text-2xl'>{getCurrentCaptions()}</h2>
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      )})}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  )
}

export default RemotionVideo