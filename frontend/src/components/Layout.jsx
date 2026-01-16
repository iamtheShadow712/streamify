import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, showSidebar = false }) => {
    return (
        <div className='min-h-screen flex'>
            {/* Sidebar */}
            {showSidebar && <Sidebar />}
            <div className='flex flex-1 flex-col'>
                {/* Navbar */}
                <Navbar />
                {/* Main Body */}
                <main className='flex-1 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout