import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecentAds } from '../../../actions/annonce';
class AdCard extends Component {
  componentDidMount() {
    this.props.getRecentAds();
  }
  render() {
    return (
      <div className='wrapper'>
        <h1>Annonce New Car</h1>
        {this.props.ads.map(ad => (
          <Col>
            <Card>
              <CardImg top width='100%' src={ad.image} alt='Card image cap' />
              <CardBody>
                <CardTitle>{ad.title}</CardTitle>
                <CardSubtitle>
                  {ad.category.manufacturer}
                  {ad.category.model}
                </CardSubtitle>
                <CardText>{ad.descerption}</CardText>
                <CardText>{ad.price}</CardText>
              </CardBody>
              <CardFooter className='text-muted'></CardFooter>
            </Card>
          </Col>
        ))}
        <Link to='/ads'>see more ads</Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ads: state.adReducer.ads
});
export default connect(mapStateToProps, { getRecentAds })(AdCard);
