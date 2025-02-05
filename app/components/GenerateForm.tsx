"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { AxiosError } from 'axios';

type Avatar = {
    id: string;
    name: string;
    image: string; 
}

type Voice = {
    id: string;
    gender: string;
}

const GenerateForm = () => {
    const [loadingAvatars, setLoadingAvatars] = useState<boolean>(false);
    const [loadingVoices, setLoadingVoices] = useState<boolean>(false);
    const [avatars, setAvatars] = useState<Avatar[] | null>([]);
    const [voices, setVoices] = useState<Voice[] | null>([]);
    const [selectedAvatarId, setSelectedAvatarId] = useState<string>("");
    const [selectedVoiceId, setSelectedVoiceId] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [generating, setGenerating] = useState<boolean>(false);
    const [videoUrl, setvideoUrl] = useState<string | undefined>(undefined);
    const [ErrorMessage, setErrorMessage] = useState<string | null>(null)

    const fetchAvatars = async () => {
        setLoadingAvatars(true);
        try {
            const response = await axios.get("/api/avatars");
            const Avatars: Avatar[] = response.data.avatars;

            if(response.data.error) {
               throw new Error("Unknown error occured");
            }
            setAvatars(Avatars);
        } catch (error) {
            console.error('Error fetching avatars', error);
        } finally {
            setLoadingAvatars(false);
        }
    }

    const fetchVoices = async () => {
        setLoadingVoices(true);
        try {
            const response = await axios.get("/api/voices");
            const Voices: Voice[] = response.data.voices;

            if(response.data.error) {
                throw new Error("Error fetching avatars");
            }

            setVoices(Voices);
        } catch (error) {
            console.error('Error fetching voices', error);
        } finally {
            setLoadingVoices(false);
        }
    }

    const generateVideo = async () => {
        if(selectedAvatarId && selectedVoiceId && inputText) {
            setGenerating(true);
            try {
                const response = await axios.post("/api/generate",{
                    video_inputs: [
                        {
                            character: {
                              type: "avatar",
                              avatar_id: selectedAvatarId,
                              avatar_style: "normal",
                              emotion: "Soothing"
                            },
                            voice: {
                              type: "text",
                              input_text: inputText,
                              voice_id: selectedVoiceId,
                              speed: 1,
                            }
                          },
                    ],
                    dimension: {
                        width: 1280,
                        height: 720,
                    }
                },
              );

              if(response.data.error) {
                throw new Error("Unknown error occured");
              } 

              getVideoStatus(response.data.videoID);
              
            } catch (error) {
                console.error("Error generating video", error);
            } 
        } else {
            alert("Select avatar or voice, and enter your video script");
        }
    };

    const getVideoStatus = async (id: string, interval: number = 3000) => {
       if(id) {

        const checkStatus = async () => {
            try {
                const response = await axios.get(`/api/generate?video_id=${id}`);
    
                if(response.status === 200) {
                    setvideoUrl(response.data.videoUrl);
                    clearInterval(pollingInterval);
                    clearTimeout(timeoutId);
                    setGenerating(false);
                }
    
                if(response.status === 202) {
                    setStatusMessage(response.data.message);
                } else {
                    setErrorMessage("Unexpected response");
                }
                
            } catch (error: unknown) {
                if(error instanceof AxiosError && error.response) {
                    const status = error.response.status;
                    const data = error.response.data;
                    if(status === 400) {
                        console.error("Client error:", data.error);
                    } else if(status === 500) {
                        setErrorMessage(data.error);
                        clearInterval(pollingInterval);
                        clearTimeout(timeoutId);
                        setGenerating(false);
                    } else {
                        setErrorMessage("unexpected error");
                    }
                }
            } 
        };

        const pollingInterval = setInterval(checkStatus, interval);

        const timeoutId = setTimeout(() => {
            clearInterval(pollingInterval); // Stop the polling
            alert("Timeout: Video status not updated within 5 minutes");
            setGenerating(false);
        }, 900000); 
        
       } else {
        alert("No video id");
       }
    };

    const handleAvatarClick = (id: string) => {
        setSelectedAvatarId(id);
    }

    const handleVoiceClick = (id: string) => {
        setSelectedVoiceId(id);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    }

    useEffect(() => {
        fetchAvatars();
        fetchVoices();
     }, [])
    
  return (
    <div className='text-white flex flex-col justify-center mt-14'>
        <h1 className='font-sans text-3xl flex items-center justify-center md:justify-start'>Select your Avatar :</h1>

    {loadingAvatars ? (
        <div className='flex justify-center items-center mt-20'>
            <Loader />
        </div>
    ) : (
    <div className='mt-3 p-10 mx-auto flex justify-center items-center'>
      <Carousel className='mx-auto'>
        <CarouselContent className='flex gap-4 md:pl-5 px-4'>
            {avatars?.map((avatar, index) => ( 
                <CarouselItem key={index} className={`sm:basis-1/2 md:basis-1/3 bg-zinc-900 rounded-2xl ${selectedAvatarId === avatar.id ? 'border-2 border-white' : 'border border-neutral-800'} pl-3 cursor-pointer`}
                onClick={() => handleAvatarClick(avatar.id)}
                >
                    <div className='flex justify-center items-center h-full'>
                        <Image 
                        src={avatar.image}
                        alt={avatar.name}
                        width={250}
                        height={250}
                        className='w-full h-full rounded-md object-cover'
                        />
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className='text-white bg-neutral-900'/>
        <CarouselNext className='text-white bg-neutral-900' />
      </Carousel>
    </div>
    )}

    <h1 className='font-sans text-3xl flex items-center justify-center mt-5'>Select Voice :</h1>
    {loadingVoices ? (
        <div className='flex justify-center items-center mt-20'>
            <Loader />
        </div>
    ) : (
        <div className='flex justify-center items-center mt-9'>
            <DropdownMenu>
                <DropdownMenuTrigger className='border rounded-xl p-3 text-xl font-sans bg-zinc-900 border-neutral-800 w-96'>Click to get a list of voices</DropdownMenuTrigger>
                <DropdownMenuContent className='border rounded-xl p-3 text-xl font-sans bg-zinc-900 border-neutral-800 w-96 h-36 overflow-y-auto text-white'>
                <DropdownMenuLabel className='text-center'>Select a voice id</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {voices?.map((voice, index) => (
                    <DropdownMenuItem key={index} className='mt-2'
                    onClick={() => handleVoiceClick(voice.id)}
                    >
                        <div className='flex justify-between gap-4'>
                            <p>{voice.id}</p>
                            <p>{voice.gender}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )}
        <h1 className='font-sans text-3xl mt-24 flex items-center justify-center md:justify-start'>Type your video script:</h1>

        <div className='flex items-center justify-center mt-5 p-2'>
            <Textarea 
            className='bg-zinc-900 border-neutral-800 rounded-xl'
            placeholder='Enter your video script'
            value={inputText}
            onChange={handleInputChange}
            />
        </div>

        <h1 className='font-sans text-2xl text-center md:text-3xl mt-10 flex items-center justify-center p-5'>All done! Click on the button below to bring your video to life</h1>

        <div className='flex justify-center items-center'>
        <Button
            onClick={generateVideo}
            className='bg-white text-black hover:bg-zinc-700 hover:text-white mt-8 w-44 md:w-96 text-xl p-2 font-sans rounded-md'>Generate Video</Button>
        </div>

        {generating ? <h1 className='mt-10 text-center text-xl p-1 md:text-3xl font-sans'>{statusMessage}</h1> : null }

        {generating ? (
            <div className='flex items-center justify-center lg:ml-40 mt-10 p-2 max-w-4xl aspect-video'>
                <div className='w-full h-full rounded-lg border border-neutral-800 flex justify-center items-center bg-zinc-950'>
                    <Loader />
                </div>
            </div>
        ) : videoUrl ? (
            <div className='flex items-center lg:ml-40 justify-center mt-10 p-2 max-w-4xl aspect-video'>
                <video
                src={videoUrl}
                className="w-full h-full rounded-lg max-w-4xl border border-neutral-800"
                controls
                autoPlay
                playsInline
                title='video player'
                />
            </div>    
        ) : ErrorMessage ? (
            <div className='flex items-center justify-center lg:ml-40 mt-10 p-2 max-w-4xl aspect-video'>
                <div className='w-full h-full rounded-lg border border-neutral-800 flex justify-center items-center bg-zinc-950'>
                    {ErrorMessage}
                </div>
            </div>
        ) : (
            <div className='flex items-center justify-center lg:ml-40 mt-10 p-2 max-w-4xl aspect-video'>
                <div className='w-full h-full rounded-lg border border-neutral-800 flex justify-center items-center bg-zinc-950'>
                <Video />
                </div>
            </div>
        )}

        <a href={videoUrl} download className='flex items-center justify-center'>
            <Button className='bg-white text-black hover:bg-zinc-700 hover:text-white mt-2 w-44 md:w-96 text-xl p-2 font-sans rounded-md'>Download video</Button>
        </a>
        
    </div>
  )
}

export default GenerateForm;