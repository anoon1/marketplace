import { Link, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
export default function SingleListingCard({
      id,
      srNo,
      image,
      title,
      askingPrice,
      sellingPrice,
      paymentStatus,
      status,
      rating
}: any) {
      const navigate = useNavigate();
      const handleCLick = () => {
            navigate('/OnboardingBuyer/Payment', { state: { item_id: id, asking_price: askingPrice, selling_price: sellingPrice, deal_status: paymentStatus, item_title: title } })
      }
      let bgColor = status == 1 ? 'bg-success' : status == 2 ? 'bg-warning' : status == 3 ? 'bg-danger' : 'bg-gray-500';

      let color = status == 1 ? 'text-success' : status == 2 ? 'text-warning' : status == 3 ? 'text-danger' : 'text-gray-500';

      let textStatus = status == 1 ? 'Completed' : status == 2 ? 'Pending' : status == 3 ? 'Rejected' : 'Unknown';

      return (
            <div className="grid grid-cols-9 border-b border-[#E0E0E0] pt-[13px] pb-[14px] md:px-[56px] px-[15px] sm:grid-cols-8 items-center md:min-w-auto min-w-[1000px]">
                  <div className="col-span-1 items-left pr-[25px]">
                        <p className="text-[#1D2D5C] text-left text-[16px] font-[500] leading-[normal]">{srNo}</p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                              <div className="flex-shrink-0">
                                    <img src={`${appUrl}${image ? image : configEnv.DEFAULT_IMG}`} className="rounded-full h-[70px] w-[70px]" alt="Brand" />
                              </div>
                        </div>
                  </div>
                  <div className="col-span-1 items-left pr-[25px]">
                        <p className="text-[#1D2D5C] text-[16px] text-left font-[500] leading-[126%]">{title}</p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${askingPrice}</p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${sellingPrice}</p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        <p className={`inline-flex rounded-full ${bgColor} bg-opacity-10 py-1 px-3 text-sm font-medium ${color}`}>
                              {textStatus}
                        </p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        {(() => {
                              if (paymentStatus === 'Refunded') {
                                    return (
                                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                                Refunded
                                          </p>
                                    );
                              } else if (paymentStatus === 'Processing') {
                                    return (
                                          <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                                Processing
                                          </p>
                                    );
                              } else if (paymentStatus === 'Pending') {
                                    return (
                                          <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                                Pending
                                          </p>
                                    );
                              }
                              else if (paymentStatus === 'Succeed') {
                                    return (
                                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                                Payment Succeed
                                          </p>
                                    );
                              } else {
                                    return (
                                          <p className="inline-flex rounded-full bg-gray-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-gray-500">
                                                N/A
                                          </p>
                                    );
                              }
                        })()}
                  </div>
                  <div className="col-span-1 flex items-center">
                        {rating ?
                              <ReactStars
                                    count={5}
                                    size={15}
                                    value={rating}
                                    isHalf={rating == 2.5}
                                    edit={false}
                                    activeColor="#ffd700"
                                    className="mt-5"
                              />
                              :
                              <span className='cursor-pointer' onClick={handleCLick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                                          <path d="M1 8C1 8 4.5 1 10.625 1C16.75 1 20.25 8 20.25 8C20.25 8 16.75 15 10.625 15C4.5 15 1 8 1 8Z" stroke="#8895A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M10.625 10.625C12.0747 10.625 13.25 9.44975 13.25 8C13.25 6.55025 12.0747 5.375 10.625 5.375C9.17525 5.375 8 6.55025 8 8C8 9.44975 9.17525 10.625 10.625 10.625Z" stroke="#8895A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                              </span>
                        }
                  </div>
            </div>
      )
}
