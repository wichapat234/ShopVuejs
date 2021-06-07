import axios from "axios";
import {localhost} from "./../../utils/constant.js";
import {pageManageData} from "./../../utils/constant.js";
const state = {
  allDataProduct:[],
  idProduct:undefined,
}
  
  const getters = {
    isListProductPage: state=>{
      return state.pageName ==  pageManageData.LISTPRODUCT
  },
    isAddProductPage: state=>{
      return state.pageName ==  pageManageData.ADDPRODUCT
  },
     isEditProductPage: state=>{
    return state.pageName ==  pageManageData.EDITPRODUCT 
  }, 
     isDetailProductPage: state=>{
    return state.pageName ==  pageManageData.DETAILPRODUCT  
  }, 

  }
   
  const actions = {
    getDataProduct({ commit }) {
      axios.get(localhost+"/Product/List_Product")
      .then(response => {
       // alert()
        //console.log("store:",response)
      commit('SET_DATA_PRODUCT', response.data)
      })
      },
      addProduct(state,objProduct){
        return axios.post(localhost+"/Product/Insert_Product",objProduct)
        .then(response => {
          return  response.data
          })
      },
      deleteProduct(state,idProduct){
        return axios .post(localhost+"/Product/Delete_Product",idProduct)
        .then(response => {
          return  response.data
          })
      },
      checkDataProduct(state,idProduct){
       // alert(idProduct)
        return axios .post(localhost+"/Product/Check_Edit_Product",idProduct)
        .then(response => {
          console.log("store:",response.data)
          return  response.data
          })
      },
      getDataEditProduct(state,idProduct){     
        return axios .get(localhost+"/Product/Get_Edit_Product/?id="+idProduct)
        .then(response => {
          return  response.data
          })
      },
      updateProduct(state,objProduct){
        //console.log(objProduct)
        return axios .post(localhost+"/Product/Update_Product",objProduct)
        .then(response => {
         // console.log("store:",response)
          return  response
          }) 
      }
   
  }
  
  const mutations = {
    SET_DATA_PRODUCT(state,allDataProduct){
      state.allDataProduct = allDataProduct
    }, 
    SET_ID_PRODUCT(state, idProduct){
      state.idProduct = idProduct
    },
    SET_PAGE(state, pageName) {
      //console.log(pageName)
      state.pageName = pageName
      }, 
    
  }
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }