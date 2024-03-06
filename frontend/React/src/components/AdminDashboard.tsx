import React, { useState, useEffect } from 'react';
import configEnv from '../config/configuration_keys.json';
import { Navigate, useNavigate } from 'react-router-dom';
const appUrl = configEnv.baseApiUrl;

const AdminDetails = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const getUserToken = localStorage.getItem('usertoken');
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!appUrl) {
                    throw new Error('REACT_APP_URL is not defined');
                }

                const response = await fetch(`${appUrl}getAllListingData`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: getUserToken,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setData(responseData.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getUserToken]);

    const handleClick = (status) => {
        navigate(`/OnboardingAdmin/AdminSellerListing?status=${status}`);
    };



    return (
        <div className='pt-[30px] filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] items-center justify-between mb-[40px] md:gap-y-[0] gap-y-[25px]'>

            <h2 className='font-[600] text-[#1D2D5C] dark:text-white leading-[28px] text-[20px]'>Seller Details</h2>
            <div className="filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] flex flex-wrap items-center justify-between mb-[40px] md:gap-y-[0] gap-y-[25px]">
                <div onClick={() => { handleClick(4) }} className="flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer">
                    <div className="max-w-[84px]">
                        <img src="/assets/Group1000004352.svg" />
                    </div>
                    <div>
                        <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.totalListings}</h2>
                        <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Total Listing</span>
                    </div>
                </div>

                <div onClick={() => { handleClick(1) }} className="flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer">
                    <div className="max-w-[84px]">
                        <img src="/assets/Group1000004353.svg" />
                    </div>
                    <div>
                        <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.approvedListings}</h2>
                        <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Approved </span>
                    </div>
                </div>
                <div onClick={() => { handleClick(2) }} className="flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer">
                    <div className="max-w-[84px]">
                        <img src="/assets/Group1000004354.svg" />
                    </div>
                    <div>
                        <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.pendingListings}</h2>
                        <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Pending </span>
                    </div>
                </div>
                <div onClick={() => { handleClick(3) }} className="flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer">
                    <div className="max-w-[84px]">
                        <img src="/assets/Group1000004355.svg" />
                    </div>
                    <div>
                        <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.rejectedListings}</h2>
                        <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Rejected </span>
                    </div>
                </div>

            </div>
            <h2 className='font-[600] text-[#1D2D5C] dark:text-white leading-[28px] text-[20px]'>Deals Details</h2>
            <div className="filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] flex  items-center justify-content flex-start mb-[40px] gap-x-[89px] md:gap-y-[0] gap-y-[25px]">
                <div className="flex text-left md:flex-row flex-col items-center md:justify-start justify-center md:text-left gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] sm: text-center ">
                    <div className="max-w-[84px]">
                        <img src="/assets/deals.png" />
                    </div>
                    <div>
                        <h2 className="text-[#333]  md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]"> {data.approvedDeals}</h2>
                        <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Sucessfull Deals</span>
                    </div>
                </div>

                <div className="flex text-center  md:flex-row flex-col items-center md:justify-start justify-center md:text-left  gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] sm: text-center">
                    <div className="max-w-[84px]">
                        <img src="/assets/Group1000004354.svg" />
                    </div>
                    <div>
                        <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.pendingDeals}</h2>
                        <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Pending Deals</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDetails;
