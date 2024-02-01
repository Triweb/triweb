/*!
 * 
 * triweb.js v0.0.1a - a part of the Triweb Platform
 *
 * See https://triweb.com/ and https://github.com/triweb/triweb/ for more details.
 *
 * Copyright (c) 2024, Shore Labs Zbigniew Zemła - triweb.com
 *
 * All rights reserved.
 * Use of this software is subject to the licensing terms published by the copyright holder.
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
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Triweb=t():e.Triweb=t()}(this,(()=>(({"./src/triweb-container-sw.js.coffee":function(){(function(){self.addEventListener("install",(function(e){self.skipWaiting()})),self.addEventListener("fetch",(function(e){var t,n;if(t=new URL(e.request.url),n=new URL(e.srcElement.registration.scope),t.origin===n.origin)return e.respondWith(new Promise((async function(t,n){var r,i,c,a,o;try{if(a=new URL(e.request.url).pathname,i=null,a.match(/^\/\.\.\.\//)&&"/.../app-metadata.json"!==a?(i="_triweb[...]",a.match(/^\/\.\.\.\/[a-zA-Z_-]*$/)&&(a="/.../index.html")):(c=(await caches.keys()).map((function(e){var t;return null!=(t=e.match(/^_triweb\[([a-z0-9_][a-z0-9-_.\/]+)\]$/))?t[1]:void 0})).filter((function(e){return!!e})))[0]&&(i=`_triweb[${c[0]}]`),"/"===a.slice(-1)&&(a+="index.html"),!i)return t(o=Response.redirect("/.../",307));if(r=await caches.open(i),o=await r.match(a,{ignoreSearch:!0}))return t(o);throw null}catch(r){return fetch(e.request).then(t).catch(n)}})))}))}).call(this)}}["./src/triweb-container-sw.js.coffee"](),{}))));