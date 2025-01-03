import React from 'react';
import {Composition} from 'remotion';
import RemotionVideo from '@/app/(auth)/dashboard/_components/RemotionVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={RemotionVideo as React.ComponentType<any>}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};