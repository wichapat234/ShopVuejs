<template>
  <div class="text-center">
    <h3>รายละเอียดบิล</h3>
    <br />
    <br />
    <table class="table ">
      <colgroup>
        <col width="100" />
        <col width="100" />
        <col width="100" />
        <col width="100" />
        <col width="100" />
        <col width="100" />
      </colgroup>
      <thead>
        <tr>
          <th rowspan="2" colspan="4"></th>
          <th>เลขบิล</th>
          <td>{{this.bill.dateformate}}</td>
        </tr>
        <tr>
          <th>วันที่</th>
          <td>{{this.bill.numberBill}}</td>
        </tr>
        <tr>
          <th colspan="6">&nbsp;</th>
        </tr>

        <tr>
          <th scope="col">สินค้า</th>
          <th scope="col">จำนวน</th>
          <th scope="col">ราคา</th>
          <th scope="col">ราคารวมก่อนส่วนลด</th>
          <th scope="col">ส่วนลด</th>
          <th scope="col">ราคารวมหลังส่วนลด</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(listdetail , index) in detailBill" :key="index">
          <td style="text-align:left;">{{ listdetail.nameProduct }}</td>
          <td style="text-align:right;">{{ listdetail.count }}/{{ listdetail.nameUnit}}</td>
          <td style="text-align:right;">
           {{listdetail.productPrice | decimal}} 
          </td>
          <td style="text-align:right;">
            {{listdetail.totalPrice | decimal}}
          </td>
          <td style="text-align:right;">
             {{listdetail.discount | decimal}}
          </td>
          <td style="text-align:right;">
            {{listdetail.lastPrice | decimal}}
          </td>
        </tr>
        <tr>
          <td colspan="6">&nbsp;</td>
        </tr>
        <tr>
          <th rowspan="3" colspan="4"></th>
          <th>ราคารวมทั้งหมดก่อนส่วนลด</th>
          <th style="text-align:right;">{{this.bill.priceBefore | decimal}}</th>
        </tr>
        <tr>
          <th>ส่วนลดทั้งหมด</th>
          <th style="text-align:right;">{{this.bill.totalDiscount | decimal}}</th>
        </tr>
        <tr>
          <th>ราคารวมทั้งหมดหลังส่วนลด</th>
          <th style="text-align:right;">{{this.bill.priceAfter | decimal}}</th>
        </tr>
      </tbody>
    </table>
    <br />
    <b-button variant="outline-secondary" @click="backPage()">กลับหน้ารายการ</b-button>
  </div>
</template>

<script>
import { pageManageData } from "../../utils/constant.js";
export default {
  data() {
    return {
      detailBill: [],
      bill:[],
      priceBefore: 0,
      totalDiscount: 0,
      priceAfter: 0,
      numberBill: "",
      date: "",
    };
  },
 // props: ["idBill"],
  mounted: function() {
    this.getDataDetailBill();
  },
  methods: {
    getDataDetailBill() {
      console.log(this.idBill)
      this.$store.dispatch("transaction/getDataDetailBill",this.idBill)
        .then((response) => {
            console.log(response)
          this.detailBill = response.data.detail;
          this.bill = response.data.bill;
        });
    },
    backPage() {
      this.$store.commit('pageglobal/SET_PAGE', pageManageData.LISTBILL);
    },
  },
  computed:{
  idBill(){
      return this.$store.state.transaction.idBill
  }

},
  filters: {
  decimal: function (value) {    
    if (!value) return "0.00"+" "+"บาท"
     value = value.toFixed(2)
         console.log(value)
    return value+" "+"บาท"
  },
}
};
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
table tr,
th,
td {
  border: 1px solid;
  height: 50px;
}
</style>
