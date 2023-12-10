import { Component } from "react";

class DeleteUserComponent extends Component {
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        this.id = queryParams.get("id");
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            username: '',
            bd_d: '',
            plan: '',
            role: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login === null ||login.role !== 'ADMIN' || !this.id)
            window.location.href = "/";
        fetch('http://localhost:3001/admin/user/data?search=' + this.id)
            .then((response) => response.json())
            .then((user) => {
                this.setState({ "email": user.email });
                this.setState({ "firstname": user.firstname });
                this.setState({ "lastname": user.lastname });
                this.setState({ "username": user.username });
                this.setState({ "bd_d": user.dob });
                this.setState({ "plan": user.plan });
                this.setState({ "role": user.role });
            })
    }

    edit(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "username": this.state.username
        });

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/admin/user/delete', requestOptions)
            .then(response => response)
            .then(data => {
                if(data.status === 200) {
                    alert('Finish delete the information');
                    let login = JSON.parse(localStorage.getItem('login'));
                    if(login.uid === this.id) {
                        localStorage.clear();
                    }
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
                    Delete User
                </h1>
                <div id="body-data">
                    <form onSubmit={this.edit}>

                        <div className="txt_field">
                            <input type="email" name="email" id="email" value={this.state.email} readOnly />
                            <span></span>
                            <label className="disable">Email (Cannot Edit)</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="firstname" id="firstname" value={this.state.firstname} readOnly />
                            <span></span>
                            <label className="disable">Firstname</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="lastname" id="lastname" value={this.state.lastname} readOnly />
                            <span></span>
                            <label className="disable">Lastname</label>
                        </div>


                        <div className="txt_field">
                            <input type="text" name="username" id="username" value={this.state.username} readOnly />
                            <span></span>
                            <label className="disable">Username (Cannot Edit)</label>
                        </div>

                        <div className="txt_field">
                            <input type="date" name="bd_d" id="bd_d" value={this.state.bd_d} readOnly /><br />
                            <span></span>
                            <label className="disable">Date of Birth</label>
                        </div>


                        Plan : 
                        <input type="radio" name="plan" value="Free" checked={this.state.plan === 'Free'} readOnly /> Free &nbsp;
                        <input type="radio" name="plan" value="Montly" checked={this.state.plan === 'Montly'} readOnly /> Montly Plan &nbsp;
                        <input type="radio" name="plan" value="Year" checked={this.state.plan === 'Year'} readOnly /> Year Plan &nbsp;
                        <br />
                        <br />
                        Role : 
                        <input type="radio" name="role" value="ADMIN" checked={this.state.role === 'ADMIN'} readOnly  /> ADMIN &nbsp;
                        <input type="radio" name="role" value="USER" checked={this.state.role === 'USER'} readOnly /> USER &nbsp;

                        <br /><br />
                        <input type="submit" id="submit" name="submit" value="Delete" />
                    </form>
                    <div className="tap_down"><a href="/admin/user"> Back </a></div>
                </div>
            </div>
        )
    }
}

export default DeleteUserComponent
