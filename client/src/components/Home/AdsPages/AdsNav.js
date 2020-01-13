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
    isOpen: false,
    title: '',
    manufacturer: '',
    model: ''
  };

  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
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
                  {this.state.manufacturer ? (
                    <span className=' align-items-center'>
                      <img
                        src={this.state.logo}
                        alt='..'
                        style={{ width: '36px', marginRight: '5px' }}
                      />
                      <span>{this.state.manufacturer}</span>
                    </span>
                  ) : (
                    'Manufacturer'
                  )}
                </DropdownToggle>
                <DropdownMenu right>
                  {this.removeDuplicates(
                    this.props.categories,
                    'manufacturer'
                  ).map(category => (
                    <DropdownItem
                      key={category._id}
                      onClick={() => {
                        this.setState({
                          manufacturer: category.manufacturer,
                          logo: category.logo,
                          model: '',
                          title: ''
                        });
                        this.props.searchByCategory(category.manufacturer);
                      }}
                      className='text-center'
                    >
                      <img
                        src={category.logo}
                        alt='...'
                        style={{ width: '36px', marginRight: '5px' }}
                      />
                      {category.manufacturer}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar className='ml-5'>
                <DropdownToggle nav caret>
                  {this.state.model ? <span>{this.state.model}</span> : 'Model'}
                </DropdownToggle>
                {this.state.manufacturer && (
                  <DropdownMenu right>
                    {this.props.categories
                      .filter(
                        category =>
                          category.manufacturer === this.state.manufacturer
                      )
                      .map(category => (
                        <DropdownItem
                          key={category._id}
                          onClick={() => {
                            this.setState({
                              model: category.model
                            });
                            this.props.searchByCategory(
                              this.state.manufacturer,
                              category.model
                            );
                          }}
                          className='text-center'
                        >
                          {category.model}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                )}
              </UncontrolledDropdown>
            </Nav>
            <InputGroup className='w-25'>
              <Input
                placeholder='Search by title'
                name='title'
                value={this.state.title}
                onChange={e => this.changeHandler(e)}
              />
              <InputGroupAddon addonType='append'>
                <Button
                  style={{ backgroundColor: '#2876f9' }}
                  onClick={() => {
                    this.props.searchByName(this.state.title);
                    this.setState({ manufacturer: '', model: '' });
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

export default AdsNav;
