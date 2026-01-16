import { CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useNavigate } from 'react-router';

const CallCount = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
    const navigate = useNavigate();
    if (callingState === CallingState.LEFT) return navigate("/");
    if (callingState !== CallingState.JOINED) {
        return <div className='flex items-center justify-center h-full'>Loading...</div>;
    }
    return (
        <StreamTheme>
            <SpeakerLayout />
            <CallControls />
        </StreamTheme>
    )
}

export default CallCount