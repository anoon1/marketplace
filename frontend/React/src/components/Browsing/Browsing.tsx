import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config/configuration_keys.json';
import SingleBrowsingCard from './SingleBrowsingCard';

const Browsing = () => {
    const [listing, setListing] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState('All');
    const [price, setPrice] = useState('All');
    const [review, setReview] = useState('All');
    const [searchByName, setSearchByName] = useState("");
    const getUserToken = localStorage.getItem('usertoken');
    useEffect(() => {
        getData();
    }, [getUserToken, page, pageSize])

    useEffect(() => {
        const fetchDataWithSearch = () => {
            fetch(`${config.baseApiUrl}getAllListing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": getUserToken,
                    page,
                    pageSize,
                    category,
                    price,
                    review,
                    searchByName
                }),
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.data) {
                        setListing(result.data.data)
                        setTotalPages(result.data.totalPages);
                    }
                })
                .catch(error => console.log('error', error));
        }
        fetchDataWithSearch();
    }, [searchByName, getUserToken, page, pageSize])

    useEffect(() => {
        const fetchDataWithSearchByName = () => {
            fetch(`${config.baseApiUrl}getAllListing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": getUserToken,
                    page,
                    pageSize,
                    searchByName
                }),
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.data) {
                        setListing(result.data.data)
                        setTotalPages(result.data.totalPages);
                    }
                })
                .catch(error => console.log('error', error));
        }
        fetchDataWithSearchByName();
    }, [searchByName, getUserToken, page, pageSize])

    const getData = () => {
        fetch(`${config.baseApiUrl}getAllListing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": getUserToken,
                page,
                pageSize,
                category,
                price,
                review
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                if (result.data) {
                    setListing(result.data.data)
                    setTotalPages(result.data.totalPages);
                }
            })
            .catch(error => console.log('error', error));
    }

    const handleSubmit = () => {
        fetch(`${config.baseApiUrl}getAllListing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": getUserToken,
                page,
                pageSize,
                category,
                price,
                review
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                if (result.data) {
                    setListing(result.data.data)
                    setTotalPages(result.data.totalPages);
                }
            })
            .catch(error => console.log('error', error));
    }

    const handlePageChange = (newPage: any) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const getListingCategory = listing.length > 0 ? [...new Set(listing.map(item => item.industry_type))] : [];



    return (
        <>
            <div className="mt-[-10px]">
                {/* <form className=""> */}
                <div className="relative mb-[42px]">
                    <input type="text" onChange={(e) => {
                        setSearchByName(e.target.value);
                    }}
                        className="w-full rounded-[4px] bg-[#FFF] py-[12px] pl-[48px] pr-10 text-[14px] outline-none focus:border-primary text-[#64748B] leading-[24px] placeholder:text-[#64748b80] placeholder:text-[14px]"
                        placeholder="Type to search..." />
                    <button className="absolute top-1/2 left-[15px] -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g opacity="0.5">
                                <path d="M7.66667 14.3333C11.3486 14.3333 14.3333 11.3486 14.3333 7.66667C14.3333 3.98477 11.3486 1 7.66667 1C3.98477 1 1 3.98477 1 7.66667C1 11.3486 3.98477 14.3333 7.66667 14.3333Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 16L12.375 12.375" stroke="#64748B" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-[20px] md:justify-center justify-start flex-wrap">
                    <span className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mr-[5px]">
                        Filter By:
                    </span>
                    <div className="relative z-20">
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className="relative w-auto appearance-none rounded-[5px] border border-[#2174F5] bg-[#F1F5F9] md:pt-[14px] pt-[10px] md:pb-[16px] pb-[12px] md:px-12 md:pl-[23px] pl-[15px] md:pr-[70px] pr-[45px] outline-none transition focus:border-primary"
                        >
                            <option value="All">Category: All</option>
                            {getListingCategory.map((categoryValue, index) => (
                                <option key={index} value={categoryValue}>
                                    {categoryValue}
                                </option>
                            ))}
                        </select>

                        <span className="absolute top-1/2 md:right-[22px] right-[15px] -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                <path d="M10.319 0.738144C10.319 0.928144 10.237 1.11814 10.0613 1.26814L5.92612 4.79812C5.58641 5.08812 5.02412 5.08812 4.68441 4.79812L0.549219 1.26814C0.209505 0.978144 0.209505 0.498145 0.549219 0.208145C0.888933 -0.0818553 1.45122 -0.0818553 1.79093 0.208145L2.05896 0.436943C3.92884 2.03316 6.68169 2.03315 8.55156 0.436921L8.81955 0.208144C9.15927 -0.0818556 9.72155 -0.0818556 10.0613 0.208144C10.237 0.348144 10.319 0.538144 10.319 0.738144Z" fill="#292D32" />
                            </svg>
                        </span>
                    </div>
                    <div className="relative z-20">
                        <select onChange={(e) => setPrice(e.target.value)} className="relative w-auto appearance-none rounded-[5px] border border-[#2174F5] bg-[#F1F5F9] md:pt-[14px] pt-[10px] md:pb-[16px] pb-[12px] md:px-12 md:pl-[23px] pl-[15px] md:pr-[70px] pr-[45px] outline-none transition focus:border-primary">
                            <option value="All">Price: All</option>
                            <option value="high">High to Low</option>
                            <option value="low">Low to High</option>
                        </select>
                        <span className="absolute top-1/2 md:right-[22px] right-[15px] -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                <path d="M10.319 0.738144C10.319 0.928144 10.237 1.11814 10.0613 1.26814L5.92612 4.79812C5.58641 5.08812 5.02412 5.08812 4.68441 4.79812L0.549219 1.26814C0.209505 0.978144 0.209505 0.498145 0.549219 0.208145C0.888933 -0.0818553 1.45122 -0.0818553 1.79093 0.208145L2.05896 0.436943C3.92884 2.03316 6.68169 2.03315 8.55156 0.436921L8.81955 0.208144C9.15927 -0.0818556 9.72155 -0.0818556 10.0613 0.208144C10.237 0.348144 10.319 0.538144 10.319 0.738144Z" fill="#292D32" />
                            </svg>
                        </span>
                    </div>
                    <div className="relative z-20">
                        <select onChange={(e) => setReview(e.target.value)} className="relative w-auto appearance-none rounded-[5px] border border-[#2174F5] bg-[#F1F5F9] md:pt-[14px] pt-[10px] md:pb-[16px] pb-[12px] md:px-12 md:pl-[23px] pl-[15px] md:pr-[70px] pr-[45px] outline-none transition focus:border-primary">
                            <option value="All">Reviews: All</option>
                            <option value="5">5 Star</option>
                            <option value="4">4 Star</option>
                            <option value="3">3 Star</option>
                            <option value="2">2 Star</option>
                            <option value="1">1 Star</option>
                        </select>
                        <span className="absolute top-1/2 md:right-[22px] right-[15px] -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                <path d="M10.319 0.738144C10.319 0.928144 10.237 1.11814 10.0613 1.26814L5.92612 4.79812C5.58641 5.08812 5.02412 5.08812 4.68441 4.79812L0.549219 1.26814C0.209505 0.978144 0.209505 0.498145 0.549219 0.208145C0.888933 -0.0818553 1.45122 -0.0818553 1.79093 0.208145L2.05896 0.436943C3.92884 2.03316 6.68169 2.03315 8.55156 0.436921L8.81955 0.208144C9.15927 -0.0818556 9.72155 -0.0818556 10.0613 0.208144C10.237 0.348144 10.319 0.538144 10.319 0.738144Z" fill="#292D32" />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="inline-flex items-center justify-center rounded-[5px] bg-[#2174F5] md:py-[16px] py-[12px] md:px-[35px] px-[30px] text-center font-[500] text-[#FFF] text-[18px] hover:bg-opacity-90 leading-[23px]">
                            Apply
                        </button>
                    </div>
                </div>
                {/* </form> */}
            </div>

            <div className="flex justify-start flex-wrap gap-[24px] mt-[36px] md:gap-y-[45px] gap-y-[25px]">
                {listing && listing.length > 0 ?
                    listing.map((el, idx) => {
                        return (
                            <>
                                <SingleBrowsingCard data={el} />

                            </>
                        )
                    })
                    :
                    <div className="grid grid-cols-1 border-t border-[#E0E0E0] pt-[13px] pb-[14px] px-[56px] sm:grid-cols-1 justify-center items-center">
                        <p className="text-[#1D2D5C] text-center text-[20px] font-[500] leading-[normal]">Not Found</p>
                    </div>
                }

            </div>

            <div className="text-center py-[60px] pb-[40px]">
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
            </div>
        </>
    );
};

export default Browsing;
