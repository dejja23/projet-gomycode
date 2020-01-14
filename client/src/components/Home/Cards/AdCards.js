import React, { Component } from 'react';
import {
  Button,
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
import './AdCards.css';
class AdCards extends Component {
  componentDidMount() {
    this.props.getRecentAds();
  }
  render() {
    return (
      <>
        <h1 className='header-card-section m-2'>Latest Ads</h1>
        <Row md='4' sm='2' xs='1' className='m-2'>
          {this.props.ads.map(ad => (
            <Col key={ad._id}>
              <Card className='h-100 shadow-sm'>
                <CardImg
                  top
                  width='100%'
                  height='50%'
                  src={ad.image}
                  alt='Card image cap'
                  className='border-bottom'
                />
                <CardBody>
                  <CardTitle className='text-center car-title mt-3'>
                    {ad.title}
                  </CardTitle>
                  <CardSubtitle className='car-category text-left mt-3'>
                    <img
                      src={ad.category.logo}
                      alt='...'
                      style={{ width: '50px' }}
                    />
                    <span className='ml-1'>
                      {ad.category.manufacturer}
                      <span className='ml-1'> {ad.category.model}</span>
                    </span>
                  </CardSubtitle>
                  <CardText className='mt-3 text-right text-secondary car-price'>
                    {ad.price}
                    <sup className='ml-1'>DT</sup>
                  </CardText>
                </CardBody>
                <CardFooter className='text-center p-0 border-0'>
                  <Button
                    className='go-to-btn'
                    tag={Link}
                    to={`/ads/${ad._id}`}
                  >
                    check this ad
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        <div className='d-flex justify-content-end'>
          <Button
            tag={Link}
            to='/ads'
            className='text-decoration-none m-2 see-more-ads'
          >
            see more ads
          </Button>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  ads: state.adReducer.ads
});
export default connect(mapStateToProps, { getRecentAds })(AdCards);
