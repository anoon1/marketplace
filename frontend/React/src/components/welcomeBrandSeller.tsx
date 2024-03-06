import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const linerGradient = {
    background: 'linear-gradient(90deg, #E84DB2 1.22%, #2174F5 100%)',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
};

const WelcomeBrand = () => {
    const navigate = useNavigate();
    const handleNavigation=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        let role=localStorage.getItem('role');
        let steps=localStorage.getItem('completedStep');
        if(role=='seller' && steps=='0'){
            navigate('/OnboardingSeller/ProfileDetails');
        }else if(role=='seller' && steps=='1'){
            navigate('/OnboardingSeller/NewListing');
        }
    }
    return (
        <div className="rounded-sm md:py-[94px] py-[60px] px-[15px] text-center bg-white center">
            <div className="text-center">
                <svg width="52" height="50" viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-[auto] mb-[20px]">
                    <g id="&#240;&#159;&#166;&#134; emoji &#34;waving hand sign&#34;">
                        <path id="Vector" d="M12.1592 39.2446C11.7281 39.1583 11.3831 39.0721 10.9519 38.8996C10.5208 38.7271 10.1758 38.6409 9.83088 38.4684C9.05476 38.1235 8.36487 37.6923 7.67499 37.1749C6.29521 36.2263 5.17415 34.9328 4.31179 33.3805C3.44943 31.9145 2.93202 30.1898 2.84578 28.5513C2.75955 27.689 2.84578 26.9128 2.93202 26.0505C3.01825 25.6193 3.10449 25.2744 3.19072 24.8432C3.27696 24.412 3.44943 24.0671 3.53567 23.6359L3.6219 24.8432C3.6219 25.2744 3.70814 25.6193 3.79438 26.0505C3.88061 26.8266 4.05308 27.6027 4.22555 28.2926C4.5705 29.7586 5.08791 31.1384 5.86404 32.4319C6.64016 33.7255 7.50252 34.9328 8.62358 36.0538C9.141 36.5713 9.74465 37.0887 10.3483 37.6061C10.607 37.8648 10.9519 38.1235 11.2969 38.3822L12.1592 39.2446ZM11.9005 42.3491C11.6418 42.5215 11.2969 42.6078 10.9519 42.694C10.607 42.7802 10.3483 42.8665 10.0034 42.8665C9.3997 42.9527 8.70982 43.0389 8.01993 42.9527C6.72639 42.8665 5.34662 42.5215 4.22555 41.9179C3.01825 41.3142 1.98342 40.3656 1.29354 39.2446C0.948594 38.7271 0.603651 38.1235 0.344943 37.5198C0.258708 37.2611 0.172472 36.9162 0.0862357 36.5713C0.0862357 36.3125 0 36.0538 0 35.7089C0.258707 35.9676 0.431179 36.2263 0.603651 36.3988C0.862358 36.6575 1.03483 36.9162 1.2073 37.0887C1.63848 37.5198 1.98342 37.951 2.4146 38.296C3.27696 39.0721 4.13932 39.762 5.17415 40.2794C6.12274 40.7968 7.24381 41.228 8.27864 41.5729C8.79605 41.7454 9.3997 41.8316 10.0034 42.0041C10.2621 42.0903 10.607 42.0903 10.8657 42.1766C11.2969 42.2628 11.5556 42.2628 11.9005 42.3491ZM31.3898 0.438449C31.821 0.524685 32.166 0.697157 32.5971 0.869628C33.0283 1.0421 33.3733 1.21457 33.7182 1.38704C34.4943 1.81822 35.1842 2.2494 35.8741 2.76682C37.2539 3.80165 38.3749 5.18142 39.1511 6.73366C39.9272 8.28591 40.3584 10.0106 40.3584 11.6491C40.3584 12.5115 40.2721 13.2876 40.0997 14.1499C40.0134 14.5811 39.9272 14.9261 39.7547 15.3572C39.5822 15.7884 39.496 16.1334 39.3235 16.4783L39.2373 15.271C39.2373 14.8398 39.2373 14.4949 39.1511 14.0637L38.8923 11.7353C38.6336 10.2693 38.1162 8.80332 37.4263 7.42355C36.7365 6.04378 35.8741 4.83648 34.8393 3.71541C34.3219 3.11176 33.7182 2.59434 33.2008 1.99069C32.9421 1.73199 32.5971 1.47328 32.2522 1.21457L31.3898 0.438449ZM38.8923 0.0935059C39.2373 0.179742 39.496 0.265978 39.7547 0.438449C40.0134 0.524685 40.3584 0.697157 40.6171 0.869628C41.1345 1.21457 41.6519 1.55951 42.1693 1.99069C43.1179 2.85305 43.894 3.88788 44.3252 5.09518C44.8426 6.30248 45.0151 7.59602 44.8426 8.88956C44.7564 9.49321 44.5839 10.0969 44.4114 10.7005C44.3252 10.9592 44.1527 11.3042 44.0665 11.5629C43.894 11.8216 43.8078 12.0803 43.5491 12.339V11.4766V10.6143C43.5491 10.0106 43.4628 9.49321 43.4628 8.97579C43.2904 7.85473 43.1179 6.8199 42.6867 5.87131C42.2555 4.83648 41.7381 3.97412 41.1345 3.02552C40.7895 2.59434 40.4446 2.07693 40.0997 1.64575C39.9272 1.38704 39.7547 1.21457 39.496 0.955864C39.3235 0.524685 39.0648 0.265977 38.8923 0.0935059Z" fill="#1D2D5C" />
                        <path id="Vector_2" d="M6.89885 12.9428C5.17413 13.7189 4.57048 15.7886 5.34661 17.5133L16.2123 40.1933L22.2488 37.3476L11.3831 14.5813C10.607 12.8566 8.62357 12.0805 6.89885 12.9428ZM35.4429 30.9661L41.8244 27.9479L29.4064 2.07711C28.544 0.352392 26.4744 -0.42373 24.6634 0.438628C22.9387 1.30099 22.1626 3.37065 23.0249 5.1816L35.4429 30.9661Z" fill="#FFDD67" />
                        <path id="Vector_3" d="M24.7498 0.352293C24.5774 0.438529 24.4049 0.524765 24.2324 0.697236C25.8709 0.266057 27.5956 1.04218 28.3717 2.59442L40.7897 28.4652L41.9108 27.9478L29.4928 2.07701C28.6304 0.266057 26.5608 -0.510065 24.7498 0.352293Z" fill="#EBA352" />
                        <path id="Vector_4" d="M22.2487 37.2612L28.8888 34.0704L16.2122 7.68229C15.3498 5.87133 13.1077 5.00898 11.2967 5.87134C9.48578 6.73369 8.70966 8.97582 9.57202 10.7868L22.2487 37.2612Z" fill="#FFDD67" />
                        <path id="Vector_5" d="M11.2967 5.95765C11.1242 6.04389 10.9518 6.13013 10.7793 6.3026C12.4178 5.87142 14.315 6.64754 15.0911 8.28602L22.9385 24.7571L24.8357 25.8781L16.2122 7.76861C15.3498 5.87142 13.1939 5.0953 11.2967 5.95765Z" fill="#EBA352" />
                        <path id="Vector_6" d="M27.8542 32.0008L34.4943 28.8101L21.8176 2.42191C20.9553 0.610953 18.7132 -0.251405 16.9022 0.697189C15.0913 1.55955 14.3151 3.80168 15.1775 5.61263L27.8542 32.0008Z" fill="#FFDD67" />
                        <path id="Vector_7" d="M16.9016 0.610974C16.7292 0.69721 16.5567 0.869681 16.3842 0.955917C18.0227 0.524738 19.9199 1.30086 20.696 2.93934L29.5783 21.5663L31.4755 22.6873L21.8171 2.42193C20.9547 0.524738 18.7126 -0.251384 16.9016 0.610974ZM6.89827 12.9427C6.7258 13.0289 6.55333 13.1152 6.38086 13.2876C7.9331 12.8565 9.57158 13.6326 10.2615 15.1848L16.7292 28.7238L18.6263 29.8449L11.3825 14.6674C10.6064 12.8565 8.62299 12.0803 6.89827 12.9427Z" fill="#EBA352" />
                        <path id="Vector_8" d="M50.7068 10.3556C48.3784 8.54468 44.5841 10.5281 42.6869 16.7371C41.3933 21.0489 41.2209 22.3424 38.4613 23.6359L36.9091 20.4452C36.9091 20.4452 12.4181 32.2595 13.3667 34.1567C13.3667 34.1567 16.2987 43.2977 21.3004 47.5233C28.7167 53.9047 46.0501 47.0921 46.8262 30.621C47.2574 21.0489 53.2076 12.3391 50.7068 10.3556Z" fill="#FFDD67" />
                        <g id="Group">
                            <path id="Vector_9" d="M50.7065 10.3556C50.2753 10.0107 49.7579 9.83819 49.2404 9.75195C49.3267 9.83819 49.4992 9.83819 49.5854 9.92442C52.1725 11.9078 49.4992 16.4783 48.0332 20.6177C46.8258 23.8946 45.791 27.2578 45.9635 30.5348C46.6534 44.8499 32.252 51.6626 23.6284 49.0755C32.0795 52.6112 47.7744 45.8848 47.0846 30.966C46.9121 27.689 47.8607 24.4983 49.1542 21.0488C50.534 16.9095 53.2073 12.339 50.7065 10.3556Z" fill="#EBA352" />
                            <path id="Vector_10" d="M39.2371 23.291C33.8905 23.8947 26.043 31.5697 31.5621 39.9345C27.509 31.4834 34.1492 25.7919 38.3747 23.8084C38.8059 23.4635 39.2371 23.291 39.2371 23.291Z" fill="#EBA352" />
                        </g>
                    </g>
                </svg>
            </div>
            <div>
                <h1 className="text-[#1D2D5C] text-[36px] font-[600] leding-[28px] mb-[22px]">Welcome to <span className="bg-[linear-gradient(90deg, #E84DB2 1.22%, #2174F5 100%)]" style={linerGradient}>Online MarketPlace</span></h1>
                <p className="text-[#535D7A] text-[14px] font-[400] leading-[20px]">We're delighted to have you on board! We've built Brand name to help<br />you sell & buy Chrome Extensions!</p>
            </div>
            <div className="md:px-[110px] md:pt-[65px] pt-[50px] md:pb-[48px] pb-[50px] flex flex-wrap justify-between md:gap-[60px] gap-[30px]">
                <div className="flex gap-[12px] md:w-[calc(33.33%_-_40px)] w-[100%]">
                    <div className="relative bg-[#EEF3FD] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                        <span className="text-[#AEB7D1] text-[26px] font-[600] leading-[26px]">1</span>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div>
                            <h5 className="font-[500] leading-[24px] mb-[5px] text-[#1D2D5C] text-[16px] dark:text-white text-left">Input your listing details</h5>
                            <p className="text-[#535D7A] text-left text-[14px] font-[400] leading-[20px]">Enter your details to create<br />the listing.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[12px] md:w-[calc(33.33%_-_40px)] w-[100%]">
                    <div className="relative bg-[#EEF3FD] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                        <span className="text-[#AEB7D1] text-[26px] font-[600] leading-[26px]">2</span>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div>
                            <h5 className="font-[500] leading-[24px] mb-[5px] text-[#1D2D5C] text-[16px] dark:text-white text-left">Receive admin approval</h5>
                            <p className="text-[#535D7A] text-left text-[14px] font-[400] leading-[20px]">Await admin's approval for <br />your request or submission.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[12px] md:w-[calc(33.33%_-_40px)] w-[100%]">
                    <div className="relative bg-[#EEF3FD] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                        <span className="text-[#AEB7D1] text-[26px] font-[600] leading-[26px]">3</span>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div>
                            <h5 className="font-[500] leading-[24px] mb-[5px] text-[#1D2D5C] text-[16px] dark:text-white text-left">Your listing is live!</h5>
                            <p className="text-[#535D7A] text-left text-[14px] font-[400] leading-[20px]">Congratulations! Your listing is <br />now available online.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link
                    to="#"
                    onClick={handleNavigation}
                    className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[19px] px-[40px] text-center font-[500] text-[#F1F5F9] text-[18px] hover:bg-opacity-90 leading-[14px]"
                >
                    Let's Get Started
                </Link>
            </div>


        </div>
    );
};

export default WelcomeBrand;
