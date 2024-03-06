import { useState } from 'react';
import { Link } from "react-router-dom";
import config from '../config/configuration_keys.json'

const SendOfferModal = ({ list_id }: any) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const [offer, setOffer] = useState(0);
    const getUserToken = localStorage.getItem('usertoken');

    const openModal = () => {
        setMessage(null);
        setErrMessage(null);
        setModalOpen(true);
    }
    const closeModal = () => {
        setMessage(null);
        setErrMessage(null);
        setModalOpen(false);
    }

    const handleOffer = (id: any) => {
        setMessage(null)
        setErrMessage(null)
        setLoading(true)
        fetch(`${config.baseApiUrl}makeDeal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": getUserToken,
                "offerPrice": offer,
                "listingId": id
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.message == "Deal saved successfull") setMessage(result.message)
                else setErrMessage(result.message)
            })
            .catch(error => setErrMessage(error));
    }
    return (
        <>
            <Link to="" onClick={openModal} className="flex items-center justify-center gap-[5px] rounded-[4px] border border-[#1D2D5C] bg-[transparent] text-[#1D2D5C] text-[16px] block text-center w-full py-[8px] py-[15px] leading-[22px]">
                <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.721 7.26763C21.3917 7.12857 21.0084 7.04719 20.6071 7.04719C20.1565 7.04719 19.7294 7.14912 19.3468 7.33163L19.3648 7.32373L14.8449 9.37487C14.8473 9.33774 14.8653 9.30534 14.8653 9.26821C14.8543 8.18496 13.9821 7.31109 12.9081 7.31109C12.8541 7.31109 12.8017 7.31346 12.7485 7.31741L12.7555 7.31662H9.79624L6.07268 6.2152C6.02418 6.20019 5.96786 6.1915 5.90919 6.1915H5.90763H4.2109V5.59259C4.2109 5.26548 3.94807 5 3.62421 5H0.586695C0.262839 5 0 5.26548 0 5.59259V15.2383C0 15.5654 0.262839 15.8309 0.586695 15.8309H3.62421C3.94807 15.8309 4.2109 15.5654 4.2109 15.2383V14.4451C5.63305 14.6694 6.90657 15.0313 8.11282 15.5244L7.99548 15.4817C8.90212 15.8104 9.94878 16 11.0393 16C12.2963 16 13.4948 15.748 14.5876 15.2905L14.5258 15.3134C15.4981 14.8765 16.3234 14.4158 17.1049 13.892L17.0407 13.9323C17.3051 13.7671 17.568 13.602 17.834 13.4432C19.1176 12.676 20.1424 12.006 21.0639 11.3328C21.5176 11.0065 21.9134 10.6833 22.2897 10.3396L22.278 10.3499C22.5674 10.1121 22.799 9.81339 22.9546 9.47285L22.9609 9.45784C22.9859 9.39463 23 9.32194 23 9.2453C23 9.20105 22.9953 9.15759 22.9859 9.11572L22.9867 9.11967C22.8717 8.31691 22.3953 7.64531 21.7327 7.27237L21.7202 7.26605L21.721 7.26763ZM3.0383 14.6473H1.17417V6.18675H3.0383V14.6473ZM21.4511 9.51077C21.1288 9.80312 20.7776 10.0876 20.4123 10.3507L20.3755 10.376C19.4861 11.0254 18.4887 11.6773 17.2355 12.4271C16.9633 12.5891 16.695 12.7574 16.4243 12.9257C15.7555 13.3792 14.9865 13.8114 14.1824 14.1788L14.0807 14.2199C13.1795 14.5936 12.1328 14.8109 11.0369 14.8109C10.0958 14.8109 9.19233 14.6513 8.34984 14.3566L8.40773 14.3739C7.19131 13.8588 5.77621 13.4653 4.30086 13.2599L4.2109 13.2496V7.37746H5.82314L9.5467 8.47888C9.5952 8.49389 9.65152 8.50259 9.71019 8.50259H9.71175H12.7547C13.4455 8.50259 13.6911 8.91503 13.6911 9.269C13.6911 9.62297 13.4455 10.0354 12.7547 10.0354H7.42834C7.10448 10.0354 6.84164 10.3009 6.84164 10.628C6.84164 10.9551 7.10448 11.2206 7.42834 11.2206H13.5151C13.6019 11.2206 13.6841 11.2016 13.7584 11.1676L13.7545 11.1692L19.8522 8.40224C20.0767 8.29795 20.3395 8.23632 20.6165 8.23632C20.8245 8.23632 21.024 8.27029 21.211 8.33429L21.1977 8.33034C21.4965 8.51128 21.7124 8.80757 21.7844 9.15601L21.7859 9.16391C21.6803 9.28954 21.57 9.40253 21.4519 9.50682L21.448 9.50998L21.4511 9.51077Z" fill="#1D2D5C" />
                    <mask id="path-2-inside-1_1244_109" fill="white">
                        <rect x="8" width="9" height="5" rx="1" />
                    </mask>
                    <rect x="8" width="9" height="5" rx="1" stroke="#1D2D5C" strokeWidth="2.4" mask="url(#path-2-inside-1_1244_109)" />
                    <line x1="12" y1="2.5" x2="13" y2="2.5" stroke="#1D2D5C" />
                </svg>
                Send Offer
            </Link>

            <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 ${isModalOpen ? 'block' : 'hidden'}`}>
                <div className="relative w-full max-w-[378px] rounded-[10px] bg-white p-[25px] md:p-[38px]">
                    <span onClick={closeModal} className='absolute right-[11px] top-[11px] cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M8 1L1 8" stroke="#002743" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1L8 8" stroke="#002743" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <h3 className="mb-[30px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]">Make an offer</h3>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-[1px] py-[15px] px-[11px] bg-[#E9ECEF] z-30 -translate-y-1/2 rounded-tl-[7px] rounded-bl-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
                                <path d="M2.98919 6.06895C2.98919 5.12281 4.45835 4.96125 5.73272 4.96125C6.93383 4.96125 8.57504 5.49147 9.94732 6.16159L10.2162 3.55382C9.52997 3.18426 7.9379 2.7457 6.32073 2.65404L6.71266 0H4.09108L4.48352 2.65404C1.10276 2.95361 0 4.79961 0 6.34588C0 10.2456 7.71672 9.41575 7.71672 11.8147C7.71672 12.7155 6.811 13.0378 5.21806 13.0378C3.06254 13.0378 1.44494 12.3232 0.612578 11.5841L0.195656 14.5151C0.980366 14.9537 2.57192 15.3459 4.48352 15.4385L4.09108 18H6.71266L6.32073 15.415C10.2896 15.0917 11 13.1069 11 11.7921C11.0001 7.154 2.98919 8.30716 2.98919 6.06895Z" fill="#64748B" />
                            </svg>
                        </span>
                        <input
                            type="number"
                            placeholder="Enter your amount"
                            value={offer}
                            onChange={(e) => setOffer(parseInt(e.target.value))}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pl-[44px] text-[#3F4E7A] text-[14px]"
                        />
                    </div>
                    {message && <p className='pt-2 text-center text-transform-capitalize text-success'>{message}</p>}
                    {errMessage && <p className='pt-2 text-center text-transform-capitalize text-danger'>{errMessage}</p>}
                    <div className='flex justify-end mt-[20px] mb-[5px]'>
                        <button
                            onClick={() => handleOffer(list_id)}
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                        >
                            Send Offer
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SendOfferModal;
