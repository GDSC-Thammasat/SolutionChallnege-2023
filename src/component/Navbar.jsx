import React from 'react';
import '../style/App.css';
// import { NavLink } from 'react-router-dom';

import banner from '../assets/images/banner.png'

function Navbar() {
    return (
      <body className='navbar'>

          <h1 className='navbar'><img src={banner} alt="" height="40px"/></h1>
          <div className='navbar' id='navbar'>
            <nav>
                <a className='navbar' href="/">HOME</a>
                <a className='navbar' href="/Knowledge">KNOWLEDGE</a>
                <a className='navbar' href="/Stack">TECH STACK</a>
                <a className='navbar' href="/About">ABOUT</a>
                {/* <a className='navbar' href="/Contact-Us">CONTACT US</a> */}
              {/* <li className='home-menu'>
                <NavLink className='nav-bar-link' to = "/"
                  >HOME</NavLink>
              </li>
              <li>
                <NavLink className='nav-bar-link' to = "/Knowledge">KNOWLEDGE</NavLink>
              </li>
              <li>
                <NavLink className='nav-bar-link' to = "/Stack">TECH STACK</NavLink>
              </li> */}
            </nav>
            </div>

        </body>
    )
}
export default Navbar