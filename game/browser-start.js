(() => {
 'use strict';
 const inApp=/KAKAOTALK/i.test(navigator.userAgent);
 const retryKey='trifront-isolation-retry:'+location.pathname;
 window.nativeActorInApp=inApp;
 window.__nativeIsolation={inApp,stage:inApp?'external-browser':'initial',started:performance.now()};
 const gameURL=()=>{const u=new URL(location.href);if(u.pathname.endsWith('/start/'))u.pathname=u.pathname.slice(0,-6)+'game/';u.searchParams.delete('_tf_iso_retry');return u;};
 function external(reason){
  window.__nativeIsolation.stage='external-browser';window.__nativeIsolation.reason=reason;
  const root=document.createElement('main');root.id='external-browser';
  root.style.cssText='max-width:480px;margin:12vh auto;padding:24px;color:#ece5ce;font:17px/1.6 system-ui;background:#18251f;border:1px solid #746044;border-radius:12px;box-sizing:border-box';
  const title=document.createElement('h1');title.textContent='TRI-FRONT';title.style.cssText='font:32px Georgia,serif;color:#e2c27a;margin:0 0 16px';root.append(title);
  const text=document.createElement('p');text.textContent=reason;root.append(text);
  const url=gameURL().href;
  if(/Android/i.test(navigator.userAgent)){
   const open=document.createElement('a');open.id='open-chrome';open.textContent='Chrome에서 게임 열기';
   const target=new URL(url);open.href='intent://'+target.host+target.pathname+target.search+'#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(url)+';end';
   open.style.cssText='display:block;padding:12px;text-align:center;background:#3c583f;color:#fff;border:1px solid #8b9e75;border-radius:8px;text-decoration:none';root.append(open);
  }
  const guide=document.createElement('p');guide.textContent='버튼으로 열리지 않으면 카카오톡 메뉴에서 “다른 브라우저로 열기”를 선택하거나 아래 링크를 복사해 Chrome 또는 Safari에서 열어주세요.';root.append(guide);
  const input=document.createElement('input');input.id='external-url';input.value=url;input.readOnly=true;input.setAttribute('aria-label','게임 실행 링크');input.style.cssText='box-sizing:border-box;width:100%;padding:12px;font:14px system-ui;color:#eee;background:#111;border:1px solid #746044';root.append(input);
  const copy=document.createElement('button');copy.id='copy-game-link';copy.textContent='링크 복사';copy.style.cssText='padding:12px;margin-top:12px;font:16px system-ui';
  copy.onclick=async()=>{try{await navigator.clipboard.writeText(url);copy.textContent='복사했습니다';}catch{input.focus();input.select();copy.textContent='링크를 길게 눌러 복사해주세요';}};root.append(copy);
  if(!inApp){const retry=document.createElement('button');retry.id='retry-isolation';retry.textContent='다시 시도';retry.style.cssText=copy.style.cssText;retry.onclick=()=>{try{sessionStorage.removeItem(retryKey);}catch{}const u=new URL(location.href);u.searchParams.delete('_tf_iso_retry');location.replace(u.href);};root.append(retry);}
  document.documentElement.style.overflow='auto';document.documentElement.style.touchAction='auto';document.body.replaceChildren(root);document.body.style.cssText='display:block;min-height:100vh;padding:12px;margin:0;background:#101714;overflow:auto;touch-action:auto';
 }
 window.nativeActorExternalPage=()=>external('카카오톡 안에서는 기다리지 말고 외부 브라우저에서 게임을 열어주세요.');
 window.nativeActorPrepareIsolation=async(script,status)=>{
  if(window.crossOriginIsolated)return true;
  let previous=0;try{previous=Number(sessionStorage.getItem(retryKey)||0);}catch{}
  const u=new URL(location.href);
  if(u.searchParams.has('_tf_iso_retry')||Date.now()-previous<60000){external('이 브라우저에서 게임 준비가 완료되지 않았습니다. 외부 브라우저에서 열어주세요.');return false;}
  let timer;
  try{
   if(!('serviceWorker' in navigator))throw Error('service worker unavailable');
   status('브라우저 실행 환경을 준비하고 있습니다…');window.__nativeIsolation.stage='activating';
   await Promise.race([ (async()=>{
    const registration=await navigator.serviceWorker.register(script,{updateViaCache:'none'});
    const worker=registration.installing||registration.waiting||registration.active;
    if(!worker)throw Error('worker missing');
    if(worker.state!=='activated')await new Promise((resolve,reject)=>{
     const changed=()=>{if(worker.state==='activated'){worker.removeEventListener('statechange',changed);resolve();}else if(worker.state==='redundant'){worker.removeEventListener('statechange',changed);reject(Error('worker redundant'));}else if(worker.state==='installed')worker.postMessage('claim');};
     worker.addEventListener('statechange',changed);changed();
    });
   })(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('activation timeout')),15000);})]);
   try{sessionStorage.setItem(retryKey,String(Date.now()));}catch{}
   u.searchParams.set('_tf_iso_retry','1');window.__nativeIsolation.stage='reload';location.replace(u.href);return false;
  }catch(error){window.__nativeIsolation.error=String(error);external('브라우저 준비가 오래 걸리고 있습니다. 외부 브라우저에서 게임을 열어주세요.');return false;}
  finally{clearTimeout(timer);}
 };
 if(window.crossOriginIsolated){try{sessionStorage.removeItem(retryKey);}catch{}const u=new URL(location.href);if(u.searchParams.has('_tf_iso_retry')){u.searchParams.delete('_tf_iso_retry');history.replaceState(null,'',u.href);}window.__nativeIsolation.stage='ready';}
})();
