import React, { useState } from 'react';
import OwnIntrest from './OwnIntrest';
import Roles from './Roles';
import Relationship from './Relationship';
import Other from './Other';

function Homeright() {
  const [activeTab, setActiveTab] = useState('ownership');

  return (
    <div className='px-6 pb-6'>
      <div className='flex md:bg-bg-light md:border border-blue/20 p-1.5 w-fit rounded-full mt-8 md:flex-row flex-col gap-2'>
        <div
          className={`py-3.5 px-5 rounded-full cursor-pointer font-sf-pro font-bold border border-blue/20 shadow-[0px_5px_13px_#0000000D] ${
            activeTab === 'ownership'
              ? 'bg-blue text-bg-light'
              : 'md:text-zinc-900 bg-bg-light md:bg-none'
          }`}
          onClick={() => setActiveTab('ownership')}
        >
          Ownership Interests
        </div>
        <div
          className={`py-3.5 px-5 rounded-full cursor-pointer font-sf-pro font-bold 2xl:min-w-[180px] md:min-w-[130px] text-center border border-blue/20 ${
            activeTab === 'roles'
              ? 'bg-blue text-bg-light'
              : 'md:text-zinc-900 bg-bg-light md:bg-none'
          }`}
          onClick={() => setActiveTab('roles')}
        >
          Roles
        </div>
        <div
          className={`py-3.5 px-5 rounded-full cursor-pointer font-sf-pro font-bold 2xl:min-w-[202px] md:min-w-[150px] text-center border border-blue/20 ${
            activeTab === 'relationship'
              ? 'bg-blue text-bg-light'
              : 'md:text-zinc-900 bg-bg-light md:bg-none'
          }`}
          onClick={() => setActiveTab('relationship')}
        >
          Relationship
        </div>
        <div
          className={`py-3.5 px-5 rounded-full cursor-pointer font-sf-pro font-bold 2xl:min-w-[202px] md:min-w-[150px] text-center border border-blue/20 ${
            activeTab === 'other'
              ? 'bg-blue text-bg-light'
              : 'md:text-zinc-900 bg-bg-light md:bg-none'
          }`}
          onClick={() => setActiveTab('other')}
        >
          Other
        </div>
      </div>

      <div className='mt-6'>
        {activeTab === 'ownership' && (
          <div><OwnIntrest /></div>
        )}
        {activeTab === 'roles' && <div><Roles /></div>}
        {activeTab === 'relationship' && <div><Relationship /></div>}
        {activeTab === 'other' && <div><Other /></div>}
      </div>
    </div>
  );
}

export default Homeright;
