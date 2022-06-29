import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';

class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
    this.userDeleted = this.userDeleted.bind(this);
    this.userCreated = this.userCreated.bind(this);
  }
  async componentDidMount(){
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
      window.addEventListener('hashchange', ()=> {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      });
    }
    catch(ex){
      console.log(ex);
    }
  }
  async userCreated(users){
    const response = await axios.post('/api/users', users);
    const user = response.data;
    const updatedUsers = [...this.state.users, user];
    this.setState({ users: updatedUsers });
    const updateHash = user.id;
    this.setState({userId: updateHash});
  };
  async userDeleted(user){
   try{
    await axios.delete(`/api/users/${user.id}`);
    const updateDeleted = this.state.users.filter(el => el.id !== user.id);
    this.setState({users: updateDeleted});
   }
   catch(ex){
    console.log(ex)
   }
  }
  render(){
    const { users, userId } = this.state;
    const {userDeleted, userCreated} = this;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } userId={ userId } userCreated={ userCreated } userDeleted={ userDeleted }/>
          {
            userId ? <User userId={ userId } /> : null
          }
        </main>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App />, root);


