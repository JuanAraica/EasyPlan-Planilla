import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Jornadas',
    path: '/jornadas',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Prestamos',
    path: '/prestamos',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
    }
    ,
  {
    title: 'Trabajadores',
    path: '/trabajadores',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
    },
    {
    title: 'Adelantos',
    path: '/adelantos',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Historial',
    path: '/historial',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Soporte',
    path: '/soporte',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];