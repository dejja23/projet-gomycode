import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class CarModels extends Component {
  render() {
    return (
      <Table hover className=''>
        <thead>
          <tr>
            <th>Logo</th>
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
                  <img width='75px' src={category.logo} alt='..' />
                </td>
                <td>{category.manufacturer}</td>
                <td>{category.model}</td>
                <td className='text-center'>
                  <i class='fas fa-edit'></i>
                </td>
                <td className='text-center'>
                  <i class='fas fa-trash'></i>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default CarModels;
