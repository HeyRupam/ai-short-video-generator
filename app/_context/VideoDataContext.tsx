import { Dispatch, SetStateAction, createContext } from "react";

export interface ScriptItem {
  ContextText: string;
  imagePrompt: string;
}

export interface VideoData {
    id?: number;
    videoScript?: ScriptItem[];
    audioFileUrl?: string;
    captions?: string | any; // since your schema expects JSON
    imageList?: string[];
    createdBy?: string;
  }

interface VideoDataContextType {
  videoData: VideoData;
  setVideoData: Dispatch<SetStateAction<VideoData>>;
}

export const VideoDataContext = createContext<VideoDataContextType>({
  videoData: {},
  setVideoData: () => {},
});