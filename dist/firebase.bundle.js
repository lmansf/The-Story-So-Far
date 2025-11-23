(()=>{var De=()=>{};var Oe=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},vt=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=e[n++],o=e[n++],a=e[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let s=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return t.join("")},xe={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let s=e[i],o=i+1<e.length,a=o?e[i+1]:0,c=i+2<e.length,l=c?e[i+2]:0,d=s>>2,g=(s&3)<<4|a>>4,h=(a&15)<<2|l>>6,B=l&63;c||(B=64,o||(h=64)),r.push(n[d],n[g],n[h],n[B])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Oe(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):vt(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let s=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;let l=i<e.length?n[e.charAt(i)]:64;++i;let g=i<e.length?n[e.charAt(i)]:64;if(++i,s==null||a==null||l==null||g==null)throw new q;let h=s<<2|a>>4;if(r.push(h),l!==64){let B=a<<4&240|l>>2;if(r.push(B),g!==64){let Ct=l<<6&192|g;r.push(Ct)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},q=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},At=function(e){let t=Oe(e);return xe.encodeByteArray(t,!0)},G=function(e){return At(e).replace(/\./g,"")},ke=function(e){try{return xe.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function St(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Dt=()=>St().__FIREBASE_DEFAULTS__,Tt=()=>{if(typeof process>"u"||typeof process.env>"u")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Ot=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&ke(e[1]);return t&&JSON.parse(t)},xt=()=>{try{return De()||Dt()||Tt()||Ot()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}};var K=()=>xt()?.config;var P=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}};function Re(){let e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function M(){try{return typeof indexedDB=="object"}catch{return!1}}function N(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}function Be(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var kt="FirebaseError",b=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=kt,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,I.prototype.create)}},I=class{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){let r=n[0]||{},i=`${this.service}/${t}`,s=this.errors[t],o=s?Rt(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new b(i,a,r)}};function Rt(e,t){return e.replace(Bt,(n,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var Bt=/\{\$([^}]+)}/g;function T(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let s=e[i],o=t[i];if(Te(s)&&Te(o)){if(!T(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function Te(e){return e!==null&&typeof e=="object"}var Pt=1e3,Mt=2,Nt=14400*1e3,Lt=.5;function J(e,t=Pt,n=Mt){let r=t*Math.pow(n,e),i=Math.round(Lt*r*(Math.random()-.5)*2);return Math.min(Nt,r+i)}function L(e){return e&&e._delegate?e._delegate:e}var p=class{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var v="[DEFAULT]";var Y=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let r=new P;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){let n=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Ft(t))try{this.getOrInitializeService({instanceIdentifier:v})}catch{}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(t=v){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=v){return this.instances.has(t)}getOptions(t=v){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(t,n){let r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:$t(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=v){return this.component?this.component.multipleInstances?t:v:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function $t(e){return e===v?void 0:e}function Ft(e){return e.instantiationMode==="EAGER"}var $=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new Y(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var Ht=[],f;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(f||(f={}));var zt={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},Ut=f.INFO,jt={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},Vt=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=jt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},O=class{constructor(t){this.name=t,this._logLevel=Ut,this._logHandler=Vt,this._userLogHandler=null,Ht.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in f))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?zt[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...t),this._logHandler(this,f.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...t),this._logHandler(this,f.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,f.INFO,...t),this._logHandler(this,f.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,f.WARN,...t),this._logHandler(this,f.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...t),this._logHandler(this,f.ERROR,...t)}};var Wt=(e,t)=>t.some(n=>e instanceof n),Pe,Me;function qt(){return Pe||(Pe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gt(){return Me||(Me=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ne=new WeakMap,X=new WeakMap,Le=new WeakMap,Z=new WeakMap,ee=new WeakMap;function Kt(e){let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{n(w(e.result)),i()},o=()=>{r(e.error),i()};e.addEventListener("success",s),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Ne.set(n,e)}).catch(()=>{}),ee.set(t,e),t}function Jt(e){if(X.has(e))return;let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)});X.set(e,t)}var Q={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return X.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Le.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return w(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function $e(e){Q=e(Q)}function Yt(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let r=e.call(F(this),t,...n);return Le.set(r,t.sort?t.sort():[t]),w(r)}:Gt().includes(e)?function(...t){return e.apply(F(this),t),w(Ne.get(this))}:function(...t){return w(e.apply(F(this),t))}}function Zt(e){return typeof e=="function"?Yt(e):(e instanceof IDBTransaction&&Jt(e),Wt(e,qt())?new Proxy(e,Q):e)}function w(e){if(e instanceof IDBRequest)return Kt(e);if(Z.has(e))return Z.get(e);let t=Zt(e);return t!==e&&(Z.set(e,t),ee.set(t,e)),t}var F=e=>ee.get(e);function H(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(e,t),a=w(o);return r&&o.addEventListener("upgradeneeded",c=>{r(w(o.result),c.oldVersion,c.newVersion,w(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Xt=["get","getKey","getAll","getAllKeys","count"],Qt=["put","add","delete","clear"],te=new Map;function Fe(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(te.get(t))return te.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=Qt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Xt.includes(n)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return te.set(t,s),s}$e(e=>({...e,get:(t,n,r)=>Fe(t,n)||e.get(t,n,r),has:(t,n)=>!!Fe(t,n)||e.has(t,n)}));var re=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(en(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function en(e){return e.getComponent()?.type==="VERSION"}var ie="@firebase/app",He="0.14.6";var _=new O("@firebase/app"),tn="@firebase/app-compat",nn="@firebase/analytics-compat",rn="@firebase/analytics",sn="@firebase/app-check-compat",on="@firebase/app-check",an="@firebase/auth",cn="@firebase/auth-compat",ln="@firebase/database",fn="@firebase/data-connect",un="@firebase/database-compat",dn="@firebase/functions",hn="@firebase/functions-compat",pn="@firebase/installations",mn="@firebase/installations-compat",gn="@firebase/messaging",bn="@firebase/messaging-compat",yn="@firebase/performance",wn="@firebase/performance-compat",In="@firebase/remote-config",_n="@firebase/remote-config-compat",En="@firebase/storage",Cn="@firebase/storage-compat",vn="@firebase/firestore",An="@firebase/ai",Sn="@firebase/firestore-compat",Dn="firebase";var se="[DEFAULT]",Tn={[ie]:"fire-core",[tn]:"fire-core-compat",[rn]:"fire-analytics",[nn]:"fire-analytics-compat",[on]:"fire-app-check",[sn]:"fire-app-check-compat",[an]:"fire-auth",[cn]:"fire-auth-compat",[ln]:"fire-rtdb",[fn]:"fire-data-connect",[un]:"fire-rtdb-compat",[dn]:"fire-fn",[hn]:"fire-fn-compat",[pn]:"fire-iid",[mn]:"fire-iid-compat",[gn]:"fire-fcm",[bn]:"fire-fcm-compat",[yn]:"fire-perf",[wn]:"fire-perf-compat",[In]:"fire-rc",[_n]:"fire-rc-compat",[En]:"fire-gcs",[Cn]:"fire-gcs-compat",[vn]:"fire-fst",[Sn]:"fire-fst-compat",[An]:"fire-vertex","fire-js":"fire-js",[Dn]:"fire-js-all"};var z=new Map,On=new Map,oe=new Map;function ze(e,t){try{e.container.addComponent(t)}catch(n){_.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function E(e){let t=e.name;if(oe.has(t))return _.debug(`There were multiple attempts to register component ${t}.`),!1;oe.set(t,e);for(let n of z.values())ze(n,e);for(let n of On.values())ze(n,e);return!0}function x(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var xn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},C=new I("app","Firebase",xn);var ae=class{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new p("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw C.create("app-deleted",{appName:this._name})}};function fe(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let r={name:se,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw C.create("bad-app-name",{appName:String(i)});if(n||(n=K()),!n)throw C.create("no-options");let s=z.get(i);if(s){if(T(n,s.options)&&T(r,s.config))return s;throw C.create("duplicate-app",{appName:i})}let o=new $(i);for(let c of oe.values())o.addComponent(c);let a=new ae(n,r,o);return z.set(i,a),a}function ue(e=se){let t=z.get(e);if(!t&&e===se&&K())return fe();if(!t)throw C.create("no-app",{appName:e});return t}function y(e,t,n){let r=Tn[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){let o=[`Unable to register library "${r}" with version "${t}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),_.warn(o.join(" "));return}E(new p(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}var kn="firebase-heartbeat-database",Rn=1,R="firebase-heartbeat-store",ne=null;function We(){return ne||(ne=H(kn,Rn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(R)}catch(n){console.warn(n)}}}}).catch(e=>{throw C.create("idb-open",{originalErrorMessage:e.message})})),ne}async function Bn(e){try{let n=(await We()).transaction(R),r=await n.objectStore(R).get(qe(e));return await n.done,r}catch(t){if(t instanceof b)_.warn(t.message);else{let n=C.create("idb-get",{originalErrorMessage:t?.message});_.warn(n.message)}}}async function Ue(e,t){try{let r=(await We()).transaction(R,"readwrite");await r.objectStore(R).put(t,qe(e)),await r.done}catch(n){if(n instanceof b)_.warn(n.message);else{let r=C.create("idb-set",{originalErrorMessage:n?.message});_.warn(r.message)}}}function qe(e){return`${e.name}!${e.options.appId}`}var Pn=1024,Mn=30,ce=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new le(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=je();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>Mn){let i=Ln(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){_.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=je(),{heartbeatsToSend:n,unsentEntries:r}=Nn(this._heartbeatsCache.heartbeats),i=G(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return _.warn(t),""}}};function je(){return new Date().toISOString().substring(0,10)}function Nn(e,t=Pn){let n=[],r=e.slice();for(let i of e){let s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ve(n)>t){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ve(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var le=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return M()?N().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await Bn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){let r=await this.read();return Ue(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){let r=await this.read();return Ue(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}};function Ve(e){return G(JSON.stringify({version:2,heartbeats:e})).length}function Ln(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function $n(e){E(new p("platform-logger",t=>new re(t),"PRIVATE")),E(new p("heartbeat",t=>new ce(t),"PRIVATE")),y(ie,He,e),y(ie,He,"esm2020"),y("fire-js","")}$n("");var Fn="firebase",Hn="12.6.0";y(Fn,Hn,"app");var Je="@firebase/installations",me="0.6.19";var Ye=1e4,Ze=`w:${me}`,Xe="FIS_v2",zn="https://firebaseinstallations.googleapis.com/v1",Un=3600*1e3,jn="installations",Vn="Installations";var Wn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},S=new I(jn,Vn,Wn);function Qe(e){return e instanceof b&&e.code.includes("request-failed")}function et({projectId:e}){return`${zn}/projects/${e}/installations`}function tt(e){return{token:e.token,requestStatus:2,expiresIn:Gn(e.expiresIn),creationTime:Date.now()}}async function nt(e,t){let r=(await t.json()).error;return S.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function rt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function qn(e,{refreshToken:t}){let n=rt(e);return n.append("Authorization",Kn(t)),n}async function it(e){let t=await e();return t.status>=500&&t.status<600?e():t}function Gn(e){return Number(e.replace("s","000"))}function Kn(e){return`${Xe} ${e}`}async function Jn({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=et(e),i=rt(e),s=t.getImmediate({optional:!0});if(s){let l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}let o={fid:n,authVersion:Xe,appId:e.appId,sdkVersion:Ze},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await it(()=>fetch(r,a));if(c.ok){let l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:tt(l.authToken)}}else throw await nt("Create Installation",c)}function st(e){return new Promise(t=>{setTimeout(t,e)})}function Yn(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var Zn=/^[cdef][\w-]{21}$/,pe="";function Xn(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let n=Qn(e);return Zn.test(n)?n:pe}catch{return pe}}function Qn(e){return Yn(e).substr(0,22)}function j(e){return`${e.appName}!${e.appId}`}var ot=new Map;function at(e,t){let n=j(e);ct(n,t),er(n,t)}function ct(e,t){let n=ot.get(e);if(n)for(let r of n)r(t)}function er(e,t){let n=tr();n&&n.postMessage({key:e,fid:t}),nr()}var A=null;function tr(){return!A&&"BroadcastChannel"in self&&(A=new BroadcastChannel("[Firebase] FID Change"),A.onmessage=e=>{ct(e.data.key,e.data.fid)}),A}function nr(){ot.size===0&&A&&(A.close(),A=null)}var rr="firebase-installations-database",ir=1,D="firebase-installations-store",de=null;function ge(){return de||(de=H(rr,ir,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(D)}}})),de}async function U(e,t){let n=j(e),i=(await ge()).transaction(D,"readwrite"),s=i.objectStore(D),o=await s.get(n);return await s.put(t,n),await i.done,(!o||o.fid!==t.fid)&&at(e,t.fid),t}async function lt(e){let t=j(e),r=(await ge()).transaction(D,"readwrite");await r.objectStore(D).delete(t),await r.done}async function V(e,t){let n=j(e),i=(await ge()).transaction(D,"readwrite"),s=i.objectStore(D),o=await s.get(n),a=t(o);return a===void 0?await s.delete(n):await s.put(a,n),await i.done,a&&(!o||o.fid!==a.fid)&&at(e,a.fid),a}async function be(e){let t,n=await V(e.appConfig,r=>{let i=sr(r),s=or(e,i);return t=s.registrationPromise,s.installationEntry});return n.fid===pe?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function sr(e){let t=e||{fid:Xn(),registrationStatus:0};return ft(t)}function or(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(S.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=ar(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:cr(e)}:{installationEntry:t}}async function ar(e,t){try{let n=await Jn(e,t);return U(e.appConfig,n)}catch(n){throw Qe(n)&&n.customData.serverCode===409?await lt(e.appConfig):await U(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function cr(e){let t=await Ge(e.appConfig);for(;t.registrationStatus===1;)await st(100),t=await Ge(e.appConfig);if(t.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await be(e);return r||n}return t}function Ge(e){return V(e,t=>{if(!t)throw S.create("installation-not-found");return ft(t)})}function ft(e){return lr(e)?{fid:e.fid,registrationStatus:0}:e}function lr(e){return e.registrationStatus===1&&e.registrationTime+Ye<Date.now()}async function fr({appConfig:e,heartbeatServiceProvider:t},n){let r=ur(e,n),i=qn(e,n),s=t.getImmediate({optional:!0});if(s){let l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}let o={installation:{sdkVersion:Ze,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await it(()=>fetch(r,a));if(c.ok){let l=await c.json();return tt(l)}else throw await nt("Generate Auth Token",c)}function ur(e,{fid:t}){return`${et(e)}/${t}/authTokens:generate`}async function ye(e,t=!1){let n,r=await V(e.appConfig,s=>{if(!ut(s))throw S.create("not-registered");let o=s.authToken;if(!t&&pr(o))return s;if(o.requestStatus===1)return n=dr(e,t),s;{if(!navigator.onLine)throw S.create("app-offline");let a=gr(s);return n=hr(e,a),a}});return n?await n:r.authToken}async function dr(e,t){let n=await Ke(e.appConfig);for(;n.authToken.requestStatus===1;)await st(100),n=await Ke(e.appConfig);let r=n.authToken;return r.requestStatus===0?ye(e,t):r}function Ke(e){return V(e,t=>{if(!ut(t))throw S.create("not-registered");let n=t.authToken;return br(n)?{...t,authToken:{requestStatus:0}}:t})}async function hr(e,t){try{let n=await fr(e,t),r={...t,authToken:n};return await U(e.appConfig,r),n}catch(n){if(Qe(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await lt(e.appConfig);else{let r={...t,authToken:{requestStatus:0}};await U(e.appConfig,r)}throw n}}function ut(e){return e!==void 0&&e.registrationStatus===2}function pr(e){return e.requestStatus===2&&!mr(e)}function mr(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Un}function gr(e){let t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function br(e){return e.requestStatus===1&&e.requestTime+Ye<Date.now()}async function yr(e){let t=e,{installationEntry:n,registrationPromise:r}=await be(t);return r?r.catch(console.error):ye(t).catch(console.error),n.fid}async function wr(e,t=!1){let n=e;return await Ir(n),(await ye(n,t)).token}async function Ir(e){let{registrationPromise:t}=await be(e);t&&await t}function _r(e){if(!e||!e.options)throw he("App Configuration");if(!e.name)throw he("App Name");let t=["projectId","apiKey","appId"];for(let n of t)if(!e.options[n])throw he(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function he(e){return S.create("missing-app-config-values",{valueName:e})}var dt="installations",Er="installations-internal",Cr=e=>{let t=e.getProvider("app").getImmediate(),n=_r(t),r=x(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},vr=e=>{let t=e.getProvider("app").getImmediate(),n=x(t,dt).getImmediate();return{getId:()=>yr(n),getToken:i=>wr(n,i)}};function Ar(){E(new p(dt,Cr,"PUBLIC")),E(new p(Er,vr,"PRIVATE"))}Ar();y(Je,me);y(Je,me,"esm2020");var W="analytics",Sr="firebase_id",Dr="origin",Tr=60*1e3,Or="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ae="https://www.googletagmanager.com/gtag/js";var u=new O("@firebase/analytics");var xr={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},m=new I("analytics","Analytics",xr);function kr(e){if(!e.startsWith(Ae)){let t=m.create("invalid-gtag-resource",{gtagURL:e});return u.warn(t.message),""}return e}function wt(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Rr(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Br(e,t){let n=Rr("firebase-js-sdk-policy",{createScriptURL:kr}),r=document.createElement("script"),i=`${Ae}?l=${e}&id=${t}`;r.src=n?n?.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function Pr(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Mr(e,t,n,r,i,s){let o=r[i];try{if(o)await t[o];else{let c=(await wt(n)).find(l=>l.measurementId===i);c&&await t[c.appId]}}catch(a){u.error(a)}e("config",i,s)}async function Nr(e,t,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);let a=await wt(n);for(let c of o){let l=a.find(g=>g.measurementId===c),d=l&&t[l.appId];if(d)s.push(d);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(s){u.error(s)}}function Lr(e,t,n,r){async function i(s,...o){try{if(s==="event"){let[a,c]=o;await Nr(e,t,n,a,c)}else if(s==="config"){let[a,c]=o;await Mr(e,t,n,r,a,c)}else if(s==="consent"){let[a,c]=o;e("consent",a,c)}else if(s==="get"){let[a,c,l]=o;e("get",a,c,l)}else if(s==="set"){let[a]=o;e("set",a)}else e(s,...o)}catch(a){u.error(a)}}return i}function $r(e,t,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=Lr(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function Fr(e){let t=window.document.getElementsByTagName("script");for(let n of Object.values(t))if(n.src&&n.src.includes(Ae)&&n.src.includes(e))return n;return null}var Hr=30,zr=1e3,Ie=class{constructor(t={},n=zr){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}},It=new Ie;function Ur(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function jr(e){let{appId:t,apiKey:n}=e,r={method:"GET",headers:Ur(n)},i=Or.replace("{app-id}",t),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let o="";try{let a=await s.json();a.error?.message&&(o=a.error.message)}catch{}throw m.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()}async function Vr(e,t=It,n){let{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw m.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw m.create("no-api-key")}let o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new _e;return setTimeout(async()=>{a.abort()},n!==void 0?n:Tr),_t({appId:r,apiKey:i,measurementId:s},o,a,t)}async function _t(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=It){let{appId:s,measurementId:o}=e;try{await Wr(r,t)}catch(a){if(o)return u.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:s,measurementId:o};throw a}try{let a=await jr(e);return i.deleteThrottleMetadata(s),a}catch(a){let c=a;if(!qr(c)){if(i.deleteThrottleMetadata(s),o)return u.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:s,measurementId:o};throw a}let l=Number(c?.customData?.httpStatus)===503?J(n,i.intervalMillis,Hr):J(n,i.intervalMillis),d={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return i.setThrottleMetadata(s,d),u.debug(`Calling attemptFetch again in ${l} millis`),_t(e,d,r,i)}}function Wr(e,t){return new Promise((n,r)=>{let i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),r(m.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function qr(e){if(!(e instanceof b)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}var _e=class{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}};var Ee;async function Gr(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}else{let s=await t,o={...r,send_to:s};e("event",n,o)}}async function Kr(e,t,n,r){if(r&&r.global){let i={};for(let s of Object.keys(n))i[`user_properties.${s}`]=n[s];return e("set",i),Promise.resolve()}else{let i=await t;e("config",i,{update:!0,user_properties:n})}}var Ce;function Jr(e){Ce=e}function Yr(e){Ee=e}async function Zr(){if(M())try{await N()}catch(e){return u.warn(m.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}else return u.warn(m.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Xr(e,t,n,r,i,s,o){let a=Vr(e);a.then(h=>{n[h.measurementId]=h.appId,e.options.measurementId&&h.measurementId!==e.options.measurementId&&u.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${h.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(h=>u.error(h)),t.push(a);let c=Zr().then(h=>{if(h)return r.getId()}),[l,d]=await Promise.all([a,c]);Fr(s)||Br(s,l.measurementId),Ce&&(i("consent","default",Ce),Jr(void 0)),i("js",new Date);let g=o?.config??{};return g[Dr]="firebase",g.update=!0,d!=null&&(g[Sr]=d),i("config",l.measurementId,g),Ee&&(i("set",Ee),Yr(void 0)),l.measurementId}var ve=class{constructor(t){this.app=t}_delete(){return delete k[this.app.options.appId],Promise.resolve()}},k={},ht=[],pt={},we="dataLayer",Qr="gtag",mt,Se,gt=!1;function ei(){let e=[];if(Re()&&e.push("This is a browser extension environment."),Be()||e.push("Cookies are not available."),e.length>0){let t=e.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=m.create("invalid-analytics-context",{errorInfo:t});u.warn(n.message)}}function ti(e,t,n){ei();let r=e.options.appId;if(!r)throw m.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)u.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw m.create("no-api-key");if(k[r]!=null)throw m.create("already-exists",{id:r});if(!gt){Pr(we);let{wrappedGtag:s,gtagCore:o}=$r(k,ht,pt,we,Qr);Se=s,mt=o,gt=!0}return k[r]=Xr(e,ht,pt,t,mt,we,n),new ve(e)}function Et(e=ue()){e=L(e);let t=x(e,W);return t.isInitialized()?t.getImmediate():ni(e)}function ni(e,t={}){let n=x(e,W);if(n.isInitialized()){let i=n.getImmediate();if(T(t,n.getOptions()))return i;throw m.create("already-initialized")}return n.initialize({options:t})}function ri(e,t,n){e=L(e),Kr(Se,k[e.app.options.appId],t,n).catch(r=>u.error(r))}function ii(e,t,n,r){e=L(e),Gr(Se,k[e.app.options.appId],t,n,r).catch(i=>u.error(i))}var bt="@firebase/analytics",yt="0.10.19";function si(){E(new p(W,(t,{options:n})=>{let r=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return ti(r,i,n)},"PUBLIC")),E(new p("analytics-internal",e,"PRIVATE")),y(bt,yt),y(bt,yt,"esm2020");function e(t){try{let n=t.getProvider(W).getImmediate();return{logEvent:(r,i,s)=>ii(n,r,i,s),setUserProperties:(r,i)=>ri(n,r,i)}}catch(n){throw m.create("interop-component-reg-failed",{reason:n})}}}si();var oi={apiKey:"AIzaSyDIbQBmou63triRfAmCG0iTPFXcbho0r4U",authDomain:"the-story-so-far-c474f.firebaseapp.com",projectId:"the-story-so-far-c474f",storageBucket:"the-story-so-far-c474f.firebasestorage.app",messagingSenderId:"518541790890",appId:"1:518541790890:web:7d8f1ee180e50616070ad3",measurementId:"G-X4V7G3J3JV"},ai=fe(oi),ci=null;try{ci=Et(ai)}catch(e){console.warn("Firebase analytics not initialized:",e?.message||e)}})();
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
