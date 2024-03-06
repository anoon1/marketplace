import { Link } from 'react-router-dom';

const AcceptedStarRating = () => {
    return (
        <div className="text-[#FFF] w-full max-w-[536px] bg-[#fff] px-[55px] py-[38px] m-auto mt-[6px]">
            <div className='text-center mb-[24px]'>
                <img src="/assets/accepted-img.svg" alt="" className='m-auto' />
            </div>
            <h2 className="text-center text-[#1C2434] md:text-[26px] text-[22px] font-[600] leading-[normal]">Your bid has been <br /> successfully Accepted</h2>
            <div className="border-t border-[#E0E0E0] mt-[30px] pt-[16px]">
                <p className='text-[#535D7A] text-[14px] font-[400] leading-[20px] px-[27px] text-center'>Once you received all files or credentials of the chrome extension please mark it as completed.</p>
            </div>
            <div>
                <Link
                    to="#"
                    className="inline-flex items-center justify-center rounded-[4px] bg-[#2174F5] py-[13px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[24px] w-full mt-[40px] mb-[8px] gap-[7px]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                        <path d="M17 1L6 12L1 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Mark as Completed
                </Link>
            </div>
            <div className='mt-[32px] border-t border-[#E0E0E0] pt-[35px]'>
                <h3 className="mb-[30px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]">
                    Please rate your experience
                </h3>
                <span className='mb-[30px] block'>
                    <svg width="156" height="22" viewBox="0 0 156 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 0L15.0535 7.2408L23 8.40904L17.25 14.0421L18.607 22L11.5 18.2408L4.393 22L5.75 14.0421L0 8.40904L7.9465 7.2408L11.5 0Z" fill="#FFA000" />
                        <path d="M44.5 0L48.0535 7.2408L56 8.40904L50.25 14.0421L51.607 22L44.5 18.2408L37.393 22L38.75 14.0421L33 8.40904L40.9465 7.2408L44.5 0Z" fill="#FFA000" />
                        <path d="M77.5 0L81.0535 7.2408L89 8.40904L83.25 14.0421L84.607 22L77.5 18.2408L70.393 22L71.75 14.0421L66 8.40904L73.9465 7.2408L77.5 0Z" fill="#FFA000" />
                        <path d="M110.5 0L114.054 7.2408L122 8.40904L116.25 14.0421L117.607 22L110.5 18.2408L103.393 22L104.75 14.0421L99 8.40904L106.946 7.2408L110.5 0Z" fill="#FFA000" />
                        <path d="M144.5 0L148.054 7.2408L156 8.40904L150.25 14.0421L151.607 22L144.5 18.2408L137.393 22L138.75 14.0421L133 8.40904L140.946 7.2408L144.5 0Z" fill="#DDDDDD" />
                    </svg>
                </span>
                <div className="relative z-20 bg-white dark:bg-form-input">
                    <textarea
                        rows={4}
                        placeholder="Describe what do you like most.."
                        className="w-full rounded-[4px] border-[1px] border-[#E2E8F0] bg-transparent py-[14px] px-[20px] font-[400] text-[14px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary placeholder:text-[#64748b80]"
                    ></textarea>
                </div>
                <div className='flex justify-end mt-[20px] mb-[12px]'>
                    <Link
                        to="#"
                        className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[13px] px-[35px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                    >
                        Submit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AcceptedStarRating;
