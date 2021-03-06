import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import NavbarUser from './navbar-user.component';
import history from '../../history';

export default class EditExerciseUser extends Component{
    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date : new Date()
        }
    }
    componentDidMount(){
        axios.get("http://localhost:5000/exercises/edit/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
                
            })
            .catch(function(error){
                console.log(error);
            });
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
    onSubmit(e){
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        // console.log(exercise);
        axios.post("http://localhost:5000/exercises/update/"+this.props.match.params.id,exercise)
            .then(res => {
                // console.log(res.data);
                history.push('/exer_list_user');
            })
            .catch(function(error){
                alert(error);
            });
    }

    render(){
        return(
            <div>
                <NavbarUser />
                <br/>
                <h2>Edit Exercise Page</h2>
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
                        <input type="submit" value="Edit Exercise" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}