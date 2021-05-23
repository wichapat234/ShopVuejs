<template>
  <div class="text-center">
      <h1>รายละเอียดบิล</h1>
<br>
    <br>
    <table>
        <thead>
            <tr>
                <th rowspan="2" colspan="3"> </th>
                <th>เลขบิล </th>
                <td>{{numberBill}}</td>
            </tr>
            <tr>
                <th>วันที่ </th>
                <td>{{date | formatDate}}</td>
            </tr>
            <tr>
                <th colspan="5">&nbsp;</th>
            </tr>

            <tr>
                <th> สินค้า </th>
                <th> จำนวน/หน่วย </th>
                <th> ราคา/หน่วย </th>
                <th> ราคา </th>
                <th> ส่วนลด </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(listdetail,index) in detailBill" :key="index">
                <td>{{listdetail.nameProduct}}</td>
                <td>{{listdetail.count}}/{{listdetail.nameUnit}}</td>
                <td>{{listdetail.productPrice}}</td>
                <td>{{listdetail.totalPrice}}</td>
                <td>{{listdetail.discount}}</td>
            </tr>
            <tr>
                <td colspan="5">&nbsp;</td>
            </tr>
            <tr>
                <th rowspan="3" colspan="3"> </th>
                <th>ราคารววมก่อนส่วนลด </th>
                <th>{{priceBefore}}&nbsp;บาท</th>
            </tr>
            <tr>
                <th>ส่วนลดทั้งหมด </th>
                <th>{{totalDiscount}}&nbsp;บาท</th>
            </tr>
            <tr>
                <th>ราคารวมทั้งหมด </th>
                <th>{{priceAfter}}&nbsp;บาท</th>
            </tr>
        </tbody>
    </table>
    <br>
    <b-button variant="outline-secondary" @click="backPage()">กลับหน้าหลัก</b-button>
  </div>
</template>

<script>
import { transactionPageId } from "../utils/constant.js"; 
export default {
    data(){
        return{
            detailBill:[],
            arry:[],
            priceBefore:0,
            totalDiscount:0,
            priceAfter:0,
            numberBill:"",
            date:""
        }
    },
    props:[
        "idBill"
    ],
    mounted: function(){
        this.getDataDetailBill()
    },
    methods:{
        getDataDetailBill(){
             this.axios
        .post("http://localhost:40019/Transaction/Detail_Bill/?id="+this.idBill)
        .then((response) => {
          console.log(response)
          this.detailBill = response.data.detail
          this.priceBefore = response.data.bill.priceBefore.toFixed(2);
          this.totalDiscount = response.data.bill.totalDiscount.toFixed(2);
          this.priceAfter = response.data.bill.priceAfter.toFixed(2);
          this.numberBill = response.data.bill.numberBill;
          this.date = response.data.bill.date;
        });
        },
        backPage(){
            this.$emit('subPageTransaction', {idPage:transactionPageId.LISTBILL});
        }
    }
}
</script>

<style scoped>
table{
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  
}
table tr ,th ,td{
  border: 1px solid;
  height: 50px;

}
</style>