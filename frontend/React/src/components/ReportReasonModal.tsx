import { useState } from 'react';
import { Link } from "react-router-dom";
import configEnv from '../config/configuration_keys.json'
let appUrl = configEnv.baseApiUrl;
const ReportReasonModal = ({ list_id }: any) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const newErrors: Partial<FormData> = {};
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [formData, setFormData] = useState<FormData>({
        listingId: list_id

    });
    let token = localStorage.getItem('usertoken')
    const [isConditionMet, setCondition] = useState(false);

    const metCondition = async () => {
        if (validateForm()) {
            try {
                const response = await fetch(`${appUrl}reportListing`, {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ ...formData, token })
                });

                if (response.ok) {
                    setCondition(!isConditionMet);
                } else {
                    console.log('Error while saving report in the database');
                }
            } catch (err) {
                console.log('Error while saving report in the database:', err.message);
            }
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };
    const validateForm = () => {
        if (!formData.comment) {
            newErrors.comment = '• Comment is required';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    return (
        <>
            <div onClick={openModal} className="flex justify-center gap-[6.5px] items-center mt-[20px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.681818 0C0.305264 0 0 0.305264 0 0.681818V14.3182C0 14.6947 0.305264 15 0.681818 15C1.05837 15 1.36364 14.6947 1.36364 14.3182V8.58975C1.68138 8.43157 2.18368 8.21107 2.72217 8.07648C3.68803 7.83505 4.46317 7.92416 4.88727 8.56023C5.67886 9.74755 7.19059 9.85214 8.35405 9.73623C9.5818 9.61391 10.7965 9.21184 11.4105 8.98473C11.95 8.78523 12.2727 8.27291 12.2727 7.73236V3.22048C12.2727 2.16271 11.153 1.54516 10.2606 1.94987C9.53693 2.27808 8.5755 2.6446 7.70666 2.76566C6.79766 2.89232 6.26973 2.72093 6.02182 2.34916C5.12734 1.00747 3.59699 0.848632 2.50019 0.94003C2.07914 0.975123 1.6879 1.04875 1.36364 1.1267V0.681818C1.36364 0.305264 1.05837 0 0.681818 0ZM1.36364 2.53709V7.09411C1.6642 6.97139 2.01556 6.8475 2.39146 6.75355C3.47105 6.48368 5.08227 6.39457 6.02182 7.80375C6.34814 8.29323 7.10011 8.49075 8.21884 8.37934C9.25623 8.27598 10.3242 7.93098 10.9091 7.71627V3.22048C10.9091 3.1895 10.8464 3.18152 10.8239 3.19177C10.0619 3.5373 8.95882 3.96799 7.89484 4.11625C6.87109 4.2589 5.598 4.1717 4.88727 3.1056C4.41811 2.40194 3.56209 2.2199 2.61344 2.29895C2.13003 2.33924 1.68018 2.44518 1.36364 2.53709Z" fill="#2174F5" />
                </svg>
                <span className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">REPORT IT HERE</span>
            </div>

            <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 ${isModalOpen ? 'block' : 'hidden'}`}>
                {!isConditionMet ?
                    <div className="relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px]">
                        <span onClick={closeModal} className='absolute right-[15px] top-[15px] cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M11 1L1 11" stroke="#002743" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1 1L11 11" stroke="#002743" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <h3 className="mb-[15px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]">
                            Reason for report
                        </h3>
                        <div className="">
                            <p className="text-[#535D7A] text-[14px] font-[400] leading-[20px]">Trust and transparency are vital for Online Marketplace. If you have concerns about a startup, report them anonymously to help us maintain integrity in the marketplace."</p>
                        </div>
                        <form>
                            <div className="mt-[35px]">
                                <ul className="flex flex-col gap-[18px]">
                                    <li>
                                        <div>
                                            <label
                                                htmlFor="checkbox1"
                                                className="flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox1"
                                                        name='fraudScam'
                                                        value='Fraud_or_scam'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.fraudScam && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.fraudScam && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Fraud or scam
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label
                                                htmlFor="checkbox2"
                                                className="flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox2"
                                                        name='inaccurateDescription'
                                                        value='Inaccurate_description'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.inaccurateDescription && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.inaccurateDescription && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Inaccurate description
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label
                                                htmlFor="checkbox3"
                                                className="flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox3"
                                                        name='alreadySold'
                                                        value='Product_already_sold'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.alreadySold && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.alreadySold && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Product already sold
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label
                                                htmlFor="checkbox4"
                                                className="flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox4"
                                                        name='wrongCategory'
                                                        value='Wrong_Category'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.wrongCategory && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.wrongCategory && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Wrong Category
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label
                                                htmlFor="checkbox5"
                                                className="flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="checkbox5"
                                                        name='other'
                                                        value='other_reason'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.other && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.other && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Other
                                            </label>
                                        </div>
                                        <br></br>
                                        <label
                                            className="flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]"
                                        >Comment</label>
                                        <div className='p-[10px]'>
                                            <textarea
                                                id="commentData"
                                                name="comment"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                placeholder="Type comment"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <span className="text-[red] text-[16px]">{errors.comment && <p>{errors.comment}</p>}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='flex justify-end mt-[40px] border-t border-[#E2E8F0] pt-[30px] mb-[10px]'>
                                <Link
                                    onClick={metCondition}
                                    to="#"
                                    className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
                                >
                                    Submit Report
                                </Link>
                            </div>
                        </form>
                    </div>
                    :
                    <div className="relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px] md:pb-[68px] text-center">
                        <span onClick={closeModal} className='absolute right-[15px] top-[15px] cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M11 1L1 11" stroke="#002743" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1 1L11 11" stroke="#002743" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span className=''>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto mb-[30px] mt-[12px]">
                                <path d="M57 27.5314V30.0154C56.9967 35.8378 55.1113 41.5031 51.6252 46.1664C48.139 50.8297 43.2389 54.2411 37.6555 55.892C32.0721 57.5428 26.1046 57.3446 20.6431 55.3268C15.1815 53.3091 10.5186 49.5799 7.34959 44.6955C4.18062 39.8111 2.67544 34.0332 3.05853 28.2235C3.44162 22.4138 5.69246 16.8835 9.47535 12.4575C13.2582 8.03156 18.3705 4.94699 24.0497 3.66385C29.7289 2.38071 35.6707 2.96776 40.989 5.33745" stroke="#2174F5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M56.9984 8.41516L43.4984 21.9287L29.9984 35.4422L21.8984 27.3422" stroke="#2174F5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <h3 className="mb-[20px] text-[#1D2D5C] font-[600] text-[32px] leading-[28px]">
                            Thank You!
                        </h3>
                        <p className="text-[#535D7A] text-[14px] font-[400] leading-[20px]">Your Report has been submitted. Thank you for helping us make our community better."</p>
                    </div>
                }

            </div>

        </>
    );
};

export default ReportReasonModal;
