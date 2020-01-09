import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  ModalFooter,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateCategory, addCategory } from '../../actions/category';

class CategoryForm extends Component {
  state = {
    manufacturer: this.props.isEdit ? this.props.category.manufacturer : '',
    logo: this.props.isEdit ? this.props.category.logo : '',
    model: this.props.isEdit ? this.props.category.model : ''
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = () => {
    console.log(this.state.manufacturer, this.state.logo, this.state.model);
    this.props.isEdit
      ? this.props.updateCategory(
          this.props.category._id,
          this.state.manufacturer,
          this.state.logo,
          this.state.model
        )
      : this.props.addCategory(
          this.state.manufacturer,
          this.state.logo,
          this.state.model
        );
  };
  render() {
    return (
      <Modal
        className='modal-lg'
        isOpen={this.props.isOpen}
        toggle={() => this.props.toggle()}
      >
        <ModalHeader>
          {this.props.isEdit ? 'EDIT CATEGORY' : 'ADD CATEGORY'}
        </ModalHeader>
        <ModalBody>
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>manufacturer</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=' Car manufacturer'
              name='manufacturer'
              value={this.state.manufacturer}
              onChange={this.changeHandler}
            />
          </InputGroup>
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>logo</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=' Car brand logo'
              name='logo'
              value={this.state.logo}
              onChange={this.changeHandler}
            />
          </InputGroup>
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>Model</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=' Car model'
              name='model'
              value={this.state.model}
              onChange={this.changeHandler}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={() => {
              this.handleClick();
              this.props.toggle();
            }}
          >
            {this.props.isEdit ? 'Save Changes' : 'Add'}
          </Button>{' '}
          <Button color='secondary' onClick={() => this.props.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(null, { addCategory, updateCategory })(CategoryForm);
