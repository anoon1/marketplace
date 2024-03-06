import Breadcrumb from '../../components/Breadcrumb';
import NoReportedListings from '../../components/NoReportedListings';


const NoReportedListingsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Reported Listings" />

      <NoReportedListings />
    </>
  );
};

export default NoReportedListingsPage;