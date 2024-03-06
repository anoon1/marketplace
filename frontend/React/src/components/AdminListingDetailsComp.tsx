import ReactStars from 'react-rating-stars-component';
import configEnv from '../config/configuration_keys.json';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import RejectionReason from './RejectionReason';
const appUrl = configEnv.baseApiUrl;
import SuccessfullyAccepted from "../components/SuccessfullyAccepted";
const DEFAULT_PAGE_SIZE = 10;
const AdminListingDetailsComp = () => {
    const location = useLocation();
    const { status } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('usertoken');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptModal, setAcceptModalData] = useState(false);
    const [error, setError] = useState('');
    const [showUpdateModal, setUpdateModal] = useState(false);
    const [isApproved, setApprove] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [getStatus, setStatus] = useState("2");
    const [selectedData, setDataOfSelected] = useState(null);
    const [showAcceptModal, setAcceptModal] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(1); // 
    const [reject, setReject] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    useEffect(() => {
        setStatus('');
        const queryParams = new URLSearchParams(location.search);
        const queryStatus = queryParams.get("status");
        if (queryStatus == '4') {
            setStatus('')
        } else {
            setStatus(queryStatus)
        }
    }, [status, location.search])
    const handleAccept = async (listingId: any, sellerId: any) => {
        const isDis = await fetchDocumentData(listingId, sellerId);
        if (isDis === 'approve') {
            try {
                const response = await fetch(`${appUrl}updateListingStatus`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ listingId, page, pageSize, token, status: '1' }),
                });

                if (response.ok) {
                    setAcceptModal(true);
                    setAcceptModalData(true);
                    fetchData();
                } else {
                    setMessage('No Data Found');
                }
            } catch (err) {
                console.log('error while sending report ', err);
            }
        } else if (isDis === 'disapprove') {
            alert("Documents Rejected");
        } else if (isDis === 'pending') {
            alert('Please approve documents first')
        } else {
            alert('Documents not found');
        }
    }

    async function fetchDocumentData(listingId: any, seller_id: any) {

        try {
            const response = await fetch(`${appUrl}getSellerDocImages`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ listingId, seller_id, token }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.data.data[0].allDoc == null) {
                    return 'notFound';
                } else {
                    if (responseData?.data?.data[0]?.status == '1') {
                        return 'approve';
                    } else if (responseData?.data?.data[0]?.status == '2') {
                        return 'pending'
                    } else {
                        return 'disapprove';
                    }
                }
            } else {
                console.error('Error in fetch request:', response.status, response.statusText);
                alert('No Documents Found');
            }
        } catch (err) {
            console.error('Error while sending report:', err);
        }
    }



    const handleReject = (itemId: any) => {
        setDataOfSelected(itemId);
        setUpdateModal(true);
    }
    const handleClose = () => {
        setAcceptModal(false)
        window.location.reload(false)
        fetchData();
    }

    const updateOnClose = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUpdateModal(false);
        setReject(true);
        setSelectedItemId(null);

        window.location.reload(false)
    };
    const fetchData = async () => {
        try {
            const response = await fetch(`${appUrl}getAllCreatedListing`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ token: token, getStatus, page, pageSize })
            });
            if (response.ok) {
                const resData = await response.json();
                if (resData.data.data.length == 0) {
                    setMessage('No Data Found');
                    setData([]);

                } else {
                    setMessage('');
                    setData(resData.data.data);
                    setTotalPages(resData.data.totalPages);
                }
            } else {
                setMessage('No Data Found');
                setData([]);
            }
        } catch (err) {
            console.log('Error while getting listing data', err);
            setError('Error while fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize, getStatus]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);

        }
    };

    async function handleOnClickView(listingId: any, seller_id: any) {
        try {
            const response = await fetch(`${appUrl}getSellerDocImages`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ listingId, seller_id, token }),
            });

            if (response.ok) {
                const responseData = await response.json();

                if (!responseData.data || !responseData.data.data || responseData.data.data.length === 0) {
                    alert('No Data Found');
                } else {
                    const user_id = responseData.data.data[0].user_id;
                    const listing_id = responseData.data.data[0].listing_id;

                    if (!user_id || !listing_id) {
                        alert('Documents not found');
                    } else {
                        let userID, listingID;

                        try {
                            userID = btoa(user_id);
                            listingID = btoa(listing_id);
                        } catch (error) {
                            alert('Error decoding base64 strings');
                            console.error(error);
                            return;
                        }

                        navigate(`/OnboardingAdmin/DocumentViewer?uid=${userID}&lid=${listingID}`);
                    }
                }

            } else {
                console.error('Error in fetch request:', response.status, response.statusText);
                alert('No Documents Found');
            }
        } catch (err) {
            console.error('Error while sending report:', err);
        }
    }



    return (
        <div className="bg-white">
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
            <div className="bg-white border-b border-[#E0E0E0] overflow-auto">

                <div className="grid grid-cols-10 pt-[24px] pb-[18px] px-[56px] sm:grid-cols-10 overflow-auto md:min-w-auto min-w-[1150px] gap-x-8 ">
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Image</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Title</p>
                    </div>
                    <div className="col-span-2  items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Description</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Downloads</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] whitespace-nowrap">Asking Price</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px] whitespace-nowrap">Created By</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Status</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px] pr-[15px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Documents</p>
                    </div>

                    {/* <div className="col-span-1 flex items-center leading-[18px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Status</p>
                        </div> */}
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[28px]">Action</p>
                    </div>
                </div>
                {data.length > 0 && data.map((item) => (
                    <div className="grid grid-cols-10 border-t border-[#E0E0E0] pt-[10px] pb-[12px] px-[56px] sm:grid-cols-10   md:min-w-auto min-w-[1150px] gap-x-8">
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex-shrink-0">
                                    {/* {item.listing_thumbnail ? (
                                            <img src={`${appUrl}${item.listing_thumbnail}`} alt="Brand" className="h-[50px]" />
                                        ) : (
                                            <img src={`${appUrl}${configEnv.DEFAULT_IMG}`} alt="Default" className="h-[50px] w-[50px]" />
                                        )} */}
                                    <img src={`${appUrl}${item.listing_thumbnail ? item.listing_thumbnail : configEnv.DEFAULT_IMG}`} alt="Default" className="h-[50px] w-[50px]" />

                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 items-left flex flex-col gap-[10px] pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[126%]">{item.title}</p>
                            <span className="text-[#1D2D5C] font-[400] z-0 text-[14px] flex gap-[3px]">{item.rating}
                                <ReactStars
                                    count={5}
                                    size={15}
                                    value={item.rating}
                                    activeColor="#ffd700"
                                    isHalf={true}
                                    className="mt-5"
                                    edit={false}
                                />
                            </span>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <p className="text-[#535D7A] text-[14px] font-[400] leading-[22px]">{item.description}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#535D7A] text-[14px] font-[400] leading-[22px]">{item.downloads}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">USD ${item.asking_price}</p>
                        </div>
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">{item.name}</p>
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
                        <div className="col-span-1 flex items-center leading-[18px]">
                            <button onClick={() => handleOnClickView(item.id, item.seller_id)} className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">View</button>
                        </div>
                        <div className="col-span-1 flex items-center">
                            {item.status == '1' && (
                                <span className="inline-flex items-center justify-center rounded-md text-[green] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] leading-[23px]">
                                    Approved
                                </span>
                            )}

                            {item.status == '2' && (
                                <div className="flex items-center gap-[6px]">
                                    <button
                                        onClick={() => handleAccept(item.id, item.seller_id)}
                                        className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                                    >
                                        Accept
                                    </button>


                                    <button onClick={() => handleReject(item.id)} className="inline-flex items-center justify-center rounded-md bg-[red] py-[8px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">Reject</button>

                                </div>
                            )}

                            {item.status == '3' && (
                                <span className="inline-flex items-center justify-center rounded-md text-[green] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] leading-[23px]">
                                    Rejected
                                </span>
                            )}

                            {/* {!['1', '2', '3'].includes(getStatus) && (
                                <span className="inline-flex items-center justify-center rounded-md text-[green] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] leading-[23px]">
                                    All Bids
                                </span>
                            )} */}
                        </div>
                    </div>
                ))}

            </div>
            {message && (
                <span className="bg-[gray] text-center mt-[9px] max-w-[708px] w-full rounded-lg py-[15px]">{message && <p>{message}</p>}</span>
            )}
            {data.length > 0 && (
                <div className="text-center py-[50px]">
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
            )}
        </div>

    );
};


export default AdminListingDetailsComp;
