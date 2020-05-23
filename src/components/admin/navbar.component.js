import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import '../navbar.scss';

export default class Navbar extends Component{
    constructor(props){
        super(props);
        this.onSignOut = this.onSignOut.bind(this);
    }
    onSignOut(e){
        console.log("Signed out");
        history.push('/');
    }
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExerciseTracker Admin</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/exercise" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create_exer" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create_user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                    <button className="signout" onClick={this.onSignOut}>Sign out</button>
                </div>
            </nav>
        );
    }
}