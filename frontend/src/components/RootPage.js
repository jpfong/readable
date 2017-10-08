import React, {Component} from 'react'
import { fetchCategories } from '../actions/categories'
import { fetchPosts, sortPosts, deletePost } from '../actions/posts'
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
              {item.title}, timestamp: {item.timestamp}, score: {item.voteScore}
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
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage)