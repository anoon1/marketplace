import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
import configEnv from '../config/configuration_keys.json';
import PdfIcon from '../assets/icon/pdf-svgrepo-com.svg';
const appUrl = configEnv.baseApiUrl;
import RejectionReason from './DocRejectReason';
import SuccessfullyAccepted from "../components/DocApproveModel";
const AdminDocumentViewer = () => {
  const [filePaths, setFilePaths] = useState([]);
  const location = useLocation();
  const token = localStorage.getItem('usertoken')
  const stateValue = location.state;
  const [showUpdateModal, setUpdateModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedData, setDataOfSelected] = useState(null);
  const [showAcceptModal, setAcceptModal] = useState(false);
  const [getRecievedData, setRecievedData] = useState(false);
  const [getUserId, setUserId] = useState('');
  const [reject, setReject] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [backlink, setBacklink] = useState('');
  const { uid } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const encodedUid = queryParams.get("uid") ?? '';
      const encodedListingId = queryParams.get("lid") ?? '';
      if (queryParams.has("lid")) {
        setBacklink('/OnboardingAdmin/AdminSellerListing')
      } else {
        setBacklink('/OnboardingAdmin/DocumentVerification')
      }

      let listingId = atob(encodedListingId);
      let uidParam = atob(encodedUid);
      if (uidParam) {
        try {
          const response = await fetch(`${appUrl}getUserDocImages`, {
            method: 'post',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ user_id: uidParam, listingId, token }),
          });

          if (response.ok) {
            const responseData = await response.json();
            const allDocs = responseData.data.data?.[0]?.allDoc || '';
            const pathsArray = allDocs.split(',').filter(Boolean);
            setRecievedData(responseData);
            setFilePaths(pathsArray);
            setUserId(responseData.data.data?.[0] || '')
          } else {
            console.error('Error in fetch request:', response.status, response.statusText);
            setMessage('No Data Found');
          }
        } catch (err) {
          console.error('Error while sending report:', err);
        }
      } else {
        console.log('No Uid found')
      }
    }
    fetchData();
  }, [uid, location.search])


  const openFile = (path: string) => {
    const fileUrl = `${configEnv.baseApiUrl}${path}`;
    const isPDF = path.toLowerCase().endsWith('.pdf');

    const popupWidth = 800;
    const popupHeight = 600;

    const left = window.innerWidth / 2 - popupWidth / 2 + window.screenLeft;
    const top = window.innerHeight / 2 - popupHeight / 2 + window.screenTop;

    const popupFeatures = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes`;

    if (isPDF) {
      window.open(fileUrl, '_blank', popupFeatures);
    } else {
      window.open(fileUrl, '_blank', popupFeatures);
    }
  };


  const handleReject = (itemId: React.SetStateAction<null>) => {
    setDataOfSelected(itemId);
    setUpdateModal(true);
  }
  const handleClose = () => {
    setAcceptModal(false)
    window.location.reload(false)
  }

  const updateOnClose = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUpdateModal(false);
    setReject(true);
    setSelectedItemId(null);
    window.location.reload(false)

  };
  useEffect(() => {
    if (getUserId.user_id !== '') {

      async function handleOnClickView({ user_id, listingId }: any) {
        if (user_id !== '' && listingId !== '') {
          try {
            const response = await fetch(`${appUrl}getUserDocImages`, {
              method: 'post',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({ user_id, listingId, token }),
            });

            if (response.ok) {
              const responseData = await response.json();
              setRecievedData(responseData);
            } else {
              console.error('Error in fetch request:', response.status, response.statusText);
              setMessage('No Data Found');
            }
          } catch (err) {
            console.error('Error while sending report:', err);
          }
        }
      }

      handleOnClickView({ user_id: getUserId.user_id, listingId: getUserId.listing_id });
    } else {
      console.log('No User Id');
    }
  }, [getUserId.user_id]);


  const handleAccept = async (id: any) => {
    try {
      const response = await fetch(`${appUrl}updateDocgStatus`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, token, status: '1' }),
      });

      if (response.ok) {
        setAcceptModal(true);
      } else {
        setMessage('No Data Found');
      }
    } catch (err) {
      console.log('error while sending report ', err);
    }
  }
  const userIdStatus = getUserId?.status;
  const receivedDataStatus = getRecievedData?.data?.data?.[0]?.status;
  function backPage(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    navigate(backlink);
  }

  return (
    <div className="rounded-sm py-10 p-10 text-center bg-white center">
      <div className="bg-white">
        {showUpdateModal && (
          <RejectionReason
            onClose={updateOnClose}
            data={selectedData}
          />
        )}
        {showAcceptModal && (
          <SuccessfullyAccepted
            onClose={handleClose}
          />
        )}
      </div>
      <div className="flex flex-wrap -mx-2">
        {filePaths.map((path, index) => (
          <div key={index} className="w-1/4 p-2">
            {path.toLowerCase().endsWith('.pdf') ? (
              <img
                src={PdfIcon}
                alt={`PDF Icon ${index}`}
                className="cursor-pointer hover:opacity-75"
                style={{ width: '200px', height: '200px' }}
                onClick={() => openFile(path)}
              />
            ) : (

              <img
                src={`${configEnv.baseApiUrl}${path}`}
                alt={`File ${index}`}
                className="cursor-pointer hover:opacity-75"
                style={{ width: '200px', height: '200px' }}
                onClick={() => openFile(path)}
              />
            )}
          </div>
        ))}
      </div>
      {getRecievedData ? (
        <>
          {receivedDataStatus && (
            <>
              {receivedDataStatus == '2' ? (
                <div className="flex items-center pt-10 pl-[45%]">
                  <div className="flex items-center gap-[6px]">
                    <button onClick={() => handleAccept(getUserId.user_id)} className="inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">Accept</button>

                    <button onClick={() => handleReject(getUserId.user_id)} className="inline-flex items-center justify-center rounded-md bg-[red] py-[8px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">Reject</button>

                  </div>
                </div>
              ) : (receivedDataStatus == '1') ? (
                <div className="flex items-center pt-10 pl-[45%]">
                  <div className="flex items-center gap-[6px]">
                    <p className='inline-flex items-center justify-center rounded-md bg-[green] py-[8px] px-[20px] text-center font-[400] text-[white] text-[16px] hover:bg-opacity-90 leading-[23px]'>Approved</p>
                  </div>
                  <div onClick={backPage} className="flex items-center gap-[6px] px-5">
                    <a href='#' className='inline-flex items-center justify-center rounded-md bg-black py-[8px] px-[20px] text-center font-[400] text-[white] text-[16px] hover:bg-opacity-90 leading-[23px]'>Back</a>
                  </div>
                </div>
              ) : (receivedDataStatus == '3') ? (
                <div className="flex items-center pt-10 pl-[45%]">
                  <div className="flex items-center gap-[6px]">
                    <p className='inline-flex items-center justify-center rounded-md bg-[#ff2e2e] py-[8px] px-[20px] text-center font-[400] text-[white] text-[16px] hover:bg-opacity-90 leading-[23px]'>Rejected</p>
                  </div>
                  <div className="flex items-center gap-[6px] px-5">
                    <a href="/OnboardingAdmin/AdminSellerListing" className='inline-flex items-center justify-center rounded-md bg-black py-[8px] px-[20px] text-center font-[400] text-[white] text-[16px] hover:bg-opacity-90 leading-[23px]'>Back</a>
                  </div>
                </div>
              ) : <p>Not Found</p>}
            </>
          )}
        </>
      ) : <p>Documents Not Found</p>}
    </div>
  );
};

export default AdminDocumentViewer;
