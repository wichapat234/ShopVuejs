<template>
  <div > 
    <ListBill v-if="pageTransaction == transactionPageId.LISTBILL" @subPageTransaction="switcPageTransaction"/>
    <AddListBill v-if="pageTransaction == transactionPageId.ADDBILL " :idBill="idBill" @subPageTransaction="switcPageTransaction"/>
    <DetailBill v-if="pageTransaction == transactionPageId.DETAILBILL" :idBill="idBill" @subPageTransaction="switcPageTransaction"/>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { transactionPageId } from "../utils/constant.js"; 
import ListBill from "./ListBill.vue";
import AddListBill from "./AddListBill.vue";
import DetailBill from "./DetailBill.vue";

export default {
   components: {
    ListBill,
    AddListBill,
    DetailBill
  },
  data() {
    return {
      transactionPageId:transactionPageId,
      pageTransaction:1,
      idBill:0,
    };
  },
  methods: {
   switcPageTransaction(value){
     console.log(value)
     this.pageTransaction = value.idPage
     this.idBill = value.idBill

   }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
