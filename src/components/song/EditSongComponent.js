import { Component } from "react";

class EditSongComponent extends Component {
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        this.id = queryParams.get("id");
        this.state = {
            songid: this.id,
            name: '',
            imgfile: '',
            artist: '',
            category: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login === null || login.role !== 'ADMIN' || !this.id)
            window.location.href = "/";
            
        fetch('http://localhost:3001/admin/song/data?search=' + this.id)
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "artist" : song.artist });
                this.setState({ "imgfile" : song.image });
                this.setState({ "name" : song.song_name });
                this.setState({ "category" : song.category });
                this.setState({ "description" : song.description });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    edit(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "id": this.id,
            "name": this.state.name,
            "imgfile": this.state.imgfile,
            "artist": this.state.artist,
            "category": this.state.category,
            "description": this.state.description
        });

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/admin/song/edit', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Finished edit song');
                window.location.href = "/admin/song";
            })
            .catch(error => {
                console.log(error)
                alert('Some information might not correct. Please insert the information again');
            });
    }

    render() {
        return (
            <div id="add-song-com">
                <h1 id="h1-header">Edit Song</h1>
                <div id="table-content">
                    <form onSubmit={this.edit}>

                        <div className="txt_field">
                            <input type="text" name="songid" id="songid" value={"Song id : " + this.state.songid} readOnly />
                            <span></span>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required />
                            <span></span>
                            <label>Song name</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="imgfile" id="imgfile" value={this.state.imgfile} onChange={this.handleChange} required />
                            <span></span>
                            <label>Image Url (Ratio 1:1)</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="artist" id="artist" value={this.state.artist} onChange={this.handleChange} required />
                            <span></span>
                            <label>Artist</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="category" id="category" value={this.state.category} onChange={this.handleChange} required />
                            <span></span>
                            <label>Category</label>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="description" id="description" value={this.state.description} onChange={this.handleChange} required />
                            <span></span>
                            <label>Description</label>
                        </div>

                        <br />
                        <input type="submit" id="submit" name="submit" value="Edit" />
                    </form>
                    <div className="tap_down"><a href="/admin/song"> Back </a></div>
                </div>
            </div>
        )
    }
}

export default EditSongComponent
