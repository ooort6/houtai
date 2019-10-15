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
  getprojectmanager:'/user/getProjectManager',
  getMyProjectManager:'/project/getMyProject',
  getProcurementManager:'/user/getProcurementManager',
  getmyTask:'/actTask/myTask',
  getTaskDetail:'/procurementApplication/getTaskDetail',
  check:'/procurementApplication/check',
  getHistoryTask:'/actTask/myHistoryTask',
  Tasking:'/actTask/tasking',
  getTasking:'/procurementApplication/getTaskingDetail',
  getHistoryTask1:'/procurementApplication/getFinshTaskDetail',
  getDetails:'/materailApplication/getMyMaterialDetailById',
  getboss:'/user/getBoss',
  getMyPassApplicationList:'/materailApplication/getMyPassApplicationList',
  startGo:'/procurementCheck/start',
  preCheck:'/procurementCheck/getTaskDetail',
  getAllPerson:'/user/getUserByType?type=0',
  bossCheck:'/procurementCheck/check',
  procurementConfirm:'/procurementCheck/definitePurchase',
  checkMoneyCommit:'/procurementCheck/checkMoneyCommit',
  historyCheck:'/procurementCheck/getFinshTaskDetail',
  checking:'/procurementCheck/getTaskingDetail',
  updateFailApplication:'/procurementCheck/updateFailApplication',
  getMyMaterialCheckDetailById:'/materailCheck/getMyMaterialCheckDetailById'
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



export function getProjectManager (parameter) {
  return axios({
    url: api.getprojectmanager,
    method: 'post',
    params: {...parameter}
  })
}


export function getMyProjectManager (parameter) {
  return axios({
    url: api.getMyProjectManager,
    method: 'post',
    params: {...parameter}
  })
}

export function getProcurementManager (parameter) {
  return axios({
    url: api.getProcurementManager,
    method: 'post',
    params: {...parameter}
  })
}

export function getmyTask (parameter) {
  return axios({
    url: api.getmyTask,
    method: 'post',
    params: {...parameter}
  })
}

export function getTaskDetail (parameter) {
  return axios({
    url: api.getTaskDetail,
    method: 'post',
    params: {...parameter}
  })
}



export function check (parameter) {
  return axios({
    url: api.check,
    method: 'post',
    params: {...parameter}
  })
}


export function getHistoryTask (parameter) {
  return axios({
    url: api.getHistoryTask,
    method: 'post',
    params: {...parameter}
  })
}

export function Tasking (parameter) {
  return axios({
    url: api.Tasking,
    method: 'post',
    params: {...parameter}
  })
}

export function getTasking (parameter) {
  return axios({
    url: api.getTasking,
    method: 'post',
    params: {...parameter}
  })
}


export function getHistoryTask1 (parameter) {
  return axios({
    url: api.getHistoryTask1,
    method: 'post',
    params: {...parameter}
  })
}

export function getDetails (parameter) {
  return axios({
    url: api.getDetails,
    method: 'post',
    params: {...parameter}
  })
}

export function getboss (parameter) {
  return axios({
    url: api.getboss,
    method: 'post',
    params: {...parameter}
  })
}

export function getAllPerson (parameter) {
  return axios({
    url: api.getAllPerson,
    method: 'post',
    params: {...parameter}
  })
}


export function procurementConfirm (parameter) {
  return axios({
    url: api.procurementConfirm,
    method: 'post',
    params: {...parameter}
  })
}

export function getMyPassApplicationList (parameter) {
  return axios({
    url: api.getMyPassApplicationList,
    method: 'post',
    params: {...parameter}
  })
}

export function bossCheck (parameter) {
  return axios({
    url: api.bossCheck,
    method: 'post',
    params: {...parameter}
  })
}

export function startGo (parameter) {
  return axios({
    url: api.startGo,
    method: 'post',
    params: {...parameter}
  })
}


export function preCheck (parameter) {
  return axios({
    url: api.preCheck,
    method: 'post',
    params: {...parameter}
  })
}

export function checkMoneyCommit (parameter) {
  return axios({
    url: api.checkMoneyCommit,
    method: 'post',
    params: {...parameter}
  })
}

export function historyCheck (parameter) {
  return axios({
    url: api.historyCheck,
    method: 'post',
    params: {...parameter}
  })
}



export function checking (parameter) {
  return axios({
    url: api.checking,
    method: 'post',
    params: {...parameter}
  })
}


export function updateFailApplication (parameter) {
  return axios({
    url: api.updateFailApplication,
    method: 'post',
    params: {...parameter}
  })
}

export function getMyMaterialCheckDetailById (parameter) {
  return axios({
    url: api.getMyMaterialCheckDetailById,
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