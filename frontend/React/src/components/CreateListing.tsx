import { Link } from 'react-router-dom';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import config from '../config/configuration_keys.json';
import ReactStars from 'react-rating-stars-component';
interface FormData {
    title: string;
    description: string;
    sellingReason: string;
    askingPrice: string;
    businessModel: string;
    industryType: string;
    version: string;
    netProfit: string;
    revenue: string;
    link: string;
    downloads: string;
    uploadFile: FileList | null;
    uploadError: string;
    session: string;
    rating: number;
    uploadDocfile: FileList | null;
    listingTumbnail: FileList | null;

}
const CreateListing: React.FC = () => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    let apiUrl = config.baseApiUrl
    const handleSvgMouseOver = () => {
        setTooltipVisible(true);
    };

    const handleSvgMouseOut = () => {
        setTooltipVisible(false);
    };

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        sellingReason: '',
        askingPrice: '',
        industryType: '',
        version: '',
        businessModel: '',
        netProfit: '',
        revenue: '',
        link: '',
        downloads: '',
        uploadFile: null,
        uploadDocfile: null,
        listingTumbnail: null,
        uploadError: '',
        session: '',
        rating: 0,

    });
    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            sellingReason: '',
            askingPrice: '',
            industryType: '',
            version: '',
            businessModel: '',
            netProfit: '',
            revenue: '',
            link: '',
            downloads: '',
            uploadFile: null,
            uploadDocfile: null,
            listingTumbnail: null,
            uploadError: '',
            session: '',
            rating: 0,
        });
    };

    const handleFileChange = (name: string, files: FileList | null) => {

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files,
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
                [name]: value,
            }));
        }
    };


    const [rating, setRating] = useState<number>(0);

    const ratingChanged = (newRating: number) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            rating: newRating,
        }));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage('');
        if (validateForm()) {
            let token = localStorage.getItem('usertoken');
            try {
                const formDataToSend = new FormData();
                Object.keys(formData).forEach((key) => {
                    const value = formData[key];

                    if (key === 'uploadFile' && value) {
                        for (let i = 0; i < value.length; i++) {
                            formDataToSend.append(key, value[i]);
                        }
                    } else if (key === 'uploadDocfile' && value) {
                        for (let i = 0; i < value.length; i++) {
                            formDataToSend.append(key, value[i]);
                        }
                    } else if (key === 'listingTumbnail' && value) {
                        for (let i = 0; i < value.length; i++) {
                            formDataToSend.append(key, value[i]);
                        }
                    } else {
                        formDataToSend.append(key, value);
                    }
                });

                formDataToSend.append('token', token || '');
                const response = await fetch(`${apiUrl}createListing`, {
                    method: 'POST',
                    body: formDataToSend,
                });
                if (response.ok) {
                    setFormData({
                        title: '',
                        description: '',
                        sellingReason: '',
                        askingPrice: '',
                        industryType: '',
                        version: '',
                        businessModel: '',
                        netProfit: '',
                        revenue: '',
                        link: '',
                        downloads: '',
                        uploadFile: null,
                        uploadDocfile: null,
                        listingTumbnail: null,
                        uploadError: '',
                        session: '',
                        rating: 0,
                    });
                    setSuccessMessage('Listing created successfully!');
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.error) {
                        setErrors(errorData.error);
                    } else {
                        console.error('Listing creation failed');
                    }
                }
            } catch (error) {
                console.error('Error during listing creation:', error);
            }
        }
    };
    const videoAllowedTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg',
        'video/mpeg',
        'video/avi',
    ];
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
    const thumbnailAllowedFileTypes = ['image/jpeg', 'image/png'];

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.title) {
            newErrors.title = '• Title is required';
        }
        if (!formData.description) {
            newErrors.description = '• Description is required';
        }
        if (!formData.sellingReason) {
            newErrors.sellingReason = '• Why are you selling is required';
        }
        if (!formData.askingPrice) {
            newErrors.askingPrice = '• Asking price is required';
        } else if (isNaN(Number(formData.askingPrice))) {
            newErrors.askingPrice = '• Asking price must be a valid number';
        }

        if (!formData.businessModel) {
            newErrors.businessModel = '• Business model is required';
        }
        if (!formData.netProfit) {
            newErrors.netProfit = '• Net profit is required';
        } else if (isNaN(Number(formData.netProfit))) {
            newErrors.netProfit = '• Net profit must be a valid number';
        }
        if (!formData.revenue) {
            newErrors.revenue = '• Revenue is required';
        } else if (isNaN(Number(formData.revenue))) {
            newErrors.revenue = '• Revenue must be a valid number';
        }
        if (isNaN(Number(formData.downloads))) {
            newErrors.downloads = '• Downloads must be a valid number';
        }
        if (formData.uploadFile && formData.uploadFile.length > 0 && !videoAllowedTypes.includes(formData.uploadFile[0].type)) {
            newErrors.mime = '• Invalid file format. Only mp4, webm, ogg, mpeg, and avi are allowed.';
        }


        if (formData.uploadDocfile && formData.uploadDocfile.length > 0) {
            const invalidFiles = Object.keys(formData.uploadDocfile).filter(key => {
                const fileType = formData.uploadDocfile[key].type;
                return !allowedFileTypes.includes(fileType);
            });

            console.log('invalidFilesinvalidFiles', invalidFiles);
            if (invalidFiles.length > 0) {
                newErrors.docFileError = '• Invalid file format Only JPEG, PNG, PDF, and DOC are allowed.';
            }
        }

        if (formData.listingTumbnail && formData.listingTumbnail.length > 0 && thumbnailAllowedFileTypes.includes(formData.listingTumbnail[0].type) == false) {
            newErrors.thumbnail = '• Invalid file format Only JPG and PNG are allowed.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    return (
        <div className="flex flex-wrap">
            <div className="flex flex-col gap-[25px] w-full md:max-w-[57%] max-w-[100%] md:pr-[15px] pr-[0]">
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 " id="createListing">
                    <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Create Listing
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="flex md:flex-nowrap flex-wrap md:gap-[40px] gap-[25px]">
                                <div className="w-full md:max-w-[60%] max-w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Title <span className='text-center'>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter the title"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    <span className="text-[red] text-[16px]">{errors.title && <p>{errors.title}</p>}</span>

                                </div>
                                <div className="md:w-[40%] w-[100%]">
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
                                                value={formData.rating}
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
                            <div>

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
                                        <h4 className="text-[#64748B] uppercase text-[14px] leading-[22px] mt-[2px]">
                                            jpg, png <br />
                                        </h4>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className=""
                                    id="upload-thumbnail"
                                    name="listingTumbnail"
                                    onChange={handleChange}
                                    hidden
                                />
                            </div>
                            <span className="text-[red] text-[16px]">{errors.thumbnail && <p>{errors.thumbnail}</p>}</span>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Description  <span className='text-center'>*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Type something here..."
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                                <span className="text-[red] text-[16px]">{errors.description && <p>{errors.description}</p>}</span>

                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Why are you selling?  <span className='text-center'>*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Type something here..."
                                    name="sellingReason"
                                    value={formData.sellingReason}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                                <span className="text-[red] text-[16px]">{errors.sellingReason && <p>{errors.sellingReason}</p>}</span>

                            </div>
                            <div className="flex md:flex-nowrap flex-wrap md:gap-[28px] gap-[25px]">

                                <div className="md:w-[50%] w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Asking price  <span className='text-center'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the price"
                                        name="askingPrice"
                                        value={formData.askingPrice}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    <span className="text-[red] text-[16px]">{errors.askingPrice && <p>{errors.askingPrice}</p>}</span>

                                </div>
                                <div className="md:w-[50%] w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Types of Industries
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <input
                                            type="text"
                                            placeholder="Enter industry type"
                                            name="industryType"
                                            value={formData.industryType}
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
                            <div className="flex md:flex-nowrap flex-wrap md:gap-[28px] gap-[25px]">
                                <div className="md:w-[50%] w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Version
                                    </label>
                                    <input
                                        type="text"
                                        name="version"
                                        value={formData.version}
                                        onChange={handleChange}
                                        placeholder="Enter the version"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />

                                </div>
                                <div className="md:w-[50%] w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Business Model  <span className='text-center'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the Model"
                                        name="businessModel"
                                        value={formData.businessModel}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    <span className="text-[red] text-[16px]">{errors.businessModel && <p>{errors.businessModel}</p>}</span>

                                </div>
                            </div>
                            <div className="flex md:flex-nowrap flex-wrap md:gap-[28px] gap-[25px]">
                                <div className="md:w-[50%] w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Net Profit  <span className='text-center'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the net profit"
                                        name="netProfit"
                                        value={formData.netProfit}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    <span className="text-[red] text-[16px]">{errors.netProfit && <p>{errors.netProfit}</p>}</span>
                                </div>
                                <div className="md:w-[50%] w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Revenue  <span className='text-center'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the revenue"
                                        name="revenue"
                                        value={formData.revenue}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                    <span className="text-[red] text-[16px]">{errors.revenue && <p>{errors.revenue}</p>}</span>
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
                                    value={formData.link}
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
                                    value={formData.downloads}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <span className="text-[red] text-[16px]">{errors.downloads && <p>{errors.downloads}</p>}</span>
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
                                            <span className="text-[#2174F5]">Click to upload</span> or drag and drop files here
                                        </h4>
                                        <h4 className="text-[#64748B] uppercase text-[14px] leading-[22px] mt-[2px]">
                                            mp4, webm, ogg, mpeg, avi <br />
                                        </h4>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className=""
                                    id="upload-file"
                                    name="uploadFile"
                                    onChange={handleChange}
                                    multiple
                                    hidden
                                />
                            </div>
                            <span className="text-[red] text-[16px]">{errors.mime && <p>{errors.mime}</p>}</span>
                            <div className='flex gap-[14px] justify-end'>
                                <Link
                                    onClick={handleCancel}
                                    className="inline-flex items-center justify-center rounded-md bg-[#FFF] border-[1px] border-[#E2E8F0] py-[8px] px-[25px] text-center font-[400] text-[#1C2434] text-[16px] hover:bg-opacity-90 leading-[23px]"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                                >
                                    Save
                                </button>

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

            <div className="flex flex-col gap-[25px] w-full md:max-w-[43%] max-w-[100%] md:pl-[15px] pl-[0] md:mt-[0] mt-[20px]">

                <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Documents & Images
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label htmlFor="uploadDocfile" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[24px] cursor-pointer">
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
                                    </h4>
                                </div>
                            </label>
                            <input
                                type="file"
                                className=""
                                id="uploadDocfile"
                                name="uploadDocfile"
                                onChange={handleChange}
                                hidden
                                multiple
                            />
                        </div>
                        <div className='border-b border-stroke pb-[19px]'>
                            <p className='text-[#1C2434] text-[16px] font-[400] leading-[22px]'>Documents related to business and any proof you own the business.</p>
                        </div>

                    </div>
                    <span className="text-[red] text-[16px]">{errors.docFileError && <p>{errors.docFileError}</p>}</span>
                </div>

            </div>
        </div>
    );
};

export default CreateListing;
