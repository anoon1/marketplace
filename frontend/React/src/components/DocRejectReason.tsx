import React, { useState, ChangeEvent, FormEvent } from 'react';
import configEnv from '../config/configuration_keys.json'
const appUrl = configEnv.baseApiUrl;
interface FormData {
    reason: string;
}

interface UpdateListingProps {
    onClose: () => void;
}

const RejectionReason: React.FC<UpdateListingProps> = ({ onClose, data }) => {
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [formData, setFormData] = useState<FormData>({
        reason: '',
        id: data
    });
    const token = localStorage.getItem('usertoken');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleRejection = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${appUrl}updateDocgStatus`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ ...formData, token, status: '3' }),
                });

                if (response.ok) {
                    setSuccessMessage('Dcouments rejected sucessfully');
                }
            } catch (err) {
                console.log('error while sending report ', err);
            }

        }
    };
    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.reason) {
            newErrors.reason = '• Reason is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }
    return (
        <div className="fixed z-[1] inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
            <div className="max-w-[80%] max-h-[80%] bg-opacity-50 p-8 rounded-md">
                <form
                    onSubmit={handleRejection}
                    className="relative flex flex-col gap-4 p-10 rounded-md bg-white "
                    id="createListing"
                >
                    <div className="absolute top-7 right-7 text-right">
                        <button
                            onClick={onClose}
                            className="relative top-0 right-0 cursor-pointer text-gray-500 hover:text-black"
                        >
                            {/* Your close icon */}
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

                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div className="flex">
                                <div className="w-full max-w-[100%]">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Rejection Reason
                                    </label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        placeholder="Enter the title"
                                        className="w-full w-[auto] resize-none p-4 border-2 border p2 border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:border-primary transition duration-300 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleRejection}
                        className="bg-[#2174F5] py-2 px-5 text-white rounded-md hover:bg-opacity-90"
                    >
                        Submit
                    </button>
                    <span className="text-[red] text-[16px]">{errors.reason && <p>{errors.reason}</p>}</span>
                    {successMessage && (
                        <span className="bg-[green] text-center mt-[9px] max-w-[1000px] w-full rounded-lg text-white py-[15px]">{successMessage && <p>{successMessage}</p>}</span>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RejectionReason;
