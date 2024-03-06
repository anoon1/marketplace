import React, { useEffect, useState } from 'react';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
import { useNavigate } from 'react-router-dom';
import RejectionReason from './BidRejectionReason';
import SuccessfullyAccepted from "../components/BidSucessfullyAccepted";
const DEFAULT_PAGE_SIZE = 10;
const ReportingList = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(1); // New state to track total pages
    const [showAcceptModal, setAcceptModal] = useState(false);
    const [selectedData, setDataOfSelected] = useState(null);
    const [showUpdateModal, setUpdateModal] = useState(false);
    const [getStatus, setStatus] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [reject, setReject] = useState(false);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState<string | null>(null);
    const token = localStorage.getItem('usertoken');


    const fetchData = async () => {
        try {
            const response = await fetch(`${appUrl}getSellerBid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    getStatus,
                    page,
                    pageSize,
                }),
            });
            const data = await response.json();

            if (data.data.data.length === 0) {
                setData([]);
                setMessage('No Bid Found')
            } else {
                const formattedData = data.data.data.map(item => {
                    const formattedDate = new Date(item.created_at);
                    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                    const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                    setMessage('')
                    return {
                        ...item,
                        formattedCreatedAt: `${dateFormatter.format(formattedDate)} ${timeFormatter.format(formattedDate)}`,
                    };
                });
                setData(formattedData);
                setTotalPages(data.data.totalPages);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    useEffect(() => {
        fetchData();
    }, [token, getStatus, page, pageSize]);

    const handleAccept = async (bidId: any) => {
        try {
            const response = await fetch(`${appUrl}updateBidStatus`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ bidId, token: token, status: '1' }),
            });

            if (response.ok) {
                setAcceptModal(true);

            } else {
                setMessage('No Data Found');
            }
        } catch (err) {
            console.log('error while sending report ', err);
        }

    }
    const requestpayment = async (bidId: any) => {
        try {
            const response = await fetch(`${appUrl}acceptpayment`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ bidId, token: token }),
            }).then(response => response.text()).then(result => {
                const jsonObject = JSON.parse(result);
                const sellerLink = jsonObject.link.seller_link;
                let url = sellerLink
                window.open(url, '', 'width=1000, height=850')
            });
        } catch (err) {
            console.log('error while sending report ', err);
        }

    }
    const handleReject = (itemId) => {
        setDataOfSelected(itemId);
        setUpdateModal(true);
    }
    const handleClose = () => {
        setAcceptModal(false)
        fetchData();
    }

    const updateOnClose = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUpdateModal(false);
        setReject(true);
        setSelectedItemId(null);
        fetchData();
    };

    const handlePageChange = (newPage: any) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <div className="bg-white overflow-auto">
            {showUpdateModal && (
                <RejectionReason
                    onClose={updateOnClose}
                    data={selectedData}
                />
            )}
            {showAcceptModal && (
                <SuccessfullyAccepted
                    onClose={handleClose}
                />
            )}
            <div className="bg-white border-b border-[#E0E0E0] pt-[30px] md:min-w-auto min-w-[900px]">
                <div className='text-end pb-4 pr-4'>
                    <label htmlFor="bidStatus" className="text-gray-700">Bids Status : </label>
                    <select
                        onChange={(e) => setStatus(e.target.value)}
                        id="bidStatus"
                        className="appearance-none w-50 bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    >
                        <option value=''>All</option>
                        <option value='1' selected={getStatus === '1'}>Approved</option>
                        <option value='2' selected={getStatus === '2'}>Pending</option>
                        <option value='3' selected={getStatus === '3'}>Rejected</option>
                    </select>
                </div>


                <div className="grid grid-cols-10 pt-[18px] pb-[15px] px-[48px] border-t border-[#E0E0E0]">
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Image</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Title</p>
                    </div>
                    <div className="col-span-1 items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Bid Price</p>
                    </div>
                    <div className="col-span-1.5 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Bid By</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Bid Posted At</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Status</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Payment Status</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Action</p>
                    </div>
                </div>

                {data.map((item) => (
                    <div className="grid grid-cols-10 border-t border-[#E0E0E0] pt-[30px]  pb-[30px] px-[48px]">

                        <div className="col-span-1 flex items-center pr-[25px]">
                            <div className="flex gap-4 sm:flex-row sm:items-center">
                                <div className="flex-shrink-0">
                                    {item.listing_thumbnail ? (
                                        <img src={`${appUrl}${item.listing_thumbnail}`} alt="Brand" className="h-[60px]" />
                                    ) : (
                                        <img src={`${appUrl}${configEnv.DEFAULT_IMG}`} alt="Default" className="h-[60px] w-[60px]" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 items-center flex gap-[10px] pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[600] leading-[126%]">{item.title}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[400] leading-[22px]">USD ${item.selling_price}</p>
                        </div>
                        <div className="col-span-1.5 flex items-center pr-[25px]">
                            <p className="rounded-[5px] bg-[#EDF2F9] px-[20px] py-[14px]  text-[#535D7A] text-[14px] font-[400] leading-[18px]">{item.name}</p>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <p className="text-[#FF5771] text-[14px] font-[400] leading-[22px]">{item.formattedCreatedAt}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            {(() => {
                                if (item.bid_status === 1) {
                                    return (
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                            Approved
                                        </p>
                                    );
                                } else if (item.bid_status === 2) {
                                    return (
                                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                            Pending
                                        </p>
                                    );
                                } else if (item.bid_status === 3) {
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
                        <div className="col-span-1 flex items-center">
                            {(() => {
                                if (item.paymentStatus === 'Refunded') {
                                    return (
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                            Refunded
                                        </p>
                                    );
                                } else if (item.paymentStatus === 'Processing') {
                                    return (
                                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                            Processing
                                        </p>
                                    );
                                } else if (item.paymentStatus === 'Succeed') {
                                    return (
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                            Payment Succeed
                                        </p>
                                    );
                                }
                                else if (item.paymentStatus === 'Pending') {
                                    return (
                                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                            Pending
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
                        <div className="col-span-2 flex items-center">
                            <div className="flex items-center gap-[6px]">

                                {getStatus === '2' && (
                                    <>
                                        <button onClick={() => handleAccept(item.id)} className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">
                                            Approve
                                        </button>

                                        <button onClick={() => handleReject(item.id)} className="inline-flex items-center justify-center rounded-md bg-[red] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">
                                            Reject
                                        </button>
                                    </>
                                )}

                                {getStatus === '1' && (
                                    <button onClick={() => requestpayment(item.id)} className="inline-flex items-center justify-center rounded-md bg-meta-3 py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]" type="button">Request Payment</button>
                                )}

                                {getStatus === '3' && (
                                    <span className="inline-flex items-center justify-center rounded-md text-[red] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] leading-[23px]">
                                        N/A
                                    </span>
                                )}

                                {getStatus == '' && (
                                    <>
                                        {item.bid_status === 2 && (
                                            <>
                                                <button onClick={() => handleAccept(item.id)} className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">
                                                    Approve
                                                </button>

                                                <button onClick={() => handleReject(item.id)} className="inline-flex items-center justify-center rounded-md bg-[red] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {item.bid_status === 1 && (
                                            <button onClick={() => requestpayment(item.id)} className="inline-flex items-center justify-center rounded-md bg-meta-3 py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]" type="button">
                                                Request  Payment
                                            </button>
                                        )}

                                        {item.bid_status === 3 && (
                                            <span className="inline-flex items-center justify-center rounded-md text-[red] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] leading-[23px]">
                                                N/A
                                            </span>
                                        )}

                                    </>
                                )}

                            </div>
                        </div>


                    </div>
                ))}


            </div>
            {message && (
                <span className="bg-[gray] text-center mt-[9px] max-w-[708px] w-full rounded-lg py-[15px]">{message && <p>{message}</p>}</span>
            )}
            <div className="text-center py-[50px]">
                <ul className="inline-flex flex-wrap gap-[18px] items-center justify-center">
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
            </div>

        </div>

    );
};

export default ReportingList;
