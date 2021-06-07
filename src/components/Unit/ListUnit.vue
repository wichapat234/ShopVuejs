<template>
  <div class="text-center" id="tableUnit">
    
    <h3>รายการหน่วยสินค้า</h3>
    <br />
    <b-button variant="info" v-on:click="addUnit()">เพิ่มหน่วยสินค้า</b-button>
    <br /><br />
    <table class="table table-striped table-Active">
      <thead class="thead-dark">
        <tr>
          <th>หน่วยนับ</th>
          <th>เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" list in dataUnit" :key="list.idUnit">
          <td >{{list.name }}</td>
          <td>
            <b-button variant="warning" v-on:click="editUnit(list.idUnit)">แก้ไข</b-button>&nbsp;
            <b-button variant="danger" v-on:click="deleteUnit(list.idUnit)">ลบ</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { pageManageData } from "../../utils/constant.js"; 
import { status } from "../../utils/constant.js";
export default {
  name:"tableUnit",
  data() {
    return {
      pageManageData:pageManageData,
    }; 
  },
   mounted: function() {
     this.listUnit();
  },
  methods: {
    listUnit() {
       this.$store.dispatch("unit/getDataUnit");
    },
    addUnit() {   
       this.$store.commit('pageglobal/SET_PAGE', pageManageData.ADDUNIT);
    },
    deleteUnit(idUnit) {
     //  const objId = { IdUnit: parseInt(idUnit) };   
      this.$store.dispatch("unit/deleteUnit",  parseInt(idUnit))
        .then((response) => {
          if (response == status.SUCCEES) {
            alert("ลบข้อมูลสำเร็จ");       
               this.listUnit();
          } else if(response == status.NULL){
            alert("ไม่พบข้อมูลนี้");
             this.listUnit();
          }else if(response == status.ERROR){
            alert("เกิดข้อผิดพลาด");
             this.listUnit();
          }
        });
    },
    editUnit(value){
       //const objId = { IdUnit: parseInt(value) };
       //console.log("v",value)
        this.$store.commit('unit/SET_ID_UNIT',value);
        this.$store.dispatch("unit/checkDataUnit",value) 
        .then((response) => {
          console.log(response)
          if (response == status.SUCCEES) {
             this.$store.commit('pageglobal/SET_PAGE', pageManageData.EDITUNIT);
          } else if(response == status.NULL) {
            alert("ไม่พบข้อมูลนี้");
            this.listProduct();
          }
        });
    }
  },
  computed: {
    dataUnit() {
      return this.$store.state.unit.allDataUnit
    }
  },
 
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
