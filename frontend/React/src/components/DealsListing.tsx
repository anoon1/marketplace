import { Link } from 'react-router-dom';
import SingleListingCard from './singleListingCard';
import { useEffect, useState } from 'react';
import config from '../config/configuration_keys.json'
import React from 'react';
const DealsListing = () => {
    const [searchTitle, setSearchByTitle] = useState('');
    const [deals, setDeals] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1); // New state to track total pages

    const getUserToken = localStorage.getItem('usertoken');
    const searchByTitle = (event: any) => {
        setSearchByTitle(event.target.value);
        fetch(`${config.baseApiUrl}getDeals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": getUserToken,
                page,
                pageSize,
                searchTitle
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                if (result.data) {
                    setDeals(result.data.data)
                    setTotalPages(result.data.totalPages);
                } else {
                    console.log('No Data Found')
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {

        fetch(`${config.baseApiUrl}getDeals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": getUserToken,
                page,
                pageSize,
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                if (result.data) {
                    setDeals(result.data.data)
                    setTotalPages(result.data.totalPages);
                }
            })
            .catch(error => console.log('error', error));
    }, [getUserToken, page, pageSize])
    let [serialNumber, setSerialNumber] = useState(0);
    React.useEffect(() => {
        let itemsPerPage = pageSize
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
            <div className="pt-[25px] md:px-[30px] px-[15px]">
                <form className="">
                    <div className="relative md:mb-[55px] mb-[35px] max-w-[565px]">
                        <input type="text" name="searchByTitle" onChange={searchByTitle} className="w-full rounded-[4px] bg-[#FFF] py-[12px] pl-[48px] pr-10 text-[14px] outline-none focus:border-primary border border-[#E0E0E0] text-[#64748B] leading-[24px] placeholder:text-[#64748b80] placeholder:text-[14px]" placeholder="Type to search..." />
                        <button className="absolute top-1/2 left-[15px] -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g opacity="0.5">
                                    <path d="M7.66667 14.3333C11.3486 14.3333 14.3333 11.3486 14.3333 7.66667C14.3333 3.98477 11.3486 1 7.66667 1C3.98477 1 1 3.98477 1 7.66667C1 11.3486 3.98477 14.3333 7.66667 14.3333Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 16L12.375 12.375" stroke="#64748B" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            <div className='bg-white overflow-auto'>

                <div className="bg-white border-b border-[#E0E0E0]">

                    <div className="grid items-baseline grid-cols-9 md:pt-[24px] pt-[18px] pb-[18px] md:px-[56px] px-[15px] overflow-auto sm:grid-cols-8 md:min-w-auto min-w-[1000px]">
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Sr.No</p>
                        </div>
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Image</p>
                        </div>
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Title</p>
                        </div>
                        <div className="col-span-1 items-center flex leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Asking Price</p>
                        </div>
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Selling Price</p>
                        </div>
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Status</p>
                        </div>
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Payment Status</p>
                        </div>
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[28px]">Action</p>
                        </div>
                    </div>

                    <div className="text-center py-[0]">
                        {deals && deals.length > 0 ?
                            deals.map((el: any, idx) => {

                                return (
                                    <SingleListingCard
                                        id={el.dealsId}
                                        srNo={++serialNumber}
                                        image={el.listing_thumbnail ? el.listing_thumbnail : ''}
                                        title={el.title}
                                        askingPrice={el.asking_price}
                                        sellingPrice={el.selling_price}
                                        status={el.dealsStatus}
                                        paymentStatus={el.paymentStatus}
                                        rating={el.rating}
                                    />
                                )
                            })
                            :
                            <p className="text-[#1D2D5C] text-center text-[20px] font-[500] leading-[normal]">Not Found</p>
                        }

                        {totalPages > 0 && (
                            <ul className="inline-flex flex-wrap gap-[18px] items-center md:mt-[30px] md:mb-[40px] mt-[25px] mb-[30px]">
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

            </div>


        </div>

    );
};

export default DealsListing;
