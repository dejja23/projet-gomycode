import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAd,
  addLike,
  removeLike,
  addComment,
  deleteComment
} from '../../../actions/annonce';
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
      <div>
        <Row>
          <Col>
            <img src={this.props.ad.image} />
          </Col>
          <Col>
            <h2>{this.props.ad.title}</h2>
            <h4>
              <span>{this.props.ad.category.manufacturer}</span>
              <span>{this.props.ad.category.model}</span>
            </h4>

            <h4>{this.props.ad.descerption}</h4>

            <p>
              <i
                class='fas fa-heart'
                onClick={() =>
                  this.props.user &&
                  (this.props.ad.likes.filter(
                    like => like.user._id === this.props.user._id
                  ).length
                    ? this.props.removeLike(this.props.ad._id)
                    : this.props.addLike(this.props.ad._id))
                }
              ></i>
              {this.props.ad.likes.length}
              {this.props.ad.likes.length === 1 ? '  Like' : 'Likes'}
            </p>
            <p>
              <span>
                {this.props.ad.price} <span>DT</span>
              </span>
            </p>

            {this.props.isAuthenticated ? (
              <div>
                <p>Posted by:{this.props.ad.user.name}</p>
                <p>email adress:{this.props.ad.user.email}</p>
                <p>phone number:{this.props.ad.user.phone}</p>
              </div>
            ) : (
              <p>
                you must have an account to view the seller information
                <Link to='/login'>login</Link>
              </p>
            )}
          </Col>
        </Row>
        <div>
          <ListGroup>
            <ListGroupItem active>
              <ListGroupItemHeading>
                <p>
                  <span>{this.props.ad.Comments.length}</span> Comments
                </p>
              </ListGroupItemHeading>
            </ListGroupItem>
            {this.props.ad.Comments.map(comment => (
              <ListGroupItem>
                <ListGroupItemHeading>{comment.user.name}</ListGroupItemHeading>
                <ListGroupItemText>{comment.text}</ListGroupItemText>
                <ListGroupItemText>{comment.date}</ListGroupItemText>
                {this.props.isAuthenticated &&
                  (this.props.user._id === comment.user._id ||
                    this.props.user.role === 'Admin') && (
                    <div>
                      <span>
                        <i
                          class='fas fa-trash'
                          onClick={() =>
                            this.props.deleteComment(
                              this.props.ad._id,
                              comment._id
                            )
                          }
                        ></i>
                      </span>
                    </div>
                  )}
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
                  >
                    Add a comment
                  </Button>
                </>
              ) : (
                <p>
                  you must have a buyer account to write comments
                  <Link to='/login'>login</Link>
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
