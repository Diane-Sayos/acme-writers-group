import React from 'react';
import {useState} from 'react';

const UserForm = ({ userCreated }) => {
    const [inputs, setInputs] = useState({});
    const set = (name) => {
        return({target: {value}}) => {
            setInputs((oldValues) => ({...oldValues, [name]: value}));
        }
    };
    const handleSubmitted = (e) => {
        e.preventDefault();
        userCreated(inputs);
    }
    return (
        <form onSubmit={handleSubmitted}>
            <label>Enter your name:
                <input 
                    type="text" 
                    name="name" 
                    value={inputs.name || ''} 
                    onChange={set('name')}
                    required
                />
            </label>
            <label>Enter your bio:
                <input 
                    type="text" 
                    name="bio" 
                    value={inputs.bio || ''}
                    onChange={set('bio')}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
};
export default UserForm;