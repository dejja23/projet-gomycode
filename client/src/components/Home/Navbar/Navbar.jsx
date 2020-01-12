import React, { Component } from 'react';
// import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import {
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class Navbar extends Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  render() {
    return this.props.loading ? (
      <Spinner color='primary' />
    ) : (
      <div className='topnav'>
        <div>
          <Link className='active' to='/'>
            Home
          </Link>

          {!this.props.user ? (
            <>
              <Link
                to='/login'
                className='btn '
                style={{ backgroundColor: 'transparent' }}
              >
                <span> Log In</span>
              </Link>
              <Link
                to='/register'
                className='btn'
                style={{ backgroundColor: 'transparent' }}
              >
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                <i class='fa fa-fw fa-user'></i>
              </DropdownToggle>
              <DropdownMenu>
                {this.props.user.role === 'Seller' && (
                  <DropdownItem>
                    <Link to='/myads'>my ads</Link>
                  </DropdownItem>
                )}
                {this.props.user.role === 'Admin' && (
                  <DropdownItem>Dashboard</DropdownItem>
                )}
                <DropdownItem onClick={this.props.logout}>logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  loading: state.authReducer.loading
});
export default connect(mapStateToProps, { logout })(Navbar);
