"use client";

import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import db from "@/configs/db";
import { VideoData as VideoDataTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { VideoData } from '@/configs/schema';
import { Video } from "lucide-react";
import VideoList from "./_components/VideoList";

type VideoDataType = {
 id: number;
 script: any;
 audioFileUrl: string; 
 captions: any;
 imageList: string[] | null;
 createdBy: string;
}
export default function Home() {

  const [videoList, setVideoList] = useState<VideoDataType[]>([]);
  const {user } = useUser();

  const GetVideoList = async () => {
  if (!user?.primaryEmailAddress?.emailAddress) return;
  const result = await db.select().from(VideoData).where(
    eq(VideoData.createdBy, user.primaryEmailAddress.emailAddress)
  );
  setVideoList(result);
  };
  useEffect(() => {
    user && GetVideoList();
  },[user])
  return (
    <div>
      <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
          <Link className='mt-5' href="/dashboard/create-new">
            <Button>Create New Short Video</Button>
        </Link>
      </div>
      {videoList.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}
      <VideoList videoList={videoList} />
    </div>
  );
}
