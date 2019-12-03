import React, { Component } from 'react';

class MyTemplates extends Component {

    renderTemplates = () => {
        const templates = [...Array(8).keys()]
        return (
            <div className="d-flex flex-wrap justify-content-start">
                {
                    templates.map((item) => {
                        return (
                            <div className="Repeat_Grid mb-3"
                                key={item}>
                                <div className="image-cv">
                                  <img alt="template" src="/img/Image_4_A11_Rectangle_21_pattern.png"/> 
                                  <div className="template-hover">
                                      <div className="d-flex flex-column x-index-5">
                                        <button type="button" className="btn btn-select">Select</button>
                                        <button type="button" className="btn btn-select mt-3">Edit</button>
                                      </div>
                                  </div>
                                </div>   
                            </div>
                        );
                    })
                }
            </div>
        );
    }



    renderPageNumerNav = () => {
        const { selectedPage } = this.props;
        const arrPageNumber = [...Array(4).keys()];
        return (
            <div  className="d-flex justify-content-end mb-5 mt-4">
                {
                    arrPageNumber.map((item) => {
                        return (
                            <a key={item} className={`btn-page-number ${item === selectedPage && 'btn-page-number-selected'}`} 
                                href="script:0">
                                    {item + 1}
                            </a>
                        );
                    })
                }
                <a className="btn-page-number btn-page-number-end" 
                    href="script:0">
                        &gt;
                </a>
            </div>
        );
    }
    

    render() {
        return (
            <div className="default-template mt-3">
                <div className="header--underline">
                    <span>My Templates</span>
                </div>
                <div className="default-template--header flex-end">
                    
                    <button type="button" className="btn btn--add">Add</button>
                </div>
                { this.renderTemplates() }
                { this.renderPageNumerNav() }
            </div>
        );
    }
    
}

export default MyTemplates;