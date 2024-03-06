import{u as o,r as a,j as e,d as f}from"./index-b349b8ac.js";import{B as g}from"./Breadcrumb-9b91b131.js";const i=f.baseApiUrl,h=()=>{let p=o();const[t,l]=a.useState([]),[j,d]=a.useState(null),[w,c]=a.useState(!0),r=localStorage.getItem("usertoken");a.useEffect(()=>{(async()=>{try{const x=await fetch(`${i}getAllListingData`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:r})});if(!x.ok)throw new Error("Network response was not ok");const m=await x.json();l(m.data)}catch(x){d(x)}finally{c(!1)}})()},[r]);const s=n=>{p(`/OnboardingAdmin/AdminSellerListing?status=${n}`)};return e.jsxs("div",{className:"pt-[30px] filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] items-center justify-between mb-[40px] md:gap-y-[0] gap-y-[25px]",children:[e.jsx("h2",{className:"font-[600] text-[#1D2D5C] dark:text-white leading-[28px] text-[20px]",children:"Seller Details"}),e.jsxs("div",{className:"filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] flex flex-wrap items-center justify-between mb-[40px] md:gap-y-[0] gap-y-[25px]",children:[e.jsxs("div",{onClick:()=>{s(4)},className:"flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer",children:[e.jsx("div",{className:"max-w-[84px]",children:e.jsx("img",{src:"/assets/Group1000004352.svg"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]",children:t.totalListings}),e.jsx("span",{className:"text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]",children:"Total Listing"})]})]}),e.jsxs("div",{onClick:()=>{s(1)},className:"flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer",children:[e.jsx("div",{className:"max-w-[84px]",children:e.jsx("img",{src:"/assets/Group1000004353.svg"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]",children:t.approvedListings}),e.jsx("span",{className:"text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]",children:"Approved "})]})]}),e.jsxs("div",{onClick:()=>{s(2)},className:"flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer",children:[e.jsx("div",{className:"max-w-[84px]",children:e.jsx("img",{src:"/assets/Group1000004354.svg"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]",children:t.pendingListings}),e.jsx("span",{className:"text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]",children:"Pending "})]})]}),e.jsxs("div",{onClick:()=>{s(3)},className:"flex flex-wrap md:flex-row md:flex-nowrap flex-col items-center md:justify-start justify-center md:text-left text-center gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] hover:opacity-70 cursor-pointer",children:[e.jsx("div",{className:"max-w-[84px]",children:e.jsx("img",{src:"/assets/Group1000004355.svg"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]",children:t.rejectedListings}),e.jsx("span",{className:"text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]",children:"Rejected "})]})]})]}),e.jsx("h2",{className:"font-[600] text-[#1D2D5C] dark:text-white leading-[28px] text-[20px]",children:"Deals Details"}),e.jsxs("div",{className:"filter-[drop-shadow(0px 10px 60px rgba(226, 236, 249, 0.50))] bg-white center md:py-[32px] py-[25px] md:px-[34px] px-[15px] flex  items-center justify-content flex-start mb-[40px] gap-x-[89px] md:gap-y-[0] gap-y-[25px]",children:[e.jsxs("div",{className:"flex text-left md:flex-row flex-col items-center md:justify-start justify-center md:text-left gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] sm: text-center ",children:[e.jsx("div",{className:"max-w-[84px]",children:e.jsx("img",{src:"/assets/deals.png"})}),e.jsxs("div",{children:[e.jsxs("h2",{className:"text-[#333]  md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]",children:[" ",t.approvedDeals]}),e.jsx("span",{className:"text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]",children:"Sucessfull Deals"})]})]}),e.jsxs("div",{className:"flex text-center  md:flex-row flex-col items-center md:justify-start justify-center md:text-left  gap-[20px] w-[100%] md:max-w-[20%] max-w-[50%] border-r border-[#F0F0F0] sm: text-center",children:[e.jsx("div",{className:"max-w-[84px]",children:e.jsx("img",{src:"/assets/Group1000004354.svg"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-[#333] md:text-[36px] text-[28px] font-[600] tracking-[-0.36px] leading-[100%] mb-[2px]",children:t.pendingDeals}),e.jsx("span",{className:"text-[#535D7A] text-[14px] font-[400] tracking-[-0.14px]",children:"Pending Deals"})]})]})]})]})},v=()=>e.jsxs(e.Fragment,{children:[e.jsx(g,{pageName:"Dashboard"}),e.jsx(h,{})]});export{v as default};
