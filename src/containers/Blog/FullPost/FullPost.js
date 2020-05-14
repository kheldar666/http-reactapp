import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
        loading:true
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if(!this.state.loadedPost || this.state.loadedPost.id !== parseInt(this.props.match.params.id,10)) {
            axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                        this.setState({loadedPost:response.data,loading:false})
                    }
                )
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
               console.log("Post Deleted Successfully");
               this.setState({loadedPost: null})
            });
    }

    render () {
        let post = <p style={{textAlign:'center'}}>Something went wrong!</p>;

        if(this.props.match.params.id && this.state.loading) {
            post = <p style={{textAlign: 'center'}}>Loading.... !</p>;
        }

        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;