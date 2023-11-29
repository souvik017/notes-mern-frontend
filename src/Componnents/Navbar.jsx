import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import LogoutButton from './logoutBtn';

function Navbar() {
  const [isSideMenuOpen, setSideMenu] = useState(false);

  const closeSideMenu = () => {
    setSideMenu(false);
  };

  return (
    <div>
      <div className='flex my-4 mx-8 justify-between'>
        <div>
          <h1 className='text-3xl'>Notes</h1>
        </div>
        <div className='flex p-2 text-xl gap-8 hidden lg:flex'>
          <NavLink to="/addnote">Add Note</NavLink>
          <NavLink to="/allnote">All Note</NavLink>
        </div>
        <div>
          <div className='p-2 text-xl gap-8 hidden lg:flex'>
            <LogoutButton/>
          </div>
          <button
            className='text-2xl p-1 lg:hidden'
            onClick={() => {
              setSideMenu(true);
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Sidebar */}
    
         <div
        className={clsx(
          'fixed h-full w-screen lg:hidden bg-black/20 backdrop-blur-lg top-0 right-0 font-semibold transform text-center transition-all',
          {
            'translate-x-full': !isSideMenuOpen,
            'translate-x-0': isSideMenuOpen,
          }
        )}
      >
        <button className='text-5xl py-4' onClick={closeSideMenu}>
          ⨯
        </button>
        <div className='py-4 text-2xl'>
          <NavLink to="/addnote" onClick={closeSideMenu}>
            Add Note
          </NavLink>
        </div>
        <div className='text-2xl'>
          <NavLink to="/allnote" onClick={closeSideMenu}>
            All Note
          </NavLink>
        </div>
        <div className='text-2xl py-4'>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
