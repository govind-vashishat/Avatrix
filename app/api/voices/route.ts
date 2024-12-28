import axios from "axios";
import { NextResponse } from "next/server";

type Voice = {
    voice_id: string;
    gender: string;
}

export async function GET() {
    try {
        const response = await axios.get("https://api.heygen.com/v1/voice.list", {
            headers: {
                'Accept': 'application/json',
                'X-Api-Key': process.env.HEYGEN_API_KEY,
            },
        });

        const voices: Voice[] = response.data.data.list;

        const indices = [0,1,2,3,4,5,6,7,15,16];

        const selectedVoices = indices.map((index) => {
            const voice = voices[index];
            return {
                id: voice.voice_id,
                gender: voice.gender,
            };
        });

        return NextResponse.json({ voices: selectedVoices }, { status: 200 });
    } catch (error) {
        console.error('Error fetching voices', error);
        return NextResponse.json(
            { error: "Error fetching avatars"}, { status: 500 },
        );
    };
};