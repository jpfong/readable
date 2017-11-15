import React, {Component} from 'react'
import { fetchPosts, sortPosts, deletePost, votePost, downVotePost, fetchCategoryPosts, updatePost } from '../actions/posts'
import { fetchPost } from '../actions/post'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostForm from './postForm'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class RootPage extends Component {

  state = {
    editPost: false
  }

  componentDidMount() {
    this.getPagePost()
  }

  /*
  componentWillReceiveProps(nextProps) {
    // this.getPagePost(nextProps)
    // this.props.history.go(0)
    if (nextProps && nextProps.match && nextProps.match.category !== this.props.match.params.category) {
      this.props.getCategoryPosts(nextProps.match.params.category)
    }
  } */

  getPagePost(nextProps) {
    console.log('this.props', this.props)
    if (this.props.match) {
      console.log('nextProps', this.props.match.params.category)
      /*
      if (nextProps && nextProps.match.category !== this.props.match.params.category) {
        this.props.getCategoryPosts(this.props.match.params.category)
      } */
      this.props.getCategoryPosts(this.props.match.params.category)
    } else {
      this.props.getPosts()
    }
  }

  sortPost(sort) {
    this.props.sortPost(sort)
  }

  deletePost(postId) {
    this.props.deletePost(postId)
  }

  votePost(post) {
    this.props.doVotePost(post)
  }

  downVotePost(post) {
    this.props.doDownVotePost(post)
  }

  cancelEditPost = () => {
    this.setState(() => ({ editPost: false }))
  }

  openEditPost(postId) {
    this.props.getPost(postId).then(() => {
      this.setState(() => ({ editPost: true }))
    })
  }

  render() {
    const { editPost } = this.state
    const posts = this.props.posts

    return (
      <div>
        { this.props.match && this.props.match.params.category ? <h1>{this.props.match.params.category}</h1> : <h1>Home</h1>}
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Author</TableHeaderColumn>
              <TableHeaderColumn>Timestamp</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
              <TableHeaderColumn>Number of comments</TableHeaderColumn>
              <TableHeaderColumn>Upvote</TableHeaderColumn>
              <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {posts.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn><Link to={'/'+ item.category + '/' + item.id }>{item.title}</Link></TableRowColumn>
                  <TableRowColumn>{item.author}</TableRowColumn>
                  <TableRowColumn>{item.timestamp}</TableRowColumn>
                  <TableRowColumn>{item.voteScore}</TableRowColumn>
                  <TableRowColumn>{item.commentCount}</TableRowColumn>
                  <TableRowColumn>
                    <FlatButton onClick={() => this.votePost(item)} label="Up"/>
                    <FlatButton onClick={() => this.downVotePost(item)} label="Down"/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FlatButton onClick={() => this.openEditPost(item.id)} label="Edit"/>
                    <FlatButton onClick={() => this.deletePost(item.id)} label="Delete"/>
                  </TableRowColumn>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <RaisedButton onClick={() => this.sortPost('date')} label='Sort by date'/>
        <RaisedButton onClick={() => this.sortPost('score')} label='Sort by score'/>
        <PostForm></PostForm>
        <Dialog
          title="Edit Post"
          modal={false}
          open={editPost}
          onRequestClose={this.cancelEditPost}>
          <PostForm editPost={editPost} cancelEditPost={this.cancelEditPost} updatePost={this.props.doUpdatePost}/>
        </Dialog>
      </div>)
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts()),
    sortPost: (sort) => dispatch(sortPosts(sort)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    doVotePost: (post) => dispatch(votePost((post))),
    doDownVotePost: (post) => dispatch(downVotePost(post)),
    getCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
    getPost: (postId) => dispatch(fetchPost(postId)),
    doUpdatePost: (post) => dispatch(updatePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage)