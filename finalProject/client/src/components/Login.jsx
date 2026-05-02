import React, { useState } from 'react';
import { getApiBaseUrl } from '../api.js';
import { setToken, setUsername as storeUsername } from '../tokenStorage.js';

export default function Login({ handleLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function sendLoginRequest(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok || !data.token) {
                setError("Login Failed.");
                return;
            }

            setToken(data.token);
            storeUsername(username);
            handleLoggedIn();
        } catch {
            setError("Login failed.");
        }
    }
    
    return(
        <div className='bg-[#AAACAD] flex flex-col items-center py-20 px-12 rounded-3xl shadow-2xl shadow-[#59D5FFC0] text-[#091519]'>
            <img src="" alt="logo" className='w-24 h-24 border mb-14' />
            <form 
                action="submit" 
                className='flex flex-col items-center gap-9'
                onSubmit={sendLoginRequest}
            >
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='username'
                    required
                    aria-label='Username'
                    className='bg-white placeholder-[#091519] rounded-2xl h-11 w-64 pl-5 focus:shadow-inner focus:outline-none shadow-[#545657]' 
                />

                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                    required
                    aria-label='Password'
                    className='bg-white placeholder-[#091519] rounded-2xl h-11 w-64 pl-5 focus:shadow-inner focus:outline-none shadow-[#545657]' 
                />

                {error ? <p className='text-sm text-red-600'>{error}</p> : null}

                <button
                    type="submit"
                    className='h-11 w-24 rounded-full bg-white hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none'
                >
                    Login
                </button>
            </form>
        </div>
    );
}