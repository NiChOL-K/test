import { Component } from "react";
import '../css/Result.css';
import play from '../assets/image/play.png';
import rewind from '../assets/image/rewind.png';
import fastforword from '../assets/image/fast-forward.png';

class PlayComponent extends Component {
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        this.id = queryParams.get("id");
        this.state = {
            song: {}
        }
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        if (login == null || (login.role == 'USER' && login.plan == 'Free'))
            window.location.href = "/";

        fetch('http://localhost:3001/play?search=' + this.id)
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "song": song }, () => {
                    console.log(this.state)
                });
            })
    }

    render() {
        return (
            <div>
                <div className="back-btn">
                    <a href="/search"><button id="btn-back">Back</button></a>
                </div>
                <div className="container-r">
                    <div className="wrapper-r">
                        <h1>
                            {this.state.song.song_name}
                        </h1>
                        <img src={this.state.song.image} />
                        <p>
                            {this.state.song.description}
                        </p>
                        <input id="range" className="level" type="range" value="0" min="0" />
                        <div className="buttons">
                            <button id="pre"><img src={rewind} /></button>
                            <button id="play"><img id="play_img" src={play} /></button>
                            <button id="next"><img src={fastforword} /></button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default PlayComponent