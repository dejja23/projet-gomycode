import React, { Component } from 'react';
import { Spinner, Button } from 'reactstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAds } from '../../../actions/annonce';

class AdsPage extends Component {
  componentDidMount() {
    this.props.getAds();
  }
  render() {
    console.log('ads', this.props.loading);
    return this.props.loading ? (
      <Spinner color='primary' />
    ) : (
      <div className='wrapper'>
        {this.props.ads.map(ad => (
          <div className='cols'>
            <div className='col' ontouchstart="this.classList.toggle('hover');">
              <div class='container'>
                <div
                  className='front'
                  style={{
                    backgroundImage: `url(${ad.image})`
                  }}
                >
                  <div className='inner'>
                    <p>{ad.title}</p>
                    <span>
                      <span>{ad.category.manufacturer}</span>
                      <span>{ad.category.model}</span>
                    </span>
                  </div>
                </div>
                <div className='back'>
                  <div className='inner'>
                    <p>{ad.descerption}</p>
                    <p>
                      {ad.price} <span>DT</span>
                    </p>
                    <Link to={`/ads/${ad._id}`}>
                      <Button className='btn'>Read more</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ads: state.adReducer.ads,
  loading: state.adReducer.loading
});
export default connect(mapStateToProps, { getAds })(AdsPage);
