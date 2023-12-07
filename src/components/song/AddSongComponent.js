import { Component } from "react";

class AddSongComponent extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            imgfile: '',
            artist: '',
            category: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login == null || login.role != 'ADMIN')
            window.location.href = "/";
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    add(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "name": this.state.name,
            "imgfile": this.state.imgfile,
            "artist": this.state.artist,
            "category": this.state.category,
            "description": this.state.description
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/admin/song/add', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Finished add a new song');
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
                <h1 id="h1-header">Add Song</h1>
                <div id="table-content">
                    <form method="post" onSubmit={this.add}>
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
                        <input type="submit" id="submit" name="submit" value="Add" />
                    </form>
                    <div className="tap_down"><a href="/admin/song"> Back </a></div>
                </div>
            </div>
        )
    }
}

export default AddSongComponent