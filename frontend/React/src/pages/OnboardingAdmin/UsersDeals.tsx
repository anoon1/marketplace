import AcceptedStarRating from "../../components/AcceptedStarRating";
import AdminBuyerDealsListing from "../../components/AdminBuyerDealsListing";
import Breadcrumb from '../../components/Breadcrumb';
import SuccessfullyAccepted from "../../components/SuccessfullyAccepted";


const MyDeals = () => {
    return (
        <>
         <Breadcrumb pageName="Buyer Deals" />
            <AdminBuyerDealsListing />
            <br />
            {/* <SuccessfullyAccepted /> */}
            <br />
            {/* <AcceptedStarRating /> */}
        </>
    );
};

export default MyDeals;