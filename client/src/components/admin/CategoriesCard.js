import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

export class CategoriesCard extends Component {
  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  render() {
    return (
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
        {this.removeDuplicates(this.props.categories, 'manufacturer').map(
          category => (
            <Link to={`/admin/category/${category.manufacturer}`}>
              <Card className='border-0 text-center m-2'>
                <CardImg
                  top
                  width='100%'
                  src={category.logo}
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle>{category.manufacturer}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          )
        )}
      </div>
    );
  }
}

export default CategoriesCard;
