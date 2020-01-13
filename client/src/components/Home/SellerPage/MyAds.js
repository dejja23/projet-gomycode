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
        <Container>
          <Row className='d-flex'>
            {this.props.ads.map(ad => (
              <Col>
                <Card>
                  <CardImg
                    top
                    width='100%'
                    src={ad.image}
                    alt='Card image cap'
                  />
                  <CardBody>
                    <CardTitle>{ad.title}</CardTitle>
                    <CardSubtitle>
                      {ad.category.manufacturer}
                      {ad.category.model}
                    </CardSubtitle>
                    <CardText>{ad.descerption}</CardText>
                    <CardText>{ad.price}</CardText>
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
        </Container>
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
