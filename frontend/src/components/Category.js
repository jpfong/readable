import React, {Component} from 'react'
import { fetchCategoryPosts } from '../actions/posts'
import { connect } from 'react-redux'

class Category extends Component {
  componentDidMount() {
    this.props.getCategoryPosts(this.props.match.params.category)
  }

  render() {
    return (
      <div>
        {this.props.match.params.category}
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