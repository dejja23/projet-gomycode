import React, { Component } from 'react';
import AdCard from './Cards/AdCard';
import HomeNav from './Navbar/HomeNav';
import { Switch, Route } from 'react-router-dom';
import AdsPage from './AdsPages/AdsPage';
import SingleAdPage from './AdsPages/SingleAdPage';
import MyAds from './SellerPage/MyAds';

export class Home extends Component {
  render() {
    return (
      <div>
        <HomeNav />

        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                <AdCard />
              </>
            )}
          />
          <Route exact path='/ads' component={AdsPage} />
          <Route exact path='/ads/:id' component={SingleAdPage} />
          <Route exact path='/myads' component={MyAds} />
        </Switch>
      </div>
    );
  }
}

export default Home;
