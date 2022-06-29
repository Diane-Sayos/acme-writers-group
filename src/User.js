import React, { Component } from 'react';
import axios from 'axios';
import StoriesList from './Stories';
import StoryForm from './Story-Form';

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [] 
    };
    this.storyDeleted = this.storyDeleted.bind(this);
    this.storyCreated = this.storyCreated.bind(this);
    this.updateFavorite = this.updateFavorite.bind(this);
  }
  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });

  }
  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
      
    }
  }
  async storyCreated(inputs){
    console.log(inputs)
    const response = await axios.post(`/api/users/${this.props.userId}/stories`, inputs);
    const createdStory = response.data;
    const updatedStories = [...this.state.stories, createdStory];
    this.setState({stories: updatedStories});
    console.log(this.state.stories)
  }
  async storyDeleted(story){
    await axios.delete(`/api/stories/${story.id}`);
    const updatedStories = this.state.stories.filter(el => el.id !== story.id);
    this.setState({stories: updatedStories})
  }
  async updateFavorite(story){
    if(story.favorite === true){
      story.favorite = false
    } else {
      story.favorite = true
    }
    await axios.put(`/api/stories/${story.id}`, {
      favorite: story.favorite
    });
    // const updatedStory = await axios.get(`/api/stories/${story.id}`);
    const updatedStory = this.state.stories.map(_story => {
      if(Object.is(_story.id, story.id)){
        _story = story;
        return _story;
      }
      return _story;
    })
    this.setState({stories: updatedStory});
    console.log(this.state.stories)
  }
  render(){
    const { user, stories } = this.state;
    const { storyDeleted, storyCreated, updateFavorite } = this;
    return (
      <section>
        <div>
          <button><a href='#'>Go Back to Users</a></button>
          <h2>Details for { user.name }</h2>
          <h3>{ user.name }'s Bio:</h3>
          <p>
            { user.bio }
          </p>
          <StoryForm storyCreated={ storyCreated }/>
          <StoriesList Stories={ stories } deleteStory={ storyDeleted } updateFavorite={ updateFavorite } />
        </div>
      </section>
    );
  }
}

export default User;