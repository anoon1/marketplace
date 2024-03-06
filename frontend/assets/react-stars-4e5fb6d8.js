import{r as ue,p as de}from"./index-b349b8ac.js";var ie={},se={};Object.defineProperty(se,"__esModule",{value:!0});var _=function(){function e(r,s){var n=[],i=!0,y=!1,c=void 0;try{for(var o=r[Symbol.iterator](),d;!(i=(d=o.next()).done)&&(n.push(d.value),!(s&&n.length===s));i=!0);}catch(m){y=!0,c=m}finally{try{!i&&o.return&&o.return()}finally{if(y)throw c}}return n}return function(r,s){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,s);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();se.default=ve;var h=ue;function ve(e){var r=(0,h.useState)(e.count),s=_(r,2),n=s[0],i=s[1],y=(0,h.useState)(e.size),c=_(y,2),o=c[0],d=c[1],m=(0,h.useState)(e.char),H=_(m,2),A=H[0],C=H[1],T=(0,h.useState)(e.color),b=_(T,2),x=b[0],z=b[1],U=(0,h.useState)(e.activeColor),g=_(U,2),u=g[0],M=g[1],E=(0,h.useState)(e.isHalf),w=_(E,2),q=w[0],O=w[1],K=(0,h.useState)(e.edit),D=_(K,2),B=D[0],k=D[1],X=(0,h.useState)(e.emptyIcon),L=_(X,2),G=L[0],J=L[1],Q=(0,h.useState)(e.halfIcon),P=_(Q,2),W=P[0],Y=P[1],Z=(0,h.useState)(e.filledIcon),V=_(Z,2),N=V[0],ee=V[1],te=(0,h.useState)(e.a11y),R=_(te,2),ae=R[0],j=R[1],re={count:n,size:o,char:A,color:x,activeColor:u,isHalf:q,edit:B,emptyIcon:G,halfIcon:W,filledIcon:N,a11y:ae};function ne(f){i(f.count),d(f.size),C(f.char),z(f.color),M(f.activeColor),O(f.isHalf),k(f.edit),J(f.emptyIcon),Y(f.halfIcon),ee(f.filledIcon),j(f.a11y)}return[re,ne]}var le={};Object.defineProperty(le,"__esModule",{value:!0});var Se=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e};le.default=Ie;var ye=ue,_e=he(ye);function he(e){return e&&e.__esModule?e:{default:e}}var me={position:"relative",overflow:"hidden",cursor:"pointer",display:"block",float:"left"};function Ie(e){var r=e.index,s=e.active,n=e.config,i=e.onMouseOver,y=e.onMouseLeave,c=e.onClick,o=e.halfStarHidden,d=e.halfStarAt,m=e.isUsingIcons,H=e.uniqueness,A=n.color,C=n.activeColor,T=n.size,b=n.char,x=n.isHalf,z=n.edit,U=n.halfIcon,g=n.emptyIcon,u=n.filledIcon,M="",E=!1;x&&!o&&d===r&&(m?M="react-stars-half":M="react-stars-"+H,E=!0);var w=Se({},me,{color:s?C:A,cursor:z?"pointer":"default",fontSize:T+"px"});function q(){return m?s?u:!s&&E?U:g:b}return _e.default.createElement("span",{className:M,style:w,key:r,"data-index":r,"data-forhalf":u?r:b,onMouseOver:i,onMouseMove:i,onMouseLeave:y,onClick:c},q())}Object.defineProperty(ie,"__esModule",{value:!0});var p=function(){function e(r,s){var n=[],i=!0,y=!1,c=void 0;try{for(var o=r[Symbol.iterator](),d;!(i=(d=o.next()).done)&&(n.push(d.value),!(s&&n.length===s));i=!0);}catch(m){y=!0,c=m}finally{try{!i&&o.return&&o.return()}finally{if(y)throw c}}return n}return function(r,s){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,s);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),I=ue,$=F(I),Ce=de,S=F(Ce),be=se,pe=F(be),He=le,ge=F(He);function F(e){return e&&e.__esModule?e:{default:e}}var Me={overflow:"hidden",position:"relative"};function we(e,r){return`
    .react-stars-`+r+`:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0; left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: `+e+`;
  }`}function Ae(e){return`
          span.react-stars-half > * {
          color: `+e+`;
      }`}function oe(e){var r=(0,I.useState)(""),s=p(r,2),n=s[0],i=s[1],y=(0,I.useState)(0),c=p(y,2),o=c[0],d=c[1],m=(0,I.useState)([]),H=p(m,2),A=H[0],C=H[1],T=(0,I.useState)(!1),b=p(T,2),x=b[0],z=b[1],U=(0,pe.default)(e),g=p(U,2),u=g[0],M=g[1],E=(0,I.useState)(0),w=p(E,2),q=w[0],O=w[1],K=(0,I.useState)(!1),D=p(K,2),B=D[0],k=D[1],X=(0,I.useState)(""),L=p(X,2),G=L[0],J=L[1];function Q(t){return!t.isHalf&&t.emptyIcon&&t.filledIcon||t.isHalf&&t.emptyIcon&&t.halfIcon&&t.filledIcon}function P(){i((Math.random()+"").replace(".",""))}(0,I.useEffect)(function(){Y(),W(e.value,e.count),C(N(e.value)),M(e),P(),z(Q(e)),O(Math.floor(e.value)),k(e.isHalf&&e.value%1<.5)},[]);function W(t,a){t<0||t>a?d(0):d(t)}function Y(){var t="react-stars";J(e.classNames+(" "+t))}function Z(t){return t%1===0}function V(){return u.isHalf?Math.floor(o):Math.round(o)}function N(t){typeof t>"u"&&(t=V());for(var a=[],l=0;l<u.count;l++)a.push({active:l<=t-1});return a}function ee(t){if(u.edit){var a=Number(t.currentTarget.getAttribute("data-index"));if(u.isHalf){var l=R(t);k(l),l&&(a+=1),O(a)}else a+=1;te(a)}}function te(t){var a=A.filter(function(l){return l.active});t!==a.length&&C(N(t))}function R(t){var a=t.target,l=a.getBoundingClientRect(),v=t.clientX-l.left;return v=Math.round(Math.abs(v)),v>l.width/2}function ae(){u.edit&&(j(o),C(N()))}function j(t){u.isHalf&&(k(Z(t)),O(Math.floor(t)))}function re(t){if(u.edit){var a=Number(t.currentTarget.getAttribute("data-index")),l=void 0;if(u.isHalf){var v=R(t);k(v),v&&(a+=1),l=v?a:a+.5,O(a)}else l=a=a+1;f(l)}}function ne(){return $.default.createElement("style",{dangerouslySetInnerHTML:{__html:x?Ae(u.activeColor):we(u.activeColor,n)}})}function f(t){t!==o&&(C(N(t)),d(t),e.onChange(t))}function fe(t){if(!(!u.a11y&&!u.edit)){var a=t.key,l=o,v=Number(a);v?Number.isInteger(v)&&v>0&&v<=u.count&&(l=v):(a==="ArrowUp"||a==="ArrowRight")&&l<u.count?(t.preventDefault(),l+=u.isHalf?.5:1):(a==="ArrowDown"||a==="ArrowLeft")&&l>.5&&(t.preventDefault(),l-=u.isHalf?.5:1),j(l),f(l)}}function ce(){return A.map(function(t,a){return $.default.createElement(ge.default,{key:a,index:a,active:t.active,config:u,onMouseOver:ee,onMouseLeave:ae,onClick:re,halfStarHidden:B,halfStarAt:q,isUsingIcons:x,uniqueness:n})})}return $.default.createElement("div",{className:"react-stars-wrapper-"+n,style:{display:"flex"}},$.default.createElement("div",{tabIndex:u.a11y&&u.edit?0:null,"aria-label":"add rating by typing an integer from 0 to 5 or pressing arrow keys",onKeyDown:fe,className:G,style:Me},u.isHalf&&ne(),ce(),$.default.createElement("p",{style:{position:"absolute",left:"-200rem"},role:"status"},o)))}oe.propTypes={classNames:S.default.string,edit:S.default.bool,half:S.default.bool,value:S.default.number,count:S.default.number,char:S.default.string,size:S.default.number,color:S.default.string,activeColor:S.default.string,emptyIcon:S.default.element,halfIcon:S.default.element,filledIcon:S.default.element,a11y:S.default.bool};oe.defaultProps={edit:!0,half:!1,value:0,count:5,char:"★",size:15,color:"gray",activeColor:"#ffd700",a11y:!0,onChange:function(){}};var Ee=ie.default=oe;export{Ee as _};