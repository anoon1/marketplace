import React, { useState, ChangeEvent, FormEvent } from 'react';
import config from '../config/configuration_keys.json'
const bannerStyle = {
    background: 'linear-gradient(89deg, #E84DB2 4.36%, #2174F5 98.1%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPass: string;
    matchpassword: string;
    interest: string;
    general?: string;
}
const logo = {
    background: 'linear-gradient(89deg, #E84DB2 4.36%, #2174F5 98.1%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'font-serif',
    fontWeight: 'bold',
    fontSize: '35px',
    lineHeight: '1.5',
};
const SignUpMain: React.FC = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let apiUrl = config.baseApiUrl;
    const sellerValue = urlParams.get('r');

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPass: '',
        matchpassword: '',
        interest: '',
        general: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type == 'radio' ? (checked ? value : '') : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${apiUrl}users/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPass: '',
                        matchpassword: '',
                        interest: '',
                    });
                    setSuccessMessage('Signup successful!');
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        setErrors(errorData.errors);
                    } else {
                        console.error('Signup failed');
                    }
                }
            } catch (error) {
                console.error('Error during signup:', error);
            }

        }
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};

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
        if (!formData.password) {
            newErrors.password = '• Password is required';
        } else {
            if (formData.password.length < 6) {
                newErrors.password = '• Password must be at least 6 characters long\n';
            }

            if (!/[A-Z]/.test(formData.password)) {
                newErrors.password = newErrors.password
                    ? `${newErrors.password}• Password must contain at least one uppercase letter`
                    : '• Password must contain at least one uppercase letter';
            }
        }

        if (!formData.confirmPass) {
            newErrors.confirmPass = '• Confirm password is required';
        }
        if (!formData.interest) {
            newErrors.interest = '• Interest is required';
        }
        if (formData.password && formData.confirmPass && formData.password !== formData.confirmPass) {
            newErrors.matchpassword = 'Password and confirm password not matched';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    return (
        <>
            <section className="bg-white h-full  flex items-center justify-center">
                {/* <!-- login container --> */}
                <div className="bg-white flex  w-full">
                    <div className="lg:block  relative h-[100%]  min-h-screen flex  overflow-hidden hidden w-1/2 bg-[#D2EDFE]">
                        <div className=" inline-block min-w-full  h-[30%] w-full  flex flex-col justify-start items-center text-center text-white z-9 relative">
                            <div className="flex items-center pt-[94px]">
                                <a href="/" className="flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                                    {/* <img src="/assets/logo/logo.svg" alt="Logo" /> */}
                                    <h1 style={logo} className="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-gradient-to-tr bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text">OM</h1>

                                    <span className="text-[#040037] font-['SFProDisplay'] pl-[10px] text-[18px] sm:text-[24px] font-[600] leading-[20px]">Online MarketPlace</span>
                                </a>
                            </div>
                            <p className=" py-[24px] px-4 max-w-xl sm:text-xl text-base leading-[30px] text-center text-[#535D7A] font-normal tracking-[0.6px]">
                                The private acquisition marketplace for Chrome Extensions, no middlemen.
                            </p>
                        </div>
                        {/* <!--image --> */}
                        <img src="assets/sign-b.svg" alt="Background Image" className="w-full h-[70%] object-cover object-top" />
                        {/* <!-- Text content --> */}

                    </div>
                    {/* <!-- form --> */}
                    <div className="grid h-screen lg:max-w-[428px] max-w-[100%] w-full mx-auto h-auto">
                        <div className="lg:hidden flex items-center flex-col justify-center bg-[#D2EDFE] min-h-[200px]">
                            <div className="flex lg:items-center">
                                <a href="/" className="flex items-center font-medium pt-[20px] text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                                    <img src="assets/logo-txt.png" alt="Logo" />
                                    <span className="text-[#040037] font-['SFProDisplay'] pl-[10px]  text-[25px] sm:text-4xl font-normal font-semibold leading-normal">Brand Name</span>
                                </a>
                            </div>
                            <p className=" py-[24px] sm:px-4 px-[10px] max-w-xl text-[18px] text-base leading-[30px] text-center text-[#535D7A] font-normal tracking-[0.6px]  ">
                                The private acquisition marketplace for Chrome Extensions, no middlemen.
                            </p>
                        </div>
                        <div className="flex items-center pt-[80px] lg:pt-[0px]">

                            <div className="max-w-[428px] w-full mx-auto h-auto px-[20px] lg:px-[0px]">
                                <h2 className="text-[33px] leading-[45px] font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text" style={bannerStyle}>Sign Up</h2>
                                <p className="text-base text-[#64748B] pt-[2px]">Fill in your details below to create an account</p>
                                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 py-[24px]" id="mainSignUp">
                                    <div className="">
                                        <label htmlFor="name" className="text-[#1C2434] text-base font-normal leading-[24px]">Name</label>
                                        <div className="relative pt-[10px]">
                                            <input className="py-[15px]  px-[25px] max-w-[428px] rounded-lg border-[#E2E8F0]  border w-full text-[#64748B] text-base font-normal leading-[24px] outline-[#3C50E0]" id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" className="bi bi-eye   absolute top-[59%] right-3 -translate-y-1/2" fill="none">
                                                <g opacity="0.5">
                                                    <path d="M11.6607 9.52185C14.2044 9.52185 16.2669 7.5281 16.2669 5.0531C16.2669 2.5781 14.2044 0.584351 11.6607 0.584351C9.11694 0.584351 7.05444 2.5781 7.05444 5.0531C7.05444 7.5281 9.11694 9.52185 11.6607 9.52185ZM11.6607 2.1656C13.3451 2.1656 14.7201 3.47185 14.7201 5.08748C14.7201 6.7031 13.3451 8.00935 11.6607 8.00935C9.97632 8.00935 8.60132 6.7031 8.60132 5.08748C8.60132 3.47185 9.97632 2.1656 11.6607 2.1656Z" fill="#64748B" />
                                                    <path d="M13.8951 11.0687H9.42632C5.74819 11.0687 2.75757 14.0937 2.75757 17.7719V20.625C2.75757 21.0375 3.10132 21.4156 3.54819 21.4156C3.99507 21.4156 4.33882 21.0719 4.33882 20.625V17.7719C4.33882 14.9531 6.64194 12.6156 9.49507 12.6156H13.9294C16.7482 12.6156 19.0857 14.9187 19.0857 17.7719V20.625C19.0857 21.0375 19.4294 21.4156 19.8763 21.4156C20.3232 21.4156 20.6669 21.0719 20.6669 20.625V17.7719C20.5638 14.0937 17.5732 11.0687 13.8951 11.0687Z" fill="#64748B" />
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="text-[red] text-[16px]">{errors.name && <p>{errors.name}</p>}</span>
                                    </div>
                                    <div className="">
                                        <label htmlFor="email" className="text-[#1C2434] text-base font-normal leading-[24px]">Email</label>
                                        <div className="relative pt-[10px]">
                                            <input className="py-[15px]  px-[25px] max-w-[428px] rounded-lg border-[#E2E8F0]  border w-full text-[#64748B] text-base font-normal leading-[24px] outline-[#3C50E0]" id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" className="bi bi-eye   absolute top-[59%] right-3 -translate-y-1/2" fill="none">
                                                <g opacity="0.5">
                                                    <path d="M19.2501 3.29999H2.7501C1.58135 3.29999 0.584473 4.26249 0.584473 5.46561V16.6031C0.584473 17.7719 1.54697 18.7687 2.7501 18.7687H19.2501C20.4188 18.7687 21.4157 17.8062 21.4157 16.6031V5.43124C21.4157 4.26249 20.4188 3.29999 19.2501 3.29999ZM19.2501 4.84686C19.2845 4.84686 19.3188 4.84686 19.3532 4.84686L11.0001 10.2094L2.64697 4.84686C2.68135 4.84686 2.71572 4.84686 2.7501 4.84686H19.2501ZM19.2501 17.1531H2.7501C2.40635 17.1531 2.13135 16.8781 2.13135 16.5344V6.35936L10.1751 11.5156C10.4157 11.6875 10.6907 11.7562 10.9657 11.7562C11.2407 11.7562 11.5157 11.6875 11.7563 11.5156L19.8001 6.35936V16.5687C19.8688 16.9125 19.5938 17.1531 19.2501 17.1531Z" fill="#64748B" />
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="text-[red] text-[16px]">{errors.email && <p>{errors.email}</p>}</span>
                                    </div>
                                    <div className="">
                                        <label htmlFor="password" className="text-[#1C2434] text-base font-normal leading-[24px]">Password</label>
                                        <div className="relative pt-[10px]">
                                            <input className="py-[15px]  px-[25px] outline-[#3C50E0] rounded-xl max-w-[428px] rounded-lg border-[#E2E8F0]  border w-full text-[#64748B] text-base font-normal leading-[24px]" id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-eye absolute top-[59%] right-3 -translate-y-1/2" viewBox="0 0 22 22" fill="none">
                                                <g opacity="0.5">
                                                    <path d="M16.1562 6.80626V5.91251C16.1562 3.16251 14.0937 0.825009 11.4812 0.618759C10.0374 0.481259 8.59365 0.996884 7.52803 1.95938C6.4624 2.92188 5.84365 4.29688 5.84365 5.70626V6.80626C3.8499 7.18438 2.3374 8.93751 2.3374 11.0688V17.2906C2.3374 19.5594 4.19365 21.3813 6.42803 21.3813H15.503C17.7718 21.3813 19.628 19.525 19.628 17.2563V11C19.6624 8.93751 18.1499 7.21876 16.1562 6.80626ZM8.55928 3.09376C9.31553 2.40626 10.3124 2.06251 11.3437 2.16563C13.1655 2.33751 14.6093 3.98751 14.6093 5.91251V6.70313H7.39053V5.67188C7.39053 4.70938 7.80303 3.78126 8.55928 3.09376ZM18.1155 17.2906C18.1155 18.7 16.9468 19.8688 15.5374 19.8688H6.4624C5.05303 19.8688 3.91865 18.7344 3.91865 17.325V11.0688C3.91865 9.52188 5.15615 8.28438 6.70303 8.28438H15.2968C16.8437 8.28438 18.1155 9.52188 18.1155 11V17.2906Z" fill="#64748B" />
                                                    <path d="M10.9999 11.8594C10.5874 11.8594 10.2092 12.2031 10.2092 12.65V16.2594C10.2092 16.6719 10.553 17.05 10.9999 17.05C11.4124 17.05 11.7905 16.7063 11.7905 16.2594V12.6156C11.7905 12.2031 11.4124 11.8594 10.9999 11.8594Z" fill="#64748B" />
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="text-[red] text-[16px]">
                                            {errors.password && (
                                                <p>{errors.password.split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}</p>
                                            )}
                                        </span>
                                    </div>
                                    <div className="">
                                        <label htmlFor="confirm-password" className="text-[#1C2434] text-base font-normal leading-[24px]">Password</label>
                                        <div className="relative pt-[10px]">
                                            <input className="py-[15px]  px-[25px] outline-[#3C50E0] rounded-xl max-w-[428px] rounded-lg border-[#E2E8F0]  border w-full text-[#64748B] text-base font-normal leading-[24px]" id="confirm-password" type="password" name="confirmPass" value={formData.confirmPass} onChange={handleChange} placeholder="Re-enter your password" />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-eye absolute top-[59%] right-3 -translate-y-1/2" viewBox="0 0 22 22" fill="none">
                                                <g opacity="0.5">
                                                    <path d="M16.1562 6.80626V5.91251C16.1562 3.16251 14.0937 0.825009 11.4812 0.618759C10.0374 0.481259 8.59365 0.996884 7.52803 1.95938C6.4624 2.92188 5.84365 4.29688 5.84365 5.70626V6.80626C3.8499 7.18438 2.3374 8.93751 2.3374 11.0688V17.2906C2.3374 19.5594 4.19365 21.3813 6.42803 21.3813H15.503C17.7718 21.3813 19.628 19.525 19.628 17.2563V11C19.6624 8.93751 18.1499 7.21876 16.1562 6.80626ZM8.55928 3.09376C9.31553 2.40626 10.3124 2.06251 11.3437 2.16563C13.1655 2.33751 14.6093 3.98751 14.6093 5.91251V6.70313H7.39053V5.67188C7.39053 4.70938 7.80303 3.78126 8.55928 3.09376ZM18.1155 17.2906C18.1155 18.7 16.9468 19.8688 15.5374 19.8688H6.4624C5.05303 19.8688 3.91865 18.7344 3.91865 17.325V11.0688C3.91865 9.52188 5.15615 8.28438 6.70303 8.28438H15.2968C16.8437 8.28438 18.1155 9.52188 18.1155 11V17.2906Z" fill="#64748B" />
                                                    <path d="M10.9999 11.8594C10.5874 11.8594 10.2092 12.2031 10.2092 12.65V16.2594C10.2092 16.6719 10.553 17.05 10.9999 17.05C11.4124 17.05 11.7905 16.7063 11.7905 16.2594V12.6156C11.7905 12.2031 11.4124 11.8594 10.9999 11.8594Z" fill="#64748B" />
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="text-[red] text-[16px]">{errors.confirmPass && <p>{errors.confirmPass}</p>}</span>
                                        <span className="text-[red] text-[16px]">{errors.matchpassword && <p>{errors.matchpassword}</p>}</span>
                                        <div className="pt-[18px]">
                                            <h3 className="text-[#1C2434] text-base font-normal leading-[24px] mb-[14px]">I am interested in:</h3>
                                            <div className="flex items-center gap-[15px] flex-wrap">
                                                <div className="flex items-center gap-[8px]">
                                                    <label htmlFor="Buying" className="relative font-medium text-base leading-[28px] text-[#707E9A] pl-[30px]">Buying extension
                                                        <input
                                                            type="radio"
                                                            id="Buying"
                                                            name="interest"
                                                            value="buying"
                                                            checked={formData.interest == 'buying'}
                                                            onChange={handleChange}
                                                            className="cursor-pointer w-[21px] h-[21px] appearance-none w-5 h-5 border-2  border-gray-300 rounded-full checked:outline-none checked:border-blue-500 checked:border-[7px] absolute left-[0] top-[2px]"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="flex items-center  gap-[8px]">
                                                    <label htmlFor="selling" className="relative font-medium text-base leading-[28px] text-[#707E9A] pl-[30px]">Selling extension
                                                        <input
                                                            type="radio"
                                                            id="selling"
                                                            name="interest"
                                                            value="selling"
                                                            checked={formData.interest == 'selling' || sellerValue == 'seller'}
                                                            onChange={handleChange}
                                                            className="cursor-pointer w-[21px] h-[21px] appearance-none w-5 h-5 border-2  border-gray-300 rounded-full checked:outline-none checked:border-blue-500 checked:border-[7px] absolute left-[0] top-[2px]"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[red] text-[16px]">{errors.interest && <p>{errors.interest}</p>}</span>
                                    </div>
                                    <button className="bg-[#2174F5] mt-[9px] max-w-[428px] w-full rounded-lg text-white py-[15px] hover:scale-105 duration-300">Sign up</button>
                                    {errors.general && (
                                        <span className="bg-[red] text-center mt-[9px] max-w-[428px] w-full rounded-lg text-white py-[15px]">
                                            <p>{errors.general}</p>
                                        </span>
                                    )}
                                    {successMessage && (
                                        <span className="bg-[green] mt-[9px] max-w-[428px] w-full text-center rounded-lg text-white py-[15px] ">{successMessage && <p>{successMessage}</p>}</span>
                                    )}
                                </form>
                                <p className="text-center font-normal text-base leading-[24px] text-[#64748B] pb-[20px] lg:pb-[0px]">
                                    Already have an account?<a href="/Login" className="text-[#3b82f6]"> Sign in</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUpMain;
