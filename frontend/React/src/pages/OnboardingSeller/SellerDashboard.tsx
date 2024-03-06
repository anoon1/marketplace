import Breadcrumb from '../../components/Breadcrumb';
import ListingDetails from '../../components/ListingDetails';
import SellerListings from '../../components/SellerListings';


const SellerDashboard = () => {
    return (
        <>  
            <ListingDetails />

            <Breadcrumb pageName="Listings" />

            <SellerListings />
        </>
    );
};

export default SellerDashboard;