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

  render() {
    return (
      <Card>
        <CardTitle title="Add a comment"/>
        <form onSubmit={this.handleSubmit}>
          <CardText>
            <TextField
              floatingLabelText="Comment text"
              onChange={this.handleBodyChange}
              errorText={this.state.bodyErrorText}
              value={this.state.body}/><br />
            <TextField
              floatingLabelText="Author"
              onChange={this.authorErrorText}
              errorText={this.state.authorErrorText}
              value={this.state.author}/><br />
          </CardText>
          <CardActions>
            <FlatButton label="Add Comment" type="submit"/>
          </CardActions>
        </form>
      </Card>)
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
