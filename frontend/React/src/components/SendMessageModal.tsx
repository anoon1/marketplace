import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import configEnv from "../config/configuration_keys.json"
const SendMessageModal = ({ sellerId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [fromUserId, setfromUserId] = useState([]);
  const closeModal = () => setModalOpen(false);
  let token = localStorage.getItem('usertoken');
  const [getRoomId, setRoomId] = useState('');

  let toUserId = sellerId;
  let RoomId = '';
  useEffect(() => {
    const getUserId = async () => {
      if (token) {
        try {
          const response = await fetch(`${configEnv.baseApiUrl}getBuyersDetails`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            setfromUserId(data.data[0].id);
          } else {
            console.error('Failed to get user ID:', response.statusText);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    };

    getUserId();
  }, [token]);


  const checkRoomIfNotCreate = (fromUserId: any, toUserId: any) => {
    if (fromUserId && toUserId) {
      const getAndInsertRoomDetails = async () => {
        if (token) {
          try {
            const response = await fetch(`${configEnv.baseApiUrl}checkUserRoom`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ fromUserId, toUserId }),
            });

            if (response.ok) {
              const data = await response.json();
              RoomId = data.data;
              setRoomId(data.data);
            } else {
              console.error('Failed to get user ID:', response.statusText);
            }
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        }
      };
      getAndInsertRoomDetails();

    } else {
      console.log('getUserID or response is missing');
    }

  }



  const sendMessagePage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    checkRoomIfNotCreate(fromUserId, toUserId)
    setTimeout(function () {
      if (RoomId) { navigate(`/OnboardingBuyer/BuyerInbox?id=${RoomId}&tid=${toUserId}`); }
    }, 2000);
  }

  return (
    <>
      <Link to="" onClick={sendMessagePage} className="rounded-[4px] bg-[#2174F5] text-[#FFF] text-[16px] block text-center w-full py-[9px] py-[15px] leading-[22px]">
        Send Message
      </Link>

      <div className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className="relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px]">
          <span onClick={closeModal} className='absolute right-[11px] top-[11px] cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M8 1L1 8" stroke="#002743" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M1 1L8 8" stroke="#002743" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <h3 className="mb-[30px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]">
            Message for seller
          </h3>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <textarea
              rows={4}
              placeholder="Type something here..."
              className="w-full rounded-[4px] border-[1px] border-[#E2E8F0] bg-transparent py-[14px] px-[20px] font-[400] text-[14px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary placeholder:text-[#64748b80]"
            ></textarea>
          </div>
          <div className='flex justify-end mt-[20px]'>
            <Link
              onClick={closeModal}
              to="#"
              className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]"
            >
              Send Message
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default SendMessageModal;
