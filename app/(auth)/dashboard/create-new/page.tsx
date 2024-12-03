"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopics from './_components/SelectTopics'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext, ScriptItem, VideoData } from '@/app/_context/VideoDataContext';
import { Users, VideoData as VideoDataTable } from '@/configs/schema';
import db from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import PlayerDialog from '../_components/PlayerDialog';
import { UserDetailsContext } from '@/app/_context/UserDetailsContext';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

function CreateNew() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState<ScriptItem[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState<number>(5);
  const [captions, setCaptions] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const {userDetails, setUserDetails} = useContext(UserDetailsContext);


  const onHandleInputCheck = (fieldName: string, fieldValue: string) => {    
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const GetVideoScript = async () => {
    if (!userDetails || typeof userDetails.credits !== 'number' || userDetails.credits <= 0) {
      toast.error("You don't have enough credits to generate video script");
      return;
    }
    setLoading(true);
    const prompt = 'Write a script to generate '+ formData.duration +' video on topic : '+ formData.topic +' along with Ai image prompt in '+ formData.imageStyle +' format for each scene and give me result in JSON format with imagePrompt and ContextText as field';    
    
    try {
      const response = await axios.post('/api/get-video-script', { prompt });
      setVideoScript(response.data.result);
      setVideoData(prev => ({
        ...prev,
        videoScript: response.data.result
      }));
      await GenerateAudioFile(response.data.result);
    } catch (error) {
      console.error("Error generating video script:", error);
      setLoading(false);
    }
  }

  const GenerateAudioFile = async (videoScriptData: ScriptItem[]) => {
    let script = videoScriptData.map(item => item.ContextText).join(' ');
    const id = uuidv4();
    
    try {
      const response = await axios.post('/api/generate-audio', { text: script, id });
      setAudioFileUrl(response.data.result);
      setVideoData(prev => ({
        ...prev,
        audioFileUrl: response.data.result
      }));
      await GenerateAudioCaption(response.data.result);
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  }

  const UpdateUserDetails = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail || !userDetails?.credits) return;
    await db.update(Users).set({
      credits: userDetails?.credits - 10
    }).where(eq(Users.email, userEmail));
    setUserDetails(prev=>({
      ...prev, 
      cerdits: userDetails?.credits ? userDetails?.credits - 10 : 0
    }))
    setVideoData({});
  };

  const GenerateAudioCaption = async (audioFileUrl: string) => {
    try {
      const response = await axios.post('/api/generate-caption', { audioFileUrl });
      setCaptions(response.data.result);
      setVideoData(prev => ({
        ...prev,
        captions: response.data.result
      }));
      await GenerateImages(videoScript);
    } catch (error) {
      console.error("Error generating captions:", error);
    }
  }

  const GenerateImages = async (videoScriptData: ScriptItem[]) => {
    let images: string[] = [];      
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post('/api/generate-image', { prompt: element.imagePrompt });
        images.push(resp.data.result);
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
    console.log(images);
    
    setImageList(images);
    setVideoData(prev => ({
      ...prev,
      imageList: images
    }));
  }

  const SaveVideoData = async (videoData: VideoData) => {
    try {
      const result = await db.insert(VideoDataTable).values({
        script: videoData.videoScript,
        audioFileUrl: videoData.audioFileUrl ?? '',
        captions: videoData.captions ?? {},
        imageList: videoData.imageList ?? [],
        createdBy: user?.primaryEmailAddress?.emailAddress ?? ''
      }).returning();
      setVideoId(result[0].id);
      setPlayVideo(true);
      await UpdateUserDetails();
      setLoading(false);
    } catch (error) {
      console.error("Error saving video data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      videoData.videoScript && 
      videoData.audioFileUrl && 
      videoData.captions && 
      videoData.imageList &&
      user?.primaryEmailAddress?.emailAddress
    ) {
      SaveVideoData(videoData);
    }
  }, [videoData, user]);

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopics onUserSelect={onHandleInputCheck}/>
        <SelectStyle onUserSelect={onHandleInputCheck}/>
        <SelectDuration onUserSelect={onHandleInputCheck}/>
        <Button 
          className='mt-10 w-full' 
          onClick={() => GetVideoScript()}
          disabled={loading}
        >
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading}/>
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  )
}

export default CreateNew