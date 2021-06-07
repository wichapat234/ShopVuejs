import axios from "axios";
import {localhost} from "./../../utils/constant.js";
const state = {
  allDataBill:[],
  idBill:undefined
}
  
  const getters = {}
  
  const actions = {
    searchBill({ commit },objSearch) {
      axios.post(localhost+"/Transaction/Get_Listbill",objSearch)
      .then(response => {
      commit('SET_DATA_BILL', response.data)
    })
    },
    getDataDetailBill(state,idBill) {
      console.log(idBill)
      return axios.get(localhost+"/Transaction/Detail_Bill/?IdBill="+idBill)
      .then(response => {
       // console.log(response)
      return response
    })
    },
    saveListBill(state,objBill) {
      console.log(objBill)
      return axios.post(localhost+"/Transaction/Insert_detail_bill",objBill)
      .then(response => {
        console.log(response)
      return response
    })
    },
   
  }
  
  const mutations = {
    SET_DATA_BILL(state,data){
      state.allDataBill = data
    },
    SET_ID_Bill(state, idBill){
      // console.log(idUnit)
       state.idBill = idBill
     }, 
    
  }
  
export default { 
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }