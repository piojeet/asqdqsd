import React from 'react'
import ToggleSwitch from './ToggleSwitch'
import { NavLink, } from 'react-router-dom'
import { ChevronDown, CircleHelp, ClipboardList, LayoutGrid } from 'lucide-react'

function SideBar() {


  return (
    <div className='min-w-[280px] p-6 border-r border-border h-full'>
      <div className='h-full flex flex-col justify-between'>
        <div className='h-full flex flex-col gap-6'>
          <div className='font-interb font-semibold text-2xl text-blue'>KPMG</div>

          <div className='h-full space-y-6'>
            
              <div>
                <NavLink
                  to={'#'}
                  className={`flex items-center justify-between py-4 rounded-xl font-manropeb font-bold bg-blue text-bg-light shadow-[0px_10px_30px_#2E0E9833] px-5`}
                >
                    <span>Dashboard</span>
                  <span className='size-5'><LayoutGrid /></span>
                </NavLink>

              </div>
            
              <div>
                <NavLink
                  to={'#'}
                  className={`flex items-center justify-between py-4 rounded-xl font-manropeb font-bold text-heading-color`}
                >
                  <span className='flex items-center gap-2.5'>
                    <span className='size-5 text-light-icon'><ClipboardList /></span>
                    <span>My Profile</span>
                  </span>
                  <span className='size-5 text-light-icon'><ChevronDown /></span>
                </NavLink>

              </div>
          
          </div>
        </div>

        <div className='space-y-4'>
          <div className=''>
            <div className='py-4'>
              <NavLink to={'/'} className={'flex items-center justify-between'} >
                <span className='flex items-center gap-2.5'>
                  <CircleHelp className='size-5 text-light-icon' />
                  <span className='font-bold font-manropeb text-heading-color'>Help Center</span>
                </span>
                <span className='size-6 rounded-full bg-red text-bg-light shrink-0 flex items-center justify-center font-manropeb font-semibold'>8</span>
              </NavLink>
            </div>
            <div className='py-4'>
              <NavLink to={'/'} className={'flex items-center justify-between'} >
                <span className='flex items-center gap-2.5'>
                  <CircleHelp className='size-5 text-light-icon' />
                  <span className='font-bold font-manropeb text-heading-color'>Help Center</span>
                </span>
              </NavLink>
            </div>
          </div>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  )
}

export default SideBar