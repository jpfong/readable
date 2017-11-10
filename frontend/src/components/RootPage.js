import React, {Component} from 'react'
import { fetchPosts, sortPosts, deletePost, votePost, downVotePost } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostForm from './postForm'
import RaisedButton from 'material-ui/RaisedButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class RootPage extends Component {

  componentDidMount() {
    this.props.getPosts()
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

  render() {
    const posts = this.props.posts
    return (
      <div>
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
                    <RaisedButton onClick={() => this.votePost(item)} label="Upvote"/>
                    <RaisedButton onClick={() => this.downVotePost(item)} label="Downvote"/>
                    <RaisedButton onClick={() => this.deletePost(item.id)} label="Delete"/>
                  </TableRowColumn>
                </TableRow>
            ))}
          </TableBody>
        </Table>

        <RaisedButton onClick={() => this.sortPost('date')} label='Sort by date'/>
        <RaisedButton onClick={() => this.sortPost('score')} label='Sort by score'/>
        <PostForm></PostForm>
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
    doDownVotePost: (post) => dispatch(downVotePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage)