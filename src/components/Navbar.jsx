import { Bell, ChevronDown, Menu, Search, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavbar } from '../context/NavbarContext';

function Navbar() {

  const { openMenu } = useNavbar();

  return (
    <div className='w-full'>
      <header className='border-b border-border md:py-6 py-4 md:px-8 px-6'>
        <nav className='flex justify-between flex-col-reverse lg:flex-row lg:gap-0 gap-4'>
          <div className=''>
            <form action="#">
              <div className='flex items-center relative shirink-0 sm:w-fit w-full'>
                <Search className='absolute left-4 size-5' />
                <input type="text" name="search" id="search" className='py-2 pl-10 sm:w-[315px] pr-14 outline-none rounded-lg bg-bg-light text-zinc-900 font-manrope-r w-full' placeholder='Search anything…' />
                <span className='flex items-center gap-1 py-1 px-3 bg-bg absolute right-2 text-heading-color rounded-lg font-manrope-m'>
                  F
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='fill-heading-color'>
                    <path d="M2.56942 12C2.09818 12 1.66807 11.8859 1.2791 11.6576C0.890136 11.4256 0.57971 11.1151 0.347826 10.7259C0.115942 10.333 0 9.90271 0 9.43499C0 8.95978 0.115942 8.5276 0.347826 8.13845C0.57971 7.7493 0.890136 7.43873 1.2791 7.20674C1.66807 6.97474 2.09818 6.85875 2.56942 6.85875H3.73633V5.13003H2.56942C2.09818 5.13003 1.66807 5.0159 1.2791 4.78765C0.890136 4.55566 0.57971 4.24696 0.347826 3.86155C0.115942 3.4724 0 3.04022 0 2.56501C0 2.09355 0.115942 1.66324 0.347826 1.27409C0.57971 0.884939 0.890136 0.57624 1.2791 0.347989C1.66807 0.115996 2.09818 0 2.56942 0C3.04067 0 3.47078 0.115996 3.85975 0.347989C4.24871 0.57624 4.55914 0.884939 4.79102 1.27409C5.02665 1.66324 5.14446 2.09355 5.14446 2.56501V3.72685H6.86676V2.56501C6.86676 2.09355 6.98083 1.66324 7.20898 1.27409C7.44086 0.884939 7.75129 0.57624 8.14025 0.347989C8.52922 0.115996 8.9612 0 9.43619 0C9.90743 0 10.3375 0.115996 10.7265 0.347989C11.1155 0.57624 11.424 0.884939 11.6522 1.27409C11.8841 1.66324 12 2.09355 12 2.56501C12 3.04022 11.8841 3.4724 11.6522 3.86155C11.4203 4.24696 11.1099 4.55566 10.7209 4.78765C10.3357 5.0159 9.90743 5.13003 9.43619 5.13003H8.27489V6.85875H9.43619C9.90743 6.85875 10.3357 6.97474 10.7209 7.20674C11.1099 7.43873 11.4203 7.7493 11.6522 8.13845C11.8841 8.5276 12 8.95978 12 9.43499C12 9.90271 11.8841 10.333 11.6522 10.7259C11.4203 11.1151 11.1099 11.4256 10.7209 11.6576C10.3357 11.8859 9.90743 12 9.43619 12C8.9612 12 8.52922 11.8859 8.14025 11.6576C7.75129 11.4256 7.44086 11.1151 7.20898 10.7259C6.98083 10.333 6.86676 9.90271 6.86676 9.43499V8.26193H5.14446V9.43499C5.14446 9.90271 5.02665 10.333 4.79102 10.7259C4.55914 11.1151 4.24871 11.4256 3.85975 11.6576C3.47078 11.8859 3.04067 12 2.56942 12ZM2.56942 10.5968C2.78261 10.5968 2.97709 10.5444 3.15288 10.4397C3.3324 10.3349 3.47452 10.1946 3.57924 10.0187C3.68396 9.84284 3.73633 9.64827 3.73633 9.43499V8.26193H2.56942C2.35624 8.26193 2.16176 8.31618 1.98597 8.4247C1.81019 8.52947 1.66994 8.66978 1.56522 8.84565C1.4605 9.02151 1.40813 9.21796 1.40813 9.43499C1.40813 9.64827 1.45863 9.84284 1.55961 10.0187C1.66433 10.1946 1.80458 10.3349 1.98036 10.4397C2.15989 10.5444 2.35624 10.5968 2.56942 10.5968ZM2.56942 3.72685H3.73633V2.56501C3.73633 2.34799 3.68396 2.15341 3.57924 1.98129C3.47452 1.80543 3.3324 1.66511 3.15288 1.56034C2.97709 1.45557 2.78261 1.40318 2.56942 1.40318C2.35624 1.40318 2.16176 1.45557 1.98597 1.56034C1.81019 1.66511 1.66994 1.80543 1.56522 1.98129C1.4605 2.15341 1.40813 2.34799 1.40813 2.56501C1.40813 2.7783 1.45863 2.97474 1.55961 3.15435C1.66433 3.33022 1.80458 3.47053 1.98036 3.5753C2.15989 3.67633 2.35624 3.72685 2.56942 3.72685ZM8.27489 3.72685H9.43619C9.64937 3.72685 9.84385 3.67633 10.0196 3.5753C10.1954 3.47053 10.3338 3.33022 10.4348 3.15435C10.5395 2.97848 10.5919 2.78204 10.5919 2.56501C10.5919 2.34799 10.5395 2.15341 10.4348 1.98129C10.3338 1.80543 10.1954 1.66511 10.0196 1.56034C9.84385 1.45557 9.64937 1.40318 9.43619 1.40318C9.21926 1.40318 9.02291 1.45557 8.84713 1.56034C8.67134 1.66511 8.53109 1.80543 8.42637 1.98129C8.32539 2.15341 8.27489 2.34799 8.27489 2.56501V3.72685ZM9.43619 10.5968C9.64937 10.5968 9.84385 10.5444 10.0196 10.4397C10.1954 10.3349 10.3338 10.1946 10.4348 10.0187C10.5395 9.84284 10.5919 9.64827 10.5919 9.43499C10.5919 9.21796 10.5395 9.02151 10.4348 8.84565C10.3338 8.66978 10.1954 8.52947 10.0196 8.4247C9.84385 8.31618 9.64937 8.26193 9.43619 8.26193H8.27489V9.43499C8.27489 9.64827 8.32539 9.84284 8.42637 10.0187C8.53109 10.1946 8.67134 10.3349 8.84713 10.4397C9.02291 10.5444 9.21926 10.5968 9.43619 10.5968ZM5.14446 6.85875H6.86676V5.13003H5.14446V6.85875Z" />
                  </svg>
                </span>
              </div>
            </form>
          </div>

          <div className='flex items-center justify-between'>
              <button className='lg:hidden outline-none border-none bg-none text-heading-color cursor-pointer' onClick={openMenu}><Menu /></button>
            <div className='flex items-center sm:gap-6 gap-4'>
              <div>
                <NavLink to={''}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='stroke-heading-color'>
                    <path d="M16.99 8.96002H7.01001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 7.28003V8.96002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.5 8.94C14.5 13.24 11.14 16.72 7 16.72" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.9999 16.72C15.1999 16.72 13.6 15.76 12.45 14.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </NavLink>
              </div>
              <div>
                <NavLink to={''} className={'relative'}>
                  <Bell className='text-heading-color' />
                  <span className='absolute size-2.5 bg-red-500 rounded-full top-0.5 right-0.5 border-2 border-bg'></span>
                </NavLink>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <div className='size-8 bg-light-icon rounded-full flex items-center justify-center text-bg-light'><User size={20} /></div>
                <ChevronDown className='text-heading-color size-5' />
              </div>
            </div>
          </div>

        </nav>
      </header>
    </div>
  )
}

export default Navbar