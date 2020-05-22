import React, {Component} from 'react';
import axios from 'axios';
import Navbar from './navbar.component';

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: ""
        }
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }   

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);

        axios.post("http://localhost:5000/users/add",user)
            .then(res => console.log(res.data));
        this.setState({
            username: "",
            password: ""
        })
    }
    render(){
        return(
            <div>
                <Navbar />
                <br/>
                <h1>Create New User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" required className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}