
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { format, isSameDay } from 'date-fns';
import dateFormat, { masks } from "dateformat";
import configEnv from "../config/configuration_keys.json"
import { io } from "socket.io-client";
import moment from "moment";
import ReportReasonModal from '../components/ChatReportReasonModel'
interface FormData {
    searchChat: string;
}

const socket = io(`${configEnv.baseUrl}`);
const areDatesSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};
const Messages = () => {
    const [selectedChat, setSelectedChat] = useState('');
    const [showReportModal, setReportModel] = useState(false);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');
    const [messageRecieved, setMessageRecieved] = useState([]);
    const [getTopProfileData, setTopProfileData] = useState([]);
    const [messageSent, setMessageSent] = useState([]);
    const [getmessageSent, setChatMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [getRoomData, setRoomData] = useState([]);
    const [getLastMessage, setLastMessage] = useState('');
    const token = localStorage.getItem('usertoken');
    const [getToUserId, setToUserId] = useState([]);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messageSent, messageRecieved]);
    useEffect(() => {
        const getUserId = async () => {
            if (token) {
                try {
                    const response = await fetch(`${configEnv.baseApiUrl}getSellerProfile`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setToUserId(data.data.id);
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
    const handleOnclickReport = () => {
        setReportModel(true);
    }
    const handleClose = () => {
        setReportModel(false);
    }

    useEffect(() => {
        const getToUserRooms = async () => {
            if (token) {
                try {
                    const response = await fetch(`${configEnv.baseApiUrl}getToUserRooms`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ getToUserId }),
                    });

                    if (response) {
                        const data = await response.json();
                        setRoomData(data.data);
                    } else {
                        console.error('Failed to get user ID:', response.statusText);
                        setChatMessage('No Chat Found')
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            }
        };

        getToUserRooms();
    }, [getToUserId]);

    const joinRoom = (data: any) => {
        if (data !== '') {

            setTopProfileData(data)
            getOldMessagesFromDB(data.room_id);
            setSelectedChat(data.room_id);
            setRoom(data.room_id)
            socket.emit('joinRoom', data.room_id);
            setIsDisabled(false);
        }
    };
    const getOldMessagesFromDB = async (roomId: any) => {
        if (token) {
            try {
                const response = await fetch(`${configEnv.baseApiUrl}getUserOldMessages`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ roomId }),
                });

                if (response) {
                    const data = await response.json();
                    console.log('data.datadata.data', data.lastMessage)
                    if (data.data.length > 0) {
                        setLastMessage(data.lastMessage)
                        getOldMessages(data.data)
                    } else {
                        setMessageSent([]);
                        setMessageRecieved([]);
                    }
                } else {
                    console.error('Failed to get Data:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        }
    };
    const getOldMessages = (data) => {
        const existingSentMessages = [...messageSent];
        const existingReceivedMessages = [...messageRecieved];
        setMessageSent([]);
        setMessageRecieved([]);
        data.forEach((message) => {
            const newMessage = {
                message: message.message_content,
                timestamp: message.created_at,
                type: message.sender_id === getToUserId ? 'sent' : 'received',
            };

            if (message.sender_id === getToUserId) {
                setMessageSent((prevMessages) => [...prevMessages, newMessage]);
            } else {
                setMessageRecieved((prevMessages) => [...prevMessages, newMessage]);
            }
        });

    };


    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== '') {
            const time = moment().utc().format('YYYY-MM-DD HH:mm:ss');
            saveMessageInDatabase(message, room, getToUserId, time);
            setMessageSent([...messageSent, { message, timestamp: new Date(), type: 'sent' }]);
            socket.emit('sendMessage', { message, room, getToUserId, timestamp: new Date() });
            setMessage('');
        }
    };
    const saveMessageInDatabase = async (message, room, getToUserId, time) => {
        if (message) {
            try {

                const response = await fetch(`${configEnv.baseApiUrl}saveMessageInDatabase`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message, room, getToUserId, time }),
                });

                if (response.ok) {
                    const data = await response.json();
                } else {
                    console.error('Failed to get user ID:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        }
    }
    const formatDate = (date) => {
        const today = moment(new Date()).format("Do MMMM YYYY");
        const newDate = moment(date).format("Do MMMM YYYY");

        if (today === newDate) {
            return 'Today';
        } else {
            return newDate;
        }
    };

    const formatTime = (date) => {
        return format(date, 'HH:mm');
    };

    useEffect(() => {
        socket.on('recieveMessage', (data) => {
            setMessageRecieved((prevMessages) => [
                ...prevMessages,
                { message: data.message, timestamp: new Date(), type: 'received' },
            ]);
        });

        return () => {
            socket.off('recieveMessage');
        };
    }, [socket]);



    const [formData, setFormData] = useState<FormData>({
        searchChat: ''
    });


    useEffect(() => {
        if (formData) {
            const searchChat = async () => {
                setRoomData('');
                try {
                    const response = await fetch(`${configEnv.baseApiUrl}searchChatByNameSeller`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...formData, getToUserId }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setRoomData(data.data)
                    } else {
                        console.error('Failed to get user ID:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            }
            searchChat();
        }
    }, [formData])

    function searchUser(e, data: string) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    return (

        <div className="h-[calc(100vh-196px)] overflow-hidden">
            <div className="h-full xl:flex gap-[28px]">
                {showReportModal && (<ReportReasonModal onClose={handleClose} roomId={room} />)}

                <div className="hidden h-full flex-col xl:flex xl:w-1/4 bg-white">
                    <div className="sticky border-b border-[#E0E0E0] px-[24px] py-[30px] pt-[32px]">
                        <h3 className="text-[#1D2D5C] font-[500] text-[18px] leading-[16px]">
                            Your Messages
                        </h3>
                    </div>
                    <div className="flex max-h-full flex-col overflow-auto px-[24px] py-[30px]">
                        <form className="sticky mb-[30px]">
                            <input type="text" name='searchChat' onChange={searchUser} className="w-full rounded-[5px] bg-[#EFF4FB] py-[14px] pl-[19px] pr-10 text-[14px] outline-none focus:border-primary text-[#64748B] leading-[12px] placeholder:text-[#64748B] placeholder:text-[14px] " placeholder="Search..." />
                            <button className="absolute top-1/2 right-4 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12.605 11.19C13.4825 10.02 14 8.57 14 7C14 3.14 10.86 0 7 0C3.14 0 0 3.14 0 7C0 10.86 3.14 14 7 14C8.57 14 10.02 13.48 11.19 12.605L14.2925 15.7075C14.4875 15.9025 14.7425 16 15 16C15.2575 16 15.5125 15.9025 15.7075 15.7075C16.0975 15.3175 16.0975 14.685 15.7075 14.2925L12.605 11.19ZM7 12C4.2425 12 2 9.7575 2 7C2 4.2425 4.2425 2 7 2C9.7575 2 12 4.2425 12 7C12 9.7575 9.7575 12 7 12Z" fill="#64748B" />
                                </svg>
                            </button>
                        </form>
                        <div className="no-scrollbar max-h-full overflow-auto">
                            {getRoomData && getRoomData.length > 0 ? (
                                <>
                                    {getRoomData.map((data) => (
                                        <div
                                            key={data.roomId}
                                            onClick={() => joinRoom(data)}
                                            className={`flex cursor-pointer items-center border-b border-solid border-[#EFF4FB] rounded-[5px] py-[12px] px-[13px] mb-[15px] ${selectedChat === data.room_id ? 'bg-[#EFF4FB]' : 'bg-[#FFFFFF]'}`}
                                        >
                                            <div className="relative mr-[9px] h-[50px] w-full max-w-[50px] rounded-full border-[3px] border-[#fff] hover:border-[#fff]">
                                                {data.profile_picture ? (
                                                    <img
                                                        src={`${configEnv.baseApiUrl}${data.profile_picture}`}
                                                        alt="profile"
                                                        className="h-full w-full object-cover object-center rounded-full"
                                                    />
                                                ) : (
                                                    <img
                                                        src={`${configEnv.baseApiUrl}${configEnv.DEFAULT_IMG}`}
                                                        alt="profile"
                                                        className="h-full w-full object-cover object-center rounded-full"
                                                    />
                                                )}
                                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                                            </div>
                                            <div className="w-full">
                                                <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[14px] mb-[5px]">
                                                    {data.name}
                                                </h5>
                                                <p className="text-[#535D7A] text-[14px] font-[400] leading-[18px]">
                                                    {data.lastmessages ? (
                                                        <>{data.lastmessages}</>
                                                    ) : (
                                                        <p> </p>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>No Chat Found</p>
                            )}

                            {getmessageSent && (
                                <span className="text-center">{getmessageSent && <p>{getmessageSent}</p>}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex h-full flex-col xl:w-3/4 bg-[#FFF]">
                    <div className="sticky flex items-center justify-between border-b border-[#E0E0E0] px-[32px] py-[12px] pb-[16px]">
                        <div className="flex cursor-pointer items-center rounded-[5px]">
                            <div className="relative mr-[11px] h-[50px] w-full max-w-[50px] rounded-full border-[3px] border-[#fff] hover:border-[#fff] drop-shadow">
                                {getTopProfileData.profile_picture ? (
                                    <img src={`${configEnv.baseApiUrl}${getTopProfileData.profile_picture}`} alt="profile" className="h-full w-full object-cover object-center rounded-full" />
                                ) : (
                                    <img src={`${configEnv.baseApiUrl}${configEnv.DEFAULT_IMG}`} alt="profile" className="h-full w-full object-cover object-center rounded-full" />
                                )}
                            </div>
                            <div className="">
                                <h5 className="text-[#1D2D5C] text-[14px] font-[500] leading-[12px] mb-[6px] text-black dark:text-white">
                                    {getTopProfileData.name}
                                </h5>
                                <p className="text-[#535D7A] text-[14px] font-[400] leading-[14px]">

                                </p>
                            </div>
                        </div>

                        <button className="flex justify-center gap-[6.5px] items-center mt-[20px] cursor-pointer disabled" disabled={isDisabled} onClick={handleOnclickReport} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.681818 0C0.305264 0 0 0.305264 0 0.681818V14.3182C0 14.6947 0.305264 15 0.681818 15C1.05837 15 1.36364 14.6947 1.36364 14.3182V8.58975C1.68138 8.43157 2.18368 8.21107 2.72217 8.07648C3.68803 7.83505 4.46317 7.92416 4.88727 8.56023C5.67886 9.74755 7.19059 9.85214 8.35405 9.73623C9.5818 9.61391 10.7965 9.21184 11.4105 8.98473C11.95 8.78523 12.2727 8.27291 12.2727 7.73236V3.22048C12.2727 2.16271 11.153 1.54516 10.2606 1.94987C9.53693 2.27808 8.5755 2.6446 7.70666 2.76566C6.79766 2.89232 6.26973 2.72093 6.02182 2.34916C5.12734 1.00747 3.59699 0.848632 2.50019 0.94003C2.07914 0.975123 1.6879 1.04875 1.36364 1.1267V0.681818C1.36364 0.305264 1.05837 0 0.681818 0ZM1.36364 2.53709V7.09411C1.6642 6.97139 2.01556 6.8475 2.39146 6.75355C3.47105 6.48368 5.08227 6.39457 6.02182 7.80375C6.34814 8.29323 7.10011 8.49075 8.21884 8.37934C9.25623 8.27598 10.3242 7.93098 10.9091 7.71627V3.22048C10.9091 3.1895 10.8464 3.18152 10.8239 3.19177C10.0619 3.5373 8.95882 3.96799 7.89484 4.11625C6.87109 4.2589 5.598 4.1717 4.88727 3.1056C4.41811 2.40194 3.56209 2.2199 2.61344 2.29895C2.13003 2.33924 1.68018 2.44518 1.36364 2.53709Z" fill="#2174F5" />
                            </svg>
                            <span className="text-[#2174F5] text-[14px] font-[500] leading-[22px]">REPORT IT HERE</span>
                        </button>

                    </div>
                    <div className="no-scrollbar max-h-full h-[700px] space-y-3.5 overflow-auto px-6 py-7.5" ref={messagesContainerRef} id="chatmodal">
                        {([...messageSent, ...messageRecieved]
                            .sort((b, a) => new Date(a.timestamp) - new Date(b.timestamp))
                            .reverse()
                            .map((msg, index, array) => {
                            })).length > 0 ? (
                            [...messageSent, ...messageRecieved]
                                .sort((b, a) => new Date(a.timestamp) - new Date(b.timestamp))
                                .reverse()
                                .map((msg, index, array) => {
                                    const previousMsg = array[index - 1];
                                    const currentDate = new Date(msg.timestamp);
                                    const showDate = !previousMsg || !areDatesSameDay(new Date(previousMsg.timestamp), currentDate);

                                    return (
                                        <div key={index}>
                                            {showDate && (
                                                <p className="float-right mb-2 w-[100%] rounded-2xl rounded-tl-none bg-transparent py-[15px] px-[25px] dark:bg-boxdark-2 text-xs font-medium text-center">
                                                    {formatDate(currentDate)}
                                                </p>
                                            )}

                                            <div className={msg.type === 'sent' ? 'mb-2.5 rounded-2xl w-[60%] float-right text-wrap rounded-br-none bg-[#2174F5] py-[15px] px-[25px]' : 'mb-2.5 float-left w-[60%] rounded-2xl rounded-tl-none bg-gray py-[15px] px-[25px] dark:bg-boxdark-2'}>
                                                <p className={`font-[400] ${msg.type === 'sent' ? 'text-white' : 'text-[#232838]'} text-[14px] leading-[22px]`}>{msg.message}</p>
                                                <p className={`${msg.type === 'sent' ? 'text-white' : ''} text-xs font-medium`}>{formatTime(currentDate)}</p>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <p>No chat messages found</p>
                        )}

                    </div>
                    <div className="sticky bottom-0 border-t border-[#CCD9E7] bg-white py-[30px] px-[30px]">
                        <form className="flex items-center justify-between space-x-[20px]">
                            <div className="relative w-full">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={message}
                                        disabled={isDisabled}
                                        onChange={(event) => { setMessage(event.target.value); }}
                                        placeholder="Type something here"
                                        className="w-full rounded-md border border-[#E2E8F0] bg-[#EFF4FB] py-[14px] px-[20px] font-[400] text-[#64748B] placeholder:text-[#64748B]  placeholder-body leading-[24px] outline-none text-[16px] pb-[13px]"
                                    />
                                </div>
                            </div>
                            <button onClick={sendMessage} className="flex h-[52px] w-full max-w-13 items-center justify-center rounded-[6px] bg-[#2174F5] text-white hover:bg-opacity-90">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Messages;
