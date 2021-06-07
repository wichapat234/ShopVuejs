<template>
  <div> 
    <ListUnit v-if="isListUnit"/>
    <AddUnit v-else-if="isAddUnit"/>
    <EditUnit v-else-if="isEditUnit"/>
  </div>
</template>
<script>
import AddUnit from "./AddUnit.vue";
import ListUnit from "./ListUnit.vue";
import EditUnit from "./EditUnit.vue";
import { pageManageData } from "../../utils/constant.js"; 

export default {
   components: {
    AddUnit,
    ListUnit,
    EditUnit
  },
  data() {
    return {
    };
  },

  methods: {

  },
  computed:{
    isListUnit(){
      return this.$store.state.pageglobal.pageName == pageManageData.LISTUNIT
    },
    isAddUnit(){
      return this.$store.state.pageglobal.pageName == pageManageData.ADDUNIT
    },
    isEditUnit(){
      return this.$store.state.pageglobal.pageName == pageManageData.EDITUNIT
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border: 1px solid;
  width: 50%;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
}
 th {
  border: 1px solid;
  font-size: 20px;
  height: 50px;
}
td {
   height: 50px;

}
</style>
