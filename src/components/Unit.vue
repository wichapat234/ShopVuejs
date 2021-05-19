<template>
  <div class="text-center">
    <h1>รายการหน่วยสินค้า</h1>
    <br />
    <b-button variant="info" v-on:click="addUnit(1)"
      >เพิ่มหน่วยสินค้า</b-button
    >
    <br /><br />
    <table class="table table-striped table-Active">
      <thead class="thead-dark">
        <tr>
          <th>หน่วยนับ</th>
          <th>เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" (list)  in dataUnit" :key="list.idUnit">
          <td >{{list.nameUnit }}</td>
          <td>
            <b-button variant="warning" v-on:click="editUnit(list.idUnit,list.nameUnit)">แก้ไข</b-button>&nbsp;
            <b-button variant="danger" v-on:click="deleteUnit(list.idUnit)">ลบ</b-button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>

export default {
  data() {
    return {
      dataUnit: [],
      editPage:2,
      objId: {},
      data:2,
      idUnit:0,
      nameUnit:"",
      
    };
  },
  methods: {
    listUnit() {
      //  alert("132");
      this.axios
        .post("http://localhost:40019/Unit/List_Unit")
        .then((response) => {
          this.dataUnit = response.data.unit;
          console.log(response.data.unit);
        });
    },
    addUnit(value) {
      this.$emit("subPageUnit",{pageAddUnit:value});
    },
    deleteUnit(idUnit) {
      this.objId = { IdUnit: idUnit };
      this.axios
        .post("http://localhost:40019/Unit/Delete", this.objId)
        .then((response) => {
          if (response.data == "Seccess") {
            alert("ลบข้อมูลสำเร็จ");
              this.$emit('numaddunit', this.data);
               this.listUnit();
          } else {
            alert("ข้อมูลนี้ถูกลบไปแล้ว");
             this.listUnit();
          }
        });
    },
    editUnit(value,value2){
      //   console.log("list:",value2)
         this.idUnit = value
         this.nameUnit = value2
         this.$emit('subPageUnit', {pageEditUnit:this.editPage,idUnit:this.idUnit,nameUnit:this.nameUnit});
    }
  },
  mounted: function() {
    this.listUnit();
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
