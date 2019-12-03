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
        <div id='Home___Select_template___1' className='row mx-auto'>
          <div className='home-header'>
        
            <div id='Component_5___2' className='Component_5___2'>
              <div id='Choose_Your_Favourite_CV_Templ'>
                <span>Choose Your Favourite CV Template</span>
              </div>
              <div id='Component_2___1' className='Component_2___1'>
                <svg className='ic_search_24px' viewBox='3 3 28.582 29.475'>
                  <path
                    fill='rgba(164,164,164,1)'
                    id='ic_search_24px'
                    d='M 23.42772483825684 21.53753662109375 L 22.13669586181641 21.53753662109375 L 21.67911338806152 21.08252334594727 C 23.28064727783203 19.1613597869873 24.24483489990234 16.6672191619873 24.24483489990234 13.95399856567383 C 24.24483489990234 7.904021263122559 19.48926162719727 3.000000238418579 13.6224193572998 3.000000238418579 C 7.755575180053711 3.000000238418579 3.000000238418579 7.904021263122559 3.000000238418579 13.95399856567383 C 3.000000238418579 20.00397491455078 7.755575180053711 24.90799903869629 13.6224193572998 24.90799903869629 C 16.25350952148438 24.90799903869629 18.67215347290039 23.91371154785156 20.53516006469727 22.26218795776367 L 20.97640037536621 22.73405265808105 L 20.97640037536621 24.06538200378418 L 29.14748764038086 32.47468566894531 L 31.58247375488281 29.96368789672852 L 23.42772483825684 21.53753662109375 Z M 13.6224193572998 21.53753662109375 C 9.553215980529785 21.53753662109375 6.268435955047607 18.15022277832031 6.268435955047607 13.95399856567383 C 6.268435955047607 9.75777530670166 9.553215980529785 6.370460510253906 13.6224193572998 6.370460510253906 C 17.69162178039551 6.370460510253906 20.97640037536621 9.75777530670166 20.97640037536621 13.95399856567383 C 20.97640037536621 18.15022277832031 17.69162178039551 21.53753662109375 13.6224193572998 21.53753662109375 Z'
                  />
                </svg>
                <div id='Type_name_template_here____'>
                  <input
                    className='custom-input-text'
                    type='text'
                    placeholder='Type name template here ...'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="home--body">
            <DefaultTemplates />
            <TemplatesCategories/>
            <MyTemplates/>
          </div>
          
        </div>
      </>
    );
  }
}

export default Home;
