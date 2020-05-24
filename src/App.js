import React from 'react';
import { Router, Route } from "react-router-dom";
import history from './history';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './components/login.component';
import Register from './components/register.component';
import ExercisesList from './components/admin/exercises-list.component';
import EditExercise from './components/admin/edit-exercise.component';
import CreateExercise from './components/admin/create-exercise.component';
import CreateUser from './components/admin/create-user.component';
import ExercisesListUser from './components/user/exercises-list-user.component';
import CreateExerciseUser from './components/user/create-exercise-user.component';
import CreatePlansUser from './components/user/create-plans-user.component';
import EditExerciseUser from './components/user/edit-exercise-user.component';
import ViewPlansUser from './components/user/view-plan-user.component';
import { loginReducer } from './reducer/login-reducer';
import { Provider } from 'react-redux'; 
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
  login: loginReducer
});

const store = createStore(reducers);

function App() {
  return (
    <Provider store = {store}>
      <Router history={history}>
        <div className="container">
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <Route path="/exercise" component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create_exer" component={CreateExercise} />
          <Route path="/create_user" component={CreateUser} />

          <Route path="/exer_list_user" component={ExercisesListUser} />
          <Route path="/create_exer_user" component={CreateExerciseUser} />
          <Route path="/create_plans_user" component={CreatePlansUser} />
          <Route path="/edit_user/:id" component={EditExerciseUser} />
          <Route path="/view_plans_users" component={ViewPlansUser} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
