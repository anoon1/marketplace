import configEnv from '../config/configuration_keys.json'
import { useLocation } from "react-router-dom";



const paymentView = () => {
    const { state } = useLocation();
    const token = localStorage.getItem('usertoken');
    const appUrl = configEnv.baseApiUrl;
    let url_str = window.location.search;
    const id = url_str.replace('?', '');

    const sendpayment = async (bidId: any) => {
        try {
            fetch(`${appUrl}sendpayment`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ bidId, token: token }),
            }).then(response => response.text()).then(result => {
                const jsonObject = JSON.parse(result);
                const buyer_link = jsonObject.link.buyer_link;
                let url = buyer_link
                window.open(url, '', 'width=1000, height=850')
            });
        } catch (err) {
            console.log('error while sending report ', err);
        }

    }


    return (
        <div className="flex flex-wrap md:gap-[0] gap-[25px]">

            <div className="flex flex-col w-full md:max-w-[60%] max-w-[100%] md:pl-[15px] pl-[0]">
                <div className="rounded-sm bg-white px-[30px] py-[22px]">
                    <div className="pb-[26px] pt-[20px] border-b border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Title</h5>
                        <span className="text-[#64748B] text-[14px] font-[400] leading-[normal]">{state.item_title}</span>
                    </div>
                    <div className="pb-[26px] pt-[20px] border-b border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Asking Price</h5>
                        <span className="text-[#64748B] text-[14px] font-[400] leading-[normal]">USD ${state.asking_price}</span>
                    </div>
                    <div className="pb-[26px] pt-[20px] border-b border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Selling Price</h5>
                        <span className="text-[#64748B] text-[14px] font-[400] leading-[normal]">${state.selling_price}</span>
                    </div>
                    <div className="pb-[26px] pt-[20px] border-[#E0E0E0]">
                        <h5 className="text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]">Payment Status</h5>
                        {(() => {
                            if (state.deal_status === 'Refunded') {
                                return (
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                        Refunded
                                    </p>
                                );
                            } else if (state.deal_status === 'Processing') {
                                return (
                                    <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                        Processing
                                    </p>
                                );
                            } else if (state.deal_status === 'Succeed') {
                                return (
                                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                        Payment Succeed
                                    </p>
                                );
                            }
                            else if (state.deal_status === 'Pending') {
                                return (
                                    <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                                        Pending
                                    </p>
                                );
                            } else {
                                return (
                                    <p className="inline-flex rounded-full bg-gray-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-gray-500">
                                        Unknown
                                    </p>
                                );
                            }
                        })()}
                    </div>
                    <div className="pt-[10px]">
                        <button onClick={() => sendpayment(state.item_id)} className="inline-flex w-1/2 pt-[10px] items-center justify-center rounded-md bg-[#2174F5] py-[5px] px-[20px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]">
                            Payment
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default paymentView;
