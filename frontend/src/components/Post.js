import React, {Component} from 'react'
import { fetchPost } from '../actions/post'
import { fetchComments } from '../actions/comments'
import { connect } from 'react-redux'
import Loading from 'react-loading'

class Post extends Component {
  state = {
    loadingPost: true
  }
  componentDidMount() {
    this.setState(() => ({ loadingPost: true }))
    this.props.getPost(this.props.match.params.postId).then(() => {
      this.props.getPostComments(this.props.match.params.postId).then(() => {
        console.log(this.props.comments)
        this.setState(() => ({ loadingPost: false }))
      })
    })
  }

  render() {
    const post = this.props.post
    const comments = this.props.comments
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
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    {comment.body}
                  </li>
                ))}
              </ul>
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

function mapStateToProps ({post, comments}) {
  return {
    post, comments

  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPost: (postId) => dispatch(fetchPost(postId)),
    getPostComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)