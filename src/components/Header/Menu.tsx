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
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        <motion.span
          initial={{ rotate: 0, y: 0 }}
          animate={active ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
          transition={transition}
          className="w-8 sm:w-10 h-1 bg-white block rounded"
        />
        <motion.span
          initial={{ opacity: 1 }}
          animate={active ? { opacity: 0 } : { opacity: 1 }}
          transition={transition}
          className="w-8 sm:w-10 h-1 bg-white block rounded my-2"
        />
        <motion.span
          initial={{ rotate: 0, y: 0 }}
          animate={active ? { rotate: -45, y: -13 } : { rotate: 0, y: 0 }}
          transition={transition}
          className="w-8 sm:w-10 h-1 bg-white block rounded"
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
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
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
      className="text-neutral-700 dark:text-neutral-200 w-full hover:bg-white hover:text-black duration-500 rounded-sm py-1 px-2"
      {...rest}
    >
      {children}
    </Link>
  );
};
