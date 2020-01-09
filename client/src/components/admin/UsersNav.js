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

export class UsersNav extends Component {
  state = {
    isOpen: false,
    name: '',
    role: ''
  };
  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>Users</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <UncontrolledDropdown nav inNavbar className='ml-5'>
                <DropdownToggle nav caret>
                  Role
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem> All</DropdownItem>
                  <DropdownItem>Buyers </DropdownItem>
                  <DropdownItem>Sellers </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <InputGroup className='w-25'>
              <Input
                placeholder='Search by name'
                name='name'
                onChange={e => this.changeHandler(e)}
              />
              <InputGroupAddon addonType='append'>
                <Button
                  color='secondary'
                  onClick={() => this.props.searchByName(this.state.name)}
                >
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

export default UsersNav;
