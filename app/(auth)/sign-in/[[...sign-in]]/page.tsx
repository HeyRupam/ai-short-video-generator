import { SignIn } from '@clerk/nextjs'
import VideoPlayer from '@/components/ui/VideoPlayer';
import ReelsPlayer from '@/components/ui/ReelsPlayer';

export default function Page() {
  const reels = [
    { id: 1, videoPath: "/videos/hmm.mp4" },
    { id: 2, videoPath: "/videos/gg.mp4" },
    { id: 3, videoPath: "/videos/HEHE.mp4" },
    { id: 3, videoPath: "/videos/aD.mp4" },
    { id: 3, videoPath: "/videos/mm.mp4" },
    { id: 3, videoPath: "/videos/kk.mp4" },
  ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='flex justify-center items-center h-screen'>
      <ReelsPlayer reels={reels}/>
      </div>
      <div className='flex justify-center items-center h-screen'>
        <SignIn />
      </div>
    </div>
  )
}