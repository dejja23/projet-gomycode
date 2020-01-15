import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAds, deleteAd } from '../../../actions/annonce';
import { getCategories } from '../../../actions/category';
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
import AdFormModal from './AdFormModal';

class MyAds extends Component {
  state = {
    modal: false,
    isEdit: false,
    ad: null
  };
  componentDidMount() {
    this.props.user && this.props.getAds(this.props.user._id);
    this.props.getCategories();
  }
  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    console.log(this.props.user);
    return this.props.loading ? (
      <Spinner color='primary' />
    ) : (
      <>
        <Row md='4' sm='2' xs='1'>
          {this.props.ads.map(ad => (
            <Col className='mt-4' key={ad._id}>
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
                <CardFooter className='d-flex justify-content-between mt-1'>
                  <Button color='light'>
                    <i
                      className='fas fa-edit fa-lg text-info'
                      onClick={() =>
                        this.setState({ modal: true, isEdit: true, ad: ad })
                      }
                    ></i>
                  </Button>
                  <Button
                    color='light'
                    onClick={() => this.props.deleteAd(ad._id)}
                  >
                    <i className='fas fa-trash fa-lg text-danger'></i>
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
          <Col
            className='d-flex align-items-center justify-content-center mt-4'
            onClick={() =>
              this.setState({ modal: true, isEdit: false, ad: null })
            }
          >
            <i className='fas fa-plus fa-7x'></i>
          </Col>
        </Row>

        {this.state.modal ? (
          <AdFormModal
            toggle={this.toggle}
            categories={this.state.categories}
            isOpen={this.state.modal}
            isEdit={this.state.isEdit}
            ad={this.state.ad}
          />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.authReducer.user,
  ads: state.adReducer.ads,
  loading: state.adReducer.loading || state.categoryReducer.loading,
  categories: state.categoryReducer.categories
});
export default connect(mapStateToProps, {
  getAds,
  deleteAd,
  getCategories
})(MyAds);
