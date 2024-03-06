import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import config from '../config/configuration_keys.json'


const bannerBgImage = {
    backgroundImage: 'url(assets/banner-img.png)',
};
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
const connectionDivstyle = {
    paddingLeft: 'calc((100% - 1200px)/2)'
};

const menuTogglestyle = {
    display: 'none'
}

const menuTogglestyleblock = {
    display: 'none'
}

const filterStyle = {
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
};

const liMarkers = {
    color: '#E84DB2'
}



import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'

const Home = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [listing, setListing] = useState([])
    const nevigateSeller = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate('/SignUpMain?r=seller')
    }

    const normalizedRating = (rating: any) => {
        return parseFloat(rating) || 0;
    };

    useEffect(() => {
        const fetchDataWithSearch = () => {
            fetch(`${config.baseApiUrl}getLatestListing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.data) {
                        setListing(result.data)
                    }
                })
                .catch(error => console.log('error', error));
        }
        fetchDataWithSearch();
    }, [])
    const navigateSignup = () => {
        navigate('/SignUpMain');
    }
    const navigateSiIn = () => {
        navigate('/Login');
    }

    console.log('get listing>>>>>>>>>', listing)
    useEffect(() => {
        const checkUser = () => {
            const token = localStorage.getItem('usertoken');
            if (!token) {
                setIsAuthenticated(false);
            } else if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

                    if (isTokenExpired) {
                        navigate('/Login', { state: { message: 'Session expired, please log in again.' } });
                    } else {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Error decoding token:', error.message);
                    setIsAuthenticated(false);
                }
            }
        }
        checkUser();
    }, [])
    function formatNumber(number: any) {
        return Math.abs(Number(number)) >= 1.0e9
            ? (Math.abs(Number(number)) / 1.0e9).toFixed(2) + 'B'
            : Math.abs(Number(number)) >= 1.0e6
                ? (Math.abs(Number(number)) / 1.0e6).toFixed(2) + 'M'
                : Math.abs(Number(number)) >= 1.0e3
                    ? (Math.abs(Number(number)) / 1.0e3).toFixed(2) + 'k'
                    : Math.abs(Number(number));
    }
    const checkUserType = () => {
        const role = localStorage.getItem('role');
        if (role && role == 'seller') {
            navigate('/OnboardingSeller/WelcomePage');
        } else if (role && role == 'buyer') {
            navigate('/OnboardingBuyer/Welcome');
        } else if (role && role == 'admin') {
            navigate('/OnboardingAdmin/Welcome');
        }
    }


    function AccordionItem({ title, content }) {
        const [isOpen, setIsOpen] = useState(false);

        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="py-4 wow fadeInUp" >
                <button
                    className="flex justify-between items-center w-full py-2 rounded-md"
                    onClick={toggleAccordion}
                >
                    <span className="font-semibold text-[#1D2D5C] leading-normal sm:text-2xl text-[14px] text-left">
                        {title}
                    </span>
                    <span className="">
                        <img
                            className={`plus max-w-[25px] sm:max-w-[100%] ${isOpen ? 'hidden' : ''}`}
                            src="assets/add.svg"
                            alt="Expand"
                        />
                        <img
                            className={`minus max-w-[25px] sm:max-w-[100%] ${isOpen ? '' : 'hidden'}`}
                            src="assets/minus.svg"
                            alt="Collapse"
                        />
                    </span>
                </button>

                <div className={`faq-content mt-2 ${isOpen ? '' : 'hidden'}`}>
                    <p className="text-base leading-[25px] text-[#535D7A] max-w-3xl w-full">{content}</p>
                </div>
            </div>
        );
    }



    return (
        <>
            <section className="w-full bg-white">
                <div className="container flex items-center justify-between py-6 mx-auto md:flex-row max-w-7xl sm:px-10 px-4">
                    <div className="flex items-center wow fadeInLeft">
                        <a href="#_" className="flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0 ">
                            {/* <img src="/assets/logo/logo.svg" alt="Logo" /> */}
                            <h1 style={logo} className="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-gradient-to-tr bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text">OM</h1>

                            <span className="text-[#040037] font-['SFProDisplay'] pl-[10px] text-[18px] sm:text-[24px] font-[600] leading-[20px]">Online MarketPlace</span>
                        </a>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button id="menuToggle" className="focus:outline-none">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={menuTogglestyleblock}>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={menuTogglestyle}>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                    </div>

                    <div className="hidden md:flex md:items-center md:gap-[29px] lg:justify-end sm:mt-[0] mt-[10px] wow fadeInRight" id="desktopButtons">
                        {isAuthenticated ? (
                            <>
                                <button onClick={checkUserType} className="px-7 sm:mt-[0] mt-[10px] transition duration-300 rounded-tr-lg rounded-bl-lg py-4 text-white bg-blue-500 border hover:text-[#1D2D5C] hover:bg-transparent hover:border hover:border-solid hover:border-[#d1d5db] bg-[#2174F5]">Dashboard</button>
                            </>
                        ) : (
                            <>
                                <a href="#" onClick={() => navigate('/Login')} className="font-normal leading-normal text-[#040037] text-base block text-[#040037] font-['SFProDisplay']">Log In</a>
                                <button onClick={nevigateSeller} className="px-7 sm:mt-[0] mt-[10px] transition duration-300 rounded-tr-lg rounded-bl-lg py-4 text-white bg-blue-500 border hover:text-[#1D2D5C] hover:bg-transparent hover:border hover:border-solid hover:border-[#d1d5db] bg-[#2174F5]">Become a Seller</button>
                            </>
                        )}
                    </div>
                </div>

                <div className="absolute top-[98px] z-10 left-[10px] right-[10px] bg-white  rounded md:hidden hidden text-right " style={filterStyle} id="mobileMenu">
                    <a href="#" className="block   text-[#040037] border-b-[1px] p-[16px]">Log In</a>
                    <a href="#" className="block   text-[#040037] p-[16px]">Become a Seller</a>
                </div>
            </section>

            <section className="w-full bg-white">
                <div className="h-[378px] md:h-[567px] flex  bg-cover bg-bottom bg-no-repeat" style={bannerBgImage}>
                    <div className="flex flex-col sm:justify-center justify-start items-center pt-[40px] pb-[30px]   max-w-4xl mx-auto">
                        <h1 className="md:text-6xl leading-[42px]  md:leading-[76px]  font-bold text-center text-3xl wow fadeInUp font-[60px] text-[#000] font-['SFProDisplay']">Marketplace for <span style={bannerStyle}> Unlimited</span> Chrome Extensions</h1>
                        <p className="sm:py-10 py-[24px] px-4 max-w-xl sm:text-xl text-base leading-[30px] text-center text-[#535D7A] font-normal tracking-[0.6px] wow fadeInUp" data-wow-delay=".5s">
                            The private acquisition marketplace for Chrome Extensions, no middlemen.
                        </p>
                        <div className="flex gap-[10px] wow fadeInUp" data-wow-delay="1s">
                            {isAuthenticated ? (
                                <>
                                    <button className="px-10 py-4 transition duration-300 text-[#1D2D5C] rounded-tr-lg rounded-bl-lg border border-solid border-[#d1d5db] hover:bg-[#2174F5] hover:text-white">Learn More</button>

                                </>
                            ) : (
                                <>
                                    <button onClick={navigateSignup} className="bg-[#2174F5] transition duration-300 text-white px-10 py-4 rounded-tr-lg rounded-bl-lg hover:text-[#1D2D5C] hover:bg-transparent hover:border hover:border-solid hover:border-[#d1d5db]" >Join Today</button>
                                    <button className="px-10 py-4 transition duration-300 text-[#1D2D5C] rounded-tr-lg rounded-bl-lg border border-solid border-[#d1d5db] hover:bg-[#2174F5] hover:text-white">Learn More</button>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full bg-white">
                <div className="py-[50px] md:py-[100px]">
                    <div className="text-center">
                        <h2 className="sm:text-[54px] text-[28px] text-4xl text-[#1D2D5C] font-bold sm:leading-[68px]">Popular business industries</h2>
                        <p className="sm:py-10 py-[24px] font-normal text-[#535D7A]  text-[16px] tracking-[0.54px] leading-[30px]">Choose from the wide range of online business categories</p>
                    </div>
                    <div className="container sm:px-10 px-4 max-w-7xl mx-auto">
                        <div className="flex gap-[15px] justify-center flex-wrap mt-[30px] sm:mt-[0px]">
                            <div className="flex gap-[22px]  items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer  rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" >
                                <img className="bg-[#f9a8d4] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Translation</span>
                            </div>
                            <div className="flex gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay=".2s">
                                <img className="bg-[#8CD8E5] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Video calling</span>
                            </div>

                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg  cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay="0.4s">
                                <img className="bg-[#fdba74] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Image platform</span>
                            </div>
                            <div className="flex  gap-[22px]  items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay=".6s">
                                <img className="bg-[#97BDFF] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Stop advertisers</span>
                            </div>
                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay=".8s">
                                <img className="bg-[#C597FF] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Interactive media</span>
                            </div>
                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay="1s">
                                <img className="bg-[#97BDFF] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Stop advertisers</span>
                            </div>
                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay="1.2s">
                                <img className="bg-[#fdba74] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Image platform</span>
                            </div>
                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay="1.4s">
                                <img className="bg-[#C597FF] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Interactive media</span>
                            </div>
                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer  rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay="1.6s">
                                <img className="bg-[#8CD8E5] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Video calling</span>
                            </div>
                            <div className="flex  gap-[22px] items-center bg-[#EDF2F9] max-w-[210px] w-full px-[7px] py-[7px] rounded-tr-lg cursor-pointer  rounded-bl-lg hover:shadow-md transform transition duration-300 ease-in-out  hover:-translate-y-1 wow fadeInUp" data-wow-delay="1.8s">
                                <img className="bg-[#f9a8d4] p-[10px] rounded-bl-lg" src="assets/translation.svg" />
                                <span className="text-[#1e3a8a] text-base font-normal leading-normal">Translation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-[50px] md:pb-[100px] bg-white">
                <div className="bg-[#EDF2F9] py-[50px] md:py-[100px]">
                    <div className="text-center">
                        <h2 className="sm:text-[54px] text-[28px] text-[#1D2D5C] font-bold sm:leading-[68px] pb-[50px]">Featured extensions</h2>
                    </div>
                    <div className="container sm:px-10 px-4 max-w-7xl mx-auto">
                        <div className="flex justify-center flex-wrap gap-[24px]">
                            {listing.length > 0 ? (
                                listing.map(data => (
                                    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white wow fadeInLeft">
                                        <div className="md:py-[32px] py-[20px]">
                                            <div className="flex items-start gap-[20px] sm:px-[32px] px-[20px]">
                                                <img src={`${config.baseApiUrl}${data.listing_thumbnail ? data.listing_thumbnail : config.DEFAULT_IMG}`} className="rounded-full h-[70px] w-[70px]" alt="listingThumbnail" />
                                                <div className="">
                                                    <h4 className="font-semibold  text-xl text-[#1D2D5C] leading-[25px]">{data.title}</h4>
                                                    <p className="text-[#1D2D5C] text-[14px] flex items-center py-[6px] pm-[8px] gap-[5px]">
                                                        {data.rating}
                                                        {[...Array(5)].map((_, index) => (
                                                            <span
                                                                key={index}
                                                                style={{ color: index < Math.floor(normalizedRating(data.rating)) ? '#FFD700' : '#A0AEC0' }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}


                                                    </p>
                                                    <div className="w-full max-w-[145px]">
                                                        <a href="#" className="flex items-center text-[#3b82f6] bg-[#DCE6F8] rounded-[13px] justify-center gap-[8px]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                                <path d="M5.26331 5.57146V0.526316C5.26331 0.235642 5.02767 0 4.737 0C4.44633 0 4.21068 0.235642 4.21068 0.526316V5.57146L2.47758 3.83837C2.27204 3.63282 1.9388 3.63282 1.73326 3.83837C1.52771 4.04391 1.52771 4.37715 1.73326 4.58268L4.737 7.58642L7.74079 4.58268C7.94626 4.37715 7.94626 4.04391 7.74079 3.83837C7.53521 3.63283 7.20195 3.63283 6.99637 3.83837L5.26331 5.57146Z" fill="#5290F5" />
                                                                <path d="M0.526316 6.8421C0.816989 6.8421 1.05263 7.07774 1.05263 7.36842V8.21052C1.05263 8.61747 1.38253 8.94737 1.78947 8.94737H7.68421C8.09116 8.94737 8.42105 8.61747 8.42105 8.21052V7.36842C8.42105 7.07774 8.65674 6.8421 8.94737 6.8421C9.238 6.8421 9.47368 7.07774 9.47368 7.36842V8.21052C9.47368 9.19884 8.67253 10 7.68421 10H1.78947C0.801179 10 0 9.19884 0 8.21052V7.36842C0 7.07774 0.235642 6.8421 0.526316 6.8421Z" fill="#5290F5" />
                                                            </svg>
                                                            {formatNumber(data.downloads)} Downloads
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="mt-4 text-[#535D7A] text-base leading-[25px] font-normal sm:px-[32px] px-[20px] pb-[30px]">{data.description}</p>
                                            <div className="addit border-t border-b border-[#e5e5e5] py-[27px]">
                                                <h4 className="font-semibold text-xs text-[#535D7A] leading-[15px] uppercase sm:px-[32px] px-[20px]">Additional info</h4>
                                                <div className="flex justify-between mt-[20px] sm:px-[32px] px-[20px]">
                                                    <div className="w-1/2">
                                                        <div className="flex items-center gap-[10px]">
                                                            <img src="assets/version.svg" />
                                                            <div className="">
                                                                <h4 className="text-xs text-[#535D7A] leading-[24px] font-normal">Version</h4>
                                                                <p className="text-[#1D2D5C] text-base leading-[24px] font-normal">{data.version}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/2">
                                                        <div className="flex items-center gap-[10px]">
                                                            <img src="assets/net-proft.png" />
                                                            <div className="">
                                                                <h4 className="text-xs text-[#535D7A] leading-[24px] font-normal">Net profit</h4>

                                                                <p className="text-[#1D2D5C] text-base leading-[24px] font-normal">${data.net_profit}</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:px-[32px] px-[20px]">
                                                <div className="flex justify-between mt-4 pt-[27px]">
                                                    <div className="w-1/2">
                                                        <h4 className="text-sm text-[#535D7A] leading-[17px] font-normal">Asking price</h4>
                                                        <h3 className="text-[#1D2D5C] sm:text-xl text-[17px] leading-[25px] font-semibold mt-[12px]">USD ${data.asking_price}</h3>
                                                    </div>
                                                    {/* <div className="w-1/2 flex justify-end">
                                                <button className="sm:px-10 px-4 py-4 text-[#2174F5] transition duration-300 rounded-tr-lg rounded-bl-lg border-2 border-solid border-[#5290F5] hover:bg-[#2174F5] hover:text-white">View listing</button>
                                            </div> */}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                ))
                            ) : <span className='text-4xl'>No Extensions Found</span>}
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- buying extension --> */}
            <section className="w-full bg-white">
                <div className="pb-[50px] md:pb-[100px]">
                    <div className="container sm:px-10 max-w-7xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row md:gap-16 gap-[55px]">
                            <div className="buying-img  w-full md:max-w-[100%] lg:max-w-[50%]  flex lg:justify-start md:justify-center wow fadeInLeft">
                                <img src="assets/buying-ext.png" />
                            </div>
                            <div className="flex flex-col wow fadeInRight" data-wow-delay=".5s">
                                <h2 className="text-lg text-[#E84DB2] font-medium leading-[21px] pb-[11px]">How It Works</h2>
                                <h2 className="sm:text-[54px] text-[28px] text-[#1D2D5C] font-bold sm:leading-[63px] pb-[25px]">
                                    Buying an <span className="bg-gradient-to-r from-[#E84DB2] to-[#2174F5] text-transparent bg-clip-text">Extension</span>
                                </h2>
                                <p className="text-[#535D7A] text-lg  font-normal leading-[28px] pb-[5px]">
                                    Visit our marketplace to buy a Chrome extension. From passive investments to more involved assets, we've got them all.
                                </p>
                                <ul className="list-disc ml-4 md:ml-1 mt-3 md:mt-4">
                                    <li style={liMarkers}>
                                        <h3 className="text-[#1D2D5C] text-lg  font-medium leading-[28px] pb-[5px]">Registration:</h3>
                                        <p className="text-[#535D7A] text-base font-normal leading-[22px] pb-[22px]">Create a new account by filling out the registration form with your name, email, password, and user type (buyer).</p>
                                    </li>
                                    <li style={liMarkers}>
                                        <h3 className="text-[#1D2D5C] text-lg  font-medium leading-[28px] pb-[5px]">Preferences:</h3>
                                        <p className="text-[#535D7A] text-base font-normal leading-[22px] pb-[22px]">Provide your preferences such as the types of businesses you are interested in and your budget range.</p>
                                    </li>
                                    <li style={liMarkers}>
                                        <h3 className="text-[#1D2D5C] text-lg  font-medium leading-[28px] pb-[5px]">Marketplace Browsing:</h3>
                                        <p className="text-[#535D7A] text-base font-normal leading-[22px] pb-[22px]">Browse through the approved business listings using the search and filter functionality. </p>
                                    </li>
                                </ul>
                                <button className="bg-[#2174F5] text-white px-[35px] transition border duration-300 py-4 rounded-tr-lg rounded-bl-lg max-w-[157px] mt-[10px] hover:text-[#1D2D5C] hover:bg-transparent hover:border  hover:border-solid hover:border-[#d1d5db]">Get in touch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- selling extension --> */}
            <section className="w-full bg-white">
                <div className="pb-[50px] md:pb-[100px]">
                    <div className="container sm:px-10 px-4 max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row md:gap-16 gap-[55px]">
                            <div className="flex flex-col wow fadeInLeft" >
                                <h2 className="text-lg text-[#E84DB2] font-medium leading-[21px] pb-[11px]">How It Works</h2>
                                <h2 className="sm:text-[54px] text-[28px] text-[#1D2D5C] font-bold sm:leading-[63px] pb-[25px]" >Selling an <span className="bg-gradient-to-r from-[#E84DB2] to-[#2174F5] text-transparent bg-clip-text">Extension</span>
                                </h2>
                                <p className="text-[#535D7A] text-lg  font-normal leading-[28px] pb-[5px]">Sell your chrome extention on our website. We hold your hand through the process, step-by-step, and weed out
                                    non-serious buyers. </p>
                                <ul className="list-disc mt-4 ml-4">
                                    <li style={liMarkers}>
                                        <h3 className="text-[#1D2D5C] text-lg  font-medium leading-[28px] pb-[5px]">Registration:</h3>
                                        <p className="text-[#535D7A] text-base font-normal leading-[22px] pb-[22px]">Create a new account by filling out the registration form with your name, email, password, and user type (buyer).</p>
                                    </li>
                                    <li style={liMarkers}>
                                        <h3 className="text-[#1D2D5C] text-lg  font-medium leading-[28px] pb-[5px]">Onboarding:</h3>
                                        <p className="text-[#535D7A] text-base font-normal leading-[22px] pb-[22px]">Complete your seller profile by providing your business-related information such as your business name, type, description, asking price.</p>
                                    </li>
                                    <li style={liMarkers}>
                                        <h3 className="text-[#1D2D5C] text-lg  font-medium leading-[28px] pb-[5px]">Listings:</h3>
                                        <p className="text-[#535D7A] text-base font-normal leading-[22px] pb-[22px]">Create new listings by providing business details and setting the asking price. You can also edit or delete your existing listings. </p>
                                    </li>
                                </ul>
                                <button className="bg-[#2174F5] text-white px-[35px] transition border duration-300 py-4 rounded-tr-lg rounded-bl-lg max-w-[157px] mt-[10px] hover:text-[#1D2D5C] hover:bg-transparent hover:border  hover:border-solid hover:border-[#d1d5db]">Get in touch</button>
                            </div>
                            <div className="buying-img md:max-w-[100%] lg:max-w-[50%] w-full flex lg:justify-end md:justify-center wow fadeInRight" data-wow-delay=".5s">
                                <img src="assets/selling-ext.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- connections --> */}
            <section className="w-full bg-white">
                <div className="bg-[#EDF2F9] mb-[1rem] sm:mb-[5rem]">
                    <div className="max-w-[100%]">
                        <div className="flex flex-col md:flex-row md:gap-16 items-center">
                            <div className="flex flex-col w-full pt-[50px] pb-[50px] wow fadeInLeft" style={connectionDivstyle}>
                                <h3 className="text-xl md:text-lg text-[#E84DB2] font-medium leading-6 md:leading-[21px] pb-3 md:pb-1 px-4">What We Do</h3>
                                <h2 className="sm:text-[34px] lg:text-[54px] text-[28px] text-[#1D2D5C] font-bold sm:leading-[63px] md:pb-[24px] px-4">
                                    We make <span className="bg-gradient-to-r from-[#E84DB2] to-[#2174F5] text-transparent bg-clip-text">Connections</span>
                                </h2>
                                <p className="text-[#535D7A] text-base md:text-lg font-normal leading-[28px] pb-3 md:pb-5 px-4">
                                    Buy or sell Chrome extensions on our website by creating a marketplace. We'll connect you with the right people to start those conversations that lead to an acquisition.
                                </p>
                                <button className="bg-[#2174F5] text-white px-[35px] transition duration-300 py-4 border rounded-tr-lg rounded-bl-lg max-w-[157px] mt-[10px] hover:text-[#1D2D5C] hover:bg-transparent hover:border  hover:border-solid hover:border-[#d1d5db] ml-4">Get in touch</button>
                            </div>
                            <div className="md:max-w-[50%] max-w-[100%] pt-[20px] md:pt-[0] w-full">
                                <img src="assets/connections.png" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* <!-- testimonials --> */}
            <section className="bg-white w-full">
                <div className="relative container mx-auto max-w-7xl pb-[20px] md:pb-[80px]">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        navigation
                    >
                        {/* <!-- Slides --> */}
                        <SwiperSlide className='p-8'>
                            <div className="text-center">
                                <div className="">
                                    <h2 className="text-lg text-[#E84DB2] font-medium leading-[21px] pb-[11px]">Testimonials</h2>
                                    <h2 className="lg:text-[54px] sm:text-[40px] text-[28px] text-[#1D2D5C] font-bold leading-normal  text-center sm:pb-[50px] pb-[20px] flex justify-center">What Customers are Saying
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                                            <path d="M9.06365 2.20312L4.46875 14.5686" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                            <path d="M28.9338 3.77832L11.8809 19.881" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                            <path d="M29.6534 22.4717L17.2349 26.1226" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                        </svg>
                                    </h2>
                                    <p className="w-full max-w-screen-lg text-[#1D2D5C] mx-auto font-normal leading-[25px] sm:leading-[40px] text-[16px] sm:text-[26px] sm:pb-[50px] pb-[20px]   pl-[10px] pr-[10px]"> “There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.”</p>
                                </div>
                                <img src="assets/samantha.png" alt="Testimonial 1" className="mx-auto mb-4 rounded-full w-24 h-24" />
                                <h2 className="text-lg font-semibold mb-2">Samantha William</h2>
                                <p className="text-gray-600">"Senior designer at design studio"</p>
                            </div>
                        </SwiperSlide>

                        {/* <!-- 2nd slide --> */}
                        <SwiperSlide className='p-8'>
                            <div className="text-center">
                                <div className="">
                                    <h2 className="text-lg text-[#E84DB2] font-medium leading-[21px] pb-[11px]">Testimonials</h2>
                                    <h2 className="lg:text-[54px] sm:text-[40px] text-3xl text-[#1D2D5C] font-bold leading-normal  text-center sm:pb-[50px] pb-[20px] flex justify-center">What Customers are Saying
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                                            <path d="M9.06365 2.20312L4.46875 14.5686" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                            <path d="M28.9338 3.77832L11.8809 19.881" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                            <path d="M29.6534 22.4717L17.2349 26.1226" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                        </svg>
                                    </h2>
                                    <p className="w-full max-w-screen-lg text-[#1D2D5C] mx-auto font-normal leading-[25px] sm:leading-[40px] text-[16px] sm:text-[26px] sm:pb-[50px] pb-[20px]   pl-[10px] pr-[10px]"> “There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.”</p>
                                </div>
                                <img src="assets/samantha.png" alt="Testimonial 1" className="mx-auto mb-4 rounded-full w-24 h-24" />
                                <h2 className="text-lg font-semibold mb-2">Samantha William</h2>
                                <p className="text-gray-600">"Senior designer at design studio"</p>
                            </div>
                        </SwiperSlide>

                        {/* <!-- 3rd slide --> */}
                        <SwiperSlide className='p-8'>
                            <div className="text-center">
                                <div className="">
                                    <h2 className="text-lg text-[#E84DB2] font-medium leading-[21px] pb-[11px]">Testimonials</h2>
                                    <h2 className="lg:text-[54px] sm:text-[40px] text-3xl text-[#1D2D5C] font-bold leading-normal  text-center sm:pb-[50px] pb-[20px] flex justify-center">What Customers are Saying
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                                            <path d="M9.06365 2.20312L4.46875 14.5686" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                            <path d="M28.9338 3.77832L11.8809 19.881" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                            <path d="M29.6534 22.4717L17.2349 26.1226" stroke="#2174F5" stroke-width="4" stroke-linecap="round" />
                                        </svg>
                                    </h2>
                                    <p className="w-full max-w-screen-lg text-[#1D2D5C] mx-auto font-normal leading-[25px] sm:leading-[40px] text-[16px] sm:text-[26px] sm:pb-[50px] pb-[20px]   pl-[10px] pr-[10px]"> “There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.”</p>
                                </div>
                                <img src="assets/samantha.png" alt="Testimonial 1" className="mx-auto mb-4 rounded-full w-24 h-24" />
                                <h2 className="text-lg font-semibold mb-2">Samantha William</h2>
                                <p className="text-gray-600">"Senior designer at design studio"</p>
                            </div>
                        </SwiperSlide>


                        {/* <!-- Navigation Arrows --> */}

                    </Swiper>

                </div>
            </section>


            {/* <!-- join followers --> */}
            <section className="w-full pb-[50px] md:pb-[100px] bg-white">
                <div className="container sm:px-10 px-4  max-w-7xl mx-auto bg-[#EDF2F9] rounded-tr-lg rounded-bl-lg">
                    <div className="flex flex-col justify-center items-center  max-w-[954px] w-full mx-auto py-[50px] md:py-[100px]" >
                        <h1 className="sm:text-[44px] text-2xl leading-[29px] sm:leading-[58px] text-[#1D2D5C]  font-bold text-center wow fadeInUp"  >Join 200k+ founders and buyers already doing business on brandname.com</h1>
                        <p className="sm:py-10 py-[24px] px-4  text-lg leading-[30px] text-center text-[#535D7A] font-normal wow fadeInUp" data-wow-delay=".5s">
                            Get your business in front of quality buyers who understand the Extensions ecosystem.
                        </p>
                        <div className="flex gap-[10px] flex-wrap justify-center wow fadeInUp" data-wow-delay="1s">
                            <button onClick={navigateSiIn} className="bg-[#2174F5] border border-[#2174F5] text-white px-10 py-4 rounded-tr-lg rounded-bl-lg hover:text-[#1D2D5C] hover:bg-transparent hover:border  hover:border-solid hover:border-[#d1d5db] transition duration-300">Submit your listing</button>
                            <button onClick={navigateSignup} className="px-10 py-4 rounded-tr-lg rounded-bl-lg border border-solid border-[#d1d5db] hover:bg-[#2174F5] hover:text-white transition duration-300">Join now</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- faq --> */}
            <section className='bg-white'>
                <div className="container sm:px-10 px-4 max-w-7xl mx-auto  pb-[50px] md:pb-[100px]">
                    <h2 className="sm:text-[40px] lg:text-[54px] text-[28px] text-[#1D2D5C] font-bold leading-normal md:leading-[70px]  text-center pb-[50px] sm:pb-[66px] text-[#1D2D5C]">Frequently Asked Questions</h2>
                    <div className="divide-y divide-gray-300 faq-comp">

                        {/* <!-- FAQ Item 1 --> */}

                        <AccordionItem
                            title="What does a compliant 'disclosure' consist of?"
                            content="What the extension does. Content in both the marketing and installation flow of an extension must clearly outline both the principal and significant features of your extension. Burying this information in unrelated text is considered a violation of this policy."
                        />
                        <AccordionItem
                            title='What is a "misleading interactive element"?'
                            content="What the extension does. Content in both the marketing and installation flow of an extension must clearly outline
                            both the principal and significant features of your extension. Burying this information in unrelated text is considered a
                            violation of this policy."
                        />
                        <AccordionItem
                            title='What is an "unrelated user action"?'
                            content="What the extension does. Content in both the marketing and installation flow of an extension must clearly outline
                            both the principal and significant features of your extension. Burying this information in unrelated text is considered a
                            violation of this policy."
                        />
                        <AccordionItem
                            title="What are the requirements for Chrome Web Store listing windows?"
                            content="What the extension does. Content in both the marketing and installation flow of an extension must clearly outline both the principal and significant features of your extension. Burying this information in unrelated text is considered a violation of this policy."
                        />
                        <AccordionItem
                            title="What should I do if I receive a warning email?"
                            content="What the extension does. Content in both the marketing and installation flow of an extension must clearly outline both the principal and significant features of your extension. Burying this information in unrelated text is considered a violation of this policy."
                        />



                    </div>
                </div>
            </section>

            {/* <!-- footer -->     */}
            <footer className="bg-[#15102C] text-white">
                <div className="container mx-auto px-10 max-w-7xl sm:pt-[100px] pt-[50px] pb-[50px]">
                    <div className="flex justify-between flex-wrap">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-[24px] font-normal  text-[#F2F2F2] leading-normal pb-[13px] sm:pb-[30px]">Quick links</h2>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal pb-[13px] sm:pb-[22px]">About</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Service</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Career</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Browse</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Help Center</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-[24px] font-normal  text-[#F2F2F2] leading-normal pb-[13px] sm:pb-[30px]">Buy & sale</h2>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">How to Buy</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">How to Sale</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Pricing</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-[24px] font-normal  text-[#F2F2F2] leading-normal pb-[13px] sm:pb-[30px]">Legal</h2>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Terms & Conditions</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Privacy Policy</p>
                            <p className="text-[16px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[22px]">Contact Us</p>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-[24px] font-normal  text-[#F2F2F2] leading-normal  pb-[13px] sm:pb-[30px]">Connect with us</h2>

                            <div className="flex gap-[15px]">
                                <span className="hover:bg-gray-300 p-1 rounded-full transition duration-300">
                                    <a href="">
                                        <img src="assets/fb.svg" alt="Facebook" />
                                    </a>
                                </span>
                                <span className="hover:bg-gray-300 p-1 rounded-full transition duration-300">
                                    <a href="">
                                        <img src="assets/twitter.svg" alt="Twitter" />
                                    </a>
                                </span>
                                <span className="hover:bg-gray-300 p-1 rounded-full transition duration-300">
                                    <a href="">
                                        <img src="assets/insta.svg" alt="Instagram" />
                                    </a>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex justify-center border-t border-solid border-[#ffffff33] py-[20px]">
                    <p className="text-[14px] font-normal  text-[#F2F2F2] leading-[30px] text-center">© 2023 ChromeExtensionsMarketplace.com Pvt Ltd. All rights reserved.</p>
                </div>
            </footer>



        </>
    );
};

export default Home;
