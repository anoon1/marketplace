import { Link } from 'react-router-dom';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
import PdfIcon from '../assets/icon/pdf-svgrepo-com.svg';
import ReactStars from 'react-rating-stars-component';
import e from 'cors';
interface FormData {
    title: string;
    description: string;
    sellingReason: string;
    asking_price: string;
    business_model: string;
    industry_type: string;
    version: string;
    net_profit: string;
    revenue: string;
    link: string;
    downloads: string;
    how_it_works: FileList | null; // Corrected to accept null
    how_it_works_new: FileList | null; // Corrected to accept null
    uploadError: string;
    session: string;
    rating: number;
    uploadDocfile: FileList | null;
    listing_image: FileList | null;
    listing_image_new: FileList | null;
    uploadDocfile_new: FileList | null;
}
const UpdateListing = ({ onClose, handleCancel, onConfirm, data }) => {

    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSvgMouseOver = () => {
        setTooltipVisible(true);
    };

    const handleSvgMouseOut = () => {
        setTooltipVisible(false);
    };

    const [formData, setFormData] = useState<FormData>({
        data
    });
    const ratingChanged = (newRating: number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            data: {
                ...prevFormData.data,
                rating: newRating,
            },
        }));
    };
    const handleFileChange = (name: string, files: FileList | null) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            data: {
                ...prevFormData.data,
                [name]: files,
            },
        }));
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type } = e.target;

        if (type === 'file') {
            const files = e.target.files as FileList;
            handleFileChange(name, files);
        } else {
            const value = type === 'number' ? parseFloat(e.target.value) : e.target.value;
            setFormData((prevFormData) => ({
                ...prevFormData,
                data: {
                    ...prevFormData.data,
                    [name]: value,
                },
            }));
        }
    };






    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage('');

        let token = localStorage.getItem('usertoken');

        try {
            const formDataToSend = new FormData();
            let data = formData.data
            Object.keys(data).forEach((key) => {
                const value = data[key];
                if (key === 'how_it_works_new' && value) {
                    for (let i = 0; i < value.length; i++) {
                        formDataToSend.append('how_it_works', value[i]);
                    }
                } else if (key === 'listing_image_new' && value) {
                    for (let i = 0; i < value.length; i++) {
                        formDataToSend.append('listingTumbnail', value[i]);
                    }
                } else if (key === 'uploadDocfile_new' && value) {
                    for (let i = 0; i < value.length; i++) {
                        formDataToSend.append('document', value[i]);
                    }
                } else {
                    formDataToSend.append(key, value);
                }
            });


            formDataToSend.append('token', token || '');


            const response = await fetch(`${appUrl}updateListing`, {
                method: 'POST',
                body: formDataToSend,
            });
            if (response.ok) {
                setSuccessMessage('Listing Updated Successfully!');
                setErrors('');
            } else {
                const errorData = await response.json(); // Assuming server sends error messages in JSON
                if (errorData && errorData.error) {
                    setErrors(errorData.error);
                } else {
                    console.error('Listing creation failed');
                }
            }
        } catch (error) {
            console.error('Error during listing creation:', error);
        }

    };

    const imageLinks =
        formData.data.document == 'null'
            ? [`${configEnv.DEFAULT_IMG}`]
            : formData.data.document
                ? formData.data.document.split(',')
                : [`${configEnv.DEFAULT_IMG}`];


    const openFile = (path) => {
        const fileUrl = `${configEnv.baseApiUrl}${path}`;
        const isPDF = path.toLowerCase().endsWith('.pdf');
        const popupWidth = 800;
        const popupHeight = 600;
        const left = window.innerWidth / 2 - popupWidth / 2 + window.screenLeft;
        const top = window.innerHeight / 2 - popupHeight / 2 + window.screenTop;
        const popupFeatures = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes`;
        if (isPDF) {
            window.open(fileUrl, '_blank', popupFeatures);
        } else {
            window.open(fileUrl, '_blank', popupFeatures);
        }
    };

    const handleDelete = async (img: any) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this document?"
        )
        let token = localStorage.getItem('usertoken')
        if (confirmBox === true) {
            try {
                const response = await fetch(`${appUrl}deleteSellerDoc`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                    body: JSON.stringify({ token, img }),
                });

                if (response.ok) {
                    alert('Document Deleted Sucessfully');
                    window.location.reload(false);

                } else {
                    const errorData = await response.json();
                    console.log('Error:', errorData.errors);
                    setErrors(errorData.errors || {});
                }
            } catch (err) {
                console.log('Error while getting document data', err);
            }
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
            <div className="max-w-[80%] max-h-[80%] bg-opacity-50 p-8 rounded-md">

                <form action="" onSubmit={handleSubmit} className="relative flex flex-col gap-4 p-10 rounded-md bg-white " id="createListing">
                    <div className="absolute top-7 right-7 text-right">
                        <button
                            onClick={onClose}
                            className="relative top-0 right-0 cursor-pointer text-gray-500 hover:text-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h2 className="font-medium text-black dark:text-white">
                                Update Listing
                            </h2>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="flex gap-[40px]">
                                <div className="w-full max-w-[60%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.data.title}
                                        onChange={handleChange}
                                        placeholder="Enter the title"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />


                                </div>
                                <div className="w-[40%]">
                                    <label className="mb-[21px] display-grid grid-cols-[auto,1fr] items-center gap-[7px] text-black dark:text-white">
                                        <div className="flex items-center gap-[7px] relative">
                                            Rating
                                            <div
                                                className={`bg-black text-white p-2 rounded absolute bottom-full w-full  left-[80px] bottom-[0] transform-translate-x-1/2 transition-opacity duration-300 ${isTooltipVisible ? 'opacity-100' : 'opacity-0 invisible'
                                                    }`}
                                            >
                                                Rating based on the business rated
                                            </div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                className="relative top-[1px] cursor-pointer"
                                                title="Click or hover for more info"
                                                onMouseOver={handleSvgMouseOver}
                                                onMouseOut={handleSvgMouseOut}

                                            >
                                                <path
                                                    d="M7.50001 0C6.01665 0 4.5666 0.439868 3.33323 1.26398C2.09986 2.08809 1.13856 3.25943 0.570907 4.62988C0.00324965 6.00032 -0.145275 7.50833 0.144114 8.96318C0.433503 10.418 1.14781 11.7544 2.1967 12.8033C3.2456 13.8522 4.58197 14.5665 6.03683 14.8559C7.49169 15.1453 8.99969 14.9968 10.3701 14.4291C11.7406 13.8614 12.9119 12.9002 13.736 11.6668C14.5601 10.4334 15 8.98337 15 7.50001C14.9978 5.51157 14.2069 3.60522 12.8008 2.19919C11.3948 0.793149 9.48844 0.00224974 7.50001 0ZM7.50001 3.5C7.5989 3.5 7.69557 3.52933 7.77779 3.58427C7.86002 3.63921 7.92411 3.7173 7.96195 3.80866C7.99979 3.90002 8.00969 4.00056 7.9904 4.09755C7.97111 4.19454 7.92349 4.28363 7.85356 4.35356C7.78364 4.42348 7.69454 4.4711 7.59755 4.4904C7.50056 4.50969 7.40003 4.49979 7.30867 4.46194C7.2173 4.4241 7.13921 4.36001 7.08427 4.27779C7.02933 4.19556 7.00001 4.09889 7.00001 4C7.00001 3.86739 7.05269 3.74022 7.14645 3.64645C7.24022 3.55268 7.3674 3.5 7.50001 3.5ZM8.50001 11.5H6.50001C6.3674 11.5 6.24022 11.4473 6.14645 11.3536C6.05269 11.2598 6.00001 11.1326 6.00001 11C6.00001 10.8674 6.05269 10.7402 6.14645 10.6465C6.24022 10.5527 6.3674 10.5 6.50001 10.5H7.00001V6.5H6.50001C6.3674 6.5 6.24022 6.44733 6.14645 6.35356C6.05269 6.25979 6.00001 6.13261 6.00001 6C6.00001 5.8674 6.05269 5.74022 6.14645 5.64645C6.24022 5.55268 6.3674 5.5 6.50001 5.5H7.50001C7.63262 5.5 7.75979 5.55268 7.85356 5.64645C7.94733 5.74022 8.00001 5.8674 8.00001 6V10.5H8.50001C8.63262 10.5 8.75979 10.5527 8.85356 10.6465C8.94733 10.7402 9.00001 10.8674 9.00001 11C9.00001 11.1326 8.94733 11.2598 8.85356 11.3536C8.75979 11.4473 8.63262 11.5 8.50001 11.5Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                        <div style={{ marginTop: '20px' }} title="Click or hover for more info">
                                            <ReactStars
                                                count={5}
                                                size={30}
                                                value={formData.data.rating}
                                                onChange={ratingChanged}
                                                edit
                                                activeColor="#ffd700"
                                                isHalf={true}
                                                className="mt-5"
                                            />
                                        </div>
                                    </label>



                                </div>

                            </div>

                            <h3 className="font-medium text-black dark:text-white">
                                Listing Thumbnail
                            </h3>
                            <div>

                                <label htmlFor="upload-thumbnail" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[30px] cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="m-auto mb-[9px]">
                                        <circle cx="20" cy="20" r="19.5" fill="white" stroke="#E2E8F0" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0002 20.3333C14.3684 20.3333 14.6668 20.6318 14.6668 21V23.6666C14.6668 23.8435 14.7371 24.013 14.8621 24.1381C14.9871 24.2631 15.1567 24.3333 15.3335 24.3333H24.6668C24.8436 24.3333 25.0132 24.2631 25.1382 24.1381C25.2633 24.013 25.3335 23.8435 25.3335 23.6666V21C25.3335 20.6318 25.632 20.3333 26.0002 20.3333C26.3684 20.3333 26.6668 20.6318 26.6668 21V23.6666C26.6668 24.1971 26.4561 24.7058 26.081 25.0809C25.706 25.4559 25.1973 25.6666 24.6668 25.6666H15.3335C14.8031 25.6666 14.2944 25.4559 13.9193 25.0809C13.5442 24.7058 13.3335 24.1971 13.3335 23.6666V21C13.3335 20.6318 13.632 20.3333 14.0002 20.3333Z" fill="#2174F5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5286 12.5286C19.7889 12.2682 20.2111 12.2682 20.4714 12.5286L23.8047 15.8619C24.0651 16.1223 24.0651 16.5444 23.8047 16.8047C23.5444 17.0651 23.1223 17.0651 22.8619 16.8047L20 13.9428L17.1381 16.8047C16.8777 17.0651 16.4556 17.0651 16.1953 16.8047C15.9349 16.5444 15.9349 16.1223 16.1953 15.8619L19.5286 12.5286Z" fill="#2174F5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0002 12.3333C20.3684 12.3333 20.6668 12.6318 20.6668 13V21C20.6668 21.3682 20.3684 21.6666 20.0002 21.6666C19.632 21.6666 19.3335 21.3682 19.3335 21V13C19.3335 12.6318 19.632 12.3333 20.0002 12.3333Z" fill="#2174F5" />
                                    </svg>
                                    <div>
                                        <h4 className="text-[#64748B] text-[14px] leading-[22px]">
                                            <span className="text-[#2174F5]">Click to upload</span> or drag and drop files here
                                        </h4>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className=""
                                    id="upload-thumbnail"
                                    name="listing_image_new"
                                    onChange={handleChange}
                                    hidden
                                />


                            </div>
                            <span className="text-[red] text-[16px]">{errors.profile && <p>{errors.profile}</p>}</span>
                            <img
                                src={formData.data.listing_thumbnail ? `${appUrl}${formData.data.listing_thumbnail}` : `${appUrl}${configEnv.DEFAULT_IMG}`}
                                alt='thumbnail'
                                className='h-20 w-20'
                            />

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Type something here..."
                                    name="description"
                                    value={formData.data.description}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>


                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Why are you selling?
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Type something here..."
                                    name="selling_reason"
                                    value={formData.data.selling_reason}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>


                            </div>
                            <div className="flex gap-[28px]">

                                <div className="w-[50%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Asking price
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the price"
                                        name="asking_price"
                                        value={formData.data.asking_price}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />


                                </div>
                                <div className="w-[50%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Types of Industries
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <input
                                            type="text"
                                            placeholder="Enter industry type"
                                            name="industry_type"
                                            value={formData.data.industry_type}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Additional Info
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="flex gap-[28px]">
                                <div className="w-[50%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Version
                                    </label>
                                    <input
                                        type="text"
                                        name="version"
                                        value={formData.data.version}
                                        onChange={handleChange}
                                        placeholder="Enter the version"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />

                                </div>
                                <div className="w-[50%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Business Model
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the Model"
                                        name="business_model"
                                        value={formData.data.business_model}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />


                                </div>
                            </div>
                            <div className="flex gap-[28px]">
                                <div className="w-[50%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Net Profit
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the net profit"
                                        name="net_profit"
                                        value={formData.data.net_profit}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />

                                </div>
                                <div className="w-[50%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Revenue
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the revenue"
                                        name="revenue"
                                        value={formData.data.revenue}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />

                                </div>
                            </div>
                            <div className="w-full">
                                <label className="mb-3 block text-black dark:text-white">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your link"
                                    name="link"
                                    value={formData.data.link}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />

                            </div>
                            <div className="w-full">
                                <label className="mb-3 block text-black dark:text-white">
                                    Download
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter the number of download"
                                    name="downloads"
                                    value={formData.data.downloads}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />

                            </div>
                        </div>

                    </div>

                    <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                How It Work
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label htmlFor="upload-file" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[30px] cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="m-auto mb-[9px]">
                                        <circle cx="20" cy="20" r="19.5" fill="white" stroke="#E2E8F0" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0002 20.3333C14.3684 20.3333 14.6668 20.6318 14.6668 21V23.6666C14.6668 23.8435 14.7371 24.013 14.8621 24.1381C14.9871 24.2631 15.1567 24.3333 15.3335 24.3333H24.6668C24.8436 24.3333 25.0132 24.2631 25.1382 24.1381C25.2633 24.013 25.3335 23.8435 25.3335 23.6666V21C25.3335 20.6318 25.632 20.3333 26.0002 20.3333C26.3684 20.3333 26.6668 20.6318 26.6668 21V23.6666C26.6668 24.1971 26.4561 24.7058 26.081 25.0809C25.706 25.4559 25.1973 25.6666 24.6668 25.6666H15.3335C14.8031 25.6666 14.2944 25.4559 13.9193 25.0809C13.5442 24.7058 13.3335 24.1971 13.3335 23.6666V21C13.3335 20.6318 13.632 20.3333 14.0002 20.3333Z" fill="#2174F5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5286 12.5286C19.7889 12.2682 20.2111 12.2682 20.4714 12.5286L23.8047 15.8619C24.0651 16.1223 24.0651 16.5444 23.8047 16.8047C23.5444 17.0651 23.1223 17.0651 22.8619 16.8047L20 13.9428L17.1381 16.8047C16.8777 17.0651 16.4556 17.0651 16.1953 16.8047C15.9349 16.5444 15.9349 16.1223 16.1953 15.8619L19.5286 12.5286Z" fill="#2174F5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0002 12.3333C20.3684 12.3333 20.6668 12.6318 20.6668 13V21C20.6668 21.3682 20.3684 21.6666 20.0002 21.6666C19.632 21.6666 19.3335 21.3682 19.3335 21V13C19.3335 12.6318 19.632 12.3333 20.0002 12.3333Z" fill="#2174F5" />
                                    </svg>
                                    <div>
                                        <h4 className="text-[#64748B] text-[14px] leading-[22px]">
                                            <span className="text-[#2174F5]">Click to upload</span> or drag and drop video files here
                                        </h4>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className=""
                                    id="upload-file"
                                    name="how_it_works_new"
                                    onChange={handleChange}
                                    multiple
                                    hidden
                                />
                            </div>
                            <div className="flex space-x-4">
                                {formData.data.how_it_works ? (
                                    <video controls src={`${appUrl}${formData.data.how_it_works}`} className='h-20 w-20' />
                                ) : (
                                    <img src={`${appUrl}${configEnv.DEFAULT_VID}`} alt='Default' className='h-20 w-20' />
                                )}

                            </div>
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Documents & Images
                                </h3>
                            </div>
                            <div>
                                <label htmlFor="uploadDocfile_new" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[24px] cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="m-auto mb-[9px]">
                                        <circle cx="20" cy="20" r="19.5" fill="white" stroke="#E2E8F0" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0002 20.3333C14.3684 20.3333 14.6668 20.6318 14.6668 21V23.6666C14.6668 23.8435 14.7371 24.013 14.8621 24.1381C14.9871 24.2631 15.1567 24.3333 15.3335 24.3333H24.6668C24.8436 24.3333 25.0132 24.2631 25.1382 24.1381C25.2633 24.013 25.3335 23.8435 25.3335 23.6666V21C25.3335 20.6318 25.632 20.3333 26.0002 20.3333C26.3684 20.3333 26.6668 20.6318 26.6668 21V23.6666C26.6668 24.1971 26.4561 24.7058 26.081 25.0809C25.706 25.4559 25.1973 25.6666 24.6668 25.6666H15.3335C14.8031 25.6666 14.2944 25.4559 13.9193 25.0809C13.5442 24.7058 13.3335 24.1971 13.3335 23.6666V21C13.3335 20.6318 13.632 20.3333 14.0002 20.3333Z" fill="#2174F5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5286 12.5286C19.7889 12.2682 20.2111 12.2682 20.4714 12.5286L23.8047 15.8619C24.0651 16.1223 24.0651 16.5444 23.8047 16.8047C23.5444 17.0651 23.1223 17.0651 22.8619 16.8047L20 13.9428L17.1381 16.8047C16.8777 17.0651 16.4556 17.0651 16.1953 16.8047C15.9349 16.5444 15.9349 16.1223 16.1953 15.8619L19.5286 12.5286Z" fill="#2174F5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0002 12.3333C20.3684 12.3333 20.6668 12.6318 20.6668 13V21C20.6668 21.3682 20.3684 21.6666 20.0002 21.6666C19.632 21.6666 19.3335 21.3682 19.3335 21V13C19.3335 12.6318 19.632 12.3333 20.0002 12.3333Z" fill="#2174F5" />
                                    </svg>
                                    <div>
                                        <h4 className="text-[#64748B] text-[14px] leading-[22px]">
                                            <span className="text-[#2174F5]">Click to upload</span> or drag and drop files here
                                        </h4>
                                        <h4 className="text-[#64748B] text-[14px] leading-[22px] mt-[2px]">
                                            PNG, JPG, DOC or PDF<br />
                                            (max, 800 X 800px)
                                        </h4>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className=""
                                    id="uploadDocfile_new"
                                    name="uploadDocfile_new"
                                    onChange={handleChange}
                                    hidden
                                    multiple
                                />
                            </div>
                            <div className='border-b border-stroke pb-[19px]'>
                                <p className='text-[#1C2434] text-[16px] font-[400] leading-[22px]'>Documents related to business and any proof you own the business.</p>
                            </div>
                            <div className='border-b border-stroke flex-1 pb-[19px]'>
                                <div className="flex flex-wrap -mx-2">
                                    {imageLinks && imageLinks.length > 0 && (
                                        imageLinks.map((path, index) => (
                                            <div key={index} className="w-1/4 p-2">
                                                <div className='relative'>
                                                    {path.toLowerCase().endsWith('.pdf') ? (
                                                        <img
                                                            src={PdfIcon}
                                                            alt={`PDF Icon ${index}`}
                                                            className="cursor-pointer hover:opacity-75"
                                                            style={{ width: '100px', height: '100px' }}
                                                            onClick={() => openFile(path)}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={`${configEnv.baseApiUrl}${path}`}
                                                            alt={`File ${index}`}
                                                            className="cursor-pointer hover:opacity-75"
                                                            style={{ width: '100px', height: '100px' }}
                                                            onClick={() => openFile(path)}
                                                        />
                                                    )}
                                                    {path && path != 'images/uploads/defaultImage/default_image.png' && (
                                                        <button type='button'
                                                            onClick={() => handleDelete(path)}
                                                            className="absolute top-[-5px] right-[20px] bg-red-500 text-[#5D6D7E] p-1 rounded-full cursor-pointer"
                                                        >
                                                            &#10006;
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                            </div>
                            <div className='flex gap-[14px] justify-end'>
                                <Link
                                    onClick={handleCancel}
                                    className="inline-flex items-center justify-center rounded-md bg-[#FFF] border-[1px] border-[#E2E8F0] py-[8px] px-[25px] text-center font-[400] text-[#1C2434] text-[16px] hover:bg-opacity-90 leading-[23px]"
                                >
                                    Cancel
                                </Link>
                                <input
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-2 px-4 text-center font-semibold text-[#EFF4FB] text-base hover:bg-opacity-90 leading-[23px]"
                                    value="Save"
                                />

                            </div>
                            {errors.session && (
                                <span className="bg-[red] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]">{errors.session && <p>{errors.session}</p>}</span>
                            )}
                            {errors.message && (
                                <span className="bg-[red] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]">{errors.message && <p>{errors.message}</p>}</span>
                            )}
                            {successMessage && (
                                <span className="bg-[green] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]">{successMessage && <p>{successMessage}</p>}</span>
                            )}
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateListing;