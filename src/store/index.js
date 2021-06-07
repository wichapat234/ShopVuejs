import Vue from 'vue'
import Vuex from 'vuex'
import unit from './modules/unit'
import product from './modules/product'
import pageglobal from './modules/pageglobal'
import transaction from './modules/transaction'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    unit,
    product,
    pageglobal,
    transaction

  },
  strict: debug
}) 