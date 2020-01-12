import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Card.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecentAds } from '../../../actions/annonce';
class Card extends Component {
  componentDidMount() {
    this.props.getRecentAds();
  }
  render() {
    return (
      <div className='wrapper'>
        <h1>Annonce New Car</h1>
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
        <Link to='/ads'>see more ads</Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ads: state.adReducer.ads
});
export default connect(mapStateToProps, { getRecentAds })(Card);
