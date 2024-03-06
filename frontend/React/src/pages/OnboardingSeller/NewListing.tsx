import Breadcrumb from '../../components/Breadcrumb';
import CreateListing from '../../components/CreateListing';

import React from 'react';

const NewListing = () => {
  return (
    <>
      <div className="md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]">
        <Breadcrumb pageName="New Listing" />
        <CreateListing />
      </div>
    </>
  );
};

export default NewListing;