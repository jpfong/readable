import React, {Component} from 'react'
import { fetchCategories } from '../actions/categories'
import { fetchPosts, sortPosts, deletePost, votePost, downVotePost } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostForm from './postForm'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


class RootPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

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

  clickMenu(category) {
    console.log('click menu')
    const {history} = this.props
    console.log('history', history)
    history.push(`/${category}`)
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

        <RaisedButton
          onClick={this.handleTouchTap}
          label='Choose category'
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>
          <Menu>
            {categories.map((item) => (
                <Link to={'/'+ item.name } key={item.name}>
                  <MenuItem primaryText={item.name}/>
                </Link>
              // onClick={() => this.clickMenu()}
            ))}
          </Menu>
        </Popover>

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
        <PostForm></PostForm>
        <RaisedButton label="Default" />
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