import React, {useState} from 'react';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';

import { CSSTransition } from 'react-transition-group';


function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />}></NavItem>
      <NavItem icon={<BellIcon />}></NavItem>
      <NavItem icon={<MessengerIcon />}></NavItem>
      <NavItem icon={<CaretIcon/>}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <h1>FBNav</h1>
      <ul className="navbar-nav">{ props.children }</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }


  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
      in={activeMenu === 'main'}
      unmountOnExit
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
      >
        <div className="menu">
        <DropdownItem leftIcon="🧔">My Profile</DropdownItem>
        <DropdownItem
          leftIcon={<CogIcon />}
          rightIcon={<ChevronIcon />}
          goToMenu="settings"
        >
          Settings
        </DropdownItem>
        <DropdownItem
          leftIcon="🤭"
          rightIcon={<ChevronIcon />}
          goToMenu="emojis"
        >
          Emojis
        </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
      in={activeMenu === 'settings'}
      unmountOnExit
      timeout={500}
      classNames="menu-secondary"
      onEnter={calcHeight}>
        <div className="menu">
        <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main"><h2>My Settings</h2></DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>Games</DropdownItem>
        <DropdownItem leftIcon={<MessengerIcon />}>Privacy Policy</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>Cookies</DropdownItem>
        <DropdownItem leftIcon={<MessengerIcon />}>Profile</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>Update</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
      in={activeMenu === 'emojis'}
      unmountOnExit
      timeout={500}
      classNames="menu-secondary"
      onEnter={calcHeight}>
        <div className="menu">
        <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main"><h2>My Emojis</h2></DropdownItem>
        <DropdownItem leftIcon="🥰">Smile</DropdownItem>
        <DropdownItem leftIcon="💕">Love</DropdownItem>
        <DropdownItem leftIcon="🚓">Car</DropdownItem>
        <DropdownItem leftIcon="🦁">Lion</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  );
}

export default App;
