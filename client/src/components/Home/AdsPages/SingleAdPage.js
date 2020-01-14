import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAd,
  addLike,
  removeLike,
  addComment,
  deleteComment
} from '../../../actions/annonce';
import Moment from 'react-moment';
import {
  Row,
  Col,
  Spinner,
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

import './SingleAdPage.css';
import { Link } from 'react-router-dom';

class SingleAdPage extends Component {
  state = {
    comment: ''
  };
  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
  }

  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  render() {
    return this.props.loading || !this.props.ad ? (
      <Spinner color='primary' />
    ) : (
      <div className='m-auto w-75'>
        <Row md='2' xs='1'>
          <Col className='d-flex align-items-center'>
            <img src={this.props.ad.image} width='100%' alt='...' />
          </Col>
          <Col>
            <h2 className='ad-title text-center'>{this.props.ad.title}</h2>
            <h4>
              <img src={this.props.ad.category.logo} width='100px' alt='...' />
              <span className='text-secondary font-weight-bold ml-1 mr-1'>
                {this.props.ad.category.manufacturer}
              </span>
              <span className='text-secondary font-weight-bold text-bold'>
                {this.props.ad.category.model}
              </span>
            </h4>

            <h4 className='ad-descrp'>{this.props.ad.descerption}</h4>
            <Col className='mt-4 mb-4 d-flex justify-content-between '>
              <span className='like text-secondary'>
                <i
                  className={
                    this.props.user &&
                    this.props.ad.likes.filter(
                      like => like.user.toString() === this.props.user._id
                    ).length
                      ? 'liked fas fa-heart fa-lg mr-2'
                      : 'unliked fas fa-heart fa-lg mr-2'
                  }
                  onClick={() =>
                    this.props.user &&
                    (this.props.ad.likes.filter(
                      like => like.user.toString() === this.props.user._id
                    ).length
                      ? this.props.removeLike(this.props.ad._id)
                      : this.props.addLike(this.props.ad._id))
                  }
                ></i>
                <span>
                  <span className='mr-1'> {this.props.ad.likes.length}</span>
                  {this.props.ad.likes.length === 1 ? '  Like' : 'Likes'}
                </span>
              </span>
              <span>
                <span className='price text-secondary'>
                  {this.props.ad.price} <sup>DT</sup>
                </span>
              </span>
            </Col>

            {this.props.isAuthenticated ? (
              <div className='m-2 p-3 '>
                <p>
                  <span className='mr-2 font-weight-bold text-secondary'>
                    Posted by:
                  </span>
                  {this.props.ad.user.name}
                </p>
                <p>
                  <span className='mr-2 font-weight-bold text-secondary'>
                    email adress:
                  </span>
                  {this.props.ad.user.email}
                </p>
                <p>
                  <span className='mr-2 font-weight-bold text-secondary'>
                    phone number:
                  </span>
                  {this.props.ad.user.phone}
                </p>
              </div>
            ) : (
              <p>
                you must have an account to view the seller information
                <Link to='/login'> login</Link>
              </p>
            )}
          </Col>
        </Row>
        <div>
          <ListGroup>
            <ListGroupItem>
              <ListGroupItemHeading>
                <p className='text-primary font-size-bold'>
                  <span>{this.props.ad.Comments.length}</span>{' '}
                  {this.props.ad.Comments.length === 1 ? 'Comment' : 'Comments'}
                </p>
              </ListGroupItemHeading>
            </ListGroupItem>
            {this.props.ad.Comments.map(comment => (
              <ListGroupItem key={comment._id}>
                <ListGroupItemHeading className='d-flex justify-content-between'>
                  <span className='font-size-bolder'>{comment.user.name}</span>{' '}
                  {this.props.isAuthenticated &&
                    (this.props.user._id === comment.user._id ||
                      this.props.user.role === 'Admin') && (
                      <span>
                        <i
                          style={{ color: 'red' }}
                          class='fas fa-trash'
                          onClick={() =>
                            this.props.deleteComment(
                              this.props.ad._id,
                              comment._id
                            )
                          }
                        ></i>
                      </span>
                    )}
                </ListGroupItemHeading>
                <ListGroupItemText>{comment.text}</ListGroupItemText>
                <ListGroupItemText
                  style={{ fontSize: '12px' }}
                  className='text-right text-secondary'
                >
                  Posted on:{' '}
                  <Moment format='YYYY/MM/DD HH:mm' className='comment-date'>
                    {comment.date}
                  </Moment>
                </ListGroupItemText>
              </ListGroupItem>
            ))}
            <ListGroupItem>
              {this.props.isAuthenticated &&
              this.props.user.role === 'Buyer' ? (
                <>
                  {' '}
                  <Input
                    type='textarea'
                    name='comment'
                    value={this.state.comment}
                    id='exampleText'
                    onChange={this.changeHandler}
                  />
                  <Button
                    onClick={() => {
                      this.props.addComment(
                        this.props.ad._id,
                        this.state.comment
                      );
                      this.setState({ comment: '' });
                    }}
                    outline
                    color='primary'
                    className='mt-2'
                  >
                    Add a comment
                  </Button>
                </>
              ) : (
                <p>
                  you must have a buyer account to write comments
                  <Link to='/login'> login</Link>
                </p>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.adReducer.loading,
  ad: state.adReducer.ad,
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
});
export default connect(mapStateToProps, {
  getAd,
  addLike,
  removeLike,
  addComment,
  deleteComment
})(SingleAdPage);
