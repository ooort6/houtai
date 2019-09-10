// import React from 'react';
// import {Toast} from "antd-mobile";


// // 状态码检测
// const statusCheck = (response) => {
//     if (response.status >= 200 && response.status < 300) {
//         return response;
//     }
//     let message = '';
//     switch (parseInt(response.status)) {
//         case 401:
//             // 跳转到登录页
//             // response.json().then(json => {
//             //     location.hash = '#/login';
//             //     Toast.fail(json.error.message);
//             //     return Promise.reject(json.error.message);
//             // });
//             // return Promise.reject('用户未登录');
//             message = '用户未登录';
//             break;
//         case 400:
//             message = '参数基本类型验证失败';
//             break;
//         case 403:
//             message = '没有授权';
//             break;
//         case 404:
//             message = '找不到用户或用户不存在';
//             break;
//         case 500:
//             message = '未知错误';
//             break;
//         default:
//             message = `${response.status}错误`;
//             break;
//     }
//     response.json().then(json => {
//         const {error} = json;
//         if (typeof error === "object") {
//             if (error.code == 'NOT_LOGGED_IN') {
//                 //message.error('没有登录'); // 要求的不用提示未登录
//                 location.hash = '#/login';
//                 return;
//             }
//             if (error.code == 'LOGGED_EXIST') {
//                 location.hash = '#/';
//                 return;
//             }
//             Toast.fail(error.message);
//         } else if (json.constructor === Array) {
//             Toast.fail(json[0].message);
//         } else {
//             Toast.fail(message);
//         }
//         return Promise.reject(message);
//     });
// };


// /**
//  * http请求
//  * @param url
//  * @param body
//  * @param method
//  * @param headers
//  * @param timeout
//  * @returns {Promise<any>}
//  */
// export function request(url, {body = {}, method = 'post', headers = {}, timeout = 20000}) {
//     let timer;
//     let timeoutPromise = new Promise((resolve, reject) => {
//         timer = setTimeout(() => {
//             Toast.fail('请求超时');
//             reject('请求超时');
//         }, timeout);
//     });
//     if (method.toUpperCase() == 'GET') {
//         let params = '';
//         for (let key in body) {
//             if (body[key] != '' && body[key] != undefined && body[key] != null) {
//                 params = params + `${key}=` + body[key] + '&';
//             }
//         }
//         url = `${url}?${params.slice(0, params.length - 1)}`;
//         body = null;
//         headers = {};
//     } else if (body != null && method.toUpperCase() !== 'PUT') {
//         headers = {
//             ...{'content-type': 'application/json'},
//             ...headers,
//         };
//         if (headers['content-type'] !== 'multipart/form-data') {
//             body = JSON.stringify(body);
//         } else {
//             headers = {};
//         }
//     } else if (method.toUpperCase() === 'PUT') {
//         headers = {
//             ...{'content-type': 'application/json'},
//             ...headers,
//         };
//         let params = '';
//         for (let key in body) {
//             params = params + `${key}=` + body[key] + '&';
//         }
//         if (headers['content-type'] === 'application/json') {
//             body = JSON.stringify(body);
//         }  else {
//             body = params.slice(0, params.length - 1);
//         }
//     }
//     // alert(JSON.stringify(headers));
//     // alert(body);
//     let fetchPromise = fetch(url, {
//         credentials: 'include',
//         headers: headers,
//         method: method,
//         body: body,
//     })
//         .then(statusCheck)
//         .then(response => {
//             clearTimeout(timer);
//             try {
//                 return response.json().then(json => {
//                     if (json.status_code === 0) {
//                         return Promise.resolve(json.data);
//                     } else {
//                         Toast.fail(json.errMsg);
//                         return Promise.reject(json.errMsg);
//                     }
//                 });
//             } catch (err) {
//                 return Promise.reject('json 解析失败');
//             }
//         });
//     return Promise.race([fetchPromise, timeoutPromise]);
// }
