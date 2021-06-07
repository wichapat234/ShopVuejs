<template>
  <div > 
    <ListBill v-if="isListBill"/>
    <AddListBill v-else-if="isAddBill"/>
    <DetailBill v-else-if="isDetailBill"/>
  </div>
</template>

<script>
import { pageManageData } from "../../utils/constant.js"; 
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

    };
  },
  methods: {

  },
  computed:{
    isListBill(){
      return this.$store.state.pageglobal.pageName == pageManageData.LISTBILL
    },
    isAddBill(){
      return this.$store.state.pageglobal.pageName == pageManageData.ADDBILL
    },
    isDetailBill(){
      return this.$store.state.pageglobal.pageName == pageManageData.DETAILBILL
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
