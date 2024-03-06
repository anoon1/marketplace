import ReactStars from 'react-rating-stars-component';
import configEnv from '../config/configuration_keys.json';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RejectionReason from './DocRejectReason';
const appUrl = configEnv.baseApiUrl;
import SuccessfullyAccepted from "../components/DocApproveModel";
const DEFAULT_PAGE_SIZE = 10;
const AdminListingDetailsComp = () => {
    const navigate = useNavigate();
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
    const handleReject = (itemId) => {
        setDataOfSelected(itemId);
        setUpdateModal(true);
    }
    const handleClose = () => {
        setAcceptModal(false)
        fetchData();
        window.location.reload(false)


    }

    const updateOnClose = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUpdateModal(false);
        setReject(true);
        setSelectedItemId(null);
        window.location.reload(false)

    };


    async function handleOnClickView(user_id: any) {
        navigate(`/OnboardingAdmin/DocumentViewer?uid=${btoa(user_id)}`);
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${appUrl}getAllDocuments`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ token: token, page, pageSize })
            });
            if (response.ok) {

                const resData = await response.json();
                if (resData.data == '') {
                    setMessage('No Data Found')
                } else {
                    const formattedData = resData.data.data.map(item => {
                        const formattedDate = new Date(item.created_at);
                        const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                        const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                        return {
                            ...item,
                            formattedCreatedAt: `${dateFormatter.format(formattedDate)} ${timeFormatter.format(formattedDate)}`,
                        };
                    });


                    setData(formattedData);
                    setTotalPages(resData.data.totalPages);
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
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);

        }
    };




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

            <div className="bg-white border-b border-[#E0E0E0]  overflow-auto">

                <div className="grid grid-cols-10 pt-[24px] pb-[18px] px-[56px] sm:grid-cols-10 md:min-w-auto min-w-[1000px]">
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Name</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Document Type</p>
                    </div>
                    <div className="col-span-2  items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Uploaded At</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Status</p>
                    </div>
                    <div className="col-span-2 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Documents</p>
                    </div>
                  
                </div>
                {data.map((item) => (
                    <div className="grid grid-cols-10 border-t border-[#E0E0E0] pt-[30px]  pb-[30px] px-[48px] md:min-w-auto min-w-[1000px]">
                        <div className="col-span-2 items-center flex gap-[10px] pr-[25px]">
                            <p className="text-[#1D2D5C] text-[16px] font-[600] leading-[126%]">{item.name}</p>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <p className="text-[#2174F5] text-[14px] font-[400] leading-[22px]">{item.type}</p>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <p className="rounded-[5px] bg-[#EDF2F9] px-[20px] py-[14px]  text-[#535D7A] text-[14px] font-[400] leading-[18px]">{item.formattedCreatedAt}</p>
                        </div>
                        <div className="col-span-2 flex items-center pr-[25px]">
                            {(() => {
                                if (item.docStatus == 1) {
                                    return (
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                            Approved
                                        </p>
                                    );
                                } else if (item.docStatus == 2) {
                                    return (
                                        <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                            Pending
                                        </p>
                                    );
                                } else if (item.docStatus == 3) {
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
                        <div className="col-span-2 flex items-center pr-[25px]">
                            <button onClick={() => { handleOnClickView(item.user_id) }} className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"> View</button>
                        </div>


                    </div>
                ))}

            </div>
            {message && (
                <span className="bg-[gray] text-center mt-[9px] max-w-[708px] w-full rounded-lg  py-[15px]">{message && <p>{message}</p>}</span>
            )}

            <div className="text-center py-[50px]">
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
            </div>

        </div>

    );
};


export default AdminListingDetailsComp;
