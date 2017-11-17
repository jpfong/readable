import React, {Component} from 'react'
import { fetchPost, upvotePost, downVotePost, doUpdatePost } from '../actions/post'
import { deletePost } from '../actions/posts'
import { fetchComments, updateComments, doDeleteComment, updateCommentBody } from '../actions/comments'
import { fetchComment } from '../actions/comment'
import { connect } from 'react-redux'
import Loading from 'react-loading'
import CommentForm from './CommentForm'
import PostForm from './postForm'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class Post extends Component {
  state = {
    loadingPost: true,
    editPost: false,
    editComment: false
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

  editPost() {
    this.setState(() => ({ editPost: true }))
  }

  cancelEditPost = () => {
    this.setState(() => ({ editPost: false }))
  }

  editComment(commentId) {
    this.props.getCommentById(commentId).then(() => {
      this.setState(() => ({ editComment: true }))
    })
  }

  cancelEditComment = () => {
    this.setState(() => ({ editComment: false }))
  }

  render() {
    const post = this.props.post
    const comments = this.props.comments
    const { loadingPost, editPost, editComment } = this.state

    if (post.id) {
      return (
        <div>
          { loadingPost ? <Loading delay={200} type='spin' color='#222' className='loading' /> :
            <Card>
              <CardTitle title={ post.title } subtitle={post.author}/>
              <CardText>
                <p>Current score: {post.voteScore}</p>
                <p>{ post.body }</p>
                <Table selectable={false}>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>Body</TableHeaderColumn>
                      <TableHeaderColumn>Author</TableHeaderColumn>
                      <TableHeaderColumn>Score</TableHeaderColumn>
                      <TableHeaderColumn>Action</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {comments.map((comment) => (
                      <TableRow key={comment.id}>
                        <TableRowColumn>{comment.body}</TableRowColumn>
                        <TableRowColumn>{comment.author}</TableRowColumn>
                        <TableRowColumn>{comment.voteScore}</TableRowColumn>
                        <TableRowColumn>
                          <FlatButton onClick={() => this.upvoteComment(comment)} label="Upvote"/>
                          <FlatButton onClick={() => this.downVoteComment(comment)} label="Downvote"/>
                          <FlatButton onClick={() => this.editComment(comment.id)} label="Edit"/>
                          <FlatButton onClick={() => this.deleteComment(comment)} label="Delete"/>
                        </TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardText>
              <CardActions>
                <FlatButton label='Upvote' onClick={() => this.votePost(post.id)}/>
                <FlatButton label='Downvote' onClick={() => this.downVotePost(post.id)}/>
                <FlatButton label='Delete' onClick={() => this.deletePost(post.id)}/>
                <FlatButton label='Edit' onClick={() => this.editPost()}/>
              </CardActions>
            </Card>
          }
          <CommentForm parentId={post.id}></CommentForm>
          <Dialog
            modal={false}
            open={editPost}
            onRequestClose={this.cancelEditPost}>
            <PostForm editPost={editPost} cancelEditPost={this.cancelEditPost} updatePost={this.props.updatePost}/>
          </Dialog>
          <Dialog
            modal={false}
            open={editComment}
            onRequestClose={this.cancelEditComment}>
            <CommentForm editComment={editComment} cancelEditComment={this.cancelEditComment} updateComment={this.props.updateAComment}/>
          </Dialog>
        </div>
      )
    } else {
      return (
        <div>This post has been deleted.</div>
      )
    }
  }
}

function mapStateToProps ({post, comments, comment}) {
  return {
    post,
    comments,
    comment
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
    downVotePost: (postId) => dispatch(downVotePost(postId)),
    updatePost: (post) => dispatch(doUpdatePost(post)),
    updateAComment: (comment) => dispatch(updateCommentBody(comment)),
    getCommentById: (commentId) => dispatch(fetchComment(commentId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)