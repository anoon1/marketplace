import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import SingleListingCard from './singleListingCard';
import { useEffect, useState } from 'react';
import config from '../config/configuration_keys.json'
import React from 'react';
const DEFAULT_PAGE_SIZE = 10;
const AdminBuyerDealsListing = () => {
    const appUrl = config.baseApiUrl
    const token = localStorage.getItem('usertoken');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptModal, setAcceptModalData] = useState(false);
    const [error, setError] = useState(null);
    const [showUpdateModal, setUpdateModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedData, setDataOfSelected] = useState(null);
    const [showAcceptModal, setAcceptModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(1); // 
    const [reject, setReject] = useState(false);
    const [message, setMessage] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${appUrl}getAllBuyersDeals`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ token: token, page, pageSize })
                });
                if (response.ok) {

                    const resData = await response.json();
                    if (resData.data.data.length > 0) {
                        setData(resData.data.data);
                        setTotalPages(resData.data.totalPages);
                    } else {
                        setMessage('No Data Found');
                    }
                } else {
                    setMessage('No Data Found');
                }
            } catch (err) {
                console.log('Error while getting listing data', err);
                setError('Error while fetching data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [page, pageSize]);

    let [serialNumber, setSerialNumber] = useState(1);
    React.useEffect(() => {
        let itemsPerPage = DEFAULT_PAGE_SIZE
        const newSerialNumber = (page - 1) * itemsPerPage;
        setSerialNumber(newSerialNumber);
    }, [page]);
    const handlePageChange = (newPage: any) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <div className="bg-white">
            <div className="pt-[25px] px-[30px]">
            </div>

            <div className="bg-white border-b border-[#E0E0E0]  overflow-auto">

                <div className="grid grid-cols-10 pt-[24px] pb-[18px] px-[56px] sm:grid-cols-10  overflow-auto md:min-w-auto min-w-[1150px]">
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px]">Sr.No</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px]">Image</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px]">Title</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px]">Description</p>
                    </div>
                    <div className="col-span-1  items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px] whitespace-nowrap">Asking Price</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px] whitespace-nowrap">Selling Price</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] pr-[15px]">Status</p>
                    </div>

                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[28px] pr-[15px]">Action</p>
                    </div>
                </div>

                {data.map((item) => (
                    <div className="grid grid-cols-10 border-t border-[#E0E0E0] pt-[13px] pb-[14px] px-[56px] sm:grid-cols-10 items-center md:min-w-auto min-w-[1150px]">
                        <div className="col-span-1 items-left pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal]">{++serialNumber}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex-shrink-0">
                                    <img src={`${config.baseApiUrl}${item.listing_thumbnail ? item.listing_thumbnail : config.DEFAULT_IMG}`} className="rounded-full h-[70px] w-[70px]" alt="Brand" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 items-left pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[126%]">{item.title}</p>
                        </div>
                        <div className="col-span-2 items-left pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[126%]">{item.description}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${item.asking_price}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${item.selling_price}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            {(() => {
                                if (item.status === 1) {
                                    return (
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                            Approved
                                        </p>
                                    );
                                } else if (item.status === 2) {
                                    return (
                                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                            Pending
                                        </p>
                                    );
                                } else if (item.status === 3) {
                                    return (
                                        <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                                            Rejected
                                        </p>
                                    );
                                } else {
                                    return (
                                        <p className="inline-flex rounded-full bg-gray-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-gray-500">
                                            Unknown
                                        </p>
                                    );
                                }
                            })()}
                        </div>
                        <Link to="">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                                    <path d="M1 8C1 8 4.5 1 10.625 1C16.75 1 20.25 8 20.25 8C20.25 8 16.75 15 10.625 15C4.5 15 1 8 1 8Z" stroke="#8895A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.625 10.625C12.0747 10.625 13.25 9.44975 13.25 8C13.25 6.55025 12.0747 5.375 10.625 5.375C9.17525 5.375 8 6.55025 8 8C8 9.44975 9.17525 10.625 10.625 10.625Z" stroke="#8895A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                ))}


            </div>
            {message && (
                <span className="bg-[gray] text-center mt-[9px] max-w-[708px] w-full rounded-lg py-[15px]">{message && <p>{message}</p>}</span>
            )}
            <div className="text-center py-[50px]">
                {totalPages > 0 && (
                    <ul className="inline-flex flex-wrap gap-[18px] items-center">
                        <li>
                            {/* Previous Page Button */}
                            <a className="flex h-9 items-center justify-center pagination-button" href="#" onClick={() => handlePageChange(page - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                                    <path d="M5.10746 0C4.88059 0 4.65373 0.0899782 4.47462 0.282791L0.259703 4.82031C-0.0865675 5.19308 -0.0865675 5.81008 0.259703 6.18285L4.47462 10.7204C4.82089 11.0932 5.39403 11.0932 5.7403 10.7204C6.08657 10.3477 6.08657 9.73065 5.7403 9.35788L2.15819 5.50158L5.7403 1.64533C6.08657 1.27256 6.08657 0.655561 5.7403 0.282791C5.57313 0.0899782 5.34627 0 5.10746 0Z" fill="#535D7A" />
                                </svg>
                            </a>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <li key={pageNumber}>
                                {/* Change the 'href' and 'onClick' as needed */}
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
                            {/* Next Page Button */}
                            <a className="flex h-9 items-center justify-center pagination-button" href="#" onClick={() => handlePageChange(page + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                                    <path d="M0.892541 0C1.11941 0 1.34627 0.0899782 1.52538 0.282791L5.7403 4.82031C6.08657 5.19308 6.08657 5.81008 5.7403 6.18285L1.52538 10.7204C1.17911 11.0932 0.605973 11.0932 0.259703 10.7204C-0.0865669 10.3477 -0.0865669 9.73065 0.259703 9.35788L3.84181 5.50158L0.259703 1.64533C-0.0865669 1.27256 -0.0865669 0.655561 0.259703 0.282791C0.426867 0.0899782 0.653734 0 0.892541 0Z" fill="#535D7A" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                )}
            </div>


        </div >

    );
};

export default AdminBuyerDealsListing;
