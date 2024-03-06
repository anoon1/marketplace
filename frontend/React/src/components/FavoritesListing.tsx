import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
const FavoritesListing = () => {
    let DEFAULT_PAGE_SIZE = 10;
    const getUserToken = localStorage.getItem('usertoken');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [noDataMessage, setNoDataMessage] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchByName, setSearchByName] = useState('');
    const updateTotalPages = (newTotalPages) => {
        setTotalPages(newTotalPages);
    };
    const handleSearchByName = async (event: any) => {
        setSearchByName(event.target.value);
        try {
            if (!appUrl) {
                throw new Error('REACT_APP_URL is not defined');
            }

            const response = await fetch(`${appUrl}getFavourite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: getUserToken,
                    page,
                    pageSize,
                    searchByName
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            if (responseData.data.data.length == 0) {
                setNoDataMessage('Data Not Found')
            } else {
                setNoDataMessage('');
                setData(responseData.data.data);

                updateTotalPages(responseData.data.totalPages);
                setTotalPages(responseData.data.totalPages);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!appUrl) {
                    throw new Error('REACT_APP_URL is not defined');
                }

                const response = await fetch(`${appUrl}getFavourite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: getUserToken,
                        page,
                        pageSize,
                        searchByName
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();


                if (responseData.data.data.length == 0) {
                    setNoDataMessage('Data Not Found')
                } else {
                    setNoDataMessage('');
                    setData(responseData.data.data);

                    updateTotalPages(responseData.data.totalPages);
                    setTotalPages(responseData.data.totalPages);
                }
                setData(responseData.data.data);

                setTotalPages(responseData.data.totalPages);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getUserToken, page, pageSize, searchByName]);
    let [serialNumber, setSerialNumber] = useState(0);

    const handlePageChange = (newPage: any) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    React.useEffect(() => {
        let itemsPerPage = DEFAULT_PAGE_SIZE
        const newSerialNumber = (page - 1) * itemsPerPage;
        setSerialNumber(newSerialNumber);
    }, [page]);



    return (
        <div className="bg-white overflow-auto">
            <div className="pt-[25px] md:px-[30px] px-[15px]">
                <form className="">
                    <div className="relative md:mb-[55px] mb-[25px] max-w-[565px]">
                        <input type="text" className="w-full rounded-[4px] bg-[#FFF] py-[12px] pl-[48px] pr-10 text-[14px] outline-none focus:border-primary border border-[#E0E0E0] text-[#64748B] leading-[24px] placeholder:text-[#64748b80] placeholder:text-[14px]" name='searchByName' onChange={handleSearchByName} placeholder="Type to search..." />
                        <button className="absolute top-1/2 left-[15px] -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g opacity="0.5">
                                    <path d="M7.66667 14.3333C11.3486 14.3333 14.3333 11.3486 14.3333 7.66667C14.3333 3.98477 11.3486 1 7.66667 1C3.98477 1 1 3.98477 1 7.66667C1 11.3486 3.98477 14.3333 7.66667 14.3333Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 16L12.375 12.375" stroke="#64748B" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white border-b border-[#E0E0E0] md:min-w-auto min-w-[900px]">

                <div className="grid grid-cols-8 pt-[24px] pb-[18px] md:px-[56px] px-[15px]">
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Sr.No</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Image</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Title</p>
                    </div>
                    <div className="col-span-2 items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Description</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Asking Price</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[28px]">Action</p>
                    </div>
                </div>
                {data.map((item) => (
                    <div className="grid grid-cols-8 border-t border-[#E0E0E0] pt-[13px] pb-[14px] md:px-[56px] px-[15px] items-center">
                        <div className="col-span-1 items-left pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal]">{++serialNumber}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        src={`${appUrl}${item.listing_thumbnail ? item.listing_thumbnail : configEnv.DEFAULT_IMG}`}
                                        alt="Brand"
                                        className="rounded-full h-[70px] w-[70px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 items-left pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[126%]">{item.title}</p>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <p className="text-[#535D7A] text-[14px] font-[400] leading-[20px]">
                                {item.description}
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${item.asking_price}</p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Link to="">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                                        <path d="M1 8C1 8 4.5 1 10.625 1C16.75 1 20.25 8 20.25 8C20.25 8 16.75 15 10.625 15C4.5 15 1 8 1 8Z" stroke="#8895A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.625 10.625C12.0747 10.625 13.25 9.44975 13.25 8C13.25 6.55025 12.0747 5.375 10.625 5.375C9.17525 5.375 8 6.55025 8 8C8 9.44975 9.17525 10.625 10.625 10.625Z" stroke="#8895A7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>

            <div className='text-center p-10'>
                <span className='text-[#1D2D5C] text-center text-[20px] font-[500] leading-[normal]'>{noDataMessage}</span>
            </div>

            <div className="text-center py-[50px]">
                {totalPages > 0 && data.length > 0 && (
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
};

export default FavoritesListing;
