import ReportReasonModal from "./ReportReasonModal";
import SendMessageModal from "./SendMessageModal";
import SendOfferModal from "./SendOfferModal";
import ReactStars from 'react-rating-stars-component';
import configEnv from '../config/configuration_keys.json'


const ListingDetailsComp = ({
    data
}: any) => {
    const {
        id,
        title,
        description,
        asking_price,
        version,
        net_profit,
        downloads,
        rating,
        how_it_works,
        business_model,
        industry_type,
        revenue,
        created_at,
        selling_reason,
        listing_image
    } = data
    function formatNumber(number: any) {
        return Math.abs(Number(number)) >= 1.0e9
            ? (Math.abs(Number(number)) / 1.0e9).toFixed(2) + 'B'
            : Math.abs(Number(number)) >= 1.0e6
                ? (Math.abs(Number(number)) / 1.0e6).toFixed(2) + 'M'
                : Math.abs(Number(number)) >= 1.0e3
                    ? (Math.abs(Number(number)) / 1.0e3).toFixed(2) + 'k'
                    : Math.abs(Number(number));
    }
    return (
        <div className="flex flex-wrap md:gap-[0] gap-[25px]">
            <div className="flex flex-col gap-[25px] w-full md:max-w-[60%] max-w-[100%] pr-[15px]">
                <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke pt-[23px] px-[37px] pb-[25px]">
                        <h3 className="font-[600] text-[#1D2D5C] text-[26px] leading-[normal]">
                            {title}
                        </h3>
                        <p className="text-[#1D2D5C] text-[14px] font-[400] flex items-center pt-[8px]">
                            {rating ? rating : 0}
                            <ReactStars
                                count={5}
                                size={15}
                                value={rating ? rating : 0}
                                isHalf={rating == 2.5}
                                edit={false}
                                activeColor="#ffd700"
                                className="mt-5"
                            />
                        </p>
                    </div>
                    <div className="py-[40px] px-[35px]">
                        <div className='bg-[#4085FE] h-[261px] max-h-[261px] overflow-hidden'>
                            <img src={`${configEnv.baseApiUrl}${listing_image ? listing_image : configEnv.DEFAULT_IMG}`} alt="" className='w-full h-full max-h-[261px] object-cover object-center m-auto' />
                        </div>
                    </div>
                </div>
                <div className="rounded-sm bg-white">
                    <div className="border-b border-stroke pt-[20px] px-[25px] pb-[21px]">
                        <h5 className="font-[500] text-[#1D2D5C] text-[16px] leading-[normal]">
                            Overview
                        </h5>
                    </div>
                    <div className="py-[20px] px-[25px]">
                        {description}
                    </div>
                </div>
                <div className="rounded-sm bg-white">
                    <div className="border-b border-stroke pt-[20px] px-[25px] pb-[21px]">
                        <h5 className="font-[500] text-[#1D2D5C] text-[16px] leading-[normal]">
                            Why are you selling?
                        </h5>
                    </div>
                    <div className="py-[20px] px-[25px]">
                        <p className='text-[#535D7A] text-[14px] font-[400] leading-[25px] mb-[30px]'>
                            {selling_reason}
                        </p>
                    </div>
                </div>
                <div className="rounded-sm bg-white">
                    <div className="border-b border-stroke pt-[20px] px-[25px] pb-[21px]">
                        <h5 className="font-[500] text-[#1D2D5C] text-[16px] leading-[normal]">
                            How It Work?
                        </h5>
                    </div>
                    <div className="py-[40px] px-[24px] pb-[50px]">
                        <video src={`${configEnv.baseApiUrl}${how_it_works}`} controls controlsList="nodownload" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:max-w-[40%] max-w-[100%] md:pl-[15px] pl-[0]">
                <div className="rounded-sm bg-white px-[30px] py-[22px]">
                    <div className="pb-[26px] pt-[20px] border-b border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Asking Price</h5>
                        <span className="text-[#64748B] text-[14px] font-[400] leading-[normal]">USD ${asking_price}</span>
                    </div>
                    <div className="pb-[26px] pt-[20px] border-b border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Net Profit</h5>
                        <span className="text-[#64748B] text-[14px] font-[400] leading-[normal]">${net_profit}</span>
                    </div>
                    <div className="pb-[26px] pt-[20px] border-b border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Revenue</h5>
                        <span className="text-[#64748B] text-[14px] font-[400] leading-[normal]">{revenue}</span>
                    </div>
                    <div className="mt-[30px] flex flex-col gap-[15px]">
                        <SendMessageModal sellerId={data.seller_id} />
                        <SendOfferModal list_id={id} />
                    </div>
                    <ReportReasonModal list_id={id} />
                </div>
                <div className="rounded-sm bg-white px-[30px] py-[28px] pb-[48px] border-t border-[#E0E0E0] flex flex-col gap-[25px]">
                    <div className="flex items-center gap-[14px]">
                        <div>
                            <img src="/assets/arrow-ico.svg" alt="" />
                        </div>
                        <div>
                            <h4 className="text-[#1C2434] text-[16px] font-[400] leading-[normal]">Version: <span className="text-[#64748B] text-[16px] font-[400] leading-[normal]">{version}</span></h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-[14px]">
                        <div>
                            <img src="/assets/ship-ico.svg" alt="" />
                        </div>
                        <div>
                            <h4 className="text-[#1C2434] text-[16px] font-[400] leading-[normal]">Number of Downloads: <span className="text-[#64748B] text-[16px] font-[400] leading-[normal]">{formatNumber(downloads)}</span></h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-[14px]">
                        <div>
                            <img src="/assets/lens-ico.svg" alt="" />
                        </div>
                        <div>
                            <h4 className="text-[#1C2434] text-[16px] font-[400] leading-[normal]">Launched: <span className="text-[#64748B] text-[16px] font-[400] leading-[normal]">{new Date(created_at).getFullYear()}</span></h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-[14px]">
                        <div>
                            <img src="/assets/setting-ico.svg" alt="" />
                        </div>
                        <div>
                            <h4 className="text-[#1C2434] text-[16px] font-[400] leading-[normal]">Industries: <span className="text-[#64748B] text-[16px] font-[400] leading-[normal]">{industry_type}</span></h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-[14px]">
                        <div>
                            <img src="/assets/breef-ico.svg" alt="" />
                        </div>
                        <div>
                            <h4 className="text-[#1C2434] text-[16px] font-[400] leading-[normal]">Business Model: <span className="text-[#64748B] text-[16px] font-[400] leading-[normal]">{business_model}</span></h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ListingDetailsComp;
