import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
    setActive: React.Dispatch<React.SetStateAction<string | null>>;
    active: string | null;
    item: string;
    children: React.ReactNode;
}) => {
  return (
    <div onClick={() => setActive(prevItem => prevItem === item ? null : item)} className="relative sm:mx-8">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] text-white"
      >
        <span
          className={`w-6 h-[2px] sm:w-10 sm:h-1 bg-white block rounded duration-200 ${active ? "rotate-45 translate-y-[4px] sm:translate-y-[10px]" : "rotate-0 translate-y-0"}`}
        />
        <span
          className={`w-6 h-[2px] sm:w-10 sm:h-1 bg-white block rounded my-[5px] sm:my-2 duration-200 ${active ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`w-6 h-[2px] sm:w-10 sm:h-1 bg-white block rounded duration-200 ${active ? "-rotate-45 -translate-y-[10px] sm:-translate-y-[13px]" : "rotate-0 translate-y-0"}`}
        />
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
    setActive: React.Dispatch<React.SetStateAction<string | null>>;
    children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ 
    children, link, ...rest 
}: {
    children: React.ReactNode;
    link: string;
    [x: string]: any;
}) => {
  return (
    <Link
      to={link}
      className="text-neutral-200 w-full hover:opacity-85 duration-500 rounded-sm py-1 px-2"
      {...rest}
    >
      {children}
    </Link>
  );
};
