import React from 'react';

export default function Login() {
    return(
        <div className='bg-[#AAACAD] flex flex-col items-center py-20 px-12 rounded-3xl shadow-2xl shadow-[#59D5FFC0] text-[#091519]'>
            <img src="" alt="logo" className='w-24 h-24 border mb-14' />
            <form action="submit" className='flex flex-col items-center gap-9'>
                <input 
                type="text" 
                placeholder='Username' 
                className='bg-white placeholder-[#091519] rounded-2xl h-11 w-64 pl-5 focus:shadow-inner focus:outline-none shadow-[#545657]' />
                <input type="text" placeholder='Password' className='bg-white placeholder-[#091519] rounded-2xl h-11 w-64 pl-5 focus:shadow-inner focus:outline-none shadow-[#545657]' />
                <button className='h-11 w-24 rounded-full bg-white hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none'>Login</button>
            </form>
        </div>
    );
}