import React from "react";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <div className='header--logo'>
            <img src="/images/logo-gia-su-white.png" alt="logo"/>
          </div>
        <div className='footer-icon'>
          <i className='fab fa-instagram' />
          <i className='fab fa-twitter' />
          <i className='fab fa-facebook-f' />
          <i className='fas fa-globe-europe' />
        </div>
      </div>
      <div className='footer-info'>
        <div className='footer-info-title'>CAREER RESOURCES</div>
        <div className='footer-info-content'>How to Write a Resume</div>
        <div className='footer-info-content'>
          Is It Time for a Career Change?
        </div>
        <div className='footer-info-content'>How to Write a Cover Letter</div>
        <div className='footer-info-content'>That Lands You an Interview</div>
        <div className='footer-info-content'>Blog</div>
      </div>
      <div className='footer-info'>
        <div className='footer-info-title'>OUR COMPANY</div>
        <div className='footer-info-content'>About Us</div>
        <div className='footer-info-content'>Pricing</div>
        <div className='footer-info-content'>Product Updates</div>
      </div>
      <div className='footer-info'>
        <div className='footer-info-title'>SUPPORT</div>
        <div className='footer-info-content'>FAQ</div>
        <div className='footer-info-content'>Contact Us</div>
        <div className='footer-info-content'>Terms of Service</div>
        <div className='footer-info-content'>Privacy</div>
      </div>
    </div>
  );
};

export default Footer;
