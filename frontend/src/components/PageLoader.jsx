import { LoaderIcon } from 'lucide-react'
import React from 'react'
import useApp from '../store/useApp'

const PageLoader = () => {
    const { theme } = useApp()
    return (
        <div className='flex min-h-screen items-center justify-center' data-theme={theme}>
            <LoaderIcon className='animate-spin size-10' />
        </div>
    )
}

export default PageLoader