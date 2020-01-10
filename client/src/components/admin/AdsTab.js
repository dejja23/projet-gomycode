import React, { Component } from 'react';
import { Table } from 'reactstrap';
import AdsNav from './AdsNav';
import { connect } from 'react-redux';
import { deleteAd } from '../../actions/annonce';

export class AdsTab extends Component {
  state = {
    sname: '',
    smanufacturer: '',
    smodel: ''
  };
  searchByName = name => {
    this.setState({ sname: name, smanufacturer: '', smodel: '' });
  };
  searchByCategory = (manufacturer, model) => {
    console.log(manufacturer, model);
    return manufacturer
      ? model
        ? this.setState({
            smanufacturer: manufacturer,
            smodel: model,
            sname: ''
          })
        : this.setState({ smanufacturer: manufacturer, smodel: '', sname: '' })
      : null;
  };
  render() {
    return (
      <>
        <AdsNav
          categories={this.props.categories}
          searchByCategory={this.searchByCategory}
          searchByName={this.searchByName}
        />
        <Table hover className='table-hover'>
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
            {this.props.ads
              .filter(ad =>
                this.state.sname
                  ? ad.title === this.state.sname
                  : this.state.smanufacturer && this.state.smodel
                  ? ad.category.manufacturer === this.state.smanufacturer &&
                    ad.category.model === this.state.smodel
                  : this.state.smanufacturer
                  ? ad.category.manufacturer === this.state.smanufacturer
                  : ad
              )
              .map(ad => (
                <tr key={ad._id}>
                  <td>
                    <img width='100px' src={ad.image} alt='..' />
                  </td>
                  <td>{ad.title}</td>
                  <td>{ad.user.name}</td>
                  <td>
                    {ad.category.manufacturer} {ad.category.model}
                  </td>
                  <td>{ad.price}</td>
                  <td>
                    <i
                      class='fas fa-trash fa-2x'
                      onClick={() => this.props.deleteAd(ad._id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default connect(null, { deleteAd })(AdsTab);
