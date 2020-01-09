import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
const NavAdmin = props => {
  return (
    <Navbar color='primary' light expand='md'>
      <NavbarBrand>Dashbord</NavbarBrand>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <i class='fas fa-sign-out-alt' onClick={() => props.logout()}></i>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default connect(null, { logout })(NavAdmin);
