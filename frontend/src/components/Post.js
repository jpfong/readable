import React, {Component} from 'react'
import { fetchPost } from '../actions/post'
import { connect } from 'react-redux'
import Loading from 'react-loading'

class Post extends Component {
  state = {
    loadingPost: true
  }
  componentDidMount() {
    this.setState(() => ({ loadingPost: true }))
    this.props.getPost(this.props.match.params.postId).then(() => {
      this.setState(() => ({ loadingPost: false }))
    })
  }

  render() {
    const post = this.props.post
    const { loadingPost } = this.state
    return (
      <div>
        { loadingPost ? <Loading delay={200} type='spin' color='#222' className='loading' /> :
          <ul>
            <li>
              Title: { post.title }
            </li>
            <li>
              Author: { post.author }
            </li>
            <li>
              Body: { post.body }
            </li>
            <li>
              Number of comments: 0
            </li>
            <li>
              Current score: {post.voteScore}
            </li>
        </ul> }
      </div>
    )
  }
}

function mapStateToProps ({post}) {
  return {
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPost: (postId) => dispatch(fetchPost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)