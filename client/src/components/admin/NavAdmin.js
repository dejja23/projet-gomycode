import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
const NavAdmin = () => {
  return (
    <Navbar color='primary' light expand='md'>
      <NavbarBrand>Dashbord</NavbarBrand>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <i class='fas fa-sign-out-alt'></i>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavAdmin;
