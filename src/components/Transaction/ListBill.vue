<template>
<div class="text-center">
<h3>รายการบิล</h3>
<br>

        <label>วันที่เริ่มต้น:</label>&nbsp;
        <input type="date" v-model="startDate" >&nbsp;
        <label>วันที่สิ้นสุด:</label>&nbsp;
        <input type="date" v-model="endDate" >&nbsp;
        <label>หมายเลขบิล:</label>&nbsp;
        <input v-model="bill" >&nbsp;
        <b-button  variant="secondary" @click="searchBill()">ค้นหา</b-button>&nbsp;
        <b-button  variant="info" @click="addListBill()">เพิ่มรายการบิล</b-button>

<br><br>
<table  >
     <colgroup>
        <col width="150" />
        <col width="100" />
        <col width="200" />
        <col width="150" />
        <col width="200" />
        <col width="150" />
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
        <td> <b-button  variant="primary" @click="detailBill(list.idBill)">รายละเอียด</b-button></td>
    </tr>
    </tbody>

</table>
</div>

</template>

<script>
import { pageManageData } from "../../utils/constant.js"; 
export default {
name: 'Transaction',
data() {
    return{
        objSearch:{},
        startDate:'',
        endDate:"",
        bill:'',
    }
},
mounted: function(){
    this.searchBill();
    this.$store.dispatch("product/getDataProduct");
},
methods:{
    searchBill(){
        const objSearch = { NumberBill: this.bill, startdate: this.startDate ,enddate:this.endDate}
        this.$store.dispatch("transaction/searchBill",objSearch);
    },
    addListBill(){
      //this.$store.commit('pageglobal/SET_PAGE', pageManageData.ADDBILL);
      
      this.$store.commit('pageglobal/SET_PAGE', pageManageData.ADDBILL);
    },
    detailBill(id){
      this.$store.commit('transaction/SET_ID_Bill',id);
      this.$store.commit('pageglobal/SET_PAGE', pageManageData.DETAILBILL);
    }

},
computed:{
  dataBill(){
      return this.$store.state.transaction.allDataBill
  }

}
}
</script>
<style scoped>
table { border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
th,tr {

  width: 60px;
  height: 62px;
}
th {
  font-size: 20px;
  background-color:#343a40;
  color: white;

}
tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #ddd;}
</style>
