import React, { Component } from 'react';
import axios from 'axios';

class Story extends Component{
    constructor(){
        super();
        this.state = {
            story: {}
        };
    }
    async componentDidMount(){
        let response = await axios.get(`/api/stories/${this.props.storyId}`);
        this.setState({ user: response.data });
    }
}