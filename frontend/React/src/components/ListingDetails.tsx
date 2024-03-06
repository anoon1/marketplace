import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../assets/cover/cover-01.png';
import { Link } from 'react-router-dom';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;

const ListingDetails = () => {
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
  
          const response = await fetch(`${appUrl}getSellerProfileData`, {
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
          console.log('responseData', responseData.data.checkUser)
          setData(responseData.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [getUserToken]);



    return (
        <div className="filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] flex flex-wrap items-center justify-between mb-[40px] md:gap-y-[0] gap-y-[25px]">
           <div className="flex flex-wrap md:flex-row flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0]">
                <div className="max-w-[84px]">
                    <img src="/assets/Group1000004352.svg" />
                </div>
                <div>
                    <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]"> {data.totalListings}</h2>
                    <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Total Listing</span>
                </div>
           </div>
           <div className="flex flex-wrap md:flex-row flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0]">
                <div className="max-w-[84px]">
                    <img src="/assets/Group1000004353.svg" />
                </div>
                <div>
                    <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.approvedListings}</h2>
                    <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Approved </span>
                </div>
           </div>
           <div className="flex flex-wrap md:flex-row flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0]">
                <div className="max-w-[84px]">
                    <img src="/assets/Group1000004354.svg" />
                </div>
                <div>
                    <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.pendingListings}</h2>
                    <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Pending </span>
                </div>
           </div>
           <div className="flex flex-wrap md:flex-row flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0]">
                <div className="max-w-[84px]">
                    <img src="/assets/Group1000004355.svg" />
                </div>
                <div>
                    <h2 className="text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]">{data.rejectedListings}</h2>
                    <span className="text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]">Rejected </span>
                </div>
           </div>

        </div>
    );
};

export default ListingDetails;
