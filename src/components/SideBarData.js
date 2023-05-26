import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Profile',
   path: '/userdashboard/Profile',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Verified requests',
    path: '/userdashboard/verified_requests',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'My Properties',
    path: '/userdashboard/my_properties',
    icon: <BsIcons.BsBuildingsFill />,
    cName: 'nav-text'
  },
   
];