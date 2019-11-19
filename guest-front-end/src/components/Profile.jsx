import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends Component {

    constructor(props){
        super(props);
        this.avatar = React.createRef();
        this.file = React.createRef();
        this.username = React.createRef();
        this.email = React.createRef();
        this.btnSaveAvatar = React.createRef();
        this.btnCancelAvatar = React.createRef();
        this.btnUpdateInfo = React.createRef();
        this.btnSaveInfo = React.createRef();
        this.btnCancelUpdateInfo = React.createRef();
    }

    handleSaveAvatar = () => {
        const btnSaveAvatar = this.btnSaveAvatar.current;
        const btnCancelAvatar = this.btnCancelAvatar.current;
        const fileInput = this.file.current;
        const { updateAvatar } = this.props;
        
        btnSaveAvatar.disabled = true;
        btnCancelAvatar.disabled = true;

        const data = new FormData();
        data.append('avatar', fileInput.files[0]);
        updateAvatar({
            data,
            filename: fileInput.files[0].filename
        });
        btnSaveAvatar.disabled = false;
        btnCancelAvatar.disabled = false;

        return false;

    }

    handleChangeFile = () => {
        const avatar = this.avatar.current;
        const btnSaveAvatar = this.btnSaveAvatar.current;
        const btnCancelAvatar = this.btnCancelAvatar.current;
        const fileInput = this.file.current;
        

        if (fileInput.files && fileInput.files[0]){
            const reader = new FileReader();
            reader.onload = (e) => {
                avatar.src = e.target.result;
                btnSaveAvatar.hidden = false;
                btnCancelAvatar.hidden = false;
                btnSaveAvatar.disabled = false;
                btnCancelAvatar.disabled =false;
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    handleCancelChangeAvatar = () => {
        const { avatar } = this.props;
        const avatarImg = this.avatar.current;
        const btnSaveAvatar = this.btnSaveAvatar.current;
        const btnCancelAvatar = this.btnCancelAvatar.current;
        avatarImg.src = `http://localhost:3000/${avatar}`;
        btnSaveAvatar.hidden = true;
        btnCancelAvatar.hidden = true;
    }

    handleUpdateInfo = () => {
        const username = this.username.current;
        const email = this.email.current;
        const btnUpdateInfo = this.btnUpdateInfo.current;
        const btnSaveInfo = this.btnSaveInfo.current;
        const btnCancelUpdateInfo = this.btnCancelUpdateInfo.current;
        
        username.readOnly = false;
        email.readOnly = false;
        btnUpdateInfo.hidden = true;
        btnSaveInfo.hidden = false;
        btnCancelUpdateInfo.hidden = false;
    }

    handleCancelUpateInfo = () => {
        const { username, email } = this.props;
        const usernameInput = this.username.current;
        const emailInput = this.email.current;
        const btnUpdateInfo = this.btnUpdateInfo.current;
        const btnSaveInfo = this.btnSaveInfo.current;
        const btnCancelUpdateInfo = this.btnCancelUpdateInfo.current;

        usernameInput.readOnly = true;
        emailInput.readOnly = true;
        btnUpdateInfo.hidden = false;
        btnSaveInfo.hidden = true;
        btnCancelUpdateInfo.hidden = true;
        usernameInput.value = username;
        emailInput.value = email;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const postFields = {
            username: this.username.current.value,
            email: this.email.current.value
        }
        const { updateProfile } = this.props;
        updateProfile(postFields);
        return false;
    }

    renderElement = () => {
        const { username, email, avatar, invertShouldShowChangePassword } = this.props;

        return (
            <div className="container-login">
                <div className="row h-100 my-auto">
                    <div className="card card-login card-block mx-auto card-profile">
                        <div className="card-header">
                            <h3>User profile</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-4 col-12">
                                        <div className="row justify-content-center">
                                            <div className="img-custom">
                                                <img ref={this.avatar} id="avatar" alt="User Pic" src={`https://caro-backend.herokuapp.com/${avatar}`} className="rounded-circle" />
                                            </div>
                                            
                                            <div className="img-thumbnail" id="loading" hidden>
                                                <div className="spinner-border" role="status"/>
                                            </div>
                                            <input ref={this.file} type="file" id="file" onChange={this.handleChangeFile} hidden />
                                        </div> 
                                        <div className="row justify-content-center">
                                            <button type="button" className="btn btn-sm btn-outline-warning fas fa-image m-1" onClick={() => { this.file.current.click() }}/>
                                            <button ref={this.btnSaveAvatar} id="save-avatar-btn" type="button" className="btn btn-sm btn-outline-success far fa-save m-1" onClick={this.handleSaveAvatar} hidden/>
                                            <button ref={this.btnCancelAvatar} id="cancel-avatar-btn" type="button" className="btn btn-sm btn-outline-danger fas fa-window-close m-1" onClick={this.handleCancelChangeAvatar} hidden/>
                                        </div>
                                    </div>
                                    <div className="col-md-8 mt-5">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-file-signature"/></span>
                                            </div>
                                            <input ref={this.username} type="text" name="userName" id="name" defaultValue={username} className="form-control" placeholder="Username" required readOnly/>
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-envelope"/></span>
                                            </div>
                                            <input ref={this.email} type="email" defaultValue={email} className="form-control" placeholder="Email" required readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <button ref={this.btnUpdateInfo} type="button" id="update" className="btn float-right m-2 btn-yellow" onClick={this.handleUpdateInfo}>Edit</button>
                                <button ref={this.btnSaveInfo} type="submit" id="save" className="btn btn-success float-right m-2" hidden>Save</button>
                                <button ref={this.btnCancelUpdateInfo} type="button" id="cancel" className="btn btn-danger float-right m-2" onClick={this.handleCancelUpateInfo} hidden>Cancel</button>
                                <button type="button" className="btn float-left m-2 btn-yellow" onClick={invertShouldShowChangePassword}>Change password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        const { isAuthenticated  } = this.props;

        if (isAuthenticated){
            return <Redirect to='/'/>
        }

        return (
            <>
                { this.renderElement() }
            </>
        );
    }
}

export default Profile;