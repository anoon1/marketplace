import { useState } from 'react';
import { Link } from "react-router-dom";
import configEnv from '../config/configuration_keys.json'
let appUrl = configEnv.baseApiUrl;
const ReportReasonModal = ({ roomId, onClose }: any) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const newErrors: Partial<FormData> = {};
    const closeModal = () => {
        setCondition(false);
    }
    const [formData, setFormData] = useState<FormData>({
        roomId: roomId

    });
    let token = localStorage.getItem('usertoken')
    const [isConditionMet, setCondition] = useState(false);

    const metCondition = async () => {
        if (validateForm()) {
            try {
                const response = await fetch(`${appUrl}reporChat`, {
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
            <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 `}>
                {!isConditionMet ?
                    <div className="relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px]">
                        <span onClick={onClose} className='absolute right-[15px] top-[15px] cursor-pointer'>
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
                                                        name='Spam'
                                                        value='spam'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.fraudScam && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.Spam && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Spam
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
                                                        name='inaccurateInformation'
                                                        value='Inaccurate_information'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.inaccurateDescription && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.inaccurateInformation && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Inaccurate Information
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
                                                        name='offensiveMessages'
                                                        value='Offensive_messages'
                                                        className="sr-only"
                                                        onChange={handleChange}
                                                    />
                                                    <div
                                                        className={`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${formData.alreadySold && 'border-primary'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-[11px] w-[11px] rounded-full bg-transparent ${formData.offensiveMessages && '!bg-primary'
                                                                }`}
                                                        >
                                                            {' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                Offensive Messages
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
                                    Submit Report And Block
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
