import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {default as UUID} from 'node-uuid'
import { addComment } from '../actions/comments'
import { connect } from 'react-redux'

class CommentForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true})
    if (values.body && values.author) {
      values.id = UUID.v4()
      values.timestamp = new Date().getTime()
      values.parentId = this.props.parentId
      // this.props.createComment(values).then((comment) => {
      this.props.addComment(values).then(() => {
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
        <div className="create-contact-details">
          <input type="text" name="body" placeholder="Comment text"/>
          <input type="text" name="author" placeholder="Author"/>
          <button>Add Comment</button>
        </div>
      </form>)
  }
}

function mapStateToProps ({comments}) {
  return {
    comments
  }
}

export default connect(
  mapStateToProps, { addComment }
)(CommentForm)
