import { Component } from "react";
import '../css/Album.css';

class AlbumComponent extends Component {
    constructor() {
        super();

        this.state = {
            song: []
        }

    }

    componentDidMount() {

        // music
        fetch('./json/music.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((id) => {
                this.setState({ song: id });
            })
    }

    render() {
        return (
            <div id="body-album">
                <div className="container-a" id="main">
                    <div className="row">
                        <center><h1>Album | Top Chart Songs</h1>
                        <br />
                        <desc className ="description">
                            <p>Check the 2021 hit song rankings, updated weekly before anyone else.
                            <br />
                            Hit songs hit the charts, guaranteed hit songs from Thai people all over the country...</p>
                        </desc>
                        </center>
                    </div>
                    <br />
                    <hr style={{ 'backgroundColor': 'white' }} />
                    <br />
                </div>

            </div>
        )
    }
}

export default AlbumComponent