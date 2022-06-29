import React, {useState} from 'react';

const StoryForm = ({ storyCreated }) => {
    const [inputs, setInputs] = useState({});
    const set = (name) => {
        return({target: {value}}) => {
            setInputs((oldValues) => ({...oldValues, [name]: value}));
        }
    };
    const handleSubmitted = (e) => {
        e.preventDefault();
        storyCreated(inputs);
        inputs.title = '';
        inputs.body = '';
        inputs.favorite = false;
    }
    return(
        <form onSubmit={handleSubmitted}>
            <label>Enter Title:
                <input
                    type="text"
                    name="title"
                    value={inputs.title || ""}
                    onChange={set('title')}
                    required
                />
            </label>
            <label>Enter Body:
                <textarea
                    name="body"
                    cols={150}
                    rows={35}
                    value={inputs.body || ""}
                    onChange={set('body')}
                    required
                />
            </label>
            <label>Enter favorite:
                <input 
                    type="checkbox"
                    name="favorite"
                    value={inputs.favorite === false ? false : true}
                    onChange={set('favorite')}
                />
            </label>
            <button type="submit">Generate New Story</button>
        </form>
    )
};

export default StoryForm;