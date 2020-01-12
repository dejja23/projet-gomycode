import React, { Component } from 'react';
import Card from './Cards/Card';
import FooterPage from './Footer/FooterPage';
import Main from './Mains/Main';
import Navbar from './Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import AdsPage from './AdsPages/AdsPage';
import SingleAdPage from './AdsPages/SingleAdPage';
import MyAds from './SellerPage/MyAds';

export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                <img
                  className='imgContainer'
                  src='https://scontent.ftun9-1.fna.fbcdn.net/v/t1.0-9/s960x960/80489789_1761072980695550_245157081148030976_o.png?_nc_cat=102&_nc_ohc=OGnW3C_XBd0AQkbKxKHNrZHqC9E94NuSvYkYXrQYNOnrn643TlYr40zwQ&_nc_ht=scontent.ftun9-1.fna&oh=3897b6cf9849ab3b3856f06acf5fc523&oe=5EA65FF5'
                />
                <Card />
                <Main />
              </>
            )}
          />
          <Route exact path='/ads' component={AdsPage} />
          <Route exact path='/ads/:id' component={SingleAdPage} />
          <Route exact path='/myads' component={MyAds} />
        </Switch>
        {/* <FooterPage /> */}
      </div>
    );
  }
}

export default Home;
