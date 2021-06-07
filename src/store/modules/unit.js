import axios from "axios";
import {localhost} from "./../../utils/constant.js";
const state = {
    allDataUnit :[],
    idUnit:undefined,
  }
  
  const getters = {

  }  
  
  const actions = {
    getDataUnit({ commit }) { 
        axios.get(localhost+"/Unit/List_Unit")
        .then(response => {
          //alert()
         //console.log("str:",response.data.getUnit) 
        commit('SET_DATA_UNIT', response.data.getUnit)
        commit('SET_ID_UNIT', response.data.getUnit[0].idUnit)
      })
      },
      addUnit(state,Name){
        console.log(Name)
        return axios.get(localhost+"/Unit/Insert_Unit/?name="+Name)
        .then(response => {
          return  response.data
          })
      }, 
      deleteUnit(state,IdUnit){
        console.log(IdUnit)
        return axios .get(localhost+"/Unit/Delete_Unit/?IdUnit="+IdUnit)
        .then(response => {
          return  response.data
          })
      },
      checkDataUnit(state,IdUnit){
      //  console.log(idUnit)
        return axios .get(localhost+"/Unit/Check_Edit_Unit/?IdUnit="+IdUnit)
        .then(response => {
          return  response.data
          })
      },
      getDataEditUnit(state,idUnit){     
        return axios .get(localhost+"/Unit/Get_Edit_Unit/?IdUnit="+idUnit)
        .then(response => {
          console.log(response)
          return  response.data
          })
      },
      updateUnit(state,objUnit){
        console.log(objUnit)
        return axios .post(localhost+"/Unit/Update_Unit",objUnit)
        .then(response => {
        //  console.log(response)
          return  response
          })
      }
  }
  
  const mutations = {
    SET_DATA_UNIT(state, allDataUnit) {
     // console.log("storeunit",allDataUnit)
      state.allDataUnit = allDataUnit
      },  
    SET_ID_UNIT(state, idUnit){
     // console.log(idUnit)
      state.idUnit = idUnit
    }, 
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }