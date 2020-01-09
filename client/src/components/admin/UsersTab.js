import React, { Component } from 'react';
import { Table } from 'reactstrap';
import UsersNav from './UsersNav';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/user';

export class UsersTab extends Component {
  state = {
    sname: '',
    srole: ''
  };
  searchByName = name => {
    this.setState({ sname: name, srole: '' });
  };
  searchByRole = role => {
    this.setState({ srole: role, sname: '' });
  };

  render() {
    return (
      <>
        <UsersNav
          searchByName={this.searchByName}
          searchByRole={this.searchByRole}
        />
        <Table hover className='table-hover'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>phone</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {this.props.users
              .filter(user => user.role !== 'Admin')
              .filter(user => {
                return this.state.sname
                  ? user.name === this.state.sname
                  : this.state.srole
                  ? user.role === this.state.srole
                  : user;
              })
              .map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>
                    <i
                      class='fas fa-trash'
                      onClick={() => this.props.deleteUser(user._id)}
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

export default connect(null, { deleteUser })(UsersTab);
