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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/category';
import { addAd, updateAd } from '../../../actions/annonce';
import { setAlert } from '../../../actions/alert';
import AlertMsg from '../../Alert';

class AdFormModal extends Component {
  state = {
    title: this.props.isEdit ? this.props.ad.title : '',
    descerption: this.props.isEdit ? this.props.ad.descerption : '',
    image: this.props.isEdit ? this.props.ad.image : '',
    manufacturer: this.props.isEdit ? this.props.ad.category.manufacturer : '',
    model: this.props.isEdit ? this.props.ad.category.model : '',
    logo: this.props.isEdit ? this.props.ad.category.logo : '',
    price: this.props.isEdit ? this.props.ad.price : ''
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.props.getCategories();
  }

  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  handleClick = () => {
    this.props.isEdit
      ? this.props.updateAd(
          this.props.ad._id,
          this.state.title,
          this.state.descerption,
          this.state.image,
          this.state.price,
          this.state.manufacturer,
          this.state.model,
          this.state.logo
        )
      : this.props.addAd(
          this.state.title,
          this.state.descerption,
          this.state.image,
          this.state.price,
          this.state.manufacturer,
          this.state.model,
          this.state.logo
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
          {this.props.isEdit ? 'EDIT AN AD' : 'ADD AN AD'}
        </ModalHeader>
        <ModalBody>
          <AlertMsg />
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>title</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=' Ad title'
              name='title'
              value={this.state.title}
              onChange={this.changeHandler}
            />
          </InputGroup>
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>description</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder='Ad description'
              name='descerption'
              value={this.state.descerption}
              onChange={this.changeHandler}
            />
          </InputGroup>
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>image</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=' Car image'
              name='image'
              value={this.state.image}
              onChange={this.changeHandler}
            />
          </InputGroup>{' '}
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>category</InputGroupText>
            </InputGroupAddon>
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {this.state.manufacturer ? (
                  <>
                    {' '}
                    <img
                      src={this.state.logo}
                      alt='...'
                      style={{ width: '36px', marginRight: '5px' }}
                    />{' '}
                    <span>{this.state.manufacturer}</span>
                  </>
                ) : (
                  'manufacturer'
                )}
              </DropdownToggle>
              <DropdownMenu>
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
                        model: ''
                      });
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
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {this.state.model ? this.state.model : 'Model'}
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
                        }}
                        className='text-center'
                      >
                        {category.model}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              )}
            </UncontrolledDropdown>
          </InputGroup>
          <InputGroup className='m-2'>
            <InputGroupAddon addonType='prepend' style={{ width: '125px' }}>
              <InputGroupText className='w-100'>price</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=' Car price'
              name='price'
              value={this.state.price}
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
const mapStateToProps = state => ({
  categories: state.categoryReducer.categories
});
export default connect(mapStateToProps, {
  getCategories,
  addAd,
  updateAd,
  setAlert
})(AdFormModal);
