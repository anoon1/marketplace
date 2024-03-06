import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../assets/cover/cover-01.png';
import { Link } from 'react-router-dom';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
const Profile = () => {
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
        setData(responseData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getUserToken]);
  const userName = data.checkUser ? data.checkUser.name : '';

  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return words.map((word) => word.charAt(0).toUpperCase()).join('');
    }
  };

  const initials = getInitials(userName);
  const imageUrl = data.checkUser ? data.checkUser.profile_picture : '';
  const showInitials = !imageUrl || !initials;



  return (
    <>
      <div className='flex items-center justify-between mb-[10px]'>
        <Breadcrumb pageName="Personal Details" />
        <div>
          <Link
            to="/OnboardingSeller/ProfileDetails"
            className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[12px] px-[35px] text-center font-[500] text-[#FFF] text-[16px] hover:bg-opacity-90 leading-[normal] gap-[6px]"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />

        </div>
        <div className="px-4 pb-[60px] text-center">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {/* <img src={userSix} alt="profile" /> */}
              <div className='relative'>
                {showInitials ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="155" height="155" viewBox="0 0 155 155" fill="none">
                    <circle cx="77.5" cy="77.5" r="76.5" fill="#EDF2F9" stroke="#A7B6CC" strokeWidth="2" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#557096" fontSize="60px" fontWeight="500">
                      {initials}
                    </text>
                  </svg>
                ) : (
                  <div className='relative'>
                    <img src={`${appUrl}${imageUrl}`} alt="User Profile" className='h-[112px] md:w-[155px] w-[112px] rounded-full object-cover border-2 border-blue-200' />
                  </div>
                )}

              </div>

            </div>
          </div>
          <div className="mt-[10px]">
            <h3 className="mb-[10px] text-[#1D2D5C] text-[20px] font-[500] leading-[16px]">
              {data.checkUser ? data.checkUser.name : 'Loading....'}
            </h3>
            <p className="font-[500] text-[#535D7A] text-[16px] leading-[16px]">{data.checkRole}</p>
            <div className="mx-auto max-w-[80%] pt-2">

              <p className="text-[#535D7A] text-[16px] font-[400] leading-[26px]">
                {data.checkUser?.about}
              </p>
            </div>
            <div className="mx-auto mt-[30px] mb-[40px] grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data.totalListings ? data.totalListings : 0}
                </span>
                <span className="text-sm">Listings</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data.approvedListings ? data.approvedListings : 0}

                </span>
                <span className="text-sm">Approved</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data.pendingListings ? data.pendingListings : 0}
                </span>
                <span className="text-sm">Pending</span>
              </div>
            </div>

            <div className="mx-auto max-w-[80%] ">
              <h4 className="font-[600] text-[#1D2D5C] text-[22px] leading-[28px] mb-[20px]">
                Business Description
              </h4>
              <p className="text-[#535D7A] text-[16px] font-[400] leading-[26px]">
                {data.checkUser ? data.checkUser.description : 'Loading....'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
