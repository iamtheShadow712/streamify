import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onBoardingMutationFn } from '../lib/api';
import toast from 'react-hot-toast';
import useApp from '../store/useApp';
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {
    const { authUser } = useAuthUser();
    const queryClient = useQueryClient();
    const { theme } = useApp();
    const [onboardingData, setOnboardingData] = useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || ""
    })

    const { mutate: onBoardingMutation, isPending } = useMutation({
        mutationFn: onBoardingMutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Onboarding Successfull");
        },
        onError: (error) => toast.error(error.response.data.message)
    })

    const generateRandomAvatar = () => {
        const idx = Math.round(Math.random() * 1000) + 1;
        const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`
        setOnboardingData((prev) => ({ ...prev, profilePic: avatar }))
        toast.success("Random Profile Picture Generated")
    }

    const handleChange = (e) => {
        setOnboardingData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onBoardingMutation(onboardingData);
    }
    return (
        <div className='min-h-screen bg-base-100 flex items-center justify-center p-4' data-theme={theme}>
            <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
                <div className='card-body p-6 sm:p-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* profile picture  */}
                        <div className='flex flex-col items-center justify-center space-y-4'>
                            {/* Image preview */}
                            <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                                {onboardingData.profilePic ?
                                    (<img src={onboardingData.profilePic} className=' object-cover' alt="Profile Preview" />)
                                    :
                                    (<div className='flex items-center justify-center h-full'>
                                        <CameraIcon className='size-10 text-base-content opacity-40' />
                                    </div>)}
                            </div>
                            <div className='flex items-center gap-2'>
                                <button type='button' onClick={generateRandomAvatar} className='btn btn-accent'>
                                    <ShuffleIcon className='size-4 mr-2' />
                                    Generate Random Avatar
                                </button>
                            </div>
                        </div>
                        {/* Full Name */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={onboardingData.fullName}
                                onChange={handleChange}
                                required
                                placeholder='Your Full Name'
                                className='input input-bordered w-full'
                            />
                        </div>

                        {/* Bio */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Bio</span>
                            </label>
                            <textarea
                                name="bio"
                                value={onboardingData.bio}
                                onChange={handleChange}
                                placeholder='Tell others about yourself and your language learning goals'
                                className='textarea textarea-bordered w-full h-24'
                            />
                        </div>

                        {/* Languages */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-0'>
                            <div className='form-control space-x-2'>
                                <label className='label'>
                                    <span className='label-text'>Native Language</span>
                                </label>
                                <select
                                    name="nativeLanguage"
                                    onChange={handleChange}
                                    value={onboardingData.nativeLanguage}
                                    className='select w-full'
                                >
                                    <option value="">Select your native language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option value={lang.toLowerCase()} key={`native-${lang}`}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-control space-x-2'>
                                <label className='label'>
                                    <span className='label-text'>Learning Language</span>
                                </label>
                                <select
                                    name="learningLanguage"
                                    onChange={handleChange}
                                    value={onboardingData.learningLanguage}
                                    className='select w-full'
                                >
                                    <option value="">Select your learning language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option value={lang.toLowerCase()} key={`learning-${lang}`}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Location</span>
                            </label>
                            <div className='relative'>
                                <MapPinIcon className="absolute top-1/2 z-100 left-3 size-5 trasnform -translate-y-1/2 text-base-content opacity-70" />
                                <input
                                    type="text"
                                    name="location"
                                    value={onboardingData.location}
                                    onChange={handleChange}
                                    placeholder='City, Country'
                                    className='input input-bordered w-full pl-10'
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className='btn btn-primary w-full'
                            disabled={isPending}
                        >
                            {!isPending ? (
                                <>
                                    <ShipWheelIcon className='size-5 mr-2' />
                                    Complete Onboarding
                                </>
                            ) : (
                                <>
                                    <LoaderIcon className='size-5 mr-2 animate-spin' />
                                    Onboarding in progress...
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OnboardingPage