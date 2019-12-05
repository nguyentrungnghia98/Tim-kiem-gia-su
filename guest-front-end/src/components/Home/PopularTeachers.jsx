import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Teacher from '../shared/Teacher/Teacher';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
};

const teacher = {
  avatar: 'https://www.upwork.com/profile-portraits/c17Ppw4ug0lV5mmvPQzWkIZ07oThUemdFLT0iTR4TOBGBCeFIIjcn36raL9f-xaJ2i',
  username: 'Trần Dần',
  email: 'a@gmail.com',
  salaryPerHour: 100000,
  address: 'Tp.Hồ Chí Minh',
  job: 'Giáo viên Toán',
  skills: [
    {name: 'Toán 12'},{name: 'Tin học'},{name: 'React'},{name: 'Toán'},{name: 'Lập trình web'},
  ]
}

class PopularTeachers extends Component {

  renderListTeachers = () => {
    const arrTemp = [...Array(8).keys()];

    return (
      <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      >
        {arrTemp.map((_,index) => {
          return (
            <Teacher key={index} data ={teacher}/>
          )
        })}
      </Carousel>
    );
  }

  render() {
    return (
      <div className="home--card">
        <div className="home--card__header">
          <div className="home--card__title">
            Người dạy nổi bật
              </div>
          <Link to="/category" className="btn see-more">
            Xem thêm &gt;
              </Link>
        </div>
        {this.renderListTeachers()}
      </div>
    );
  }
}

export default PopularTeachers;