import React, { useState } from 'react';
import { clearToken, getToken, getUsername } from "./tokenStorage.js";
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Listview from './components/Listview.jsx';
import CreateCharacterEl from './components/CreateCharacter.jsx';
import CharacterSheet from './components/CharacterSheet.jsx';

export default function App() {
  const savedToken = getToken();
  const savedUsername = getUsername();
  const [hasToken, setHasToken] = useState(savedToken ? true : false);
  const [pageType, setPageType] = useState(savedToken ? "ListView": "");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  function handleLoggedIn() {
    setHasToken(true);
    setPageType("ListView")
  }

  function handleLogout() {
    clearToken();
    setPageType("");
    setHasToken(false);
  }

  function back() {
    setPageType("ListView");
  }

  if (!hasToken) {
    return (
      <div className='min-h-dvh flex flex-col'>
        <main className='w-full flex justify-center items-center my-auto'>
          <Login handleLoggedIn={handleLoggedIn} />
        </main>
      </div>
    );
  }

  if (pageType === "ListView") {
    return (
      <>
        <div className='min-h-dvh flex flex-col'>
          <Navbar hasToken={hasToken} setHasToken={setHasToken} />

          <main className='w-full flex justify-center items-center my-auto'>
            <Listview setPageType={setPageType} setSelectedCharacterId={setSelectedCharacterId} />
          </main>
        </div>
      </>
    );
  } else if (pageType === "CharacterView") {
    return (
      <>
        <div className='min-h-dvh flex flex-col'>
          <Navbar hasToken={hasToken} setHasToken={setHasToken} />

          <main className='w-full flex justify-center items-center my-auto'>
            <CharacterSheet setPageType={setPageType} back={back} characterId={selectedCharacterId} />
          </main>
        </div>
      </>
    );
  } else if (pageType === "CreateView") {
    return (
      <>
        <div className='min-h-dvh flex flex-col'>
          <Navbar hasToken={hasToken} setHasToken={setHasToken} />

          <main className='w-full flex justify-center items-center my-auto'>
            <CreateCharacterEl setPageType={setPageType} back={back} />
          </main>
        </div>
      </>
    );
  }
}