import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarUser from './navbar-user.component';
import { connect } from 'react-redux';
import { stateToProps, DispatchToProps } from '../../reducerfunctions';

const Plan = props => (
    <tr>
        <td>{props.plan.description}</td>
        <td>{props.plan.duration}</td>
        <td>{props.plan.date.substring(0,10)}</td>
        <td>{props.plan.note}</td>
        <td><Link to={"/edit_user/"+props.plan._id}>Edit</Link> | <button style={{backgroundColor: "red"}} onClick={() => {props.deletePlan(props.key)}}>Delete</button></td>
    </tr>
)

class ViewPlansUser extends Component{
    constructor(props){
        super(props);

        this.deletePlan = this.deletePlan.bind(this);

        this.state = {
            plan: [],
            user: this.props.userId
        }
    }
    componentDidMount(){
        axios.get("http://localhost:5000/plan/"+this.state.user)
            .then(response => {
                this.setState({
                    plan: response.data
                });
                // console.log(this.state.exercise);
            })
            .catch(err => console.log("Error: " + err));
        
    }
    deletePlan(id){
        axios.delete("http://localhost:5000/plan/"+id)
            .then(res => alert(res.data))
            .catch(err => console.log("Error: " + err));
        this.setState({
            plan: this.state.plan.filter(el => el._id!==id)
        })
    }
    planlist(){
        return this.state.plan.map(currentPlan => {
            return <Plan plan={currentPlan} deletePlan={this.deletePlan} key={currentPlan._id}/>
        })
    }

    render(){
        return(
            <div>
                <NavbarUser />
                <br/>
                <h1>Logged Plans</h1>
                <table className="table">
                    <thead className="thread-light">
                        <tr>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.planlist()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(stateToProps, DispatchToProps)(ViewPlansUser);