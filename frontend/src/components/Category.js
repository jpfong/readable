import React, {Component} from 'react'
import { fetchCategoryPosts } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Category extends Component {
  componentDidMount() {
    this.props.getCategoryPosts(this.props.match.params.category)
  }

  render() {
    const posts = this.props.posts

    return (
      <div>
        <h1>{this.props.match.params.category}</h1>
        Posts
        <ul>
          {posts.map((item) => (
            <li key={item.id}>
              <Link to={'/'+ item.category + '/' + item.id }>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({posts}) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategoryPosts: (category) => dispatch(fetchCategoryPosts(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)