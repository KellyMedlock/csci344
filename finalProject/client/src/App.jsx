import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Listview from './components/Listview.jsx';

export default function App() {

  return (
    <>
      <div className='min-h-dvh flex flex-col'>
        <Navbar />

        <main className='w-full flex justify-center items-center my-auto'>
          <Login />
          <Listview />
        </main>
      </div>
    </>
  );
}