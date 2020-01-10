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
                  {this.state.role ? this.state.role : 'Role'}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      this.props.searchByRole('');
                      this.setState({ role: 'All' });
                    }}
                  >
                    All
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.searchByRole('Buyer');
                      this.setState({ role: 'Buyer' });
                    }}
                  >
                    Buyers
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.searchByRole('Seller');
                      this.setState({ role: 'Seller' });
                    }}
                  >
                    Sellers{' '}
                  </DropdownItem>
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
                  style={{ backgroundColor: '#2876f9' }}
                  onClick={() => {
                    this.props.searchByName(this.state.name);
                    this.setState({ role: '' });
                  }}
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
