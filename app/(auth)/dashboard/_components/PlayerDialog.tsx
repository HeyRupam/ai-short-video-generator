import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Player } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import db from '@/configs/db';
import { VideoData } from '@/app/_context/VideoDataContext';
import { VideoData as VideoDataTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

interface PlayerDialogProps {
    playVideo: boolean;
    videoId: number | undefined;
}

// Define the type for database result
interface VideoDataDB {
    id: number;
    script: any;
    audioFileUrl: string;
    captions: any;
    imageList: string[];
    createdBy: string;
}

function PlayerDialog({playVideo, videoId}: PlayerDialogProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState<VideoData>({});
    const [durationInFrame, setDurationInFrame] = useState(1000);
    const router = useRouter();

    useEffect(() => {
        setOpenDialog(!openDialog);
        if (typeof videoId === 'number') {
            
            GetVideoData();
        }
    }, [playVideo]);

    useEffect(() => {
    }, [videoData]);
    const GetVideoData = async () => {
        if (typeof videoId === 'number') {
            const result = await db.select().from(VideoDataTable).where(eq(VideoDataTable.id, videoId));
            if (result[0]) {
                
                const dbData = result[0] as VideoDataDB;
                
                // Map the database result to VideoData format
                setVideoData({
                    videoScript: dbData.script,
                    audioFileUrl: dbData.audioFileUrl,
                    captions: dbData.captions,
                    imageList: dbData.imageList
                });             
                
            }
        }
    }

    return (
        <Dialog open={openDialog}>
            <DialogContent className='bg-white flex flex-col items-center'>
                <DialogHeader>
                    <DialogTitle className='text-3xl font-bold my-5'>Your video is ready</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo as React.ComponentType<any>}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            inputProps={{ 
                                script: videoData.videoScript,
                                imageList: videoData.imageList,
                                audioFileUrl: videoData.audioFileUrl,
                                captions: videoData.captions,
                                setDurationFrame: (frameValue: number) => setDurationInFrame(frameValue) 
                            }}
                            controls={true}
                        />
                        <div className='flex gap-10 mt-10'>
                            <Button variant="ghost" onClick={()=>{router.refresh(); setOpenDialog(false)}}>Cancel</Button>
                            <Button>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PlayerDialog