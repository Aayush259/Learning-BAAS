import DrawIcon from '@mui/icons-material/Draw';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header
      className="px-6 sm:pr-8 sm:pl-14 py-2 border-b border-[#cbd5e11a] flex flex-row items-center justify-between flex-wrap relative z-50 bg-opacity-60"
    >
      <h1
        className="font-semibold text-xl sm:text-4xl flex items-center justify-center gap-2 sm:gap-4"
      >
        <DrawIcon className="sm:scale-[1.8]" />
        WriteWise
      </h1>

      <Navbar />
    </header>
  );
};
