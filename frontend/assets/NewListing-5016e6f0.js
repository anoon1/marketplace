import{r as x,j as e,L as M,d as T}from"./index-b349b8ac.js";import{B as D}from"./Breadcrumb-9b91b131.js";import{_ as L}from"./react-stars-4e5fb6d8.js";const V=()=>{const[g,u]=x.useState(!1);let k=T.baseApiUrl;const j=()=>{u(!0)},v=()=>{u(!1)},[s,b]=x.useState({}),[m,h]=x.useState(null),[r,p]=x.useState({title:"",description:"",sellingReason:"",askingPrice:"",industryType:"",version:"",businessModel:"",netProfit:"",revenue:"",link:"",downloads:"",uploadFile:null,uploadDocfile:null,listingTumbnail:null,uploadError:"",session:"",rating:0}),w=()=>{p({title:"",description:"",sellingReason:"",askingPrice:"",industryType:"",version:"",businessModel:"",netProfit:"",revenue:"",link:"",downloads:"",uploadFile:null,uploadDocfile:null,listingTumbnail:null,uploadError:"",session:"",rating:0})},C=(l,d)=>{p(a=>({...a,[l]:d}))},t=l=>{const{name:d,type:a}=l.target;if(a==="file"){const c=l.target.files;C(d,c)}else{const c=a==="number"?parseFloat(l.target.value):l.target.value;p(i=>({...i,[d]:c}))}};x.useState(0);const N=l=>{p(d=>({...d,rating:l}))},f=async l=>{if(l.preventDefault(),h(""),P()){let d=localStorage.getItem("usertoken");try{const a=new FormData;Object.keys(r).forEach(i=>{const o=r[i];if(i==="uploadFile"&&o)for(let n=0;n<o.length;n++)a.append(i,o[n]);else if(i==="uploadDocfile"&&o)for(let n=0;n<o.length;n++)a.append(i,o[n]);else if(i==="listingTumbnail"&&o)for(let n=0;n<o.length;n++)a.append(i,o[n]);else a.append(i,o)}),a.append("token",d||"");const c=await fetch(`${k}createListing`,{method:"POST",body:a});if(c.ok)p({title:"",description:"",sellingReason:"",askingPrice:"",industryType:"",version:"",businessModel:"",netProfit:"",revenue:"",link:"",downloads:"",uploadFile:null,uploadDocfile:null,listingTumbnail:null,uploadError:"",session:"",rating:0}),h("Listing created successfully!");else{const i=await c.json();i&&i.error?b(i.error):console.error("Listing creation failed")}}catch(a){console.error("Error during listing creation:",a)}}},y=["video/mp4","video/webm","video/ogg","video/mpeg","video/avi"],F=["image/jpeg","image/png","application/pdf","application/msword"],E=["image/jpeg","image/png"],P=()=>{const l={};if(r.title||(l.title="• Title is required"),r.description||(l.description="• Description is required"),r.sellingReason||(l.sellingReason="• Why are you selling is required"),r.askingPrice?isNaN(Number(r.askingPrice))&&(l.askingPrice="• Asking price must be a valid number"):l.askingPrice="• Asking price is required",r.businessModel||(l.businessModel="• Business model is required"),r.netProfit?isNaN(Number(r.netProfit))&&(l.netProfit="• Net profit must be a valid number"):l.netProfit="• Net profit is required",r.revenue?isNaN(Number(r.revenue))&&(l.revenue="• Revenue must be a valid number"):l.revenue="• Revenue is required",isNaN(Number(r.downloads))&&(l.downloads="• Downloads must be a valid number"),r.uploadFile&&r.uploadFile.length>0&&!y.includes(r.uploadFile[0].type)&&(l.mime="• Invalid file format. Only mp4, webm, ogg, mpeg, and avi are allowed."),r.uploadDocfile&&r.uploadDocfile.length>0){const d=Object.keys(r.uploadDocfile).filter(a=>{const c=r.uploadDocfile[a].type;return!F.includes(c)});console.log("invalidFilesinvalidFiles",d),d.length>0&&(l.docFileError="• Invalid file format Only JPEG, PNG, PDF, and DOC are allowed.")}return r.listingTumbnail&&r.listingTumbnail.length>0&&E.includes(r.listingTumbnail[0].type)==!1&&(l.thumbnail="• Invalid file format Only JPG and PNG are allowed."),b(l),Object.keys(l).length===0};return e.jsxs("div",{className:"flex flex-wrap",children:[e.jsx("div",{className:"flex flex-col gap-[25px] w-full md:max-w-[57%] max-w-[100%] md:pr-[15px] pr-[0]",children:e.jsxs("form",{action:"",onSubmit:f,className:"flex flex-col gap-4 ",id:"createListing",children:[e.jsxs("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:[e.jsx("div",{className:"border-b border-stroke py-4 px-6.5 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-black dark:text-white",children:"Create Listing"})}),e.jsxs("div",{className:"flex flex-col gap-5.5 p-6.5",children:[e.jsxs("div",{className:"flex md:flex-nowrap flex-wrap md:gap-[40px] gap-[25px]",children:[e.jsxs("div",{className:"w-full md:max-w-[60%] max-w-[100%]",children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Title ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("input",{type:"text",name:"title",value:r.title,onChange:t,placeholder:"Enter the title",className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.title&&e.jsx("p",{children:s.title})})]}),e.jsx("div",{className:"md:w-[40%] w-[100%]",children:e.jsxs("label",{className:"mb-[21px] display-grid grid-cols-[auto,1fr] items-center gap-[7px] text-black dark:text-white",children:[e.jsxs("div",{className:"flex items-center gap-[7px] relative",children:["Rating",e.jsx("div",{className:`bg-black text-white p-2 rounded absolute bottom-full w-full  left-[80px] bottom-[0] transform-translate-x-1/2 transition-opacity duration-300 ${g?"opacity-100":"opacity-0 invisible"}`,children:"Rating based on the business rated"}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",className:"relative top-[1px] cursor-pointer",title:"Click or hover for more info",onMouseOver:j,onMouseOut:v,children:e.jsx("path",{d:"M7.50001 0C6.01665 0 4.5666 0.439868 3.33323 1.26398C2.09986 2.08809 1.13856 3.25943 0.570907 4.62988C0.00324965 6.00032 -0.145275 7.50833 0.144114 8.96318C0.433503 10.418 1.14781 11.7544 2.1967 12.8033C3.2456 13.8522 4.58197 14.5665 6.03683 14.8559C7.49169 15.1453 8.99969 14.9968 10.3701 14.4291C11.7406 13.8614 12.9119 12.9002 13.736 11.6668C14.5601 10.4334 15 8.98337 15 7.50001C14.9978 5.51157 14.2069 3.60522 12.8008 2.19919C11.3948 0.793149 9.48844 0.00224974 7.50001 0ZM7.50001 3.5C7.5989 3.5 7.69557 3.52933 7.77779 3.58427C7.86002 3.63921 7.92411 3.7173 7.96195 3.80866C7.99979 3.90002 8.00969 4.00056 7.9904 4.09755C7.97111 4.19454 7.92349 4.28363 7.85356 4.35356C7.78364 4.42348 7.69454 4.4711 7.59755 4.4904C7.50056 4.50969 7.40003 4.49979 7.30867 4.46194C7.2173 4.4241 7.13921 4.36001 7.08427 4.27779C7.02933 4.19556 7.00001 4.09889 7.00001 4C7.00001 3.86739 7.05269 3.74022 7.14645 3.64645C7.24022 3.55268 7.3674 3.5 7.50001 3.5ZM8.50001 11.5H6.50001C6.3674 11.5 6.24022 11.4473 6.14645 11.3536C6.05269 11.2598 6.00001 11.1326 6.00001 11C6.00001 10.8674 6.05269 10.7402 6.14645 10.6465C6.24022 10.5527 6.3674 10.5 6.50001 10.5H7.00001V6.5H6.50001C6.3674 6.5 6.24022 6.44733 6.14645 6.35356C6.05269 6.25979 6.00001 6.13261 6.00001 6C6.00001 5.8674 6.05269 5.74022 6.14645 5.64645C6.24022 5.55268 6.3674 5.5 6.50001 5.5H7.50001C7.63262 5.5 7.75979 5.55268 7.85356 5.64645C7.94733 5.74022 8.00001 5.8674 8.00001 6V10.5H8.50001C8.63262 10.5 8.75979 10.5527 8.85356 10.6465C8.94733 10.7402 9.00001 10.8674 9.00001 11C9.00001 11.1326 8.94733 11.2598 8.85356 11.3536C8.75979 11.4473 8.63262 11.5 8.50001 11.5Z",fill:"black"})})]}),e.jsx("div",{style:{marginTop:"20px"},title:"Click or hover for more info",children:e.jsx(L,{count:5,size:30,value:r.rating,onChange:N,edit:!0,activeColor:"#ffd700",isHalf:!0,className:"mt-5"})})]})})]}),e.jsx("div",{}),e.jsx("h3",{className:"font-medium text-black dark:text-white",children:"Listing Thumbnail"}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"upload-thumbnail",className:"block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[30px] cursor-pointer",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",className:"m-auto mb-[9px]",children:[e.jsx("circle",{cx:"20",cy:"20",r:"19.5",fill:"white",stroke:"#E2E8F0"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.0002 20.3333C14.3684 20.3333 14.6668 20.6318 14.6668 21V23.6666C14.6668 23.8435 14.7371 24.013 14.8621 24.1381C14.9871 24.2631 15.1567 24.3333 15.3335 24.3333H24.6668C24.8436 24.3333 25.0132 24.2631 25.1382 24.1381C25.2633 24.013 25.3335 23.8435 25.3335 23.6666V21C25.3335 20.6318 25.632 20.3333 26.0002 20.3333C26.3684 20.3333 26.6668 20.6318 26.6668 21V23.6666C26.6668 24.1971 26.4561 24.7058 26.081 25.0809C25.706 25.4559 25.1973 25.6666 24.6668 25.6666H15.3335C14.8031 25.6666 14.2944 25.4559 13.9193 25.0809C13.5442 24.7058 13.3335 24.1971 13.3335 23.6666V21C13.3335 20.6318 13.632 20.3333 14.0002 20.3333Z",fill:"#2174F5"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M19.5286 12.5286C19.7889 12.2682 20.2111 12.2682 20.4714 12.5286L23.8047 15.8619C24.0651 16.1223 24.0651 16.5444 23.8047 16.8047C23.5444 17.0651 23.1223 17.0651 22.8619 16.8047L20 13.9428L17.1381 16.8047C16.8777 17.0651 16.4556 17.0651 16.1953 16.8047C15.9349 16.5444 15.9349 16.1223 16.1953 15.8619L19.5286 12.5286Z",fill:"#2174F5"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M20.0002 12.3333C20.3684 12.3333 20.6668 12.6318 20.6668 13V21C20.6668 21.3682 20.3684 21.6666 20.0002 21.6666C19.632 21.6666 19.3335 21.3682 19.3335 21V13C19.3335 12.6318 19.632 12.3333 20.0002 12.3333Z",fill:"#2174F5"})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"text-[#64748B] text-[14px] leading-[22px]",children:[e.jsx("span",{className:"text-[#2174F5]",children:"Click to upload"})," or drag and drop files here"]}),e.jsxs("h4",{className:"text-[#64748B] uppercase text-[14px] leading-[22px] mt-[2px]",children:["jpg, png ",e.jsx("br",{})]})]})]}),e.jsx("input",{type:"file",className:"",id:"upload-thumbnail",name:"listingTumbnail",onChange:t,hidden:!0})]}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.thumbnail&&e.jsx("p",{children:s.thumbnail})}),e.jsxs("div",{children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Description  ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("textarea",{rows:4,placeholder:"Type something here...",name:"description",value:r.description,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.description&&e.jsx("p",{children:s.description})})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Why are you selling?  ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("textarea",{rows:4,placeholder:"Type something here...",name:"sellingReason",value:r.sellingReason,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.sellingReason&&e.jsx("p",{children:s.sellingReason})})]}),e.jsxs("div",{className:"flex md:flex-nowrap flex-wrap md:gap-[28px] gap-[25px]",children:[e.jsxs("div",{className:"md:w-[50%] w-[100%]",children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Asking price  ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"Enter the price",name:"askingPrice",value:r.askingPrice,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.askingPrice&&e.jsx("p",{children:s.askingPrice})})]}),e.jsxs("div",{className:"md:w-[50%] w-[100%]",children:[e.jsx("label",{className:"mb-3 block text-black dark:text-white",children:"Types of Industries"}),e.jsx("div",{className:"relative z-20 bg-white dark:bg-form-input",children:e.jsx("input",{type:"text",placeholder:"Enter industry type",name:"industryType",value:r.industryType,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})})]})]})]})]}),e.jsxs("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:[e.jsx("div",{className:"border-b border-stroke py-4 px-6.5 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-black dark:text-white",children:"Additional Info"})}),e.jsxs("div",{className:"flex flex-col gap-5.5 p-6.5",children:[e.jsxs("div",{className:"flex md:flex-nowrap flex-wrap md:gap-[28px] gap-[25px]",children:[e.jsxs("div",{className:"md:w-[50%] w-[100%]",children:[e.jsx("label",{className:"mb-3 block text-black dark:text-white",children:"Version"}),e.jsx("input",{type:"text",name:"version",value:r.version,onChange:t,placeholder:"Enter the version",className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})]}),e.jsxs("div",{className:"md:w-[50%] w-[100%]",children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Business Model  ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"Enter the Model",name:"businessModel",value:r.businessModel,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.businessModel&&e.jsx("p",{children:s.businessModel})})]})]}),e.jsxs("div",{className:"flex md:flex-nowrap flex-wrap md:gap-[28px] gap-[25px]",children:[e.jsxs("div",{className:"md:w-[50%] w-[100%]",children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Net Profit  ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"Enter the net profit",name:"netProfit",value:r.netProfit,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.netProfit&&e.jsx("p",{children:s.netProfit})})]}),e.jsxs("div",{className:"md:w-[50%] w-[100%]",children:[e.jsxs("label",{className:"mb-3 block text-black dark:text-white",children:["Revenue  ",e.jsx("span",{className:"text-center",children:"*"})]}),e.jsx("input",{type:"text",placeholder:"Enter the revenue",name:"revenue",value:r.revenue,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.revenue&&e.jsx("p",{children:s.revenue})})]})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"mb-3 block text-black dark:text-white",children:"Link"}),e.jsx("input",{type:"text",placeholder:"Enter your link",name:"link",value:r.link,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"mb-3 block text-black dark:text-white",children:"Download"}),e.jsx("input",{type:"text",placeholder:"Enter the number of download",name:"downloads",value:r.downloads,onChange:t,className:"w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.downloads&&e.jsx("p",{children:s.downloads})})]})]})]}),e.jsxs("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:[e.jsx("div",{className:"border-b border-stroke py-4 px-6.5 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-black dark:text-white",children:"How It Work"})}),e.jsxs("div",{className:"flex flex-col gap-5.5 p-6.5",children:[e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"upload-file",className:"block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[30px] cursor-pointer",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",className:"m-auto mb-[9px]",children:[e.jsx("circle",{cx:"20",cy:"20",r:"19.5",fill:"white",stroke:"#E2E8F0"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.0002 20.3333C14.3684 20.3333 14.6668 20.6318 14.6668 21V23.6666C14.6668 23.8435 14.7371 24.013 14.8621 24.1381C14.9871 24.2631 15.1567 24.3333 15.3335 24.3333H24.6668C24.8436 24.3333 25.0132 24.2631 25.1382 24.1381C25.2633 24.013 25.3335 23.8435 25.3335 23.6666V21C25.3335 20.6318 25.632 20.3333 26.0002 20.3333C26.3684 20.3333 26.6668 20.6318 26.6668 21V23.6666C26.6668 24.1971 26.4561 24.7058 26.081 25.0809C25.706 25.4559 25.1973 25.6666 24.6668 25.6666H15.3335C14.8031 25.6666 14.2944 25.4559 13.9193 25.0809C13.5442 24.7058 13.3335 24.1971 13.3335 23.6666V21C13.3335 20.6318 13.632 20.3333 14.0002 20.3333Z",fill:"#2174F5"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M19.5286 12.5286C19.7889 12.2682 20.2111 12.2682 20.4714 12.5286L23.8047 15.8619C24.0651 16.1223 24.0651 16.5444 23.8047 16.8047C23.5444 17.0651 23.1223 17.0651 22.8619 16.8047L20 13.9428L17.1381 16.8047C16.8777 17.0651 16.4556 17.0651 16.1953 16.8047C15.9349 16.5444 15.9349 16.1223 16.1953 15.8619L19.5286 12.5286Z",fill:"#2174F5"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M20.0002 12.3333C20.3684 12.3333 20.6668 12.6318 20.6668 13V21C20.6668 21.3682 20.3684 21.6666 20.0002 21.6666C19.632 21.6666 19.3335 21.3682 19.3335 21V13C19.3335 12.6318 19.632 12.3333 20.0002 12.3333Z",fill:"#2174F5"})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"text-[#64748B] text-[14px] leading-[22px]",children:[e.jsx("span",{className:"text-[#2174F5]",children:"Click to upload"})," or drag and drop files here"]}),e.jsxs("h4",{className:"text-[#64748B] uppercase text-[14px] leading-[22px] mt-[2px]",children:["mp4, webm, ogg, mpeg, avi ",e.jsx("br",{})]})]})]}),e.jsx("input",{type:"file",className:"",id:"upload-file",name:"uploadFile",onChange:t,multiple:!0,hidden:!0})]}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.mime&&e.jsx("p",{children:s.mime})}),e.jsxs("div",{className:"flex gap-[14px] justify-end",children:[e.jsx(M,{onClick:w,className:"inline-flex items-center justify-center rounded-md bg-[#FFF] border-[1px] border-[#E2E8F0] py-[8px] px-[25px] text-center font-[400] text-[#1C2434] text-[16px] hover:bg-opacity-90 leading-[23px]",children:"Cancel"}),e.jsx("button",{type:"button",onClick:f,className:"inline-flex items-center justify-center rounded-md bg-[#2174F5] py-[8px] px-[25px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[23px]",children:"Save"})]}),s.session&&e.jsx("span",{className:"bg-[red] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]",children:s.session&&e.jsx("p",{children:s.session})}),s.message&&e.jsx("span",{className:"bg-[red] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]",children:s.message&&e.jsx("p",{children:s.message})}),m&&e.jsx("span",{className:"bg-[green] text-center mt-[9px] max-w-[708px] w-full rounded-lg text-white py-[15px]",children:m&&e.jsx("p",{children:m})})]})]})]})}),e.jsx("div",{className:"flex flex-col gap-[25px] w-full md:max-w-[43%] max-w-[100%] md:pl-[15px] pl-[0] md:mt-[0] mt-[20px]",children:e.jsxs("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:[e.jsx("div",{className:"border-b border-stroke py-4 px-6.5 dark:border-strokedark",children:e.jsx("h3",{className:"font-medium text-black dark:text-white",children:"Documents & Images"})}),e.jsxs("div",{className:"flex flex-col gap-5.5 p-6.5",children:[e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"uploadDocfile",className:"block border-2 rounded-sm border-dashed border-[#2174F5] bg-[#EFF4FB] text-center p-[24px] cursor-pointer",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",className:"m-auto mb-[9px]",children:[e.jsx("circle",{cx:"20",cy:"20",r:"19.5",fill:"white",stroke:"#E2E8F0"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.0002 20.3333C14.3684 20.3333 14.6668 20.6318 14.6668 21V23.6666C14.6668 23.8435 14.7371 24.013 14.8621 24.1381C14.9871 24.2631 15.1567 24.3333 15.3335 24.3333H24.6668C24.8436 24.3333 25.0132 24.2631 25.1382 24.1381C25.2633 24.013 25.3335 23.8435 25.3335 23.6666V21C25.3335 20.6318 25.632 20.3333 26.0002 20.3333C26.3684 20.3333 26.6668 20.6318 26.6668 21V23.6666C26.6668 24.1971 26.4561 24.7058 26.081 25.0809C25.706 25.4559 25.1973 25.6666 24.6668 25.6666H15.3335C14.8031 25.6666 14.2944 25.4559 13.9193 25.0809C13.5442 24.7058 13.3335 24.1971 13.3335 23.6666V21C13.3335 20.6318 13.632 20.3333 14.0002 20.3333Z",fill:"#2174F5"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M19.5286 12.5286C19.7889 12.2682 20.2111 12.2682 20.4714 12.5286L23.8047 15.8619C24.0651 16.1223 24.0651 16.5444 23.8047 16.8047C23.5444 17.0651 23.1223 17.0651 22.8619 16.8047L20 13.9428L17.1381 16.8047C16.8777 17.0651 16.4556 17.0651 16.1953 16.8047C15.9349 16.5444 15.9349 16.1223 16.1953 15.8619L19.5286 12.5286Z",fill:"#2174F5"}),e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M20.0002 12.3333C20.3684 12.3333 20.6668 12.6318 20.6668 13V21C20.6668 21.3682 20.3684 21.6666 20.0002 21.6666C19.632 21.6666 19.3335 21.3682 19.3335 21V13C19.3335 12.6318 19.632 12.3333 20.0002 12.3333Z",fill:"#2174F5"})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"text-[#64748B] text-[14px] leading-[22px]",children:[e.jsx("span",{className:"text-[#2174F5]",children:"Click to upload"})," or drag and drop files here"]}),e.jsxs("h4",{className:"text-[#64748B] text-[14px] leading-[22px] mt-[2px]",children:["PNG, JPG, DOC or PDF",e.jsx("br",{})]})]})]}),e.jsx("input",{type:"file",className:"",id:"uploadDocfile",name:"uploadDocfile",onChange:t,hidden:!0,multiple:!0})]}),e.jsx("div",{className:"border-b border-stroke pb-[19px]",children:e.jsx("p",{className:"text-[#1C2434] text-[16px] font-[400] leading-[22px]",children:"Documents related to business and any proof you own the business."})})]}),e.jsx("span",{className:"text-[red] text-[16px]",children:s.docFileError&&e.jsx("p",{children:s.docFileError})})]})})]})},H=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]",children:[e.jsx(D,{pageName:"New Listing"}),e.jsx(V,{})]})});export{H as default};
