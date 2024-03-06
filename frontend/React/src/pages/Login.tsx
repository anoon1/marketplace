import React, { useState, ChangeEvent, FormEvent } from 'react';
import config from '../config/configuration_keys.json'
import { useNavigate, useLocation } from 'react-router-dom';
interface FormData {
    email: string;
    password: string;
    general: string;
}
const bannerStyle = {
    background: 'linear-gradient(89deg, #E84DB2 4.36%, #2174F5 98.1%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
};
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

const Login = () => {
    let baseUrl = config.baseApiUrl
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        general: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${baseUrl}users/signIn`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    let data = responseData.data;
                    let role = data.checkRole;
                    let token = data.token;
                    let stepCheck = data.checkStep;
                    let userName = data.userName;
                    localStorage.setItem('name', userName);
                    localStorage.setItem('usertoken', token);
                    localStorage.setItem('role', role);
                    localStorage.setItem('completedStep', stepCheck);
                    if (role == 'seller') {
                        navigate('/OnboardingSeller/WelcomePage', { state: { role, token, userName } });
                    } else {
                        if (role == 'buyer') {
                            navigate('/OnboardingBuyer/Welcome', { state: { role, token, userName } });
                        } else if (role == 'admin') {
                            navigate('/OnboardingAdmin/dashboard');
                        }
                    }
                } else {
                    const errorData = await response.json();
                    console.log('message', errorData.errors);
                    if (errorData && errorData.errors) {
                        setErrors(errorData.errors);
                    } else {
                        console.error('SignIn failed');
                    }
                }
            } catch (error) {
                console.error('Error during signup:', error);
            }

        }
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.email) {
            newErrors.email = '• Please enter a valid email';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
        }
        if (!formData.password) {
            newErrors.password = '• Password is required';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <section className="bg-white h-full  flex items-center justify-center">
                <div className="bg-white flex  w-full">
                    <div className="lg:block  relative  h-screen flex  overflow-hidden hidden w-1/2 bg-[#D2EDFE]">
                        <div className=" inline-block min-w-full  h-[30%] w-full  flex flex-col justify-start items-center text-center text-white z-9 relative">
                            <div className="flex items-center pt-[94px]">
                                <a href="/" className="flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                                    {/* <img src="/assets/logo/logo.svg" alt="Logo" /> */}
                                    <h1 style={logo} className="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-gradient-to-tr bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text">OM</h1>

                                    <span className="text-[#040037] font-['SFProDisplay'] pl-[10px] text-[18px] sm:text-[24px] font-[600] leading-[20px]">Online MarketPlace</span>
                                </a>
                            </div>
                            <p className=" py-[24px] px-4 max-w-[500px] sm:text-xl text-base leading-[30px] text-center text-[#535D7A] font-normal tracking-[0.6px]">
                                The private acquisition marketplace for Chrome Extensions, no middlemen.
                            </p>
                        </div>
                        <img src="assets/sign-b.svg" alt="Background Image" className="w-full h-[70%] object-cover object-top" />

                    </div>
                    {/* <!-- form --> */}
                    <div className="grid h-screen lg:max-w-[428px] max-w-[100%] w-full mx-auto h-auto">
                        <div className="lg:hidden flex items-center flex-col justify-center bg-[#D2EDFE] max-h-[200px]">
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
                        <div className="flex lg:items-center items-start">

                            <div className="max-w-[428px] w-full mx-auto h-auto px-[20px] lg:px-[5px]">
                                <h2 className="text-[33px] leading-[45px] font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text" style={bannerStyle}>Sign In</h2>
                                <p className="text-base text-[#64748B] pt-[2px]">Fill in your details below to create an account</p>
                                <form action="" onSubmit={handleLogIn} className="flex flex-col gap-4 py-[24px]">
                                    <div className="">
                                        <label htmlFor="email" className="text-[#1C2434] text-base font-normal leading-[24px]">Email</label>
                                        <div className="relative pt-[10px]">
                                            <input className="py-[15px] px-[15px] md:px-[25px] max-w-[428px] rounded-lg border-[#E2E8F0]  border w-full text-[#64748B] text-base font-normal leading-[24px] outline-[#3C50E0]" id="email" type="email" name="email" value={formData.email} onChange={handleLoginChange} placeholder="Enter your email" />
                                            {/* <!-- SVG for eye icon (for password visibility) --> */}
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
                                            <input className="py-[15px]  px-[15px] md:px-[25px] outline-[#3C50E0] rounded-xl max-w-[428px] rounded-lg border-[#E2E8F0]  border w-full text-[#64748B] text-base font-normal leading-[24px]" id="password" type="password" name="password" value={formData.password} onChange={handleLoginChange} placeholder="6+ Characters, 1 Capital letter" />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-eye absolute top-[59%] right-3 -translate-y-1/2" viewBox="0 0 22 22" fill="none">
                                                <g opacity="0.5">
                                                    <path d="M16.1562 6.80626V5.91251C16.1562 3.16251 14.0937 0.825009 11.4812 0.618759C10.0374 0.481259 8.59365 0.996884 7.52803 1.95938C6.4624 2.92188 5.84365 4.29688 5.84365 5.70626V6.80626C3.8499 7.18438 2.3374 8.93751 2.3374 11.0688V17.2906C2.3374 19.5594 4.19365 21.3813 6.42803 21.3813H15.503C17.7718 21.3813 19.628 19.525 19.628 17.2563V11C19.6624 8.93751 18.1499 7.21876 16.1562 6.80626ZM8.55928 3.09376C9.31553 2.40626 10.3124 2.06251 11.3437 2.16563C13.1655 2.33751 14.6093 3.98751 14.6093 5.91251V6.70313H7.39053V5.67188C7.39053 4.70938 7.80303 3.78126 8.55928 3.09376ZM18.1155 17.2906C18.1155 18.7 16.9468 19.8688 15.5374 19.8688H6.4624C5.05303 19.8688 3.91865 18.7344 3.91865 17.325V11.0688C3.91865 9.52188 5.15615 8.28438 6.70303 8.28438H15.2968C16.8437 8.28438 18.1155 9.52188 18.1155 11V17.2906Z" fill="#64748B" />
                                                    <path d="M10.9999 11.8594C10.5874 11.8594 10.2092 12.2031 10.2092 12.65V16.2594C10.2092 16.6719 10.553 17.05 10.9999 17.05C11.4124 17.05 11.7905 16.7063 11.7905 16.2594V12.6156C11.7905 12.2031 11.4124 11.8594 10.9999 11.8594Z" fill="#64748B" />
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="text-[red] text-[16px]">{errors.password && <p>{errors.password}</p>}</span>
                                    </div>
                                    <button className="bg-[#2174F5] mt-[9px] max-w-[428px] w-full rounded-lg text-white py-[15px] hover:scale-105 duration-300">Sign In</button>
                                    {errors.general && (
                                        <span className="bg-[red] text-center mt-[9px] max-w-[428px] w-full rounded-lg text-white py-[15px]">
                                            <p>{errors.general}</p>
                                        </span>
                                    )}
                                    {message && (
                                        <span className="bg-[red] text-center mt-[9px] max-w-[428px] w-full rounded-lg text-white py-[15px]">
                                            <p>{message}</p>
                                        </span>
                                    )}
                                </form>
                                <p className="text-center font-normal text-base leading-[24px] text-[#64748B] lg:pb-[0px] pb-[20px]">
                                    Don't have any account?<a href="/SignUpMain" className="text-[#3b82f6]"> Sign Up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
