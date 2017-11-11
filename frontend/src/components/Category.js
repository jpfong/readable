import React, {Component} from 'react'
import { fetchCategoryPosts } from '../actions/posts'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

class Category extends Component {

  componentDidMount() {
    this.props.fetchCategoryPosts(this.props.match.params.category)
  }

  componentWillReceiveProps() {
    this.props.fetchCategoryPosts(this.props.match.params.category)
  }

  render() {
    const posts = this.props.posts

    return (
      <Card>
        <CardTitle title={this.props.match.params.category} />
        <CardText>
        </CardText>
        <List>
          {posts.map((item) => (
              <Link to={'/'+ item.category + '/' + item.id } key={item.id}>
                <ListItem primaryText={item.title}/>
              </Link>
          ))}
        </List>
      </Card>
    )
  }
}

function mapStateToProps ({posts}) {
  return {
    posts
  }
}

export default connect(
  mapStateToProps,
  {fetchCategoryPosts}
)(Category)