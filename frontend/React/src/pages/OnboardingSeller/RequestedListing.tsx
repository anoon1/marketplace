import Breadcrumb from '../../components/Breadcrumb';
import RequestedListing from '../../components/RequestedListing';

import React from 'react';

const NewListing = () => {
  return (
    <>
      <div className="md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]">
        <Breadcrumb pageName="Listing Bids" />
        <RequestedListing />
      </div>
    </>
  );
};

export default NewListing;