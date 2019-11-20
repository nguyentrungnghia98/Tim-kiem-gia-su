import React from 'react';

const Home = () => {
    return (
        <div className="text-center mt-5">
            <h2>Chọn gia sư thích hợp cho riêng bạn</h2>
            <form className="form-inline justify-content-center mt-4">
                <input className="form-control w-25 mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Home;