import { Component } from "react";
import moment from 'moment';
import '../../css/User.css';

class UserComponent extends Component {
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const search = queryParams.get("search") != null ? queryParams.get("search") : '';
        this.state = {
            user: [],
            search: search
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login === null || login.role !== 'ADMIN')
            window.location.href = "/";

        fetch('http://localhost:3001/admin/user')
            .then((response) => response.json())
            .then((user) => {
                this.setState({ "user": user });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    searchUser(e) {
        e.preventDefault();
        fetch('http://localhost:3001/admin/user?search=' + this.state.search)
            .then((response) => response.json())
            .then((user) => {
                this.setState({ "user": user });
            })
    }

    render() {
        return (
            <div id="user-add-info">
                <h1 id="h1-header">User Management</h1>
                <div id="search-content">
                    <form onSubmit={this.searchUser} style={{ 'display': 'contents' }}>
                        <input type="text" id="searchuser" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search username here.." />
                        <input type="submit" id="search" value="Search" />
                    </form>
                    <a href="/admin/user/add"><button id="add">Add User</button></a>
                </div>
                <div id="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Plan</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        {user.UID}
                                    </td>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.firstname}
                                    </td>
                                    <td>
                                        {user.lastname}
                                    </td>
                                    <td>
                                        {moment(user.dob).format('DD-MM-YYYY')}
                                    </td>
                                    <td>
                                        {user.role}
                                    </td>
                                    <td>
                                        {user.plan}
                                    </td>
                                    <td style={{ 'textAlign': 'center' }}>
                                        <a href={"/admin/user/edit?id=" + user.UID}><button id="edit">Edit</button></a>
                                    </td>
                                    <td style={{ 'textAlign': 'center' }}>
                                        <a href={"/admin/user/delete?id=" + user.UID}><button id="delete">Delete</button></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default UserComponent
