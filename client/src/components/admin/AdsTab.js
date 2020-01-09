import React, { Component } from 'react';
import { Table } from 'reactstrap';
import AdsNav from './AdsNav';

export class AdsTab extends Component {
  render() {
    return (
      <>
        <AdsNav />
        <Table hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Posted by</th>
              <th>Category</th>
              <th>price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.ads.map(ad => (
              <tr key={ad._id}>
                <td>{ad.image}</td>
                <td>{ad.title}</td>
                <td>{ad.user.name}</td>
                <td>
                  {ad.category.manufacturer} {ad.category.model}
                </td>
                <td>{ad.price}</td>
                <td>
                  <i class='fas fa-trash'></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default AdsTab;
