import React, {Component} from 'react'
import {default as UUID} from 'node-uuid'
import { createPost } from '../actions/posts'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class PostForm extends Component {

  state = {
    title: '',
    titleErrorText: '',
    body: '',
    bodyErrorText: '',
    author: '',
    authorErrorText: '',
    category: 'react'
  }

  componentDidMount() {
    const { post, editPost } = this.props
    if (editPost && post) {
      this.setState({title: post.title})
      this.setState({body: post.body})
    }
  }

  handleChange = (event, index, category) => this.setState({category})
  handleTitleChange = (event, title) => {
    this.setState({title})
    if (title.length <= 0) {
      this.setState({
        titleErrorText: 'This field is required'
      })
    } else {
      this.setState({
        titleErrorText: ''
      })
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
    const {post, editPost, updatePost, cancelEditPost} = this.props
    if (editPost) {
      if (this.state.title && this.state.body) {
        post.title = this.state.title
        post.body = this.state.body
        updatePost(post).then(() => {
          this.setState({
            title: '',
            body: '',
            author: '',
            category: 'react'
          })
          cancelEditPost() // will hide the form
        })
      }
    } else {
      if (this.state.title && this.state.body && this.state.author && this.state.category) {
        const post = {
          id: UUID.v4(),
          timestamp: new Date().getTime(),
          ...this.state
        }
        this.props.createPost(post).then(() => {
          this.setState({
            title: '',
            body: '',
            author: '',
            category: 'react'
          })
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }


  render() {
    const { editPost, cancelEditPost } = this.props

    return (
      <Card>
        { editPost ? <CardTitle title="Edit post"/> : <CardTitle title="Add a post"/>}
        <form onSubmit={this.handleSubmit}>
          <CardText>
            <TextField
              floatingLabelText="Title"
              onChange={this.handleTitleChange}
              errorText={this.state.titleErrorText}
              value={this.state.title}/><br />
            <TextField
              floatingLabelText="Body"
              onChange={this.handleBodyChange}
              errorText={this.state.bodyErrorText}
              value={this.state.body}/><br />
            {editPost ?  '' :
              <TextField
                floatingLabelText="Author"
                onChange={this.authorErrorText}
                errorText={this.state.authorErrorText}
                value={this.state.author}/>
            }
            <br/>
            { editPost ? '' :
            <SelectField
              floatingLabelText="Category"
              value={this.state.category}
              onChange={this.handleChange}>
              <MenuItem value={'react'} primaryText="React" />
              <MenuItem value={'redux'} primaryText="Redux" />
              <MenuItem value={'udacity'} primaryText="Udacity" />
            </SelectField> }

            <CardActions>
              <FlatButton label={ editPost ? 'Edit': 'Add'} type="submit"/>
              { editPost ? <FlatButton label="Cancel" type="button" onClick={() => cancelEditPost()}/> : '' }
            </CardActions>
          </CardText>
        </form>
      </Card>)
  }

}

function mapStateToProps ({posts, post}) {
  return {
    posts,
    post
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
