import React from 'react';
import "./App.css";
import Service from './Service';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        if (window.location.search && window.location.search.length > 0) {
        }
        //this.redirectUrl = decodeURIComponent(common.ccOauth.REDIRECT_URL);
        this.state = {
            email: "",
            password: "",
            name: "",
            mobile: "",
            showSuccess: false,
            showFailure: false
        };
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.name = this.name.bind(this);
        this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
    }


    email(e) {
        this.setState({ email: e.target.value, showFailure: false })
    }
    password(e) {
        this.setState({ password: e.target.value, showFailure: false })
    }
    name(e) {
        this.setState({ name: e.target.value, showFailure: false })
    }
    mobileChange=(e)=>{
       this.setState({
        mobile: e.target.value, showFailure: false
       })
    }
    async handleSubmitSignup() {
        try {
            let body = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                mobile: this.state.mobile
            }
            let service = new Service();
            await service.signUp(body);
            alert('Account Created');
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div>
                <h1 align="center">Create an Account</h1>
                <form>
                    <label>Email Address</label><br />
                    <input value={this.state.email} type="text" placeholder="email" onChange={this.email} /><br />
                    <label>Passowrd</label><br />
                    <input value={this.state.password} type="password" placeholder="password" onChange={this.password} /><br />
                    <label>Name</label><br />
                    <input value={this.state.name} type="text" placeholder="name" onChange={this.name} /><br />
                    <label>Mobile Number</label><br/>
                    <input value={this.state.mobile} type="text" placeholder="Mobile No." onChange={this.mobileChange}></input>
                </form>
                <button type='submit' onClick={this.handleSubmitSignup} style={{ marginLeft: '560px', width: '250px' }} disabled={!this.state.email || !this.state.password || !this.state.name} type="submit">Submit</button>
            </div>
        );
    }
}


export default SignUp;
