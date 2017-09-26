import React, {Component} from 'react'
import { fetchCategories } from '../actions/categories'
import { fetchPosts } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RootPage extends Component {
  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
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
              {item.title}
            </li>
          ))}
        </ul>
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
    getPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage)