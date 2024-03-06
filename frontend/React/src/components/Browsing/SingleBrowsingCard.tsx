import { Link } from 'react-router-dom'
import config from '../../config/configuration_keys.json'
import ReactStars from 'react-rating-stars-component';
import configEnv from '../../config/configuration_keys.json'
import { useEffect, useState } from 'react';
const cardStyle = {
      filter: 'drop-shadow(0px 0px 44px rgba(63, 81, 134, 0.15))'
};

export default function SingleBrowsingCard({
      data
}: any) {
      const [isClicked, setIsClicked] = useState(false);
      const [listingId, setListingId] = useState(0);
      const [isInFavoriteList, setIsInFavoriteList] = useState(false);
      const token = localStorage.getItem('usertoken');


      useEffect(() => {
            if (data) {
                  const fetchFavoriteList = async () => {
                        try {
                              const response = await fetch(`${config.baseApiUrl}getFavouriteForCheck`, {
                                    method: 'post',
                                    headers: {
                                          'Content-type': 'application/json',
                                    },
                                    body: JSON.stringify({ token }),
                              });

                              if (response.ok) {
                                    const favoriteList = await response.json();
                                    setIsInFavoriteList(favoriteList.data.data.some(item => item.listing_id === data.id));
                              } else {
                                    console.log('Failed to fetch favorite listings');
                              }
                        } catch (err) {
                              console.error('Error while fetching favorite listings:', err);
                        }
                  };

                  fetchFavoriteList();
            }
      }, [data, token]);

      const handleFavClick = async () => {
            if (data) {
                  setListingId(data.id);
                  setIsClicked(!isInFavoriteList);

                  try {
                        const response = await fetch(`${config.baseApiUrl}${isInFavoriteList ? 'removeFavouriteListing' : 'addFavouriteListing'}`, {
                              method: 'post',
                              headers: {
                                    'Content-type': 'application/json',
                              },
                              body: JSON.stringify({ token, listingId: data.id }),
                        });
                        if (response.ok) {
                              const resData = await response.json();

                              if (resData.message === 'Already added to favourite' || resData.message === 'Listing removed from favourite listing') {
                                    setIsInFavoriteList(!isInFavoriteList);
                              } else {
                                    setIsInFavoriteList(true);
                                    alert('Listing added to favorites successfully');
                              }
                        } else {
                              console.log('Failed to add/remove listing to favorites');
                        }
                  } catch (err) {
                        console.error('Error while adding/removing favorite listing:', err);
                  }
            }
      };

      const {
            id,
            title,
            description,
            asking_price,
            version,
            net_profit,
            downloads,
            rating,
            listing_thumbnail
      } = data

      const normalizedRating = parseFloat(rating) || 0;
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
            <div className="w-full md:max-w-[calc(33.33%_-_16px)] rounded-3xl overflow-hidden bg-white wow fadeInLeft" style={cardStyle}>
                  <div className="md:py-[28px] py-[20px]">
                        <div className="flex items-start gap-[20px] sm:px-[28px] px-[20px]">
                              {/* <img src={config.baseApiUrl + images[0]} className='w-[63px] h-[63px]' /> */}
                              <img
                                    src={`${configEnv.baseApiUrl}${listing_thumbnail ? listing_thumbnail : configEnv.DEFAULT_IMG}`}
                                    className='w-[63px] h-[63px] rounded-[50%]'
                                    alt="Listing Thumbnail"
                              />

                              <div className="">
                                    <h4 className="font-[500] text-[16px] text-[#1D2D5C] leading-[20px]">{title}</h4>
                                    <p className="text-[#1D2D5C] text-[14px] flex items-center py-[6px] pm-[8px] gap-[5px]">
                                          {rating}
                                          {[...Array(5)].map((_, index) => (
                                                <span
                                                      key={index}
                                                      style={{ color: index < Math.floor(normalizedRating) ? '#FFD700' : '#A0AEC0' }}
                                                >
                                                      ★
                                                </span>
                                          ))}


                                    </p>
                                    <div className="w-full max-w-[145px]">
                                          <a href="#" className="flex items-center font-[500] leading-[16px] text-[12px] text-[#5290F5] bg-[#DCE6F8] rounded-[15px] justify-center gap-[4px] py-[4px] px-[10px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                      <path d="M5.26307 5.57146V0.526316C5.26307 0.235642 5.02743 0 4.73675 0C4.44608 0 4.21044 0.235642 4.21044 0.526316V5.57146L2.47733 3.83837C2.2718 3.63282 1.93855 3.63282 1.73302 3.83837C1.52747 4.04391 1.52747 4.37715 1.73302 4.58268L4.73675 7.58642L7.74054 4.58268C7.94602 4.37715 7.94602 4.04391 7.74054 3.83837C7.53497 3.63283 7.2017 3.63283 6.99612 3.83837L5.26307 5.57146Z" fill="#5290F5" />
                                                      <path d="M0.526316 6.84216C0.816989 6.84216 1.05263 7.07781 1.05263 7.36848V8.21058C1.05263 8.61753 1.38253 8.94743 1.78947 8.94743H7.68421C8.09116 8.94743 8.42105 8.61753 8.42105 8.21058V7.36848C8.42105 7.07781 8.65674 6.84216 8.94737 6.84216C9.238 6.84216 9.47368 7.07781 9.47368 7.36848V8.21058C9.47368 9.1989 8.67253 10.0001 7.68421 10.0001H1.78947C0.801179 10.0001 0 9.1989 0 8.21058V7.36848C0 7.07781 0.235642 6.84216 0.526316 6.84216Z" fill="#5290F5" />
                                                </svg>
                                                {formatNumber(downloads)} Downloads
                                          </a>
                                    </div>
                              </div>

                              <div className='absolute right-[20px] top-[20px]'>
                                    <Link to="" onClick={() => handleFavClick(id)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="green">
                                                <path d="M2.75402 21C2.52186 20.9995 2.29206 20.9576 2.07773 20.8764C1.75681 20.7591 1.48229 20.5564 1.29003 20.2949C1.09777 20.0334 0.996721 19.7252 1.00008 19.4107V2.58356C1.00092 2.16331 1.18508 1.76053 1.51214 1.46364C1.8392 1.16675 2.28243 0.999999 2.74454 1H13.2555C13.7177 0.999999 14.1609 1.16675 14.4879 1.46364C14.815 1.76053 14.9992 2.16331 15 2.58356V19.4107C14.9996 19.7242 14.8971 20.0306 14.7054 20.2911C14.5136 20.5516 14.2413 20.7547 13.9228 20.8746C13.6043 20.9945 13.2539 21.0259 12.9158 20.9649C12.5777 20.9038 12.267 20.753 12.023 20.5315L8.56257 17.3702C8.41094 17.2387 8.20951 17.1654 8.00004 17.1654C7.79058 17.1654 7.58914 17.2387 7.43752 17.3702L3.97704 20.5315C3.81738 20.6793 3.62707 20.7968 3.41714 20.8772C3.2072 20.9576 2.98181 20.9993 2.75402 21ZM2.75402 1.86219C2.64959 1.86181 2.5461 1.88019 2.4495 1.91628C2.35289 1.95236 2.26508 2.00544 2.19108 2.07246C2.11709 2.13948 2.05838 2.21913 2.01832 2.30684C1.97826 2.39455 1.95764 2.48859 1.95764 2.58356V19.4107C1.95788 19.5538 2.00471 19.6936 2.09224 19.8125C2.17976 19.9314 2.30405 20.024 2.44942 20.0788C2.59479 20.1335 2.75473 20.1478 2.90906 20.12C3.06338 20.0921 3.20518 20.0233 3.31655 19.9223L6.79282 16.7609C6.95435 16.6132 7.14639 16.4959 7.35791 16.4159C7.56943 16.3359 7.79625 16.2948 8.02532 16.2948C8.2544 16.2948 8.48122 16.3359 8.69273 16.4159C8.90425 16.4959 9.09629 16.6132 9.25782 16.7609L12.7183 19.9223C12.8297 20.0233 12.9715 20.0921 13.1258 20.12C13.2801 20.1478 13.4401 20.1335 13.5854 20.0788C13.7308 20.024 13.8551 19.9314 13.9426 19.8125C14.0301 19.6936 14.077 19.5538 14.0772 19.4107V2.58356C14.0772 2.48859 14.0566 2.39455 14.0165 2.30684C13.9765 2.21913 13.9178 2.13948 13.8438 2.07246C13.7698 2.00544 13.682 1.95236 13.5853 1.91628C13.4887 1.88019 13.3853 1.86181 13.2808 1.86219H2.75402Z" fill="#AEB6BF" stroke={isInFavoriteList ? '#ff0000' : '#AEB6BF'} stroke-width="0.5" />
                                          </svg>
                                    </Link>
                              </div>

                        </div>
                        <p className="mt-[22px] text-[#535D7A] text-[14px] leading-[18px] font-[400] sm:px-[32px] px-[28px] pb-[22px]">{description}</p>
                        <div className="border-t border-b border-[#dadada80] bg-[#F8FAFF] py-[19px]">
                              <h4 className="font-[600] text-[12px] text-[#1D2D5C] leading-[15px] uppercase sm:px-[28px] px-[20px]">Additional info</h4>
                              <div className="flex justify-between mt-[13px] sm:px-[28px] px-[20px]">
                                    <div className="w-1/2">
                                          <div className="flex items-center gap-[9.5px]">
                                                <img src="/assets/version.svg" />
                                                <div className="">
                                                      <h4 className="text-[12px] text-[#535D7A] leading-[14px] mb-[5px] font-[400]">Version</h4>
                                                      <p className="text-[#1D2D5C] text-[16px] leading-[16px] font-[400]">{version}</p>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="w-1/2">
                                          <div className="flex items-center gap-[9.5px]">
                                                <img src="/assets/net-proft.png" />
                                                <div className="">
                                                      <h4 className="text-[12px] text-[#535D7A] leading-[14px] mb-[5px] font-[400]">Net profit</h4>

                                                      <p className="text-[#1D2D5C] text-[16px] leading-[16px] font-[400]">${net_profit}</p>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="sm:px-[21px] px-[20px]">
                              <div className="flex justify-between pt-[27px]">
                                    <div className="w-1/2">
                                          <h4 className="text-[14px] text-[#535D7A] leading-[12px] font-[400]">Asking price</h4>
                                          <h3 className="text-[#1D2D5C] sm:text-[16px] text-[16px] leading-[16px] font-[600] mt-[10px]">USD ${asking_price}</h3>
                                    </div>
                                    <div className="w-1/2 flex justify-end">
                                          <Link to={`/OnboardingBuyer/ListingDetails/${id}`}>
                                                <button className="px-[20px] py-[6.5px] font-[500] text-[#2174F5] transition duration-300 rounded-[5px] border-2 border-solid border-[#5290F5]">View listing</button>
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
