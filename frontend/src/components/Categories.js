import React, {Component} from 'react'
import { fetchCategories } from '../actions/categories'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

class Categories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.fetchCategories().then((categories) => {
      console.log(categories)
    })
  }

  openDrawer = () => this.setState({open: !this.state.open});

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
            <Link to={'/'+ item.name } key={item.name}>
              <MenuItem primaryText={item.name}/>
            </Link>
          ))}
        </Drawer>
      </AppBar>
    )
  }

}

function mapStateToProps ({categories}) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps,
  { fetchCategories }
)(Categories)