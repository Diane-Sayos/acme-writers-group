import React from 'react';
import UserForm from './User-Form';

const Users = ({ users, userId, userCreated, userDeleted })=> {
  return (
    <section>
      <div>
        <h2 className={ !userId ? 'selected': ''}><a href='#'>Users</a></h2>
        <UserForm userCreated={ userCreated } />
        <ul>
          {
            users.map( user => {
              return (
                <li className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
                  <a href={`#${user.id}`}>
                  { user.name }<br/>
                  <button onClick={()=> userDeleted(user)}>x</button>
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
}

export default Users;


