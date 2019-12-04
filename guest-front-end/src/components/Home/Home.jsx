import React, { Component } from "react";

import "./home.css";
import DefaultTemplates from "./DefaultTemplates";
import TemplatesCategories from "./TemplatesCategories";
import MyTemplates from "./MyTemplates";

class Home extends Component {
  test = () => {};

  render() {
    return (
      <>
        <div id='home-page' className='row mx-auto'>
          <div className='home-header'>
        
            <div id='home-page--container' className='home-page--container'>
              <div id='home-page--text'>
                <span>Chào mừng bạn đến với Uber for tutor</span>
              </div>
              <div className="home-page--subtext">Ứng dụng thuê gia sư nhanh chóng và uy tính nhất hiện nay</div>
              
              <div className="d-flex">
              <div id='home-page--search' className='home-page--search'>
                <div id='home-page--input'>
                  <input
                    className='custom-input-text'
                    type='text'
                    placeholder='Bạn muốn học gì ...'
                  />
                </div>
                
              </div>
              <button className="btn btn-search btn-info">
                  Tìm kiếm gia sư
                </button>
              </div>
              
            </div>
          </div>
          <div className="home--body">
            {/* <DefaultTemplates /> */}
            <TemplatesCategories/>
            {/* <MyTemplates/> */}
          </div>
          
        </div>
      </>
    );
  }
}

export default Home;
