import {pageManageData} from "./../../utils/constant.js";
const state = {
    pageName:pageManageData.LISTBILL 
  }
  
  const getters = {
     isUnitComponentsActive: state=>{ 
     //  alert("mainunit") 
      return state.pageName == pageManageData.LISTUNIT  ||   state.pageName == pageManageData.ADDUNIT ||   state.pageName == pageManageData.EDITUNIT 
  },
     isProductComponentsActive: state=>{
      //alert("mainprop000p") 
      return state.pageName == pageManageData.LISTPRODUCT ||   state.pageName == pageManageData.ADDPRODUCT ||   state.pageName == pageManageData.EDITPRODUCT ||   state.pageName == pageManageData.DETAILPRODUCT 
  },
     isBillComponentsActive: state=>{
    // alert("mainbill") 
      return state.pageName ==  pageManageData.LISTBILL  ||   state.pageName == pageManageData.ADDBILL || state.pageName == pageManageData.DETAILBILL
  },

  } 
  
  const actions = { 
      
  }
  
  const mutations = {
    SET_PAGE(state, pageName) {
     // console.log(pageName)
      state.pageName = pageName
      },  
       
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }