import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HoveredLink, Menu, MenuItem } from './Menu.jsx';

export default function Navbar() {

  // Getting authenticaiton state from redux store.
  const authStatus = useSelector(state => state.auth.status);

  // State to track the active menu item.
  const [active, setActive] = useState(null);

  // Function to get nav link object.
  const getNavLink = (name, slug, active) => ({
    name, slug, active,
  })

  // Array of nav items.
  const navItems = [
    getNavLink('Home', '/', true),
    getNavLink('Login', '/login', !authStatus),
    getNavLink('Sign Up', '/signup', !authStatus),
    getNavLink('Logout', '/logout', authStatus),
    getNavLink('Posts', '/all-posts', authStatus),
  ];

  return (
    <div
      className="text-xl"
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 sm:min-w-44">
            {
              navItems.map(item => (
                item.active ? (
                  <HoveredLink
                    key={item.name}
                    link={item.slug}
                  >
                    {item.name}
                  </HoveredLink>
                ) : null
              ))
            }
          </div>
        </MenuItem>

      </Menu>
    </div>
  );
}
