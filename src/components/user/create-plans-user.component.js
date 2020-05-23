import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import NavbarUser from './navbar-user.component';
import history from '../../history';

export default class CreatePlansUser extends Component{
    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date : new Date(),
            note: "",
            user: "Aishik"
        }
    }
    componentDidMount(){
        this.setState({
            username: this.state.user
        })
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date: date
        })
    }
    onChangeNote(e){
        this.setState({
            note: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            note: this.state.note
        }
        console.log(exercise);
        axios.post("http://localhost:5000/exercises/add",exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error: " + err));

        history.push('/exer_list_user');
    }

    render(){
        return(
            <div>
                <NavbarUser />
                <br/>
                <h2>Create New Plan</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UserName</label>
                        <input type="text" disabled className="form-control" value={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                        <label>A short note for yourself</label>
                        <input type="text" required className="form-control" value={this.state.note} onChange={this.onChangeNote}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Plan" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}