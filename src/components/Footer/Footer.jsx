import './Footer.scss';
import React from 'react';
import { FaInstagram, FaTwitter, FaDiscord, FaFacebook } from 'react-icons/fa'
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Footer = () => {
  return (
    <div className='footer' >
        <ContentWrapper>
            <ul className='menuItem'>
                <li className='menuItems'>Terms of Use</li>
                <li className='menuItems'>Privacy-Policy</li>
                <li className='menuItems'>About</li>
                <li className='menuItems'>Blog</li>
                <li className='menuItems'>FAQ</li>
            </ul>
            <div className='infoText'>
                <p>Copyright © 2023 Flick. All Rights Reserved</p>
                <p>Disclaimer: This site Flick does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
            </div>
            <div className='social-icons'>
                <span className='icon'>
                    <FaDiscord />
                </span>
                <span className='icon'> 
                    <FaInstagram />
                </span>
                <span className='icon'>
                    <FaFacebook />
                </span>
                <span className='icon'>
                    <FaTwitter />
                </span>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default Footer;