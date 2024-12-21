import { AssemblyAI } from 'assemblyai'
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
    try {
        const client = new AssemblyAI({
        apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY as string
        })

        const {audioFileUrl} = await req.json();
        const audioUrl = audioFileUrl;

        const config = {
        audio_url: audioUrl
        }

        
        const transcript = await client.transcripts.transcribe(config)
        return NextResponse.json({'result':transcript.words});
    }
    catch(e){
        return NextResponse.json({'Error':e})
    }

}