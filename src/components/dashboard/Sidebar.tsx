"use client";
import { FaTimes } from "react-icons/fa";

export default function Sidebar({ mobile, onClose }: { mobile?: boolean, onClose?: () => void }) {
  return (
    <>
      {mobile && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed top-0 left-0 w-64 bg-gray-200 p-4 h-full z-50 transform transition-transform duration-300
          ${mobile ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative md:block
        `}
      >
        <button 
          className="md:hidden absolute top-4 right-4"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mt-8 md:mt-0">Sidebar</h2>
        <ul className="mt-4">
          <li className="py-2 hover:bg-gray-300 rounded transition">
            <a href="#" className="block px-2">Details</a>
          </li>
        </ul>
      </aside>
    </>
  );
}