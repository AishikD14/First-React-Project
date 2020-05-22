import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar.component';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td><Link to={"/edit/"+props.exercise._id}>edit</Link> | <button onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</button></td>
    </tr>
)

export default class ExercisesList extends Component{
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercise: []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:5000/exercises/")
            .then(response => {
                this.setState({
                    exercise: response.data
                });
                // console.log(this.state.exercise);
            })
            .catch(err => console.log("Error: " + err));
    }
    deleteExercise(id){
        axios.delete("http://localhost:5000/exercises/"+id)
            .then(res => alert(res.data))
            .catch(err => console.log("Error: " + err));
        this.setState({
            exercise: this.state.exercise.filter(el => el._id!==id)
        })
    }
    exerciselist(){
        return this.state.exercise.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
        })
    }
    render(){
        return(
            <div>
                <Navbar />
                <br/>
                <h1>Logged Exercises</h1>
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <th>UserName</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciselist()}
                    </tbody>
                </table>
            </div>
        );
    }
}