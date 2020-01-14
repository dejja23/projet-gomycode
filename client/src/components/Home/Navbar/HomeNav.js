import React, { Component } from 'react';
// import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner
} from 'reactstrap';
import './HomeNav.css';
class HomeNav extends Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    return this.props.loading ? (
      <Spinner color='primary' className='text-center' />
    ) : (
      <Navbar className='home-nav shadow-sm  ' expand='md'>
        <NavbarBrand className='d-flex align-items-center'>
          <span style={{ fontSize: '36px' }}>GO</span>{' '}
          <i className='fas fa-ad fa-3x ml-1'></i>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle}>
          <i className='fas fa-bars fa-3x' style={{ color: 'white' }}></i>
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/' className='mr-3 text-decoration-none'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to='/ads'
                className='mr-3 text-decoration-none'
              >
                Ads
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {!this.props.user ? (
              <>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to='/login'
                    className='text-decoration-none'
                  >
                    <span> Log In</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to='/register'
                    className=' text-decoration-none'
                  >
                    <span>Sign Up</span>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <UncontrolledDropdown>
                <DropdownToggle className='bg-transparent border-0' caret>
                  <i
                    className='fa fa-fw fa-user fa-3x'
                    style={{ color: 'white' }}
                  ></i>
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.user.role === 'Seller' && (
                    <DropdownItem
                      tag={Link}
                      to='/myads'
                      className=' text-decoration-none'
                    >
                      <i className='fas fa-ad mr-1'></i> <span>My Ads</span>
                    </DropdownItem>
                  )}
                  {this.props.user.role === 'Admin' && (
                    <DropdownItem
                      tag={Link}
                      to='/admin'
                      className=' text-decoration-none'
                    >
                      Dashboard
                    </DropdownItem>
                  )}
                  <DropdownItem
                    tag={Link}
                    to='/'
                    className=' text-decoration-none'
                    onClick={this.props.logout}
                  >
                    <i className='fas fa-sign-out-alt mr-2'></i>
                    <span>Log out</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  loading: state.authReducer.loading
});
export default connect(mapStateToProps, { logout })(HomeNav);
