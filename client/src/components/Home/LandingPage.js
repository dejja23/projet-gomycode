import React from 'react';
import AdCards from './Cards/AdCards';
import CategoriesSection from './Categories/CategoriesSection';

const LandingPage = () => {
  return (
    <div>
      <img src='home.jpg' alt='...' width='100%' />
      <AdCards />
      <CategoriesSection />
    </div>
  );
};

export default LandingPage;
