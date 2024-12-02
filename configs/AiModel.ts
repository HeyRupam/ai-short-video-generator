const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and content text as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"Realistic painting of a bustling medieval marketplace, vibrant colours, people in period clothing bartering goods, a mix of excitement and daily life, intricate details\",\n    \"contentText\": \"Our story begins in 14th-century Florence, a city brimming with life and intrigue.  The air buzzed with the sounds of merchants hawking their wares and the chatter of citizens going about their daily routines.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic portrait of a young, determined Leonardo da Vinci, looking thoughtful, holding a sketchbook, intense gaze, natural lighting, high detail\",\n    \"contentText\": \"Amongst the crowd was a young Leonardo da Vinci, already showing signs of the genius he would become.  He wasn't just observing; he was absorbing, sketching, and dreaming of the masterpieces to come.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic depiction of a secret meeting at night, shadowy figures huddled together whispering, a flickering candle illuminates their faces, a sense of mystery and urgency, highly detailed\",\n    \"contentText\": \"But Florence wasn't just about art and commerce.  Beneath the surface, secrets were whispered, plots hatched, and power struggles raged. Leonardo found himself drawn into one such conspiracy...\"\n  },\n  {\n    \"imagePrompt\": \"Realistic illustration of Leonardo sketching a complex mechanical device, gears and levers, illuminated by candlelight, showing focus and intense concentration, intricate detail\",\n    \"contentText\": \"He was tasked with designing a revolutionary new weapon for the city’s defense – a precursor to the tank –  a secret project that could change the course of war.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic painting of a tense confrontation, soldiers in period armour, clashing swords, Leonardo observing from a distance, dramatic lighting, high contrast\",\n    \"contentText\": \"However, the project was fraught with danger.  Rivals and jealous colleagues threatened to expose Leonardo's work, jeopardizing not just his reputation but also his life.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic depiction of Leonardo escaping through a dark, narrow alleyway at night, pursued by shadowy figures, a sense of urgency and danger, detailed textures\",\n    \"contentText\": \"In a daring escape, Leonardo evaded his pursuers, leaving behind the unfinished war machine and disappearing into the shadows of Florence...\"\n  },\n  {\n    \"imagePrompt\": \"Realistic image of Leonardo years later, older but still determined, working on a painting in his studio, a sense of peace and accomplishment, soft lighting\",\n    \"contentText\": \"Though the weapon was never completed, the experience forged Leonardo's resilience.  He channeled his energy into his art, leaving behind a legacy that would inspire generations.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON provides seven scenes,  which is likely more than can be comfortably included in a 30-second video. To make a 30-second video, you would need to condense the story and likely use only 3-4 scenes.  Each scene is about 4-5 seconds. You'll need video editing software to combine AI-generated images (using the prompts) with narration (the `contentText`) to create the final video.\n\n**To use this JSON:**\n\n1. **AI Image Generation:** Use an AI image generator (like Midjourney, Dall-E 2, Stable Diffusion) and input the `imagePrompt` for each scene.  Ensure you specify \"Realistic\" style.\n2. **Video Editing:** Import the generated images into a video editing software (like Adobe Premiere Pro, DaVinci Resolve, or simpler options like iMovie or CapCut).\n3. **Narration:** Record voiceover narration based on the `contentText` for each scene.\n4. **Assembly:** Combine images and narration, add transitions, and adjust timing to create a cohesive 30-second video.\n\n\n**Note:**  The quality of the final video heavily depends on the capabilities of your AI image generator and your video editing skills.  Experiment with different prompts and editing techniques to achieve the desired effect. You may need to adjust the prompts to fit the style of your chosen AI generator for optimal results.\n"},
          ],
        },
      ],
    });
  
   