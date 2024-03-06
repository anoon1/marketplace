import{r as n,j as e,d as j}from"./index-b349b8ac.js";const f=j.baseApiUrl,y=({onClose:r,data:i})=>{const[c,d]=n.useState({}),[a,x]=n.useState({reason:"",id:i}),p=localStorage.getItem("usertoken"),[o,u]=n.useState(null),h=t=>{const{name:s,value:g}=t.target;x(b=>({...b,[s]:g}))},l=async t=>{if(t.preventDefault(),m())try{(await fetch(`${f}updateDocgStatus`,{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({...a,token:p,status:"3"})})).ok&&u("Dcouments rejected sucessfully")}catch(s){console.log("error while sending report ",s)}},m=()=>{const t={};return a.reason||(t.reason="• Reason is required"),d(t),Object.keys(t).length===0};return e.jsx("div",{className:"fixed z-[1] inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto",children:e.jsx("div",{className:"max-w-[80%] max-h-[80%] bg-opacity-50 p-8 rounded-md",children:e.jsxs("form",{onSubmit:l,className:"relative flex flex-col gap-4 p-10 rounded-md bg-white ",id:"createListing",children:[e.jsx("div",{className:"absolute top-7 right-7 text-right",children:e.jsx("button",{onClick:r,className:"relative top-0 right-0 cursor-pointer text-gray-500 hover:text-black",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"h-6 w-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})}),e.jsx("div",{className:"rounded-sm bg-white dark:border-strokedark dark:bg-boxdark",children:e.jsx("div",{className:"flex flex-col gap-5.5 p-6.5",children:e.jsx("div",{className:"flex",children:e.jsxs("div",{className:"w-full max-w-[100%]",children:[e.jsx("label",{className:"mb-3 block text-black dark:text-white",children:"Rejection Reason"}),e.jsx("textarea",{name:"reason",value:a.reason,onChange:h,placeholder:"Enter the title",className:"w-full w-[auto] resize-none p-4 border-2 border p2 border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:border-primary transition duration-300 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"})]})})})}),e.jsx("button",{type:"submit",onClick:l,className:"bg-[#2174F5] py-2 px-5 text-white rounded-md hover:bg-opacity-90",children:"Submit"}),e.jsx("span",{className:"text-[red] text-[16px]",children:c.reason&&e.jsx("p",{children:c.reason})}),o&&e.jsx("span",{className:"bg-[green] text-center mt-[9px] max-w-[1000px] w-full rounded-lg text-white py-[15px]",children:o&&e.jsx("p",{children:o})})]})})})},k=({onClose:r})=>e.jsx("div",{className:"fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:e.jsxs("div",{className:"text-[#FFF] w-full max-w-[536px] bg-[#fff] px-[55px] py-[38px] relative",children:[e.jsx("button",{className:"absolute top-4 color-[#94a3b8] right-4 cursor-pointer text-[#94a3b8] hover:text-gray-700",onClick:r,children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),e.jsx("div",{className:"text-center mb-[24px]",children:e.jsx("img",{src:"/assets/accepted-img.svg",alt:"",className:"m-auto"})}),e.jsxs("h2",{className:"text-center text-[#1C2434] text-[26px] font-[600] leading-[normal]",children:["Document has been ",e.jsx("br",{})," successfully Accepted"]})]})});export{y as R,k as S};
