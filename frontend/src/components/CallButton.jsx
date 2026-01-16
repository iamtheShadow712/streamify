import { VideoIcon } from 'lucide-react'
import React from 'react'

const CallButton = ({ handleVideCall }) => {
    return (
        <div className='absolute top-0 mx-auto w-full p-3 border-b flex items-center justify-end max-w-7xl'>
            <button className='btn btn-success text-white' onClick={handleVideCall}>
                <VideoIcon className='size-6' />
            </button>
        </div>
    )
}

export default CallButton