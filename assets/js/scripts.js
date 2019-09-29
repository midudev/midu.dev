// Minimal Analytics
(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect",
A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview",
sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer||
void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language?
(f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0,
sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&&
a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0,
ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&&
!1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest;
y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&&
d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(),
a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)},
trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}})
(window,"UA-30525085-8",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});

// youtube functionality
function createYoutubeFrame (id) {
    var html = "<div id='lightbox'><a href='#'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='1' stroke-linecap='square' stroke-linejoin='arcs'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg></a> <section> <div> <iframe src='https://www.youtube.com/embed/" + id + "?autoplay=1' width='560' height='315' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div></section></div>"
    var fragment = document.createRange().createContextualFragment(html)
    document.body.appendChild(fragment)

    document.querySelector('#lightbox a').addEventListener('click', function (e) {
        e.preventDefault()
        var lightbox = document.getElementById('lightbox')
        lightbox.parentNode.removeChild(lightbox)
    }, { once: true })
}

document.querySelectorAll('.youtube-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault()
        var id = this.getAttribute('data-id')
        createYoutubeFrame(id)
    })
})
