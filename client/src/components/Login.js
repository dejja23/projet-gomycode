import React, { Component } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Button
} from 'reactstrap';
import './Register.css';

class Login extends Component {
  state = {
    tel: false
  };

  submitForm(e) {
    e.preventDefault();
  }
  render() {
    return (
      <Container className=' cont'>
        <h2 className='text-center'>Log In</h2>
        <Form className='form' onSubmit={e => this.submitForm(e)}>
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
          <p className='mt-3'>don't have an account? Register</p>
          <Button outline color='dark'>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
