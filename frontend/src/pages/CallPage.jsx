import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser';
import { getStreamToken } from '../lib/api';
import {
    CallControls,
    CallingState,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { ENV } from '../config/env.config';
import PageLoader from '../components/PageLoader';
import CallCount from '../components/CallCount';

const CallPage = () => {
    const { id: callId } = useParams();
    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const [isConnecting, setIsConnecting] = useState(true);
    const { authUser } = useAuthUser();

    const { data: tokenData } = useQuery({
        queryFn: getStreamToken,
        queryKey: ["streamToken"],
        enabled: !!authUser
    })
    useEffect(() => {
        const initCall = async () => {
            if (!tokenData.token || !authUser || !callId) return;

            try {
                console.log("Initializing stream video call...");
                const user = {
                    id: authUser?._id,
                    name: authUser?.fullName,
                    image: authUser?.profilePic
                };
                const videoClient = new StreamVideoClient({
                    apiKey: ENV.STREAM_API_KEY,
                    user,
                    token: tokenData.token
                });
                const callInstance = videoClient.call("default", callId);
                await callInstance.join({ create: true })
                console.log("Joined call successfully");
                setClient(videoClient);
                setCall(callInstance)
            } catch (error) {
                console.error("Error joining call", error)
                toast.error("Could not join the call. Please try again.")
            } finally {
                setIsConnecting(false);
            }
        }
        initCall();
    }, [tokenData, authUser, callId]);
    if (isConnecting) return <PageLoader />
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className='relative'>
                {client && call ? (
                    <StreamVideo client={client}>
                        <StreamCall call={call}>
                            <CallCount />
                        </StreamCall>
                    </StreamVideo>
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p>Could not initialize call. Please refresh and try again later.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CallPage