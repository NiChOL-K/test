import { Component } from "react";

class AddUserComponent extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            bd_d: '',
            plan: '',
            role: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login == null ||login.role != 'ADMIN')
            window.location.href = "/";
    }

    add(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "username": this.state.username,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "password": this.state.password,
            "email": this.state.email,
            "plan": this.state.plan,
            "role": this.state.role,
            "bd_d": this.state.bd_d
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/admin/user/add', requestOptions)
            .then(response => response)
            .then(data => {
                if (data.status == 200) {
                    alert('Finish add new user');
                    window.location.href = "/admin/user";
                } else {
                    throw 'error';
                }
            })
            .catch(error => {
                console.log(error)
                alert('Some information might not correct. Please insert the information again');
            });
    }

    render() {
        return (
            <div id="user-edit-info">
                <h1 id="h1-header">
                    Add User
                </h1>
                <div id="body-data">
                    <form onSubmit={this.add}>

                        <div className="txt_field">
                            <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} required />
                            <span></span>
                            <label>Email</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleChange} required />
                            <span></span>
                            <label>Firstname</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleChange} required />
                            <span></span>
                            <label>Lastname</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} required />
                            <span></span>
                            <label>Username</label>
                        </div>

                        <div className="txt_field">
                            <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} required/>
                                <span></span>
                                <label>Password</label>
                        </div>

                        <div className="txt_field">
                            <input type="date" name="bd_d" id="bd_d" value={this.state.bd_d} onChange={this.handleChange} required /><br />
                            <span></span>
                            <label>Date of Birth</label>
                        </div>


                        Plan :
                        <input type="radio" name="plan" value="Free" checked={this.state.plan === 'Free' || this.state.plan ==''} onChange={this.handleChange}/> Free &nbsp;
                        <input type="radio" name="plan" value="Montly" checked={this.state.plan === 'Montly'} onChange={this.handleChange} /> Montly Plan &nbsp;
                        <input type="radio" name="plan" value="Year" checked={this.state.plan === 'Year'} onChange={this.handleChange} /> Year Plan &nbsp;
                        <br />
                        <br />
                        Role :
                        <input type="radio" name="role" value="ADMIN" checked={this.state.role === 'ADMIN'} onChange={this.handleChange} /> ADMIN &nbsp;
                        <input type="radio" name="role" value="USER" checked={this.state.role === 'USER' || this.state.role == ''} onChange={this.handleChange}/> USER &nbsp;

                        <br /><br />
                        <input type="submit" id="submit" name="submit" value="Add" />
                    </form>
                    <div className="tap_down"><a href="/admin/user"> Back </a></div>
                </div>
            </div>
        )
    }
}

export default AddUserComponent