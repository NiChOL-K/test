import { Component } from "react";

class DeleteSongComponent extends Component {
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
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login === null || login.role != 'ADMIN')
            window.location.href = "/";

        fetch('http://localhost:3001/admin/song/data?search=' + this.id)
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "artist": song.artist });
                this.setState({ "imgfile": song.image });
                this.setState({ "name": song.song_name });
                this.setState({ "category": song.category });
                this.setState({ "description": song.description });
            })
    }


    delete(e) {
        e.preventDefault();
        let raw = JSON.stringify({
            "id": this.id
        });

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/admin/song/delete', requestOptions)
            .then(response => response)
            .then(data => {
                alert('Finish delete song song from list');
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
                <h1 id="h1-header">Delete Song</h1>
                <div id="table-content">
                    <form onSubmit={this.delete}>

                        <div className="txt_field">
                            <input type="text" name="songid" id="songid" value={"Song id : " + this.state.songid} readOnly />
                            <span></span>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="name" id="name" value={"Song name : " + this.state.name} readOnly />
                            <span></span>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="imgfile" id="imgfile" value={"Image : " + this.state.imgfile} readOnly />
                            <span></span>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="artist" id="artist" value={"Artist : " + this.state.artist} readOnly />
                            <span></span>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="category" id="category" value={"Category : " + this.state.category} readOnly />
                            <span></span>
                        </div>

                        <div className="txt_field">
                            <input type="text" name="description" id="description" value={"Description : " + this.state.description} readOnly />
                            <span></span>
                        </div>

                        <br />
                        <input type="submit" id="submit" name="submit" value="Delete" />
                    </form>
                    <div className="tap_down"><a href="/admin/song"> Back </a></div>
                </div>
            </div>
        )
    }
}

export default DeleteSongComponent
