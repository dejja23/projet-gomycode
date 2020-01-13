import React, { Component } from 'react';
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
import AdsNav from './AdsNav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAds } from '../../../actions/annonce';
import { getCategories } from '../../../actions/category';

class AdsPage extends Component {
  state = { stitle: '' };
  componentDidMount() {
    this.props.getAds();
    this.props.getCategories();
  }
  searchBytitle = title => {
    this.setState({ stitle: title });
    this.props.getAds();
  };
  searchByCategory = (manufacturer, model) => {
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
          searchByName={this.searchBytitle}
        />
        <Container>
          <Row className='d-flex'>
            {this.props.ads
              .filter(ad =>
                this.state.stitle ? this.state.stitle === ad.title : ad
              )
              .map(ad => (
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
                    <CardFooter className='text-muted'></CardFooter>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
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
