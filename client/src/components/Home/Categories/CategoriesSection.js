import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/category';
export class CategoriesSection extends Component {
  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  toggle = () => this.setState({ modal: !this.state.modal });
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <>
        <h1
          className='m-2'
          style={{ color: '#08c8f6', fontSize: '36px', fontWeight: 'bold' }}
        >
          Categories
        </h1>
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
          {this.removeDuplicates(this.props.categories, 'manufacturer').map(
            category => (
              <Link
                to={`/ads/category/${category.manufacturer}`}
                className='text-decoration-none'
              >
                <Card className='border-0 text-center  category-cards'>
                  <CardImg
                    top
                    width='100%'
                    src={category.logo}
                    alt='Card image cap'
                  />
                  <CardBody>
                    <CardTitle>
                      <span className='car-man'>{category.manufacturer}</span>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Link>
            )
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.categoryReducer.loading,
  categories: state.categoryReducer.categories
});
export default connect(mapStateToProps, { getCategories })(CategoriesSection);
