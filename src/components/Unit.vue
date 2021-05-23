<template>
  <div> 
    <ListUnit v-if="pageUnit == unitPageId.LISTUNIT" @subPageUnit="switcPageUnit"/>
    <AddUnit v-if="pageUnit == unitPageId.ADDUNIT" @subPageUnit="switcPageUnit"/>
    <EditUnit v-if="pageUnit == unitPageId.EDITUNIT" @subPageUnit="switcPageUnit" :idUnit="idUnit"/>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { unitPageId } from "../utils/constant.js"; 
import AddUnit from "./AddUnit.vue";
import ListUnit from "./ListUnit.vue";
import EditUnit from "./EditUnit.vue";

export default {
   components: {
    AddUnit,
    ListUnit,
    EditUnit
  },
  data() {
    return {
      unitPageId:unitPageId,
      pageUnit:3,
      idUnit: 0,
    };
  },
  methods: {
   switcPageUnit(value){
     console.log(value)
     this.pageUnit = value.idPage
     this.idUnit = value.idUnit;
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
