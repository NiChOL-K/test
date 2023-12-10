import { Component } from "react";
import '../css/Search.css';

class SearchComponent extends Component {
    constructor() {
        super();
        this.state = {
            song: [],
            category: [],
            login: {},
            cate: '',
            searchuser: ''
        };
        this.search = this.search.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let login = JSON.parse(localStorage.getItem('login'));
        this.setState({ "login": login }, () => {
            console.log(this.state)
        });

        fetch('http://localhost:3001/search')
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "song": song.dataResult }, () => {
                    console.log(this.state)
                });
                this.setState({ "category": song.category }, () => {
                    console.log(this.state)
                });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    search(c) {
        this.setState({ "cate": c.target.value }, () => {
            console.log(this.state)
        });
        let param = '?';
        if (this.state.searchuser !== null && this.state.searchuser != '') {
            param += 'searchuser=' + this.state.searchuser + '&';
        }
        if (c.target.value !== 'ALL')
            param += 'category=' + c.target.value;
        fetch('http://localhost:3001/search' + param)
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "song": song.dataResult }, () => {
                    console.log(this.state)
                });
            })
    }

    searchUser(e) {
        e.preventDefault();
        let param = '?';
        if (this.state.searchuser !== null && this.state.searchuser != '') {
            param += 'searchuser=' + this.state.searchuser + '&';
        }
        if (this.state.cate !== null && this.state.cate !== '' && this.state.cate !== 'ALL')
            param += 'category=' + this.state.cate;
        fetch('http://localhost:3001/search' + param)
            .then((response) => response.json())
            .then((song) => {
                this.setState({ "song": song.dataResult }, () => {
                    console.log(this.state)
                });
            })
    }

    render() {
        return (
            <div id="search-page">
                <div className="wrapper">
                    <div id="search-container">
                        <form onSubmit={this.searchUser} style={{ 'display': 'contents' }}>
                            <input type="text" id="searchuser" name="searchuser" value={this.state.searchuser} onChange={this.handleChange}
                                placeholder="Search music here.." />
                            <input type="submit" id="search" value="Search" />
                        </form>
                    </div>
                    <div id="buttons">
                        <button className={"button-value " + (this.state.cate === '' || this.state.cate === 'ALL' ? 'active' : '')} value={"ALL"} onClick={e => this.search(e, "value")}>ALL</button>

                        {this.state.category.map((category, index) => (
                            <button key={index} className={"button-value " + (this.state.cate === category.category ? 'active' : '')} value={category.category} onClick={e => this.search(e, "value")}>{category.category}</button>
                        ))}
                    </div>
                    <div id="music_gen">
                        {this.state.song.map((song, index) => (
                            <div key={index}>
                                {(this.state.login !== null && (this.state.login.role === 'ADMIN' || this.state.login.plan != 'Free')) ?
                                    <a href={"/result/play?id=" + song.song_id} className="a-card">
                                        <div className="card">
                                            <div className="image-container">
                                                <img src={song.image} className="img-search" alt="searchImg1" /></div>
                                            <div className="container">
                                                <h5 className="music-name">
                                                    {song.song_name}
                                                </h5>
                                                <h6>
                                                    {song.artist}
                                                </h6>
                                            </div>
                                        </div>
                                    </a> :
                                    <div className="card">
                                        <div className="image-container">
                                            <img src={song.image} className="img-search" alt="searchImg2"/></div>
                                        <div className="container">
                                            <h5 className="music-name">
                                                {song.song_name}
                                            </h5>
                                            <h6>
                                                {song.artist}
                                            </h6>
                                        </div>
                                    </div>}
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SearchComponent
