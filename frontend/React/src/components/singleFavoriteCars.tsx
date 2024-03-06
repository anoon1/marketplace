import { Link } from 'react-router-dom'

export default function singleFavoriteCars({
      image,
      title,
      askingPrice,
      description
}) {
      return (
            <div className="grid grid-cols-8 border-t border-[#E0E0E0] pt-[13px] pb-[14px] px-[56px] items-center">
                  <div className="col-span-1 items-left pr-[25px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal]">1</p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                              <div className="flex-shrink-0">
                                    <img src={image ? image : "/assets/listing-img0.svg"} alt="Brand" />
                              </div>
                        </div>
                  </div>
                  <div className="col-span-2 items-left pr-[25px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[126%]">{title}</p>
                  </div>
                  <div className="col-span-2 flex items-center pr-[25px]">
                        <p className="text-[#535D7A] text-[14px] font-[400] leading-[20px]">
                             {description}
                        </p>
                  </div>
                  <div className="col-span-1 flex items-center pr-[25px]">
                        <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${askingPrice}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                        <Link to="">
                              <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                                          <path d="M1 8C1 8 4.5 1 10.625 1C16.75 1 20.25 8 20.25 8C20.25 8 16.75 15 10.625 15C4.5 15 1 8 1 8Z" stroke="#8895A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M10.625 10.625C12.0747 10.625 13.25 9.44975 13.25 8C13.25 6.55025 12.0747 5.375 10.625 5.375C9.17525 5.375 8 6.55025 8 8C8 9.44975 9.17525 10.625 10.625 10.625Z" stroke="#8895A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                              </span>
                        </Link>
                  </div>
            </div>
      )
}
