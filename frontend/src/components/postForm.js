import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {default as UUID} from 'node-uuid'
import { createPost } from '../actions/posts'
import { connect } from 'react-redux'

class PostForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true})
    if (values.title && values.body && values.author && values.category) {
      values.id = UUID.v4()
      values.timestamp = new Date().getTime()
      this.props.createPost(values).then((post) => {
        console.log('ssss comment', post)
        values.title = ''
        values.body = ''
        values.author = ''
      }).catch((err) => {
        console.error(err)
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" name="title" placeholder="Title"/>
          <input type="text" name="body" placeholder="Body"/>
          <input type="text" name="author" placeholder="Author"/>
          <select name="category">
            <option value="react">react</option>
            <option value="redux">redux</option>
            <option value="udacity">udacity</option>
          </select>
          <button>Add Post</button>
        </div>
      </form>)
  }

}

function mapStateToProps ({posts}) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (data) => dispatch(createPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
