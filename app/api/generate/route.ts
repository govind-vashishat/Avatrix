import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    try {
        const response = await axios.post("https://api.heygen.com/v2/video/generate", 
        body, {
            headers: {
                'X-Api-Key': process.env.HEYGEN_API_KEY,
                'Content-Type': 'application/json',
            }
        }
      );

      return NextResponse.json({ videoID: response.data.data.video_id }, { status: 200 });
    } catch (error) {
        console.error("Error generating video id", error);
        return NextResponse.json(
        { error: "Unknown error occured" },  
        { status: 500 },
        )
    }
}

export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('video_id');
    console.log("Video id:", id);
    if(!id) {
        return NextResponse.json(
           { error: "No video id" },
           { status: 400 },
        )
    };

    try {
        console.log("Making request to HeyGen API...");
        const response = await axios.get(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
            headers: {
                'Accept': 'application/json',
                'X-Api-Key': process.env.HEYGEN_API_KEY,
            }
        });

        console.log("HeyGen API response:", response.data);
        const Status = response.data.data.status;

        console.log("Video status:", Status);

        if(Status === "completed") {
            return NextResponse.json(
                { videoUrl: response.data.data.video_url },
                { status: 200 },
            )
        } else if(Status === "processing" || Status === "pending") {
            return NextResponse.json(
                { message: `Video generation is ${Status}`, },
                { status: 202 },
            )
        } else if(Status === "waiting") {
            return NextResponse.json(
                { message: `Video generation is ${Status}`, },
                { status: 202 },
            )
        } else if(Status === "failed") {
            return NextResponse.json(
                { error: response.data.data.error.message, },
                { status: 500 },
            )
        } else {
            return NextResponse.json(
                { error: "Unexpected error occured" },
                { status: 500 },
            )
        }

    } catch (error) {
        console.error("Error getting video status", error);
        return NextResponse.json(
        { error: "Unknown error occured" },  
        { status: 500 },
        )
    }
}