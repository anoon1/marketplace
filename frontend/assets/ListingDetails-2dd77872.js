import{r as l,j as e,L as C,d as j,u as L,h as M}from"./index-b349b8ac.js";import{_ as F}from"./react-stars-4e5fb6d8.js";let E=j.baseApiUrl;const S=({list_id:x})=>{const[c,p]=l.useState(!1),[h,m]=l.useState({}),i={},t=()=>p(!0),d=()=>p(!1),[s,u]=l.useState({listingId:x});let g=localStorage.getItem("usertoken");const[f,b]=l.useState(!1),v=async()=>{if(r())try{(await fetch(`${E}reportListing`,{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({...s,token:g})})).ok?b(!f):console.log("Error while saving report in the database")}catch(n){console.log("Error while saving report in the database:",n.message)}},a=n=>{const{name:o,value:w,type:N,checked:k}=n.target,y=N==="checkbox"?k:w;u(D=>({...D,[o]:y}))},r=()=>(s.comment||(i.comment="• Comment is required"),m(i),Object.keys(i).length===0);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{onClick:t,className:"flex justify-center gap-[6.5px] items-center mt-[20px] cursor-pointer",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"15",viewBox:"0 0 13 15",fill:"none",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M0.681818 0C0.305264 0 0 0.305264 0 0.681818V14.3182C0 14.6947 0.305264 15 0.681818 15C1.05837 15 1.36364 14.6947 1.36364 14.3182V8.58975C1.68138 8.43157 2.18368 8.21107 2.72217 8.07648C3.68803 7.83505 4.46317 7.92416 4.88727 8.56023C5.67886 9.74755 7.19059 9.85214 8.35405 9.73623C9.5818 9.61391 10.7965 9.21184 11.4105 8.98473C11.95 8.78523 12.2727 8.27291 12.2727 7.73236V3.22048C12.2727 2.16271 11.153 1.54516 10.2606 1.94987C9.53693 2.27808 8.5755 2.6446 7.70666 2.76566C6.79766 2.89232 6.26973 2.72093 6.02182 2.34916C5.12734 1.00747 3.59699 0.848632 2.50019 0.94003C2.07914 0.975123 1.6879 1.04875 1.36364 1.1267V0.681818C1.36364 0.305264 1.05837 0 0.681818 0ZM1.36364 2.53709V7.09411C1.6642 6.97139 2.01556 6.8475 2.39146 6.75355C3.47105 6.48368 5.08227 6.39457 6.02182 7.80375C6.34814 8.29323 7.10011 8.49075 8.21884 8.37934C9.25623 8.27598 10.3242 7.93098 10.9091 7.71627V3.22048C10.9091 3.1895 10.8464 3.18152 10.8239 3.19177C10.0619 3.5373 8.95882 3.96799 7.89484 4.11625C6.87109 4.2589 5.598 4.1717 4.88727 3.1056C4.41811 2.40194 3.56209 2.2199 2.61344 2.29895C2.13003 2.33924 1.68018 2.44518 1.36364 2.53709Z",fill:"#2174F5"})}),e.jsx("span",{className:"text-[#2174F5] text-[14px] font-[500] leading-[22px]",children:"REPORT IT HERE"})]}),e.jsx("div",{className:`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 ${c?"block":"hidden"}`,children:f?e.jsxs("div",{className:"relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px] md:pb-[68px] text-center",children:[e.jsx("span",{onClick:d,className:"absolute right-[15px] top-[15px] cursor-pointer",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:[e.jsx("path",{d:"M11 1L1 11",stroke:"#002743","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),e.jsx("path",{d:"M1 1L11 11",stroke:"#002743","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})]})}),e.jsx("span",{className:"",children:e.jsxs("svg",{width:"60",height:"60",viewBox:"0 0 60 60",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"m-auto mb-[30px] mt-[12px]",children:[e.jsx("path",{d:"M57 27.5314V30.0154C56.9967 35.8378 55.1113 41.5031 51.6252 46.1664C48.139 50.8297 43.2389 54.2411 37.6555 55.892C32.0721 57.5428 26.1046 57.3446 20.6431 55.3268C15.1815 53.3091 10.5186 49.5799 7.34959 44.6955C4.18062 39.8111 2.67544 34.0332 3.05853 28.2235C3.44162 22.4138 5.69246 16.8835 9.47535 12.4575C13.2582 8.03156 18.3705 4.94699 24.0497 3.66385C29.7289 2.38071 35.6707 2.96776 40.989 5.33745",stroke:"#2174F5","stroke-width":"5","stroke-linecap":"round","stroke-linejoin":"round"}),e.jsx("path",{d:"M56.9984 8.41516L43.4984 21.9287L29.9984 35.4422L21.8984 27.3422",stroke:"#2174F5","stroke-width":"5","stroke-linecap":"round","stroke-linejoin":"round"})]})}),e.jsx("h3",{className:"mb-[20px] text-[#1D2D5C] font-[600] text-[32px] leading-[28px]",children:"Thank You!"}),e.jsx("p",{className:"text-[#535D7A] text-[14px] font-[400] leading-[20px]",children:'Your Report has been submitted. Thank you for helping us make our community better."'})]}):e.jsxs("div",{className:"relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px]",children:[e.jsx("span",{onClick:d,className:"absolute right-[15px] top-[15px] cursor-pointer",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:[e.jsx("path",{d:"M11 1L1 11",stroke:"#002743","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),e.jsx("path",{d:"M1 1L11 11",stroke:"#002743","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})]})}),e.jsx("h3",{className:"mb-[15px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]",children:"Reason for report"}),e.jsx("div",{className:"",children:e.jsx("p",{className:"text-[#535D7A] text-[14px] font-[400] leading-[20px]",children:'Trust and transparency are vital for Online Marketplace. If you have concerns about a startup, report them anonymously to help us maintain integrity in the marketplace."'})}),e.jsxs("form",{children:[e.jsx("div",{className:"mt-[35px]",children:e.jsxs("ul",{className:"flex flex-col gap-[18px]",children:[e.jsx("li",{children:e.jsx("div",{children:e.jsxs("label",{htmlFor:"checkbox1",className:"flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",id:"checkbox1",name:"fraudScam",value:"Fraud_or_scam",className:"sr-only",onChange:a}),e.jsx("div",{className:`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${s.fraudScam&&"border-primary"}`,children:e.jsx("span",{className:`h-[11px] w-[11px] rounded-full bg-transparent ${s.fraudScam&&"!bg-primary"}`,children:" "})})]}),"Fraud or scam"]})})}),e.jsx("li",{children:e.jsx("div",{children:e.jsxs("label",{htmlFor:"checkbox2",className:"flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",id:"checkbox2",name:"inaccurateDescription",value:"Inaccurate_description",className:"sr-only",onChange:a}),e.jsx("div",{className:`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${s.inaccurateDescription&&"border-primary"}`,children:e.jsx("span",{className:`h-[11px] w-[11px] rounded-full bg-transparent ${s.inaccurateDescription&&"!bg-primary"}`,children:" "})})]}),"Inaccurate description"]})})}),e.jsx("li",{children:e.jsx("div",{children:e.jsxs("label",{htmlFor:"checkbox3",className:"flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",id:"checkbox3",name:"alreadySold",value:"Product_already_sold",className:"sr-only",onChange:a}),e.jsx("div",{className:`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${s.alreadySold&&"border-primary"}`,children:e.jsx("span",{className:`h-[11px] w-[11px] rounded-full bg-transparent ${s.alreadySold&&"!bg-primary"}`,children:" "})})]}),"Product already sold"]})})}),e.jsx("li",{children:e.jsx("div",{children:e.jsxs("label",{htmlFor:"checkbox4",className:"flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",id:"checkbox4",name:"wrongCategory",value:"Wrong_Category",className:"sr-only",onChange:a}),e.jsx("div",{className:`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${s.wrongCategory&&"border-primary"}`,children:e.jsx("span",{className:`h-[11px] w-[11px] rounded-full bg-transparent ${s.wrongCategory&&"!bg-primary"}`,children:" "})})]}),"Wrong Category"]})})}),e.jsxs("li",{children:[e.jsx("div",{children:e.jsxs("label",{htmlFor:"checkbox5",className:"flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",id:"checkbox5",name:"other",value:"other_reason",className:"sr-only",onChange:a}),e.jsx("div",{className:`mr-[15px] flex h-[15px] w-[15px] items-center justify-center rounded-full border ${s.other&&"border-primary"}`,children:e.jsx("span",{className:`h-[11px] w-[11px] rounded-full bg-transparent ${s.other&&"!bg-primary"}`,children:" "})})]}),"Other"]})}),e.jsx("br",{}),e.jsx("label",{className:"flex cursor-pointer select-none items-center leading-[normal] text-[#535D7A] text-[14px] font-[400] max-w-[fit-content]",children:"Comment"}),e.jsx("div",{className:"p-[10px]",children:e.jsx("textarea",{id:"commentData",name:"comment",className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",placeholder:"Type comment",onChange:a})}),e.jsx("span",{className:"text-[red] text-[16px]",children:h.comment&&e.jsx("p",{children:h.comment})})]})]})}),e.jsx("div",{className:"flex justify-end mt-[40px] border-t border-[#E2E8F0] pt-[30px] mb-[10px]",children:e.jsx(C,{onClick:v,to:"#",className:"inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]",children:"Submit Report"})})]})]})})]})},I=({sellerId:x})=>{const c=L(),[p,h]=l.useState(!1),[m,i]=l.useState([]),t=()=>h(!1);let d=localStorage.getItem("usertoken");const[s,u]=l.useState("");let g=x,f="";l.useEffect(()=>{(async()=>{if(d)try{const r=await fetch(`${j.baseApiUrl}getBuyersDetails`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:d})});if(r.ok){const n=await r.json();i(n.data[0].id)}else console.error("Failed to get user ID:",r.statusText)}catch(r){console.error("Error during fetch:",r)}})()},[d]);const b=(a,r)=>{a&&r?(async()=>{if(d)try{const o=await fetch(`${j.baseApiUrl}checkUserRoom`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({fromUserId:a,toUserId:r})});if(o.ok){const w=await o.json();f=w.data,u(w.data)}else console.error("Failed to get user ID:",o.statusText)}catch(o){console.error("Error during fetch:",o)}})():console.log("getUserID or response is missing")},v=a=>{a.preventDefault(),b(m,g),setTimeout(function(){f&&c(`/OnboardingBuyer/BuyerInbox?id=${f}&tid=${g}`)},2e3)};return e.jsxs(e.Fragment,{children:[e.jsx(C,{to:"",onClick:v,className:"rounded-[4px] bg-[#2174F5] text-[#FFF] text-[16px] block text-center w-full py-[9px] py-[15px] leading-[22px]",children:"Send Message"}),e.jsx("div",{className:`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 ${p?"block":"hidden"}`,children:e.jsxs("div",{className:"relative w-full max-w-[428px] rounded-[10px] bg-white p-[25px] md:p-[38px]",children:[e.jsx("span",{onClick:t,className:"absolute right-[11px] top-[11px] cursor-pointer",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"9",height:"9",viewBox:"0 0 9 9",fill:"none",children:[e.jsx("path",{d:"M8 1L1 8",stroke:"#002743","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),e.jsx("path",{d:"M1 1L8 8",stroke:"#002743","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})]})}),e.jsx("h3",{className:"mb-[30px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]",children:"Message for seller"}),e.jsx("div",{className:"relative z-20 bg-white dark:bg-form-input",children:e.jsx("textarea",{rows:4,placeholder:"Type something here...",className:"w-full rounded-[4px] border-[1px] border-[#E2E8F0] bg-transparent py-[14px] px-[20px] font-[400] text-[14px] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary placeholder:text-[#64748b80]"})}),e.jsx("div",{className:"flex justify-end mt-[20px]",children:e.jsx(C,{onClick:t,to:"#",className:"inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]",children:"Send Message"})})]})})]})},_=({list_id:x})=>{const[c,p]=l.useState(!1),[h,m]=l.useState(!1),[i,t]=l.useState(null),[d,s]=l.useState(null),[u,g]=l.useState(0),f=localStorage.getItem("usertoken"),b=()=>{t(null),s(null),p(!0)},v=()=>{t(null),s(null),p(!1)},a=r=>{t(null),s(null),m(!0),fetch(`${j.baseApiUrl}makeDeal`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:f,offerPrice:u,listingId:r}),redirect:"follow"}).then(n=>n.json()).then(n=>{m(!1),n.message=="Deal saved successfull"?t(n.message):s(n.message)}).catch(n=>s(n))};return e.jsxs(e.Fragment,{children:[e.jsxs(C,{to:"",onClick:b,className:"flex items-center justify-center gap-[5px] rounded-[4px] border border-[#1D2D5C] bg-[transparent] text-[#1D2D5C] text-[16px] block text-center w-full py-[8px] py-[15px] leading-[22px]",children:[e.jsxs("svg",{width:"23",height:"16",viewBox:"0 0 23 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M21.721 7.26763C21.3917 7.12857 21.0084 7.04719 20.6071 7.04719C20.1565 7.04719 19.7294 7.14912 19.3468 7.33163L19.3648 7.32373L14.8449 9.37487C14.8473 9.33774 14.8653 9.30534 14.8653 9.26821C14.8543 8.18496 13.9821 7.31109 12.9081 7.31109C12.8541 7.31109 12.8017 7.31346 12.7485 7.31741L12.7555 7.31662H9.79624L6.07268 6.2152C6.02418 6.20019 5.96786 6.1915 5.90919 6.1915H5.90763H4.2109V5.59259C4.2109 5.26548 3.94807 5 3.62421 5H0.586695C0.262839 5 0 5.26548 0 5.59259V15.2383C0 15.5654 0.262839 15.8309 0.586695 15.8309H3.62421C3.94807 15.8309 4.2109 15.5654 4.2109 15.2383V14.4451C5.63305 14.6694 6.90657 15.0313 8.11282 15.5244L7.99548 15.4817C8.90212 15.8104 9.94878 16 11.0393 16C12.2963 16 13.4948 15.748 14.5876 15.2905L14.5258 15.3134C15.4981 14.8765 16.3234 14.4158 17.1049 13.892L17.0407 13.9323C17.3051 13.7671 17.568 13.602 17.834 13.4432C19.1176 12.676 20.1424 12.006 21.0639 11.3328C21.5176 11.0065 21.9134 10.6833 22.2897 10.3396L22.278 10.3499C22.5674 10.1121 22.799 9.81339 22.9546 9.47285L22.9609 9.45784C22.9859 9.39463 23 9.32194 23 9.2453C23 9.20105 22.9953 9.15759 22.9859 9.11572L22.9867 9.11967C22.8717 8.31691 22.3953 7.64531 21.7327 7.27237L21.7202 7.26605L21.721 7.26763ZM3.0383 14.6473H1.17417V6.18675H3.0383V14.6473ZM21.4511 9.51077C21.1288 9.80312 20.7776 10.0876 20.4123 10.3507L20.3755 10.376C19.4861 11.0254 18.4887 11.6773 17.2355 12.4271C16.9633 12.5891 16.695 12.7574 16.4243 12.9257C15.7555 13.3792 14.9865 13.8114 14.1824 14.1788L14.0807 14.2199C13.1795 14.5936 12.1328 14.8109 11.0369 14.8109C10.0958 14.8109 9.19233 14.6513 8.34984 14.3566L8.40773 14.3739C7.19131 13.8588 5.77621 13.4653 4.30086 13.2599L4.2109 13.2496V7.37746H5.82314L9.5467 8.47888C9.5952 8.49389 9.65152 8.50259 9.71019 8.50259H9.71175H12.7547C13.4455 8.50259 13.6911 8.91503 13.6911 9.269C13.6911 9.62297 13.4455 10.0354 12.7547 10.0354H7.42834C7.10448 10.0354 6.84164 10.3009 6.84164 10.628C6.84164 10.9551 7.10448 11.2206 7.42834 11.2206H13.5151C13.6019 11.2206 13.6841 11.2016 13.7584 11.1676L13.7545 11.1692L19.8522 8.40224C20.0767 8.29795 20.3395 8.23632 20.6165 8.23632C20.8245 8.23632 21.024 8.27029 21.211 8.33429L21.1977 8.33034C21.4965 8.51128 21.7124 8.80757 21.7844 9.15601L21.7859 9.16391C21.6803 9.28954 21.57 9.40253 21.4519 9.50682L21.448 9.50998L21.4511 9.51077Z",fill:"#1D2D5C"}),e.jsx("mask",{id:"path-2-inside-1_1244_109",fill:"white",children:e.jsx("rect",{x:"8",width:"9",height:"5",rx:"1"})}),e.jsx("rect",{x:"8",width:"9",height:"5",rx:"1",stroke:"#1D2D5C",strokeWidth:"2.4",mask:"url(#path-2-inside-1_1244_109)"}),e.jsx("line",{x1:"12",y1:"2.5",x2:"13",y2:"2.5",stroke:"#1D2D5C"})]}),"Send Offer"]}),e.jsx("div",{className:`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#000000b3] px-4 py-5 ${c?"block":"hidden"}`,children:e.jsxs("div",{className:"relative w-full max-w-[378px] rounded-[10px] bg-white p-[25px] md:p-[38px]",children:[e.jsx("span",{onClick:v,className:"absolute right-[11px] top-[11px] cursor-pointer",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"9",height:"9",viewBox:"0 0 9 9",fill:"none",children:[e.jsx("path",{d:"M8 1L1 8",stroke:"#002743",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M1 1L8 8",stroke:"#002743",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})}),e.jsx("h3",{className:"mb-[30px] text-[#1D2D5C] font-[600] text-[20px] sm:text-[22px] leading-[18px]",children:"Make an offer"}),e.jsxs("div",{className:"relative z-20 bg-white dark:bg-form-input",children:[e.jsx("span",{className:"absolute top-1/2 left-[1px] py-[15px] px-[11px] bg-[#E9ECEF] z-30 -translate-y-1/2 rounded-tl-[7px] rounded-bl-[5px]",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"11",height:"18",viewBox:"0 0 11 18",fill:"none",children:e.jsx("path",{d:"M2.98919 6.06895C2.98919 5.12281 4.45835 4.96125 5.73272 4.96125C6.93383 4.96125 8.57504 5.49147 9.94732 6.16159L10.2162 3.55382C9.52997 3.18426 7.9379 2.7457 6.32073 2.65404L6.71266 0H4.09108L4.48352 2.65404C1.10276 2.95361 0 4.79961 0 6.34588C0 10.2456 7.71672 9.41575 7.71672 11.8147C7.71672 12.7155 6.811 13.0378 5.21806 13.0378C3.06254 13.0378 1.44494 12.3232 0.612578 11.5841L0.195656 14.5151C0.980366 14.9537 2.57192 15.3459 4.48352 15.4385L4.09108 18H6.71266L6.32073 15.415C10.2896 15.0917 11 13.1069 11 11.7921C11.0001 7.154 2.98919 8.30716 2.98919 6.06895Z",fill:"#64748B"})})}),e.jsx("input",{type:"number",placeholder:"Enter your amount",value:u,onChange:r=>g(parseInt(r.target.value)),className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pl-[44px] text-[#3F4E7A] text-[14px]"})]}),i&&e.jsx("p",{className:"pt-2 text-center text-transform-capitalize text-success",children:i}),d&&e.jsx("p",{className:"pt-2 text-center text-transform-capitalize text-danger",children:d}),e.jsx("div",{className:"flex justify-end mt-[20px] mb-[5px]",children:e.jsx("button",{onClick:()=>a(x),disabled:h,className:"inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]",children:"Send Offer"})})]})})]})},$=({data:x})=>{const{id:c,title:p,description:h,asking_price:m,version:i,net_profit:t,downloads:d,rating:s,how_it_works:u,business_model:g,industry_type:f,revenue:b,created_at:v,selling_reason:a,listing_image:r}=x;function n(o){return Math.abs(Number(o))>=1e9?(Math.abs(Number(o))/1e9).toFixed(2)+"B":Math.abs(Number(o))>=1e6?(Math.abs(Number(o))/1e6).toFixed(2)+"M":Math.abs(Number(o))>=1e3?(Math.abs(Number(o))/1e3).toFixed(2)+"k":Math.abs(Number(o))}return e.jsxs("div",{className:"flex flex-wrap md:gap-[0] gap-[25px]",children:[e.jsxs("div",{className:"flex flex-col gap-[25px] w-full md:max-w-[60%] max-w-[100%] pr-[15px]",children:[e.jsxs("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:[e.jsxs("div",{className:"border-b border-stroke pt-[23px] px-[37px] pb-[25px]",children:[e.jsx("h3",{className:"font-[600] text-[#1D2D5C] text-[26px] leading-[normal]",children:p}),e.jsxs("p",{className:"text-[#1D2D5C] text-[14px] font-[400] flex items-center pt-[8px]",children:[s||0,e.jsx(F,{count:5,size:15,value:s||0,isHalf:s==2.5,edit:!1,activeColor:"#ffd700",className:"mt-5"})]})]}),e.jsx("div",{className:"py-[40px] px-[35px]",children:e.jsx("div",{className:"bg-[#4085FE] h-[261px] max-h-[261px] overflow-hidden",children:e.jsx("img",{src:`${j.baseApiUrl}${r||j.DEFAULT_IMG}`,alt:"",className:"w-full h-full max-h-[261px] object-cover object-center m-auto"})})})]}),e.jsxs("div",{className:"rounded-sm bg-white",children:[e.jsx("div",{className:"border-b border-stroke pt-[20px] px-[25px] pb-[21px]",children:e.jsx("h5",{className:"font-[500] text-[#1D2D5C] text-[16px] leading-[normal]",children:"Overview"})}),e.jsx("div",{className:"py-[20px] px-[25px]",children:h})]}),e.jsxs("div",{className:"rounded-sm bg-white",children:[e.jsx("div",{className:"border-b border-stroke pt-[20px] px-[25px] pb-[21px]",children:e.jsx("h5",{className:"font-[500] text-[#1D2D5C] text-[16px] leading-[normal]",children:"Why are you selling?"})}),e.jsx("div",{className:"py-[20px] px-[25px]",children:e.jsx("p",{className:"text-[#535D7A] text-[14px] font-[400] leading-[25px] mb-[30px]",children:a})})]}),e.jsxs("div",{className:"rounded-sm bg-white",children:[e.jsx("div",{className:"border-b border-stroke pt-[20px] px-[25px] pb-[21px]",children:e.jsx("h5",{className:"font-[500] text-[#1D2D5C] text-[16px] leading-[normal]",children:"How It Work?"})}),e.jsx("div",{className:"py-[40px] px-[24px] pb-[50px]",children:e.jsx("video",{src:`${j.baseApiUrl}${u}`,controls:!0,controlsList:"nodownload"})})]})]}),e.jsxs("div",{className:"flex flex-col w-full md:max-w-[40%] max-w-[100%] md:pl-[15px] pl-[0]",children:[e.jsxs("div",{className:"rounded-sm bg-white px-[30px] py-[22px]",children:[e.jsxs("div",{className:"pb-[26px] pt-[20px] border-b border-[#E0E0E0]",children:[e.jsx("h5",{className:"text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]",children:"Asking Price"}),e.jsxs("span",{className:"text-[#64748B] text-[14px] font-[400] leading-[normal]",children:["USD $",m]})]}),e.jsxs("div",{className:"pb-[26px] pt-[20px] border-b border-[#E0E0E0]",children:[e.jsx("h5",{className:"text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]",children:"Net Profit"}),e.jsxs("span",{className:"text-[#64748B] text-[14px] font-[400] leading-[normal]",children:["$",t]})]}),e.jsxs("div",{className:"pb-[26px] pt-[20px] border-b border-[#E0E0E0]",children:[e.jsx("h5",{className:"text-[#1D2D5C] text-[16px] font-[500] leading-[normal] mb-[3px]",children:"Revenue"}),e.jsx("span",{className:"text-[#64748B] text-[14px] font-[400] leading-[normal]",children:b})]}),e.jsxs("div",{className:"mt-[30px] flex flex-col gap-[15px]",children:[e.jsx(I,{sellerId:x.seller_id}),e.jsx(_,{list_id:c})]}),e.jsx(S,{list_id:c})]}),e.jsxs("div",{className:"rounded-sm bg-white px-[30px] py-[28px] pb-[48px] border-t border-[#E0E0E0] flex flex-col gap-[25px]",children:[e.jsxs("div",{className:"flex items-center gap-[14px]",children:[e.jsx("div",{children:e.jsx("img",{src:"/assets/arrow-ico.svg",alt:""})}),e.jsx("div",{children:e.jsxs("h4",{className:"text-[#1C2434] text-[16px] font-[400] leading-[normal]",children:["Version: ",e.jsx("span",{className:"text-[#64748B] text-[16px] font-[400] leading-[normal]",children:i})]})})]}),e.jsxs("div",{className:"flex items-center gap-[14px]",children:[e.jsx("div",{children:e.jsx("img",{src:"/assets/ship-ico.svg",alt:""})}),e.jsx("div",{children:e.jsxs("h4",{className:"text-[#1C2434] text-[16px] font-[400] leading-[normal]",children:["Number of Downloads: ",e.jsx("span",{className:"text-[#64748B] text-[16px] font-[400] leading-[normal]",children:n(d)})]})})]}),e.jsxs("div",{className:"flex items-center gap-[14px]",children:[e.jsx("div",{children:e.jsx("img",{src:"/assets/lens-ico.svg",alt:""})}),e.jsx("div",{children:e.jsxs("h4",{className:"text-[#1C2434] text-[16px] font-[400] leading-[normal]",children:["Launched: ",e.jsx("span",{className:"text-[#64748B] text-[16px] font-[400] leading-[normal]",children:new Date(v).getFullYear()})]})})]}),e.jsxs("div",{className:"flex items-center gap-[14px]",children:[e.jsx("div",{children:e.jsx("img",{src:"/assets/setting-ico.svg",alt:""})}),e.jsx("div",{children:e.jsxs("h4",{className:"text-[#1C2434] text-[16px] font-[400] leading-[normal]",children:["Industries: ",e.jsx("span",{className:"text-[#64748B] text-[16px] font-[400] leading-[normal]",children:f})]})})]}),e.jsxs("div",{className:"flex items-center gap-[14px]",children:[e.jsx("div",{children:e.jsx("img",{src:"/assets/breef-ico.svg",alt:""})}),e.jsx("div",{children:e.jsxs("h4",{className:"text-[#1C2434] text-[16px] font-[400] leading-[normal]",children:["Business Model: ",e.jsx("span",{className:"text-[#64748B] text-[16px] font-[400] leading-[normal]",children:g})]})})]})]})]})]})},A=()=>{const{id:x}=M(),[c,p]=l.useState({}),[h,m]=l.useState(!1),i=localStorage.getItem("usertoken");return l.useEffect(()=>{m(!0),fetch(`${j.baseApiUrl}getSingleListing`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i,list_id:x}),redirect:"follow"}).then(t=>t.json()).then(t=>{t.data&&(console.log("Datatatatatata",t.data),p(t.data),m(!1))}).catch(t=>console.log("error",t))},[i,x]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]",children:!h&&c?e.jsx($,{data:c}):e.jsx("p",{children:"loading"})})})};export{A as default};