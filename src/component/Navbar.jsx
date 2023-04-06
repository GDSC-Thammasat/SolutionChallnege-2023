import React from 'react';
import '../style/navbar.css'
import '../style/App.css';
// import { NavLink } from 'react-router-dom';

import banner from '../assets/images/banner.png'

function Navbar() {
    return (
      <body className='navbar-us'>

          <h1 className='navbar-us'><img src={banner} alt="" height="40px"/></h1>
          <div className='navbar-us' id='navbar-us'>
            <nav>
                <a className='navbar-us' href="/">HOME</a>
                <a className='navbar-us' href="/Knowledge">KNOWLEDGE</a>
                <a className='navbar-us' href="/Stack">TECH STACK</a>
                <a className='navbar-us' href="/About">ABOUT</a>
            </nav>
            </div>

        </body>
    )
}
export default Navbar