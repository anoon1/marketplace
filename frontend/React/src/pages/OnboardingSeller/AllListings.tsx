import AllListingComp from '../../components/AllListingComp';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';


const AllListings = () => {
    return (
        <>
            <div className='flex items-center justify-between mb-[10px]'>
                <Breadcrumb pageName="All Listings" />
                <div>
                    <Link
                        to="/OnboardingSeller/NewListing"
                        className="inline-flex items-center justify-center rounded-md bg-[#2174F5] md:py-[12px] py-[10px] md:px-[18px] px-[14px] text-center font-[500] text-[#FFF] text-[16px] hover:bg-opacity-90 leading-[normal] gap-[6px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M7.78409 17.2585V0.0141602H9.44602V17.2585H7.78409ZM0 9.47439V7.79825H17.2301V9.47439H0Z" fill="white" />
                        </svg>
                        Add New Listing
                    </Link>
                </div>
            </div>
            <AllListingComp />
        </>
    );
};

export default AllListings;