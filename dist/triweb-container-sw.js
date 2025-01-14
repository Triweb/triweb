/*!
 * 
 * triweb.js v0.0.1a - a part of the Triweb Platform
 *
 * See https://triweb.com/ and https://github.com/triweb/triweb/ for more details.
 *
 * Copyright (c) 2024, Shore Labs Zbigniew Zemła - triweb.com
 *
 * All rights reserved.
 *
 * Use of this software is subject to the licensing terms published
 * or otherwise made available directly to you by the copyright holder.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Triweb=t():e.Triweb=t()}(this,(()=>(({"./src/triweb-container-sw.js.coffee":function(){(function(){self.addEventListener("install",(function(e){self.skipWaiting()})),self.addEventListener("fetch",(function(e){var t,n;if(t=new URL(e.request.url),n=new URL(e.srcElement.registration.scope),t.origin===n.origin)return e.respondWith(new Promise((async function(t,n){var r,i,a,o,s,c,f,h,u,l,p,m,w,d,g;try{if(l=new URL(e.request.url).pathname,a=[],l.match(/^\/\.\.\.\//))a=["_triweb[...]"],l.match(/^\/\.\.\.\/[a-zA-Z_-]*$/)&&(l="/.../index.html");else if(0===(a=(await caches.keys()).map((function(e){return e.match(/^_triweb\[([a-z_][a-z0-9-_.\/]+)\]$/)})).filter((function(e){return!!e})).map((e=>e[0])).sort()).length)return t(w=Response.redirect("/.../",307));for("/"===l.slice(-1)&&(l+="index.html"),d=[],o=0,c=a.length;o<c;o++)i=a[o],r=await caches.open(i),(w=await r.match(l,{ignoreSearch:!0}))&&d.push([w,r]);if(0===d.length){if(l.match(/^\/\.\.\.\//))throw"";return t(Response.error())}if(1===d.length)return t(d[0][0]);for(g=[],s=0,f=d.length;s<f;s++){m=d[s];try{u=await m[1].match("/manifest.json",{ignoreSearch:!0}),h=await u.json(),NaN!==(p=parseInt((h.metadata||{}).priority,10))&&void 0!==p||(p=Infinity),g.push([m[0],p])}catch(e){g.push([m[0],Infinity])}}return t(g.sort(((e,t)=>e[1]-t[1]))[0][0])}catch(r){return fetch(e.request).then(t).catch(n)}})))}))}).call(this)}}["./src/triweb-container-sw.js.coffee"](),{}))));