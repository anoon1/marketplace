import React, { useState, useEffect } from 'react';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UpdateListing from './updateListingModel';
const DEFAULT_PAGE_SIZE = 10;

const AllListingComp = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setUpdateModal] = useState(false);
    const [selectedData, setDataOfSelected] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getUserToken = localStorage.getItem('usertoken');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(1); // New state to track total pages

    const handleDelete = (id: { item: any; "": any; }) => {
        setSelectedItemId(id);
        setShowDeleteModal(true);
    }


    const handleEdit = (item: { item: any; "": any; }) => {
        setDataOfSelected(item);
        setUpdateModal(true);
    }

    const updateOnClose = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUpdateModal(false);
        setSelectedItemId(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedItemId(null);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`${appUrl}deleteSelectedListing`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: getUserToken,
                    itemId: selectedItemId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            setData(prevData => prevData.filter(item => item.id !== selectedItemId));

            setShowDeleteModal(false);
            setSelectedItemId(null);


        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!appUrl) {
                    throw new Error('REACT_APP_URL is not defined');
                }

                const response = await fetch(`${appUrl}getListing`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: getUserToken,
                        page,
                        pageSize,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                if (responseData.data.data.length == 0) {
                    navigate('/OnboardingSeller/NoListings');
                }
                setData(responseData.data.data);

                setTotalPages(responseData.data.totalPages);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getUserToken, page, pageSize]);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="bg-white overflow-auto">

            <div className="bg-white border-b border-[#E0E0E0] md:min-w-auto min-w-[1000px]">

                <div className="grid grid-cols-8 md:pt-[24px] pt-[20px] md:pb-[18px] pb-[16px] md:px-[56px] px-[15px] sm:grid-cols-8">
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Image</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Title</p>
                    </div>
                    <div className="col-span-2 items-center flex leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Description</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Downloads</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Asking Price</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[18px]">Status</p>
                    </div>
                    <div className="col-span-1 flex items-center leading-[18px]">
                        <p className="text-[#1D2D5C] text-[16px] font-[500] leading-[28px]">Action</p>
                    </div>
                </div>
                {data.map((item) => (
                    <div className="grid grid-cols-8 border-t border-[#E0E0E0] pt-[10px] pb-[12px] md:px-[56px] px-[15px] sm:grid-cols-8">
                        <div className="col-span-1 flex items-center pr-[25px]">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex-shrink-0">
                                    {item.listing_thumbnail ? (
                                        <img src={`${appUrl}${item.listing_thumbnail}`} alt="Brand" className="h-[50px]" />
                                    ) : (
                                        <img src={`${appUrl}${configEnv.DEFAULT_IMG}`} alt="Default" className="h-[50px] w-[50px]" />
                                    )}
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
                        <div className="col-span-1 flex items-center">
                            <div className="flex items-center gap-[6px]">
                                <button className="hover:text-primary" onClick={() => handleDelete(item.id)}>
                                    <svg width="38" height="27" viewBox="0 0 38 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="37.0286" height="26.6143" rx="2" fill="#FF5771" />
                                        <path d="M23.2365 6.17165H21.1007V5.70011C21.1007 4.86798 20.435 4.20227 19.6028 4.20227H17.467C16.6349 4.20227 15.9692 4.86798 15.9692 5.70011V6.17165H13.8334C13.029 6.17165 12.3633 6.83735 12.3633 7.64175V8.47388C12.3633 9.08411 12.7239 9.58338 13.2509 9.80528L13.6947 18.9865C13.7502 20.1237 14.6932 21.0113 15.8305 21.0113H21.2116C22.3489 21.0113 23.2919 20.1237 23.3474 18.9865L23.819 9.77755C24.346 9.55565 24.7066 9.02863 24.7066 8.44614V7.61401C24.7066 6.83735 24.0409 6.17165 23.2365 6.17165ZM17.2451 5.70011C17.2451 5.56142 17.3561 5.45047 17.4948 5.45047H19.6306C19.7692 5.45047 19.8802 5.56142 19.8802 5.70011V6.17165H17.2729V5.70011H17.2451ZM13.6392 7.64175C13.6392 7.53079 13.7224 7.41984 13.8611 7.41984H23.2365C23.3474 7.41984 23.4584 7.50306 23.4584 7.64175V8.47388C23.4584 8.58483 23.3751 8.69578 23.2365 8.69578H13.8611C13.7502 8.69578 13.6392 8.61256 13.6392 8.47388V7.64175ZM21.2393 19.7631H15.8582C15.3867 19.7631 14.9984 19.4025 14.9706 18.9033L14.5546 9.91624H22.5708L22.1547 18.9033C22.0992 19.3748 21.7109 19.7631 21.2393 19.7631Z" fill="white" />
                                        <path d="M18.5486 12.7178C18.2158 12.7178 17.9106 12.9952 17.9106 13.3558V16.8785C17.9106 17.2113 18.188 17.5165 18.5486 17.5165C18.8815 17.5165 19.1866 17.2391 19.1866 16.8785V13.3558C19.1866 12.9952 18.8815 12.7178 18.5486 12.7178Z" fill="white" />
                                        <path d="M20.7671 13.2725C20.4065 13.2448 20.1291 13.4944 20.1014 13.855L19.935 16.296C19.9072 16.6288 20.1569 16.9339 20.5175 16.9617C20.5452 16.9617 20.5452 16.9617 20.5729 16.9617C20.9058 16.9617 21.1832 16.712 21.1832 16.3792L21.3496 13.9383C21.3496 13.5777 21.0999 13.3003 20.7671 13.2725Z" fill="white" />
                                        <path d="M16.3022 13.2725C15.9693 13.3003 15.692 13.6054 15.7197 13.9383L15.9139 16.3792C15.9416 16.712 16.219 16.9617 16.5241 16.9617C16.5518 16.9617 16.5518 16.9617 16.5796 16.9617C16.9124 16.9339 17.1898 16.6288 17.162 16.296L16.9679 13.855C16.9679 13.4944 16.6628 13.2448 16.3022 13.2725Z" fill="white" />
                                    </svg>
                                </button>
                                <button className="hover:text-primary" onClick={() => handleEdit(item)}>
                                    <svg width="39" height="27" viewBox="0 0 39 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.814453" width="38.1858" height="26.6143" rx="2" fill="#2174F5" />
                                        <path d="M27.3236 7.68883L25.709 6.07498C25.0805 5.44571 24.0589 5.44571 23.4304 6.07498L21.8875 7.61712L25.7807 11.5104L27.3236 9.9674C27.9521 9.33894 27.9521 8.3181 27.3236 7.68883Z" fill="white" />
                                        <path d="M13.1165 16.3875L12.3857 21.0115L17.0098 20.2807L25.021 12.2702L21.1278 8.37701L13.1165 16.3875Z" fill="white" />
                                    </svg>
                                </button>
                                <button className="hover:text-primary">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M26 13C26 20.1796 20.1796 26 13 26C5.82029 26 0 20.1796 0 13C0 5.82029 5.82029 0 13 0C20.1796 0 26 5.82029 26 13ZM9.06052 9.06054C9.44128 8.67979 10.0586 8.67979 10.4394 9.06054L13 11.6211L15.5605 9.06057C15.9412 8.67981 16.5586 8.67981 16.9394 9.06057C17.3202 9.44133 17.3202 10.0587 16.9394 10.4394L14.3788 13L16.9394 15.5605C17.3202 15.9412 17.3202 16.5586 16.9394 16.9394C16.5586 17.3202 15.9412 17.3202 15.5605 16.9394L13 14.3789L10.4394 16.9394C10.0586 17.3202 9.4413 17.3202 9.06054 16.9394C8.67979 16.5586 8.67979 15.9412 9.06054 15.5606L11.6211 13L9.06052 10.4394C8.67975 10.0586 8.67975 9.4413 9.06052 9.06054Z" fill="#F87C1D" />
                                    </svg>
                                </button>
                            </div>
                            {showDeleteModal && (
                                <DeleteConfirmationModal
                                    onCancel={handleCancelDelete}
                                    onConfirm={handleConfirmDelete}
                                />
                            )}

                        </div>
                    </div>
                ))}


            </div>
            <div className="text-center md:py-[50px] py-[40px]">
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
            {showUpdateModal && (
                <UpdateListing
                    onClose={updateOnClose}
                    onConfirm={handleConfirmDelete}
                    data={selectedData}
                    handleCancel={updateOnClose}
                />
            )}
        </div>

    );
};

export default AllListingComp;
