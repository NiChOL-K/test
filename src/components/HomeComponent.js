
import { Component } from "react";
import '../css/Home.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import IMG_5754 from '../assets/image/IMG_5754.JPG';
import IMG_5755 from '../assets/image/IMG_5755.JPG';
import IMG_5756 from '../assets/image/IMG_5756.JPG';

const slideImages = [
    {
        url: IMG_5754
    },
    {
        url: IMG_5755
    },
    {
        url: IMG_5756
    },
];

class HomeComponent extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            trend: [],
            song: []
        }
    }

    componentDidMount() {
        // on trend
        fetch('./json/TopTrend.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.state.trend = data;
                this.setState({ trend: data });
            });

        // recommend
        fetch('./json/Recommend.json', {
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
            <div id="main-div">
                <article className="allpage">
                    <div className="bg_whatnew">
                        <div><h1 id="whatnew-h1">What's New</h1></div>
                        <article className="whatnew">
                            <section className="ADSbox">
                                <div className="slide-container">
                                    <Slide>
                                        {slideImages.map((slideImage, index) => (
                                            <div className="each-slide" key={index}>
                                                <div style={{ 'backgroundImage': `url(${slideImage.url})`, 'height': '435px', 'backgroundSize': 'cover' }}>
                                                </div>
                                            </div>
                                        ))}
                                    </Slide>
                                </div>
                                <br />
                            </section>
                        </article>
                    </div>

                    <hr className="dashed" />

                    <br />
                    <article className="trend">
                        <section>
                            <h3><b>Top 10 on trend</b></h3>
                            <div className="onTrend-container">
                                <div id="music">
                                    {this.state.trend.map((music, index) => (
                                        <div className="trend-box" key={index}>
                                            <img src={music.image alt="ads" />
                                            <div className="text">
                                                <b>{music.song}</b>
                                                <p>{music.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </article>
                    <br />

                    <br />

                    <article className="recommend">
                        <h3><b>Recommend</b></h3>
                        <section>
                            <div className="recomm-container">
                                <div id="song">
                                    {this.state.song.map((song, index) => (
                                        <div className="recommColumn" key={index}>
                                            <div className="recomm_box">
                                                <img src={song.image} />
                                                <b>{song.song}</b>
                                                <p>{song.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </article>
                    <br />
                </article>

                <footer>
                    <a href="/"><h1>LOOP</h1> </a>
                    <nav className="navbott" style={{ 'width': '1000px', 'position': 'fix', 'top': '0px' }}>
                        <a href="/">Home</a>
                        <a href="/album">Album</a>
                        <a href="/aboutus">About us</a>
                        <a href="#top" className="top">TOP</a>
                    </nav>
                </footer>
            </div>
        )
    }
}

export default HomeComponent
