import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/user/getByPage',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/file/getFileMenu',
  url:'/devApplication/getUrl',
  surl:'/devApplication/setUrl',
  schedule:'/ctrl/scheduleContent',
  adduser:'/user/add',
  delete:'/user/deleteById',
  update:'/user/updateUserInfo',
  change:'/user/updatePassword',
  daystask:'/plan/daysTask',
  cancal:'/task/cancel',
  addTask:'/task/add',
  history:'/task/historyNoComplete',
  englist:'/project/getByPage',
  addEngineer:'/project/add',
  deleteEng:'/project/delete',
  updateEng:'/project/update',
  getMater:'/materailApplication/getByPage',
  getStart:'/procurementApplication/start',
  getMyEng:'/project/getMyProjectByPage',
  getCheckByPage:'/materailCheck/getByPage',
  getMyCheckApplicationHistory:'/materailApplication/getMyCheckApplicationHistory',
  getMyCheckHistory:'/materailCheck/getMyCheckHistory'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}


export function scheduleContent (parameter) {
  return axios({
    url: api.schedule,
    method: 'post',
    params: parameter
  })
}



export function getUrl (parameter) {
  return axios({
    url: api.url,
    method: 'post',
    params: parameter
  })
}

// export function setUrl (parameter) {
//   // console.log(parameter)
//  axios.post(api.surl,{
//   params:{...parameter}
// })
// }

export function setUrl (parameter) {
  
  return axios({
    url: api.surl,
    method: 'post',
    params: {...parameter}
  })
}


export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'post',
    params: {...parameter}
  })
}


export function addUser (parameter) {
  return axios({
    url: api.adduser,
    method: 'post',
    params: {...parameter}
  })
}

export function deleteId (parameter) {
  return axios({
    url: api.delete,
    method: 'post',
    params: {...parameter}
  })
}

export function updateUser (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    params: {...parameter}
  })
}

export function changeSelect (parameter) {
  return axios({
    url: api.change,
    method: 'post',
    params: {...parameter}
  })
}


export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'post',
    params: parameter
  })
}


export function daysTask (parameter) {
  return axios({
    url: api.daystask,
    method: 'post',
    params: parameter
  })
}

export function cancalTask (parameter) {
  return axios({
    url: api.cancal,
    method: 'post',
    params: parameter
  })
}


export function addTask (parameter) {
  return axios({
    url: api.addTask,
    method: 'post',
    params: parameter
  })
}

export function getEngList (parameter) {
  return axios({
    url: api.englist,
    method: 'post',
    params: parameter
  })
}

export function addEngineer (parameter) {
  return axios({
    url: api.addEngineer,
    method: 'post',
    params: parameter
  })
}

export function deleteEng (parameter) {
  return axios({
    url: api.deleteEng,
    method: 'post',
    params: parameter
  })
}

export function updateEng (parameter) {
  return axios({
    url: api.updateEng,
    method: 'post',
    params: parameter
  })
}


export function getMater (parameter) {
  return axios({
    url: api.getMater,
    method: 'post',
    params: parameter
  })
}

export function getStart (parameter) {
  return axios({
    url: api.getStart,
    method: 'post',
    params: {...parameter}
  })
}


export function getMyEng (parameter) {
  return axios({
    url: api.getMyEng,
    method: 'post',
    params: {...parameter}
  })
}

export function getCheckByPage (parameter) {
  return axios({
    url: api.getCheckByPage,
    method: 'post',
    params: {...parameter}
  })
}


export function getMyCheckApplicationHistory (parameter) {
  return axios({
    url: api.getMyCheckApplicationHistory,
    method: 'post',
    params: {...parameter}
  })
}


export function getMyCheckHistory (parameter) {
  return axios({
    url: api.getMyCheckHistory,
    method: 'post',
    params: {...parameter}
  })
}





export function historyNoComplete (parameter) {
  return axios({
    url: api.history,
    method: 'post',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
