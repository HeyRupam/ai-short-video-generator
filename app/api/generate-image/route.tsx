import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

interface GenerationInput {
    prompt: string;
    height: number;
    width: number;
    num_output: number;
}

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN as string
        });

        const input: GenerationInput = {
            prompt,
            height: 1280,
            width: 1024,
            num_output: 1
        };
        
        
        const prediction = await replicate.predictions.create({
            version: "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
            input: input
        });

        // Wait for the prediction to complete
        const output = await replicate.wait(prediction);

        if (!output?.output?.[0]) {
            throw new Error("No output generated");
        }

        const base64Image = "data:image/png;base64,"+ await ConvertImage(output.output[0]);
        const fileName = 'ai-short-video-files/' + Date.now() + '.png';

        const storageRef = ref(storage, fileName);
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        


        return NextResponse.json({ 'result': downloadUrl });
    } catch (e) {
        console.error("Error:", e);
        return NextResponse.json(
            { error: e instanceof Error ? e.message : 'Unknown error' }, 
            { status: 500 }
        );
    }
}

const ConvertImage = async (url: string) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data).toString('base64');
        return base64Image;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}