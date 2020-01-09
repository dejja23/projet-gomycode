import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap';

export class AdsNav extends Component {
  state = {
    isOpen: false
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>Ads</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <UncontrolledDropdown nav inNavbar className='ml-5'>
                <DropdownToggle nav caret>
                  Manufacturer
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar className='ml-5'>
                <DropdownToggle nav caret>
                  Model
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <InputGroup className='w-25'>
              <Input placeholder='Search by name' />
              <InputGroupAddon addonType='append'>
                <Button color='secondary'>
                  <i class='fas fa-search'></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AdsNav;
