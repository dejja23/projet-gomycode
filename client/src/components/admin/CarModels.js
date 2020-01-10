import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/category';
import CategoryForm from './CategoryForm';

export class CarModels extends Component {
  state = {
    modal: false,
    category: ''
  };
  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <>
        <Table hover className='table-hover align-items-center'>
          <thead>
            <tr>
              <th></th>
              <th>Manufacturer</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories
              .filter(
                category =>
                  category.manufacturer === this.props.match.params.manufacturer
              )
              .map(category => (
                <tr key={category._id}>
                  <td>
                    <img width='100px' src={category.logo} alt='..' />
                  </td>
                  <td>{category.manufacturer}</td>
                  <td>{category.model}</td>
                  <td className='text-center'>
                    <i
                      class='fas fa-edit fa-2x'
                      onClick={() =>
                        this.setState({ modal: true, category: category })
                      }
                    ></i>
                  </td>
                  <td className='text-center'>
                    <i
                      class='fas fa-trash fa-2x'
                      onClick={() => this.props.deleteCategory(category._id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {this.state.modal ? (
          <CategoryForm
            category={this.state.category}
            isOpen={this.state.modal}
            toggle={this.toggle}
            isEdit={true}
          />
        ) : null}
      </>
    );
  }
}

export default connect(null, { deleteCategory })(CarModels);
