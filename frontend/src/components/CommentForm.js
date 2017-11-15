import React, {Component} from 'react'
import {default as UUID} from 'node-uuid'
import { addComment } from '../actions/comments'
import { connect } from 'react-redux'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class CommentForm extends Component {

  state = {
    body: '',
    bodyErrorText: '',
    author: '',
    authorErrorText: ''
  }

  componentDidMount() {
    const { comment, editComment } = this.props
    if (editComment && comment) {
      this.setState({body: comment.body})
    }
  }

  handleBodyChange = (event, body) => {
    this.setState({body})
    if (body.length <= 0) {
      this.setState({
        bodyErrorText: 'This field is required'
      })
    } else {
      this.setState({
        bodyErrorText: ''
      })
    }
  }

  authorErrorText = (event, author) => {
    this.setState({author})
    if (author.length <= 0) {
      this.setState({
        authorErrorText: 'This field is required'
      })
    } else {
      this.setState({
        authorErrorText: ''
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, editComment, updateComment, cancelEditComment } = this.props
    if (editComment) {
      if (this.state.body) {
        comment.body = this.state.body
        comment.timestamp = new Date().getTime()
        updateComment(comment).then(() => {
          this.setState({
            body: '',
            author: ''
          })
          cancelEditComment()
        })
      }
    } else {
      if (this.state.body && this.state.author) {
        const comment = {
          id: UUID.v4(),
          timestamp: new Date().getTime(),
          parentId: this.props.parentId,
          ...this.state
        }

        this.props.addComment(comment).then(() => {
          this.setState({
            body: '',
            author: ''
          })
        }).catch((err) => {
          console.error(err)
        })
      } else {
        if (this.state.body.length <= 0) {
          this.setState({
            bodyErrorText: 'This field is required'
          })
        } else {
          this.setState({
            bodyErrorText: ''
          })
        }
        if (this.state.author.length <= 0) {
          this.setState({
            authorErrorText: 'This field is required'
          })
        } else {
          this.setState({
            authorErrorText: ''
          })
        }
      }
    }
  }

  render() {
    const { editComment } = this.props
    return (
      <Card>
        <CardTitle title={editComment ? 'Edit comment' : 'Add a comment'}/>
        <form onSubmit={this.handleSubmit}>
          <CardText>
            <TextField
              floatingLabelText="Comment text"
              onChange={this.handleBodyChange}
              errorText={this.state.bodyErrorText}
              value={this.state.body}/><br />
            {editComment ? '' :  <TextField
                floatingLabelText="Author"
                onChange={this.authorErrorText}
                errorText={this.state.authorErrorText}
                value={this.state.author}/>
            } <br />
          </CardText>
          <CardActions>
            <FlatButton label={editComment ? 'Edit comment' : 'Add a comment'} type="submit"/>
          </CardActions>
        </form>
      </Card>)
  }
}

function mapStateToProps ({comments, comment}) {
  return {
    comments,
    comment
  }
}

export default connect(
  mapStateToProps, { addComment }
)(CommentForm)
