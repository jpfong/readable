import React, {Component} from 'react'
// import { fetchCategoryPosts } from '../actions/posts'
// import { connect } from 'react-redux'

class Post extends Component {
  componentDidMount() {
    console.log('post', this.props.match.params.postId)
  }

  render() {
    const postId = this.props.match.params.postId
    return (
      <div>
        { postId }
      </div>
    )
  }
}

export default Post