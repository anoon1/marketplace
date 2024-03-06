import { Link } from 'react-router-dom';
interface UpdateListingProps {
    onClose: () => void;
}
const SuccessfullyAccepted : React.FC<UpdateListingProps> = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-[#FFF] w-full max-w-[536px] bg-[#fff] px-[55px] py-[38px] relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 color-[#94a3b8] right-4 cursor-pointer text-[#94a3b8] hover:text-gray-700"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="text-center mb-[24px]">
                    <img src="/assets/accepted-img.svg" alt="" className="m-auto" />
                </div>
                <h2 className="text-center text-[#1C2434] text-[26px] font-[600] leading-[normal]">
                    Listing has been <br /> successfully Accepted
                </h2>
            </div>
        </div>
    );
};

export default SuccessfullyAccepted;
