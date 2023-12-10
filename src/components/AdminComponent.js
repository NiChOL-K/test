import { Component } from "react";
import '../css/Admin.css';

class AdminComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login.role !== 'ADMIN')
            window.location.href = "/";
    }

    render() {
        return (
            <div className="center-admin">
                <h1>Welcome Admin</h1>
                <div id="body-admin">
                    <a href="/admin/user"><button>User</button></a>
                    <a href="/admin/song"><button>Song</button></a>
                </div>
            </div>
        )
    }
}

export default AdminComponent
