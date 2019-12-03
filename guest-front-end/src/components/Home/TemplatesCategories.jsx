import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TemplatesCategories extends Component {
    test = {  }

    renderCategories = () => {
        const categories = [
          {
            text: "Graphics & Design",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
          },{
            text: "Digital Marketing",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
          },{
            text: "Writing & Translation",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
          },{
            text: "Video & Animation",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
          },{
            text: "Music & Audio",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
          },{
            text: "Programming & Tech",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
          },{
            text: "Business",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
          },{
            text: "Lifestyle",
            image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
          },
        ]

        return (
            <div className="d-flex flex-wrap justify-content-between">
                {
                    categories.map((item) => {
                            return (
                                <Link className=" category-item mb-3" 
                                to={`/category/${item.text}/all`}  key={item.text}>
                                  <img src={item.image} alt={item.text}/>
                                  <div>{item.text}</div>
                                </Link>
                            );
                    })
                }
            </div>
        );
    }

    render() { 
        return (  
            <div className="default-template mt-3">
            <div className="header--underline">
                    <span>Templates Categories</span>
                    </div>
                <div className="default-template--header flex-end">
                  
                  <Link  to="/category" className="btn see-more">
                       See More &gt;
                  </Link>
                </div>
                { this.renderCategories() } 
            </div>
        );
    }
}
 
export default TemplatesCategories;