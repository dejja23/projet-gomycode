import React, { Component } from 'react';
import {
  Spinner,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button
} from 'reactstrap';
import AdsNav from './AdsNav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAds } from '../../../actions/annonce';
import { getCategories } from '../../../actions/category';

class AdsPage extends Component {
  state = { stitle: '' };
  componentDidMount() {
    this.props.match.params.category
      ? this.props.getAds(null, this.props.match.params.category)
      : this.props.getAds();
    this.props.getCategories();
  }
  searchByTitle = title => {
    this.setState({ stitle: title });
    this.props.getAds();
  };
  searchByCategory = (manufacturer, model) => {
    console.log(manufacturer, model);
    return manufacturer
      ? model
        ? (this.setState({ stitle: '' }),
          this.props.getAds(null, manufacturer, model))
        : (this.setState({
            smanufacturer: manufacturer,
            smodel: '',
            stitle: ''
          }),
          this.props.getAds(null, manufacturer))
      : (this.setState({ stitle: '' }), this.props.getAds());
  };
  render() {
    return this.props.loading ? (
      <Spinner color='primary' />
    ) : (
      <>
        <AdsNav
          categories={this.props.categories}
          searchByCategory={this.searchByCategory}
          searchByTitle={this.searchByTitle}
        />

        <Row md='4' sm='2' xs='1' className='m-2'>
          {this.props.ads
            .filter(ad =>
              this.state.stitle ? ad.title.includes(this.state.stitle) : ad
            )
            .map(ad => (
              <Col>
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
                    <CardText className='mt-3 mb-2 text-right text-secondary car-price'>
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
      </>
    );
  }
}
const mapStateToProps = state => ({
  ads: state.adReducer.ads,
  categories: state.categoryReducer.categories,
  loading: state.adReducer.loading
});
export default connect(mapStateToProps, { getAds, getCategories })(AdsPage);
