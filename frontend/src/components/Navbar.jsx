import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
import toast from 'react-hot-toast';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const queryClient = useQueryClient();

    const { mutate: logoutMutation } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            toast.success("Logged Out")
        }
    })

    return (
        <nav className='bg-base-200 border-b border-base-300 sticky top-0 h-16 z-30 flex items-center'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>


                <div className='flex items-center justify-end w-full'>
                    {/* LOGO - only display in the chat page */}
                    {isChatPage && (
                        <div className='pl-5'>
                            <Link to="/" className='flex items-center gap-2.5'>
                                <ShipWheelIcon className='size-9 text-primary' />
                                <span className='text-3xl font-bold font-mono tracking-wider bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary'>
                                    Streamify
                                </span>
                            </Link>
                        </div>
                    )}
                    <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
                        <Link to="/notifications">
                            <div className='btn btn-ghost btn-circle'>
                                <BellIcon className='size-6 text-base-content opacity-70' />
                            </div>
                        </Link>
                    </div>
                    <ThemeSelector />
                    <div className='avatar'>
                        <div className='rounded-full w-9'>
                            <img src={authUser?.profilePic} alt="User avatar" rel="noreferrer" />
                        </div>
                    </div>
                    <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
                        <LogOutIcon className='size-6 text-base-content opacity-70' />
                    </button>
                </div>
            </div>
        </nav >
    )
}

export default Navbar