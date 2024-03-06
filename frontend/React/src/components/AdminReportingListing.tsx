import React, { useEffect, useState } from 'react';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;

const AdminReportingListing = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [getMessage, setMessage] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('usertoken')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${appUrl}getAdminReportListing`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        page,
                        pageSize,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result.data.data)
                    setTotalPages(result.data.totalPages);
                } else {
                    const data = await response.json();
                    setMessage("No Data Found");
                }
            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        };

        fetchData();
    }, [token, page, pageSize]);
    const handlePageChange = (newPage: any) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <div className="bg-white overflow-auto">
            <div className="bg-white border-b border-[#E0E0E0] pt-[30px] md:min-w-auto min-w-[1000px]">

                <div className="grid grid-cols-7 pt-[18px] pb-[15px] px-[48px] border-t border-[#E0E0E0]">
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Image</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Title</p>
                    </div>
                    <div className="col-span-1  items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Price</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Comments</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Reason</p>
                    </div>
                </div>

                {data.map((item) => (
                    <div className="grid grid-cols-7 border-t border-[#E0E0E0] pt-[30px] pb-[30px] px-[48px] md:min-w-auto min-w-[1000px]">
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <div className="flex gap-4 sm:flex-row sm:items-center">
                                <div className="flex-shrink-0">
                                    <img src={`${appUrl}${item.listing_thumbnail ? item.listing_thumbnail : configEnv.DEFAULT_IMG}`} className="rounded-full h-[70px] w-[70px]" alt="Brand" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 items-center flex gap-[10px] pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[600] leading-[126%]">{item.title}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[400] leading-[22px]">USD ${item.asking_price}</p>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <p className="rounded-[5px] bg-[#EDF2F9] px-[20px] py-[14px]  text-[#535D7A] text-[14px] font-[400] leading-[18px]">{item.comment}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#FF5771] text-[14px] font-[400] leading-[22px]">{item.reason}</p>
                        </div>

                    </div>
                ))}


            </div>
            {getMessage && (
                <p className='text-center w-full text-[gray] py-[15px]'>No Data Found</p>
            )}
            <div className="text-center py-[50px]">
                {totalPages > 0 && (
                    <ul className="inline-flex flex-wrap gap-[18px] items-center">
                        <li>
                            <a className="flex h-9 items-center justify-center pagination-button" href="#" onClick={() => handlePageChange(page - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                                    <path d="M5.10746 0C4.88059 0 4.65373 0.0899782 4.47462 0.282791L0.259703 4.82031C-0.0865675 5.19308 -0.0865675 5.81008 0.259703 6.18285L4.47462 10.7204C4.82089 11.0932 5.39403 11.0932 5.7403 10.7204C6.08657 10.3477 6.08657 9.73065 5.7403 9.35788L2.15819 5.50158L5.7403 1.64533C6.08657 1.27256 6.08657 0.655561 5.7403 0.282791C5.57313 0.0899782 5.34627 0 5.10746 0Z" fill="#535D7A" />
                                </svg>
                            </a>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <li key={pageNumber}>
                                <a
                                    className={`flex items-center justify-center text-[#535D7A] text-[18px] border-2 rounded-[3px] py-[8px] px-[15px] font-medium hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark leading-[normal] ${pageNumber === page ? 'active' : ''}`}
                                    href="#"
                                    onClick={() => handlePageChange(pageNumber)}
                                    style={{ borderColor: pageNumber === page ? 'blue' : '#D9D9D9' }}
                                >
                                    {pageNumber}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a className="flex h-9 items-center justify-center pagination-button" href="#" onClick={() => handlePageChange(page + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                                    <path d="M0.892541 0C1.11941 0 1.34627 0.0899782 1.52538 0.282791L5.7403 4.82031C6.08657 5.19308 6.08657 5.81008 5.7403 6.18285L1.52538 10.7204C1.17911 11.0932 0.605973 11.0932 0.259703 10.7204C-0.0865669 10.3477 -0.0865669 9.73065 0.259703 9.35788L3.84181 5.50158L0.259703 1.64533C-0.0865669 1.27256 -0.0865669 0.655561 0.259703 0.282791C0.426867 0.0899782 0.653734 0 0.892541 0Z" fill="#535D7A" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>

    );

}
export default AdminReportingListing;
