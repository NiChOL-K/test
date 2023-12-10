import { Component } from "react";
import '../css/Login.css';

class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            "username": "",
            "password": ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    login(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.role);
                localStorage.setItem('login', JSON.stringify(data));
                if (data.role === 'ADMIN')
                    window.location.href = "/admin";
                else
                    window.location.href = "/";
            })
            .catch(error => {
                alert('Not found this user information. Please check on username and password again');
            });
    }

    render() {
        return (
            <div className="center">
                <h1>Login</h1>
                <form onSubmit={this.login}>
                    <div className="txt_field">
                        <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} required />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className="pass">Forgot Password?</div>
                    <input type="submit" value="Login" />
                    <div className="signup_link">
                        Not a member? <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginComponent
