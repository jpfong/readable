import React, {Component} from 'react'
import { fetchCategories } from '../actions/categories'
import { fetchPosts, sortPosts, deletePost, votePost, downVotePost } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RootPage extends Component {
  componentDidMount() {
    this.props.getCategories()
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
    const categories = this.props.categories
    const posts = this.props.posts
    return (
      <div>
        Categories
        <ul>
          {categories.map((item) => (
            <li key={item.name}>
              <Link to={'/'+ item.name }>{item.name}</Link>
            </li>
          ))}
        </ul>
        Posts
        <ul>
          {posts.map((item) => (
            <li key={item.id}>
              <Link to={'/'+ item.category + '/' + item.id }>{item.title}</Link>, author: {item.author}, timestamp: {item.timestamp}, score: {item.voteScore}
              <button onClick={() => this.votePost(item)}>Upvote</button>
              <button onClick={() => this.downVotePost(item)}>Downvote</button>
              <button onClick={() => this.deletePost(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={() => this.sortPost('date')}>Sort by date</button>
        <button onClick={() => this.sortPost('score')}>Sort by score</button>
      </div>)
  }
}

function mapStateToProps ({categories, posts}) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
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