var x=Object.defineProperty;var r=(a,o)=>x(a,"name",{value:o,configurable:!0});import{r as L,R as l,j as v}from"./jsx-runtime.9ea27afa.js";const y=L.exports.createContext(void 0),p=y,C={locale:"en",global:{placeholder:"placeholder"},Text:{edit:"edit",copy:"copy",copied:"copied",expand:"expand"},Modal:{okText:"OK",cancelText:"Cancel",justOkText:"OK"}},i=C,d=r(a=>{const{componentName:o="global",defaultLocale:n,children:u}=a,e=l.useContext(p),m=l.useMemo(()=>{var s;const c=n||i[o],f=(s=e==null?void 0:e[o])!=null?s:{};return{...c instanceof Function?c():c,...f||{}}},[o,n,e]),_=l.useMemo(()=>{const c=e&&e.locale;return e&&e.exist&&!c?i.locale:c},[e]);return u(m,_,e)},"LocaleReceiver");class t extends l.Component{constructor(o){super(o)}render(){const{locale:o,children:n}=this.props;return v(p.Provider,{value:o,children:n})}}r(t,"LocaleProvider");try{d.displayName="LocaleReceiver",d.__docgenInfo={description:"",displayName:"LocaleReceiver",props:{componentName:{defaultValue:null,description:"",name:"componentName",required:!1,type:{name:"enum",value:[{value:'"global"'},{value:'"Text"'},{value:'"Modal"'},{value:'"Form"'}]}},defaultLocale:{defaultValue:null,description:"",name:"defaultLocale",required:!1,type:{name:"Record<string, any> | { edit?: any; copy?: any; copied?: any; expand?: any; } | ModalLocale | { optional?: string; defaultValidateMessages?: string; } | (() => Locale[C]) | undefined"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/locale-provider/index.tsx#LocaleReceiver"]={docgenInfo:d.__docgenInfo,name:"LocaleReceiver",path:"src/components/locale-provider/index.tsx#LocaleReceiver"})}catch{}try{t.displayName="LocaleProvider",t.__docgenInfo={description:"",displayName:"LocaleProvider",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"Locale"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/locale-provider/index.tsx#LocaleProvider"]={docgenInfo:t.__docgenInfo,name:"LocaleProvider",path:"src/components/locale-provider/index.tsx#LocaleProvider"})}catch{}export{d as L,t as a,i as e};
//# sourceMappingURL=index.76947070.js.map
