import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
const NavAdmin = props => {
  return (
    <Navbar className='navbar-admin shadow' light expand='md'>
      <NavbarBrand className='dashbord'>Dashbord</NavbarBrand>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <span className='nav-item-admin'>
              {' '}
              <i className='fas fa-home fa-3x text-white mr-4 '></i>
            </span>
          </Link>
        </NavItem>
        <NavItem>
          <span className='nav-item-admin'>
            {' '}
            <i
              className='fas fa-sign-out-alt fa-3x text-white'
              onClick={() => props.logout()}
            ></i>
          </span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default connect(null, { logout })(NavAdmin);
