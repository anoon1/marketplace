import AdminListingDetailsComp from '../../components/AdminListingDetailsComp';
import Breadcrumb from '../../components/Breadcrumb';


const ListingDetails = () => {
    return (
        <>
            <div className='flex items-center justify-between mb-[10px]'>
                <Breadcrumb pageName="All Listings" />
            </div>
            <AdminListingDetailsComp />
        </>
    );
};

export default ListingDetails;