import Breadcrumb from '../../components/Breadcrumb';
import NoListings from '../../components/NoListings';


const NoListingsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Listings" />

      <NoListings />
    </>
  );
};

export default NoListingsPage;