import { Component } from "react";
import moment from 'moment';
import '../../css/Song.css';

class SongComponent extends Component {
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const search = queryParams.get("search") != null ? queryParams.get("search") : '';
        this.state = {
            song: [],
            search: search
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchSong = this.searchSong.bind(this);
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login == null || login.role != 'ADMIN')
            window.location.href = "/";

        fetch('http://localhost:3001/admin/song')
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "song": song });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    searchSong(e) {
        e.preventDefault();
        fetch('http://localhost:3001/admin/song?search=' + this.state.search)
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "song": song });
            })
    }

    render() {
        return (
            <div id="song-add-body">
                <h1 id="h1-header">Song Management</h1>
                <div id="search-content">
                    <form onSubmit={this.searchSong} style={{ 'display': 'contents' }}>
                        <input type="text" id="searchuser" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search song here.." />
                        <input type="submit" id="search" value="Search" />
                    </form>
                    <a href="/admin/song/add"><button id="add">Add Song</button></a>
                </div>
                <div id="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Song name</th>
                                <th>Artist</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Create Date</th>
                                <th>Update Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.song.map((song, index) => (
                                <tr key={index}>
                                    <td>
                                        {song.song_id}
                                    </td>
                                    <td>
                                        {song.song_name}
                                    </td>
                                    <td>
                                        {song.artist}
                                    </td>
                                    <td>
                                        <img className="img-size" src={song.image} />
                                    </td>
                                    <td>
                                        {song.category}
                                    </td>
                                    <td>
                                        {song.description}
                                    </td>
                                    <td>
                                        {moment(song.create_date).format('DD-MM-YYYY HH:mm')}
                                    </td>
                                    <td>
                                        {moment(song.update_date).format('DD-MM-YYYY HH:mm')}
                                    </td>
                                    <td style={{ 'textAlign': 'center' }}>
                                        <a href={"/admin/song/edit?id=" + song.song_id}><button id="edit">Edit</button></a>
                                    </td>
                                    <td style={{ 'textAlign': 'center' }}>
                                        <a href={"/admin/song/delete?id=" + song.song_id}><button id="delete">Delete</button></a>
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

export default SongComponent