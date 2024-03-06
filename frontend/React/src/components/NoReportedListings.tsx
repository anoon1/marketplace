import { Link } from 'react-router-dom';


const NoReportedListings = () => {
    return (
        <div className="rounded-sm py-[58px] text-center bg-white center">
            <div className="text-center">
                <img src='/assets/no-listing-img.svg' className='m-auto mb-[16px]' />
            </div>
            <div>
                <h1 className="text-[#1D2D5C] text-[36px] font-[600] leding-[28px] mb-[25px]">No Reported Listing Found!</h1>
            </div>
        </div>
    );
};

export default NoReportedListings;
