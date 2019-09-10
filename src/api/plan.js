import { axios } from '@/utils/request'

const api = {
  delete:'/user/deleteById',
  getpage:'/plan/getByPage',
  initdata:'/plan/initData',
  addplan:'/plan/add',
  delplan:'/plan/delete',
  updateplan:'/plan/update',
  getmytask:'/task/getMyTask',
  complete:'/task/complete',
  getfinish:'/task/getMyFinshTask',
  download:'/file/downloadTaskFile',
  getMail:'/user/getMailList',
  getSession:'/session/getMyNotReadMessage',
  response:'/session/response',
  getMyReceive:'/session/getMyReceiveSessionMessage',
  getMySendSessionMessage:'/session/getMySendSessionMessage',
  sessionInitUser:'/user/sessionInitUser',
  sessionAdd:'/session/add',



}

export default api


export function deleteId (parameter) {
  return axios({
    url: api.delete,
    method: 'post',
    params: {...parameter}
  })
}

export function getByPage (parameter) {
  return axios({
    url: api.getpage,
    method: 'post',
    params: {...parameter}
  })
}

export function getInitData (parameter) {
  return axios({
    url: api.initdata,
    method: 'post',
    params: {...parameter}
  })
}

export function addPlan (parameter) {
  return axios({
    url: api.addplan,
    method: 'post',
    params: {...parameter}
  })
}


export function delPlan (parameter) {
  return axios({
    url: api.delplan,
    method: 'post',
    params: {...parameter}
  })
}

export function updatePlan (parameter) {
  return axios({
    url: api.updateplan,
    method: 'post',
    params: {...parameter}
  })
}

export function getMytask (parameter) {
  return axios({
    url: api.getmytask,
    method: 'post',
    params: {...parameter}
  })
}


export function getFinishTask (parameter) {
  return axios({
    url: api.getfinish,
    method: 'post',
    params: {...parameter}
  })
}

export function downloadTaskFile (parameter) {
  return axios({
    url: api.download,
    method: 'get',
    // responseType:'blob',
    params: {...parameter}
  })
}

export function getMailList (parameter) {
  return axios({
    url: api.getMail,
    method: 'post',
    params: {...parameter}
  })
}


export function getSession (parameter) {
  return axios({
    url: api.getSession,
    method: 'post',
    params: {...parameter}
  })
}


export function reSponse (parameter) {
  return axios({
    url: api.response,
    method: 'post',
    params: {...parameter}
  })
}

export function getMyReceiveSessionMessage (parameter) {
  return axios({
    url: api.getMyReceive,
    method: 'post',
    params: {...parameter}
  })
}


export function getMySendSessionMessage (parameter) {
  return axios({
    url: api.getMySendSessionMessage,
    method: 'post',
    params: {...parameter}
  })
}


export function sessionInitUser (parameter) {
  return axios({
    url: api.sessionInitUser,
    method: 'post',
    params: {...parameter}
  })
}


export function sessionAdd (parameter) {
  return axios({
    url: api.sessionAdd,
    method: 'post',
    params: {...parameter}
  })
}



// export function comPlete (parameter) {
//   return axios({
//     url: api.complete,
//     method: 'post',
//     params: {...parameter},
// //     headers: {
// //       // credentials: 'same-origin',
// //     'Content-Type': 'multipart/form-data'  // 不要加上这个文件类型说明
// // },
//   })
// }