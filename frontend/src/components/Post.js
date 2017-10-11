import React, {Component} from 'react'
import { fetchPost, upvotePost, downVotePost } from '../actions/post'
import { deletePost } from '../actions/posts'
import { fetchComments, updateComments, doDeleteComment } from '../actions/comments'
import { connect } from 'react-redux'
import Loading from 'react-loading'
import CommentForm from './CommentForm'

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
    this.props.updateComment(comment, { option: 'upVote'})
  }

  downVoteComment(comment) {
    this.props.updateComment(comment, { option: 'downVote'})
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

  votePost(postId) {
    this.props.votePost(postId)
  }

  downVotePost(postId) {
    this.props.downVotePost(postId)
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
                      &nbsp;<button onClick={() => this.downVoteComment(comment)}>Downvote</button>
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
        <button onClick={() => this.votePost(post.id)}>Upvote</button>
        <button onClick={() => this.downVotePost(post.id)}>Downvote</button>
        <button onClick={() => this.deletePost(post.id)}>Delete</button>
        <CommentForm parentId={post.id}></CommentForm>
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
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (postId) => dispatch(upvotePost(postId)),
    downVotePost: (postId) => dispatch(downVotePost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)