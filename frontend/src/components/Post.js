import React, {Component} from 'react'
import { fetchPost } from '../actions/post'
import { deletePost } from '../actions/posts'
import { fetchComments, updateComments, doDeleteComment } from '../actions/comments'
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
        this.setState(() => ({ loadingPost: false }))
      })
    })
  }

  upvoteComment(comment) {
    this.props.updateComment(comment, 'upVote')
  }

  deleteComment(comment) {
    this.props.deleteComment(comment)
  }

  deletePost(postId) {
    this.props.deletePost(postId).then(() => {
      const {history} = this.props
      history.push('/')
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
                    {comment.body}, author: {comment.author}, current score: {comment.voteScore}
                      &nbsp;<button onClick={() => this.upvoteComment(comment)}>Upvote</button>
                      &nbsp;<button onClick={() => this.deleteComment(comment)}>Delete</button>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              Number of comments: {comments.length}
            </li>
            <li>
              Current score: {post.voteScore}
            </li>
        </ul> }
        <button onClick={() => this.deletePost(post.id)}>Delete</button>
      </div>
    )
  }
}

function mapStateToProps ({post, comments}) {
  return {
    post,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPost: (postId) => dispatch(fetchPost(postId)),
    getPostComments: (postId) => dispatch(fetchComments(postId)),
    updateComment: (comment, options) => dispatch(updateComments(comment, options)),
    deleteComment: (comment) => dispatch(doDeleteComment(comment)),
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)