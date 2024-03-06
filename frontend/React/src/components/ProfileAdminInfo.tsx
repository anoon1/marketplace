import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../assets/cover/cover-01.png';
import { Link } from 'react-router-dom';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
const AdminProfile = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserToken = localStorage.getItem('usertoken');
  const role = localStorage.getItem('role');
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!appUrl) {
          throw new Error('REACT_APP_URL is not defined');
        }

        const response = await fetch(`${appUrl}getAdminProfile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: getUserToken,
          }),
        });

        if (!response.ok) {
          console.log(response)
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
  const userName = data ? data.name : '';

  // Function to get initials from a name
  const getInitials = (name) => {
    if (!name) {
      return '';
    }
    const words = name.split(' ');

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return words.map((word) => word.charAt(0).toUpperCase()).join('');
    }
  };


  const initials = getInitials(userName);
  const imageUrl = data ? data.profile_picture : '';
  // console.log('imageUrlimageUrlimageUrl', imageUrl)
  const showInitials = !imageUrl || !initials;



  return (
    <>
      <div className='flex items-center justify-between mb-[10px]'>
        <div className='w-[100%] text-end'>
          <Link
            to="/OnboardingAdmin/Profile"
            className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[12px] px-[35px] text-center font-[500] text-[#FFF] text-[16px] hover:bg-opacity-90 leading-[normal] gap-[6px]"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-between mb-[10px]'>
        {/* <div>
          <Link
            to="/OnboardingSeller/ProfileDetails"
            className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[12px] px-[35px] text-center font-[500] text-[#FFF] text-[16px] hover:bg-opacity-90 leading-[normal] gap-[6px]"
          >
            Edit Profile
          </Link>
        </div> */}
      </div>

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          {/* <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div> */}
        </div>
        <div className="px-4 pb-[60px] text-center">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {/* <img src={userSix} alt="profile" /> */}
              <div className='relative'>
                {showInitials ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="155" className='mx-[-20px] my-[-20px] px-[20px] py-[20px]' height="155" viewBox="0 0 155 155" fill="none">
                    <circle cx="77.5" cy="77.5" r="76.5" fill="#EDF2F9" stroke="#A7B6CC" strokeWidth="2" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#557096" fontSize="60px" fontWeight="500">
                      {initials}
                    </text>
                  </svg>
                ) : (
                  <div className='relative'>
                    <img src={`${appUrl}${imageUrl}`} alt="User Profile" className='w-[155px] rounded-full object-cover border-2 border-blue-200' />
                  </div>
                )}

              </div>

              {/* <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label> */}
            </div>
          </div>
          <div className="mt-[10px]">
            <h3 className="mb-[10px] text-[#1D2D5C] text-[20px] font-[500] leading-[16px]">
              {data ? data.name : ''}
            </h3>
            <p className="font-[500] text-[#535D7A] text-[16px] leading-[16px]">{data.checkRole}</p>
            <div className="mx-auto max-w-[80%] pt-2">
              {/* <h4 className="font-[600] text-[#1D2D5C] text-[22px] leading-[28px] mb-[20px]">
                About
              </h4> */}
              <p className="text-[#535D7A] text-[16px] font-[400] leading-[26px]">
                {role}
              </p>
            </div>
            <div className="mx-auto max-w-[80%] pt-2">
              {/* <h4 className="font-[600] text-[#1D2D5C] text-[22px] leading-[28px] mb-[20px]">
                About
              </h4> */}
              <p className="text-[#535D7A] text-[16px] font-[400] leading-[26px]">
                {data ? data.about : ''}
              </p>
            </div>


            <div className="mx-auto max-w-[80%] ">
              <h4 className="font-[600] text-[#1D2D5C] text-[22px] leading-[28px] mb-[20px]">
                Description
              </h4>
              <p className="text-[#535D7A] text-[16px] font-[400] leading-[26px]">
                {data ? data.description : ''}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
