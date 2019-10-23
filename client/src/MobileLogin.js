import React from 'react';
import "./App.css";
import Service from './Service';


class Mobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: "",
            otp: "",
            sentOtp: '',
            showFailure: false,
            showOtp: false
        };
        this.mobile = this.mobile.bind(this);
        this.otp = this.otp.bind(this);
    }
    mobile(e) {
        this.setState({ mobile: e.target.value, showFailure: false })
    }
    otp(e) {
        this.setState({ otp: e.target.value, showFailure: false })
    }
    handleSubmit = async () => {
        try {
            let body = {
                mobile: this.state.mobile,
            }
            let service = new Service();
            let response = await service.otp(body);
            this.setState({
                sentOtp: response.otp,
                showOtp: true
            })

        } catch (error) {
            this.setState({
                showFailure: true
            })
        }
    }
    verifyOtp = async () => {
        //   if(this.state.otp==this.state.sentOtp){
        //      alert('Login Successful');
        //   }
        try {
            let body = {
                mobile: this.state.mobile,
                otp: this.state.otp
            }
            let service = new Service();
            await service.verifyOtp(body);
            alert('Login Successfull');
        }
        catch (e) {
            this.setState({
                showFailure: true
            })
        }
    }
    render() {
        if (!this.state.showOtp)
            return (
                <div className="AppKey">
                    <h2 align="center"><strong>Login Using Mobile</strong></h2>
                    <form>
                        <label>Mobile</label><br />
                        <input value={this.state.mobile} type="text" placeholder="Mobile" onChange={this.mobile} /><br />
                    </form>
                    <button style={{ marginLeft: '560px', width: '250px' }} disabled={!this.state.mobile} className="btn" onClick={this.handleSubmit}>Submit</button>
                    <FailureMessage failure={this.state.showFailure}></FailureMessage>
                </div>
            );
        else {
            return (
                <div>
                    <form>
                        <label>Enter the otp</label><br />
                        <input value={this.state.otp} type="text" placeholder="otp" onChange={this.otp} /><br />
                    </form>
                    <button style={{ marginLeft: '560px', width: '250px' }} disabled={!this.state.otp} className="btn" onClick={this.verifyOtp}>Submit</button>
                    <FailureMessage failure={this.state.showFailure}></FailureMessage>
                </div>
            );
        }
    }
}

function FailureMessage(props) {
    if (props.failure)
        return <p style={{ color: 'red', fontSize: '18px', marginLeft: '590px' }}>Authentication Failed</p>
    else
        return <p></p>
}

export default Mobile