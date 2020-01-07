import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Button,
  Row
} from 'reactstrap';
import './Register.css';

class Register extends Component {
  state = {
    tel: false
  };

  submitForm(e) {
    e.preventDefault();
  }
  render() {
    return (
      <Container className=' cont'>
        <h2 className='text-center'>Register</h2>
        <Form className='form' onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup className='d-flex '>
              <i className='fas fa-user'></i>
              <Input
                className='input-text ml-3'
                type='name'
                name='name'
                placeholder='Your Name'
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className='d-flex '>
              <i class='fas fa-envelope'></i>
              <Input
                className='input-text ml-3'
                type='email'
                name='email'
                placeholder='Your Email'
              />
              <FormFeedback invalid>
                Uh oh! Looks like there is an issue with your email. Please
                input a correct email.
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className='d-flex'>
              <i class='fas fa-lock'></i>
              <Input
                className='input-text ml-3'
                type='password'
                name='password'
                placeholder='Password'
              />
            </FormGroup>
          </Col>
          <Row className='m-0' xs='1' md='2'>
            <Col>
              <FormGroup className='d-flex'>
                <i class='fas fa-user-tag'></i>
                <Input
                  className='input-text ml-3'
                  type='select'
                  name='select'
                  onChange={() => this.setState({ tel: !this.state.tel })}
                >
                  <option> Buyer</option>
                  <option> Seller</option>
                </Input>
              </FormGroup>
            </Col>
            {this.state.tel && (
              <Col>
                <FormGroup className='d-flex'>
                  <i class='fas fa-mobile'></i>
                  <Input
                    className='input-text ml-3'
                    type='number'
                    name='phone'
                    placeholder='Your Phone Number'
                  />
                </FormGroup>
              </Col>
            )}
          </Row>
          <p className='mt-3'>
            Already have an account <Link to='/login'>log in</Link>
          </p>
          <Button outline color='dark'>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Register;
