import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import configEnv from '../config/configuration_keys.json';
const appUrl = configEnv.baseApiUrl;
interface FormData {
    name: string;
    email: string;
    businessName: string;
    businessType: string;
    ssnNumber: string;
    about: string;
    step: string;
    description: string;
    profileBusinessDoc: FileList | null;
    profilePicture: FileList | null;
    profilePicture_new: FileList | null;
    dcType: string;
}

const ProfileInfo: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        businessName: '',
        businessType: '',
        ssnNumber: '',
        about: '',
        step: '1',
        description: '',
        profileBusinessDoc: null,
        profilePicture: null,
        profilePicture_new: null,
        dcType: ''
    });
    const newErrors: Partial<FormData> = {};

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [successMessages, setSuccessMessages] = useState<{ [key: string]: string }>({});
    const token = localStorage.getItem('usertoken');
    const addSuccessMessage = (key: string, message: string) => {
        setSuccessMessages(prevMessages => ({
            ...prevMessages,
            [key]: message,
        }));
    };
    const handleCancel = () => {
        setFormData({
            businessName: '',
            businessType: '',
            about: '',
            step: '',
            description: '',
            name: '',
        })

    }
    useEffect(() => {
        const fetchExistingData = async () => {
            try {

                const response = await fetch(`${appUrl}getSellerProfile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const existingData = await response.json();
                    const { name, email, profile_picture } = existingData.data;
                    setFormData({
                        ...formData,
                        name,
                        email,
                        profile_picture
                    });
                } else {
                    console.error('Failed to fetch existing data');
                }
            } catch (error) {
                console.error('Error fetching existing data:', error);
            }
        };

        fetchExistingData();
    }, []);

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
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formDataToSend = new FormData();

                const profilePictureFiles = formData['profilePicture_new'] || formData['profilePicture'];

                Object.keys(formData).forEach((key) => {
                    const value = formData[key];

                    if (key === 'profilePicture_new' && profilePictureFiles) {
                        for (let i = 0; i < profilePictureFiles.length; i++) {
                            formDataToSend.append('profile_picture', profilePictureFiles[i]);
                        }
                    } else {
                        formDataToSend.append(key, value);
                    }
                });

                formDataToSend.append('token', token);

                const response = await fetch(`${appUrl}updateProfile`, {
                    method: 'POST',
                    body: formDataToSend,
                });

                if (response.ok) {
                    console.log('Data saved successfully!');
                    const updateLocalStorageVal = localStorage.setItem('completedStep', '1');
                    addSuccessMessage('profile', 'Profile saved successfully!');
                    navigate('/OnboardingSeller/NewListing');
                } else {
                    const errorData = await response.json();
                    console.log('Error:', errorData.errors);
                    setErrors(errorData.errors || {});
                }
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
    };



    const validateForm = () => {
        if (!formData.name) {
            newErrors.name = '• Name is required';
        }
        if (!formData.email) {
            newErrors.email = '• Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
        }

        if (!formData.businessName) {
            newErrors.businessName = '• Business name is required';
        }
        if (!formData.businessType) {
            newErrors.businessType = '• Business type is required';
        }
        if (!formData.about) {
            newErrors.about = '• About is required';
        }
        if (!formData.description) {
            newErrors.description = '• Description is required';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleProfileBusinessDoc = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type } = e.target;

        if (type === 'file') {
            const files = e.target.files as FileList;

            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: files,
            }));
        }
    };
    const validateForm2 = () => {
        if (!formData.dcType) {
            addSuccessMessage('responseError', 'Please select document type!');
            newErrors.dcType = 'Select doctype'
        }
        return Object.keys(newErrors).length === 0;
    };
    const handleBusinessDocSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let token = localStorage.getItem('usertoken');
        const formDataToSend = new FormData();
        formDataToSend.append('token', token);
        Object.keys(formData).forEach((key) => {
            const value = formData[key];

            if (key === 'profileBusinessDoc' && value) {
                for (let i = 0; i < value.length; i++) {
                    formDataToSend.append(key, value[i]);
                }
                formDataToSend.append('type', 'profile_business');
            } else {
                formDataToSend.append(key, value);
            }
        });
        formDataToSend.append('type', 'profile_business');
        fetch(`${appUrl}uploadDocument`, {
            method: 'POST',
            body: formDataToSend,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 400) {
                    addSuccessMessage('responseError2', `Please Upload Documents`);
                    addSuccessMessage('businessDoc', '');  // Optional: Set other messages or handle the error case as needed

                } else if (data.message == "Session Expired") {
                    addSuccessMessage('responseError2', `Session Expired Please Login Again`);
                    addSuccessMessage('businessDoc', '');
                } else {
                    addSuccessMessage('businessDoc', 'Business Documents Uploaded Successfully');
                    addSuccessMessage('responseError2', '');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const handleIdentityDocSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm2()) {

            let token = localStorage.getItem('usertoken');
            const formDataToSend = new FormData();
            formDataToSend.append('token', token);

            Object.keys(formData).forEach((key) => {
                const value = formData[key];

                if (key === 'userIdentityVerification' && value) {
                    for (let i = 0; i < value.length; i++) {
                        formDataToSend.append(key, value[i]);
                    }
                    formDataToSend.append('type', 'profile_verify');
                } else {
                    formDataToSend.append(key, value);
                }
            });
            fetch(`${appUrl}userVerificationDoc`, {
                method: 'POST',
                body: formDataToSend,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 400) {
                        addSuccessMessage('responseError', `Please upload documents`);
                        addSuccessMessage('verification', '');
                    } else if (data.message == "Session Expired") {
                        addSuccessMessage('responseError', `Session Expired Please Login Again`);
                        addSuccessMessage('verification', '');
                    } else {
                        addSuccessMessage('responseError', '');
                        addSuccessMessage('verification', 'ID Verification Documents Uploaded Successfully');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    };

    const profileSuccessMessage = successMessages['profile'];
    const verificationSuccessMessage = successMessages['verification'];
    const businessDocSucessMessage = successMessages['businessDoc'];
    const responseErrorMessage = successMessages['responseError'];

    const responseErrorMessage2 = successMessages['responseError2'];
    return (
        <div className="flex flex-wrap">
            <div className="flex flex-col gap-[25px] w-full md:max-w-[57%] max-w-[100%] md:pr-[15px] pr-[0]">
                <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Personal information
                        </h3>
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                        <label className=" block text-black dark:text-white">
                            Profile Picture
                        </label>
                        <div>
                            <label htmlFor="upload-profile-picture" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[24px] cursor-pointer">
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
                                id="upload-profile-picture"
                                name='profilePicture_new'
                                onChange={handleChange}
                                hidden
                            />
                        </div>
                        <div className="flex md:flex-nowrap flex-wrap gap-[28px]">
                            <div className="md:w-[50%] w-[100%]">
                                <label className="mb-3 block text-black dark:text-white">
                                    Full Name <span className='text-center'>*</span>
                                </label>
                                <div className="relative z-20">
                                    <span className='absolute top-1/2 left-4 z-30 -translate-y-1/2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.72039 11.887C2.50179 11.1056 3.5616 10.6666 4.66667 10.6666H11.3333C12.4384 10.6666 13.4982 11.1056 14.2796 11.887C15.061 12.6684 15.5 13.7282 15.5 14.8333V16.5C15.5 16.9602 15.1269 17.3333 14.6667 17.3333C14.2064 17.3333 13.8333 16.9602 13.8333 16.5V14.8333C13.8333 14.1703 13.5699 13.5344 13.1011 13.0655C12.6323 12.5967 11.9964 12.3333 11.3333 12.3333H4.66667C4.00363 12.3333 3.36774 12.5967 2.8989 13.0655C2.43006 13.5344 2.16667 14.1703 2.16667 14.8333V16.5C2.16667 16.9602 1.79357 17.3333 1.33333 17.3333C0.873096 17.3333 0.5 16.9602 0.5 16.5V14.8333C0.5 13.7282 0.938987 12.6684 1.72039 11.887Z" fill="#3F4E7A" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 2.33329C6.61896 2.33329 5.49967 3.45258 5.49967 4.83329C5.49967 6.214 6.61896 7.33329 7.99967 7.33329C9.38039 7.33329 10.4997 6.214 10.4997 4.83329C10.4997 3.45258 9.38039 2.33329 7.99967 2.33329ZM3.83301 4.83329C3.83301 2.53211 5.69849 0.666626 7.99967 0.666626C10.3009 0.666626 12.1663 2.53211 12.1663 4.83329C12.1663 7.13448 10.3009 8.99996 7.99967 8.99996C5.69849 8.99996 3.83301 7.13448 3.83301 4.83329Z" fill="#3F4E7A" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pl-[44px] text-[#3F4E7A] text-[14px]"
                                    />
                                </div>
                                <span className="text-[red] text-[16px]">{errors.name && <p>{errors.name}</p>}</span>
                            </div>
                            <div className="md:w-[50%] w-[100%]">
                                <label className="mb-3 block text-black dark:text-white">
                                    Email <span className='text-center'>*</span>
                                </label>
                                <div className="relative z-20">
                                    <span className='absolute top-1/2 left-4 z-30 -translate-y-1/2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none">
                                            <path d="M22.5538 17.5371H2.35307C1.97038 17.5371 1.60337 17.3683 1.33277 17.0679C1.06218 16.7675 0.910156 16.3601 0.910156 15.9353L0.910156 0.985225C0.910156 0.843618 0.96083 0.707811 1.05103 0.607679C1.14123 0.507547 1.26356 0.451294 1.39113 0.451294C1.51869 0.451294 1.64102 0.507547 1.73122 0.607679C1.82142 0.707811 1.8721 0.843618 1.8721 0.985225V15.9353C1.8721 16.0769 1.92277 16.2127 2.01297 16.3129C2.10317 16.413 2.2255 16.4692 2.35307 16.4692H22.5538C22.6814 16.4692 22.8037 16.413 22.8939 16.3129C22.9841 16.2127 23.0348 16.0769 23.0348 15.9353V0.985225C23.0348 0.843618 23.0854 0.707811 23.1756 0.607679C23.2658 0.507547 23.3882 0.451294 23.5157 0.451294C23.6433 0.451294 23.7656 0.507547 23.8558 0.607679C23.946 0.707811 23.9967 0.843618 23.9967 0.985225V15.9353C23.9967 16.3601 23.8447 16.7675 23.5741 17.0679C23.3035 17.3683 22.9365 17.5371 22.5538 17.5371Z" fill="#1D2D5C" stroke="#3F4E7A" stroke-width="0.5" />
                                            <path d="M12.4538 11.1299C12.3459 11.1308 12.2409 11.0913 12.1556 11.0178L1.09333 1.40704C1.01388 1.33861 0.955762 1.24425 0.927132 1.13724C0.898503 1.03023 0.900806 0.915954 0.933717 0.810474C0.966628 0.704993 1.02849 0.613617 1.11061 0.549192C1.19273 0.484767 1.29097 0.450534 1.39153 0.451307H23.5161C23.6167 0.450534 23.7149 0.484767 23.7971 0.549192C23.8792 0.613617 23.941 0.704993 23.9739 0.810474C24.0069 0.915954 24.0092 1.03023 23.9805 1.13724C23.9519 1.24425 23.8938 1.33861 23.8143 1.40704L12.752 11.0178C12.6668 11.0913 12.5617 11.1308 12.4538 11.1299ZM2.78634 1.51917L12.4538 9.91791L22.1213 1.51917H2.78634Z" fill="#1D2D5C" stroke="#3F4E7A" stroke-width="0.5" />
                                            <path d="M23.0349 17.0032C22.9716 17.0036 22.9089 16.9901 22.8503 16.9635C22.7917 16.937 22.7384 16.8978 22.6935 16.8483L16.4408 9.90723C16.3621 9.80509 16.3209 9.6737 16.3256 9.53932C16.3302 9.40495 16.3804 9.27748 16.4661 9.18239C16.5517 9.0873 16.6666 9.03159 16.7876 9.0264C16.9087 9.02121 17.027 9.06692 17.119 9.15439L23.3716 16.0955C23.4375 16.1701 23.4823 16.2646 23.5003 16.3672C23.5183 16.4698 23.5088 16.576 23.4729 16.6726C23.4371 16.7692 23.3765 16.8521 23.2986 16.9108C23.2208 16.9696 23.1291 17.0017 23.0349 17.0032Z" fill="#1D2D5C" stroke="#3F4E7A" stroke-width="0.5" />
                                            <path d="M1.87244 17.0032C1.77691 17.0038 1.68337 16.9728 1.60376 16.9142C1.52415 16.8556 1.46207 16.772 1.42544 16.674C1.38881 16.5761 1.37928 16.4682 1.39807 16.3643C1.41686 16.2603 1.46312 16.1649 1.53095 16.0902L7.78356 9.14908C7.87557 9.06161 7.99392 9.0159 8.11497 9.02109C8.23602 9.02628 8.35085 9.08199 8.4365 9.17708C8.52216 9.27217 8.57234 9.39964 8.57702 9.53401C8.58169 9.66839 8.54052 9.79978 8.46172 9.90192L2.20912 16.843C2.12032 16.9436 1.9993 17.0012 1.87244 17.0032Z" fill="#1D2D5C" stroke="#3F4E7A" stroke-width="0.5" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        value={formData.email}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pl-[54px] text-[#3F4E7A] text-[14px]"
                                    />
                                    <span className="text-[red] text-[16px]">{errors.email && <p>{errors.email}</p>}</span>

                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-nowrap flex-wrap gap-[28px]">
                            <div className="md:w-[50%] w-[100%]">
                                <label className="mb-3 block text-black dark:text-white">
                                    Business Name <span className='text-center'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="businessName"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <span className="text-[red] text-[16px]">{errors.businessName && <p>{errors.businessName}</p>}</span>
                            </div>
                            <div className="md:w-[50%] w-[100%]">
                                <label className="mb-3 block text-black dark:text-white">
                                    Business Type <span className='text-center'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="businessType"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <span className="text-[red] text-[16px]">{errors.businessType && <p>{errors.businessType}</p>}</span>
                            </div>

                        </div>
                        <div className="md:w-[50%] w-[100%]">
                            <label className="mb-3 block text-black dark:text-white">
                                SSN <span className='text-center'>*</span>
                            </label>
                            <input
                                type="text"
                                name="ssnNumber"
                                onChange={handleChange}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            <span className="text-[red] text-[16px]">{errors.businessType && <p>{errors.businessType}</p>}</span>
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                About <span className='text-center'>*</span>
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Type something here..."
                                name="about"
                                onChange={handleChange}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            ></textarea>
                            <span className="text-[red] text-[16px]">{errors.about && <p>{errors.about}</p>}</span>
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Description <span className='text-center'>*</span>
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Type something here..."
                                name="description"
                                onChange={handleChange}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            ></textarea>
                            <span className="text-[red] text-[16px]">{errors.description && <p>{errors.description}</p>}</span>
                        </div>

                        <div className='flex gap-[14px] justify-end'>
                            <Link
                                to="#"
                                onClick={handleCancel}
                                className="inline-flex items-center justify-center rounded-md bg-[#FFF] border-[1px] border-[#E2E8F0] py-[8px] px-[25px] text-center font-[400] text-[#1C2434] text-[16px] hover:bg-opacity-90 leading-[23px]"
                            >
                                Cancel
                            </Link>
                            <Link
                                to="#"
                                onClick={handleSubmit}
                                className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                            >
                                Save
                            </Link>
                        </div>
                        {profileSuccessMessage && (
                            <span className="bg-[green] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]">{profileSuccessMessage && <p>{profileSuccessMessage}</p>}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[25px] w-full md:max-w-[43%] max-w-[100%] md:pl-[15px] pl-[0]">
                <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Documents & Images
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label htmlFor="upload-file" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[24px] cursor-pointer">
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
                                id="upload-file"
                                name='profileBusinessDoc'
                                onChange={handleProfileBusinessDoc}
                                multiple
                                hidden
                            />
                        </div>
                        <div className='border-b border-stroke pb-[19px]'>
                            <p className='text-[#1C2434] text-[16px] font-[400] leading-[22px]'>Documents related to business and any proof you own the business.</p>
                        </div>
                        <div className='flex gap-[14px] justify-end mt-[5px]'>
                            <Link
                                to="#"
                                className="inline-flex items-center justify-center rounded-md bg-[#FFF] border-[1px] border-[#E2E8F0] py-[8px] px-[25px] text-center font-[400] text-[#1C2434] text-[16px] hover:bg-opacity-90 leading-[23px]"
                            >
                                Cancel
                            </Link>
                            <Link
                                to="#"
                                onClick={handleBusinessDocSubmission}
                                className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                            >
                                Upload
                            </Link>
                        </div>
                        {responseErrorMessage2 && (
                            <span className="bg-[red] mt-[9px] max-w-[500px] w-full text-center rounded-lg text-white py-[15px] ">{responseErrorMessage2 && <p>{responseErrorMessage2}</p>}</span>
                        )}
                        {businessDocSucessMessage && (
                            <span className="bg-[green] mt-[9px] max-w-[500px] w-full text-center rounded-lg text-white py-[15px] ">{businessDocSucessMessage && <p>{businessDocSucessMessage}</p>}</span>
                        )}
                    </div>

                </div>
                <div className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            ID Verification Documents
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 mt-[10px] gap-4">
                        <div className="inline-block relative cursor-pointer select-none pl-5 text-14 leading-1.43 text-black  outline-none">
                            <label htmlFor='dcType1'>
                                <input
                                    type='radio'
                                    id='dcType1'
                                    name='dcType'
                                    className='m-[10px]'
                                    value='driverLisence'
                                    onChange={handleChange}
                                />
                                Driver's License
                            </label>
                        </div>

                        <div className="inline-block relative cursor-pointer select-none pl-5 text-14 leading-1.43 text-black outline-none">
                            <label htmlFor='dcType2'>
                                <input
                                    type='radio'
                                    id='dcType2'
                                    name='dcType'
                                    className='m-[10px]'
                                    value='residencePermit'
                                    onChange={handleChange}
                                />
                                Residence Permit
                            </label>
                        </div>

                        <div className="inline-block relative cursor-pointer select-none pl-5 text-14 leading-1.43 text-black outline-none">
                            <label htmlFor='dcType3'>
                                <input
                                    type='radio'
                                    id='dcType3'
                                    name='dcType'
                                    className='m-[10px]'
                                    value='idCard'
                                    onChange={handleChange}
                                />
                                ID Card
                            </label>
                        </div>

                        <div className="inline-block relative cursor-pointer select-none pl-5 text-14 leading-1.43 text-black outline-none">
                            <label htmlFor='dcType4'>
                                <input
                                    type='radio'
                                    id='dcType4'
                                    name='dcType'
                                    className='m-[10px]'
                                    value='passport'
                                    onChange={handleChange}
                                />
                                Passport
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label htmlFor="uploadIdVerification" className="block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[24px] cursor-pointer">
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
                                name='userIdentityVerification'
                                id="uploadIdVerification"
                                onChange={handleProfileBusinessDoc}
                                multiple
                                hidden
                            />
                        </div>
                        <div className='border-b border-stroke pb-[19px]'>
                            <p className='text-[#1C2434] text-[16px] font-[400] leading-[22px]'>Documents related to your identity verification.</p>
                        </div>
                        <div className='flex gap-[14px] justify-end mt-[5px]'>
                            <Link
                                to="#"
                                className="inline-flex items-center justify-center rounded-md bg-[#FFF] border-[1px] border-[#E2E8F0] py-[8px] px-[25px] text-center font-[400] text-[#1C2434] text-[16px] hover:bg-opacity-90 leading-[23px]"
                            >
                                Cancel
                            </Link>
                            <Link
                                to="#"
                                onClick={handleIdentityDocSubmission}
                                className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                            >
                                Upload
                            </Link>
                        </div>
                        {responseErrorMessage && (
                            <span className="bg-[red] mt-[9px] max-w-[500px] w-full text-center rounded-lg text-white py-[15px] ">{responseErrorMessage && <p>{responseErrorMessage}</p>}</span>
                        )}
                        {verificationSuccessMessage && (
                            <span className="bg-[green] mt-[9px] max-w-[500px] w-full text-center rounded-lg text-white py-[15px] ">{verificationSuccessMessage && <p>{verificationSuccessMessage}</p>}</span>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProfileInfo;
