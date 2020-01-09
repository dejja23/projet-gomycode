import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import CategoryForm from './CategoryForm';

export class CategoriesCard extends Component {
  state = {
    modal: false
  };

  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  toggle = () => this.setState({ modal: !this.state.modal });
  render() {
    return (
      <>
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
          <span
            className='text-center'
            onClick={() => {
              this.setState({ modal: true });
            }}
          >
            <i class='fas fa-plus fa-7x '></i>
            <br />
          </span>
        </div>
        {this.state.modal ? (
          <CategoryForm
            isOpen={this.state.modal}
            toggle={this.toggle}
            isEdit={false}
          />
        ) : null}
      </>
    );
  }
}

export default CategoriesCard;
