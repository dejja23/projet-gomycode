import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAds, deleteAd } from '../../../actions/annonce';
import { getCategories } from '../../../actions/category';
import {
  Spinner,
  Container,
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
  componentDidUpdate() {
    this.props.getAds(this.props.user._id);
    this.props.getCategories();
  }
  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return this.props.loading ? (
      <Spinner color='primary' />
    ) : (
      <>
        <Row md='4' sm='2' xs='1' className='m-2'>
          {this.props.ads.map(ad => (
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
                <CardFooter className='text-muted'>
                  <Button>
                    <i
                      class='fas fa-edit'
                      onClick={() =>
                        this.setState({ modal: true, isEdit: true, ad: ad })
                      }
                    ></i>
                  </Button>
                  <Button onClick={() => this.props.deleteAd(ad._id)}>
                    <i class='fas fa-trash'></i>
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
          <div
            onClick={() =>
              this.setState({ modal: true, isEdit: false, ad: null })
            }
          >
            <i class='fas fa-plus'></i>
          </div>
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
  loading: state.adReducer.loading,
  categories: state.categoryReducer.categories
});
export default connect(mapStateToProps, { getAds, deleteAd, getCategories })(
  MyAds
);
