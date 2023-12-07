import { Component } from "react";

class LogoutComponent extends Component {
    constructor() {
        super();
    }
    
    componentDidMount() {
        localStorage.clear();
        window.location.href = "/";
    }

    render() {
        return (
            <span></span>
        )
    }
}

export default LogoutComponent