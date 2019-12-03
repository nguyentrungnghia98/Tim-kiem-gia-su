import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TemplatesCategories extends Component {
    test = {  }

    renderCategories = () => {
        const categories = [
          {
            text: "Toán học",
            image: "/images/category.png"
          },{
            text: "Vật lý",
            image: "/images/category.png"
          },{
            text: "Hóa học",
            image: "/images/category.png"
          },{
            text: "Tiếng Anh",
            image: "/images/category.png"
          },{
            text: "Tin học",
            image: "/images/category.png"
          },{
            text: "Lập trình",
            image: "/images/category.png"
          },{
            text: "Lịch sử",
            image: "/images/category.png"
          },{
            text: "Địa lý",
            image: "/images/category.png"
          },
        ]

        return (
            <div className="d-flex flex-wrap justify-content-start">
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
            <div className="home--card mt-3">
                <div className="home--card__header">
                  <div className="home--card__title">
                   Môn học
                  </div>
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