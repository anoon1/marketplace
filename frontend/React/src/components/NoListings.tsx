import { Link } from 'react-router-dom';


const NoListings = () => {
    return (
        <div className="rounded-sm md:py-[58px] py-[30px] text-center bg-white center">
            <div className="text-center">
                <img src='/assets/no-listing-img.svg' className='m-auto mb-[16px]' />
            </div>
            <div>
                <h1 className="text-[#1D2D5C] md:text-[36px] text-[25px] font-[600] leding-[28px] md:mb-[25px] mb-[20px]">Welcome! No Listing Found</h1>
                <p className="text-[#535D7A] text-[14px] font-[400] leading-[26px]">You will see your listing here once you add.</p>
            </div>
            <div className='mt-[49px]'>
                <Link
                    to="/OnboardingSeller/NewListing"
                    className="inline-flex items-center justify-center rounded-md bg-[#2174F5] md:py-[19px] py-[15px] md:px-[40px] px-[30px] text-center font-[500] text-[#F1F5F9] md:text-[18px] text-[16px] hover:bg-opacity-90 leading-[13px] gap-[4px]"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.78409 17.2443V0H9.44602V17.2443H7.78409ZM0 9.46023V7.78409H17.2301V9.46023H0Z" fill="white" />
                    </svg>
                    Create Listing
                </Link>
            </div>


        </div>
    );
};

export default NoListings;
