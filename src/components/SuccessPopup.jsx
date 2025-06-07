import React, { useEffect, useState } from 'react';

function SuccessPopup({ onClose, actionType = 'create', type = 'Ownership Interests' }) {
    const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // Message map
  const messageMap = {
    'Ownership': 'Ownership interest successfully',
    'Roles': 'Role successfully',
    'Relationship': 'Relationship successfully',
    'Other': 'Disclosure successfully',
  };

  const actionLabel = actionType === 'update' ? 'updated' : 'added';
  const prefix = messageMap[type] || 'Item successfully';
  const message = `${prefix} ${actionLabel}`;

  return (
    <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center">
      <div
        className={`bg-bg rounded-xl p-8 w-[440px] max-w-[90%] text-center shadow-lg transform transition duration-300 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Confetti Area */}
        <div className="relative w-[265px] h-[140px] mx-auto mb-6">
          {/* Confetti Shapes */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-3 left-4 w-3 h-3 rotate-45 bg-blue-400" />
            <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-yellow-400" />
            <div className="absolute bottom-8 left-12 w-2.5 h-0.5 bg-pink-500 rotate-[30deg]" />
            {/* <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full" /> */}
            <div className="absolute bottom-3 right-10 text-base text-orange-400 font-bold transform rotate-[45deg]">★</div>
          </div>

          {/* ✅ Animated Check SVG */}
          <div className="w-[110px] h-[110px] mx-auto bg-blue flex items-center justify-center rounded-full">
            <svg
              width="80px"
              height="80px"
              className='stroke-blue'
              viewBox="0 0 133 133"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'popIn 0.3s ease-out',
                transformOrigin: 'center',
              }}
            >
              <g fill="none" fillRule="evenodd">
                <circle fill="#" cx="66.5" cy="66.5" r="54.5" />
                <circle fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5" />
                <circle stroke="#" strokeWidth="4" cx="66.5" cy="66.5" r="54.5" />
                <polyline
                  strokeWidth="5.5"
                  points="41 70 56 85 92 49"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    animation: 'drawCheck 2s ease-out forwards .5s infinite',
                  }}
                />
              </g>
            </svg>

            {/* Embedded Keyframes */}
            <style>
              {`
                @keyframes drawCheck {
                  0% {
                    stroke-dashoffset: 100;
                  }
                  100% {
                    stroke-dashoffset: 0;
                  }
                }

                @keyframes popIn {
                  0% {
                    transform: scale(0);
                    opacity: 0;
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
              `}
            </style>
          </div>
        </div>

        <h2 className="text-4xl font-manropeb font-bold text-heading-color mb-6 leading-[125%]">{message}</h2>

        <button
          onClick={onClose}
          className="bg-blue text-white py-3 px-6 rounded-lg font-semibold w-full cursor-pointer"
        >
          Check Now
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;
