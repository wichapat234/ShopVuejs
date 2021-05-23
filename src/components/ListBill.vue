<template>
<div class="text-center">
<h1>รายการบิล</h1>
<br>

        <label>วันที่:</label>&nbsp;
        <input type="date" v-model="date" >&nbsp;
        <label>หมายเลขบิล:</label>&nbsp;
        <input v-model="bill" >&nbsp;
        <b-button  variant="secondary" @click="searchBill()">ค้นหา</b-button>&nbsp;
        <b-button  variant="info" @click="addListBill()">เพิ่มรายการบิล</b-button>

<br><br>
<table  class="table table-striped table-Active">
     <colgroup>
        <col width="150" />
        <col width="100" />
        <col width="200" />
        <col width="150" />
        <col width="200" />
        <col width="100" />
      </colgroup>
      <thead>
    <tr>
        <th scope="col">วันที่</th>
        <th scope="col">หมายเลขบิล</th>
        <th scope="col">ราคาทั้งหมดก่อนลดราคา</th>
        <th scope="col">ลดราคาทั้งหมด</th>
        <th scope="col">ราคาทั้งหมดหลังลดราคา</th>
        <th scope="col">รายละเอียด</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="list in dataBill" :key="list.idBill">
        <td>{{list.dateformate}}</td>
        <td>{{list.numberBill}}</td>
        <td>{{list.priceBefore}}</td>
        <td>{{list.totalDiscount}}</td>
        <td>{{list.priceAfter}}</td>
        <td> <b-button  variant="outline-primary" @click="detailBill(list.idBill)">รายละเอียด</b-button></td>
    </tr>
    </tbody>

</table>
</div>

</template>

<script>
import { transactionPageId } from "../utils/constant.js"; 
export default {
name: 'Transaction',
data() {
    return{
        objSearch:{},
        date:'',
        bill:'',
        dataBill:[]



    }
},
mounted: function(){
    this.searchBill();
},
methods:{
    searchBill(){
        this.objSearch = { NumberBill: this.bill, date: this.date }
        this.axios
        .post("http://localhost:40019/Transaction/Get_Listbill",this.objSearch)
        .then((response) => {
          console.log(response);
          this.dataBill = response.data
        });
    },
    addListBill(){
      this.$emit('subPageTransaction', {idPage:transactionPageId.ADDBILL});
    },
    detailBill(value){
      this.$emit('subPageTransaction', {idPage:transactionPageId.DETAILBILL,idBill:value});
    }

}
}
</script>
<style scoped>
table {
  border: 1px solid;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
th,
tr {
  border: 1px solid;
  width: 60px;
  height: 62px;
}
th {
  font-size: 20px;
}
</style>
