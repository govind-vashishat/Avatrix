import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Avatar = {
    avatar_id: string,
    avatar_name: string,
    preview_image_url: string,
}

export async function GET(req: NextRequest) {
    try {
        const response = await axios.get("https://api.heygen.com/v2/avatars", {
            headers: {
                'Accept': 'application/json',
                'X-Api-Key': process.env.HEYGEN_API_KEY,
            }
        })

        const avatars: Avatar[] = response.data.data.avatars;

        const indices = [0,5,11,14,26,32,36,47,53,61];

        const selectedAvatars = indices.map((index) => {
            const avatar = avatars[index];
            return {
                id: avatar.avatar_id,
                name: avatar.avatar_name,
                image: avatar.preview_image_url,
            };
        });

    return NextResponse.json({ avatars: selectedAvatars }, { status: 200 });
    } catch (error) {
        console.error("Error fetching avatars:", error);
        return NextResponse.json(
            { error: "Unknown error occured" }, { status: 500 },
        );
    };
};