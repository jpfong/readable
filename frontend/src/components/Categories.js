import React, {Component} from 'react'
import { fetchCategories } from '../actions/categories'
import { fetchCategoryPosts } from '../actions/posts'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  openDrawer = () => this.setState({open: !this.state.open})

  goToCategory(name) {
    const { fetchCategoryPosts, history } = this.props
    fetchCategoryPosts(name).then(() => {
      history.push(`/${name}`)
    })
  }

  render() {
    const categories = this.props.categories

    return (
      <AppBar
        title="Categories"
        onLeftIconButtonTouchTap={this.openDrawer}>

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <Link to={'/'} key='home'>
            <MenuItem primaryText='Home'/>
          </Link>
          {categories.map((item) => (
            <MenuItem onClick={() => this.goToCategory(item.name)}>{item.name}</MenuItem>
            ))}
        </Drawer>
      </AppBar>
    )
  }

}

function mapStateToProps ({categories, posts}) {
  return {
    categories,
    posts
  }
}

const CategoriesList = withRouter(connect(
  mapStateToProps,
  { fetchCategories, fetchCategoryPosts }
)(Categories))

export default CategoriesList