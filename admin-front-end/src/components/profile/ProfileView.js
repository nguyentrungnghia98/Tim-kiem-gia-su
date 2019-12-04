import React  from 'react';
// import {Redirect} from 'react-router'
// import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './profile.css';

const ProfileView =() => {
    document.body.classList.add("background-profile");
    document.title = 'Trang cá nhân | Trang quản trị | Website Tìm kiếm gia sư';
    return (

        <header className="profile-header">
          <center><h1 className="mb-20">Họ và tên</h1></center>
        
           <div className = "flex-container">
            <div className="w-300 mr-5">
              <div className="text-center">
                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />
                <h6 className="mt-20">Thay đổi avatar</h6>
                <input type="file" className="text-center center-block file-upload mt-20" />
              </div><br />
            </div>
      
            <div className="w-500">
                  <hr />
                  <form className="form" method="post">
                    <div className="form-group row">
                        <span className="col-sm-3 col-form-label"><h4>Họ và tên :</h4></span>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="first_name" id="first_name" placeholder="full name" title="enter your first name if any." />
                        </div>
                        
                    </div>
        
                      
                    <div className="form-group row">
                        <span className="col-sm-3 col-form-label"><h4>Email: </h4></span>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email." />
                            </div>
                        
                    </div>
                   
                    <div className="form-group row">
                        <span className="col-sm-3 col-form-label"><h4>Mật khẩu :</h4></span>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" name="password" id="password" placeholder="password"/> 
                        </div>
                    </div>

                    <div className="form-group row">  
                        <span className="col-sm-3 col-form-label"><h4>Nhập lại:</h4></span>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" name="password2" id="password2" placeholder="repassword"/>
                        </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-12 right">
                        <br /><center>
                        <button className="btn btn-lg btn-primary mr-2" type="button">Reset</button>
                        <button className="btn btn-lg btn-success" type="submit">Save</button>
                        </center>
                      </div>
                    </div>
                  </form>
                  <hr />
            </div>
            </div>
        </header>
      );};

export default ProfileView;