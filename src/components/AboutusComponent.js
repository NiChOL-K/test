import { Component } from "react";
import '../css/About.css';
import Gengar from '../assets/image/Gengar.png';
import teng from '../assets/image/Teng.png';
import Sin_kid from '../assets/image/Sin_kid.png';
import Metawarden from '../assets/image/Metawarden.png';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
  };

const center = {
    lat: 13.794460205024784,
    lng: 100.32470327191547
  };

class AboutusComponent extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
    }
    render() {
        return (
            <div id="about-us-div">
                <article className="allpage">
                    <article className="about_us">
                        <br />
                        <br />
                        <div><h2>About Us</h2></div>
                        <br />
                        <br />
                        <div className="images">
                            <figure>
                                <a href="https://www.facebook.com/Nink.CholK/"><img className="img-us" src={Sin_kid} /></a>
                                <figcaption><h4>
                                    <a href="https://www.facebook.com/Nink.CholK/" style={{ 'textDecoration': 'none' }}>
                                        Cholravee Kittimethee</a></h4></figcaption>
                            </figure>
                            <figure>
                                <a href="https://www.facebook.com/Teng.assawakarn"><img className="img-us" src={teng} /></a>
                                <figcaption><h4>
                                    <a href="https://www.facebook.com/Teng.assawakarn" style={{ 'textDecoration': 'none' }}>
                                        Thachaphon Assawakan</a></h4></figcaption>
                            </figure>
                        </div>
                    </article>
                    <article className="about_us">
                        <div className="images">
                            <figure>
                                <a href="https://www.facebook.com/Thank.Pantakorn/"><img className="img-us" src={Metawarden} /></a>
                                <figcaption><h4>
                                    <a href="https://www.facebook.com/Thank.Pantakorn/" style={{ 'textDecoration': 'none' }}>
                                        Pantakorn Sathapanasakul</a></h4></figcaption>
                            </figure>
                            <figure>
                                <a href="https://www.facebook.com/Saran.Jearawattanakul"><img className="img-us" src={Gengar} /></a>
                                <figcaption><h4>
                                    <a href="https://www.facebook.com/Saran.Jearawattanakul" style={{ 'textDecoration': 'none' }}>
                                        Saran Jearawattanakul</a></h4></figcaption>
                            </figure>
                        </div>
                    </article>
                </article>
                <br></br>
                <div className="location"><h2>Our Location</h2></div><br></br><br></br>
                <LoadScript
                    googleMapsApiKey="AIzaSyDs6tJBTgxgzavHr5w2GDHkqT_WAs2Jh2w"
                >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
                </GoogleMap>
                </LoadScript>
                <br /><br /><br />
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

export default AboutusComponent