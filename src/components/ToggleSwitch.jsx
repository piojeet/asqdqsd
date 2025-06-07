import { Moon, Sun } from 'lucide-react'; // Optional: You can use any icon lib
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
   const { darkMode, toggleMode } = useTheme();

  return (
    <div
  onClick={toggleMode}
  className="bg-bg-light rounded-full p-1.5 flex items-center cursor-pointer relative transition-all gap-1"
>
  {/* Sliding background with auto width */}
  <div
    className={`absolute top-1.5 bottom-1.5 rounded-full shadow-md transition-all duration-300 px-4 py-2 w-[107px]
      ${darkMode ? 'left-[117px] bg-bg' : 'left-1.5 bg-bg'}`}
  >
    {/* Empty div just for size */}
  </div>

  {/* Sun */}
  <div className="flex items-center justify-center relative z-10 px-4 py-1.5 w-full gap-2">
    <Sun
      className={`w-5 h-5 mr-1 transition-colors ${
        darkMode ? 'text-gray-400' : 'text-black'
      }`}
    />
    <span
      className={`text-sm font-medium ${
        darkMode ? 'text-gray-400' : 'text-black'
      }`}
    >
      Light
    </span>
  </div>

  {/* Moon */}
  <div className="flex items-center justify-center relative z-10 px-4 py-1.4 w-full gap-2">
    <Moon
      className={`w-5 h-5 mr-1 transition-colors ${
        darkMode ? 'text-white' : 'text-gray-400'
      }`}
    />
    <span
      className={`text-sm font-medium ${
        darkMode ? 'text-white' : 'text-gray-400'
      }`}
    >
      Dark
    </span>
  </div>
</div>

  );
}
