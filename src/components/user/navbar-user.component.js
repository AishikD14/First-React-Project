import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import '../navbar.scss';

export default class NavbarUser extends Component{
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
                <Link to="/" className="navbar-brand">ExerciseTracker</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/exer_list_user" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create_exer_user" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create_plans_user" className="nav-link">Create a Plan</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/view_plans_users" className="nav-link">Views Plans</Link>
                        </li>
                    </ul>
                    <button className="signout" onClick={this.onSignOut}>Sign out</button>
                </div>
            </nav>
        );
    }
}