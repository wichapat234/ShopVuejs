<template>
  <div class="text-center ">
    <h3>เลือกสินค้า</h3>
    <br />
    <b-button variant="info" @click="addListBill(allData)"
      >เพิ่มรายการบิล</b-button
    >
    <br />
    <div class="header col-3">
      <b>หมายเลขบิล : </b>
      <b id="bill_number">Bill-XXX</b>
      <br />
      <br />
      <b> วันที่ : </b>
      <input type="date" v-model="date" />
    </div>
    <br />
    <table class="main">
      <colgroup>
        <col width="200" />
        <col width="100" />
        <col width="100" />
        <col width="300" />
        <col width="200" />
        <col width="300" />
        <col width="200" />
        <col width="200" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">สินค้า</th>
          <th scope="col">หน่วยสินค้า</th>
          <th scope="col">ราคา/หน่วย</th>
          <th scope="col">จำนวน</th>
          <th scope="col">ราคารวม</th>
          <th scope="col">ส่วนลด</th>
          <th scope="col">ราคารวมหลังส่วนลด</th>
          <th scope="col">เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in listData" :key="index">
          <td>
            <b-form-select
              v-model="list.dataIdProduct"
              :options="arrayDataProduct"
              @change="
                changProduct({
                  idProduct: list.dataIdProduct,
                  dataProduct: arrayDataProduct,
                  list: index,
                })
              "
            ></b-form-select>
          </td>
          <td>{{ list.unitProduct }}</td>
          <td>{{ list.unitPriceProduct.toFixed(2) }}</td>
          <td>
            <input
              v-model="list.countProduct"
              @input="changeCount($event, list)"
              type="number"
            />
          </td>
          <td>{{ getSumPriceProduct(list) }}</td>
          <td>
            <input
              :value="list.discountProduct"
              @input="changeDiscount($event, list)"
              type="number"
            />
          </td>
          <td>{{ getSumAfterDiscount(list) }}</td>
          <td>
            <b-button variant="danger" @click="deleteListBill(index)"
              >ลบ</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <div class="ft col-3">
      <table>
        <tr>
          <th>ราคารวมก่อนส่วนลด :</th>
          <th>{{ outputBillBefore }}</th>
          <th>บาท</th>
        </tr>
        <tr>
          <th>ส่วนลดทั้งหมด :</th>
          <th>{{ outputDiscount }}</th>
          <th>บาท</th>
        </tr>
        <tr>
          <th>ราคารวมทั้งหมด :</th>
          <th>{{ outputBillAfter }}</th>
          <th>บาท</th>
        </tr>
      </table>
    </div>
    <br />
    <br />
    <b-button variant="success" @click="saveListBill()">บันทึก</b-button>
  </div>
</template>

<script>
import { status } from "../../utils/constant.js";
import { pageManageData } from "../../utils/constant.js";
export default {
  data() {
    return {
      arrayDataProduct: [],
      listData: [],
      allData: [],
      date: "",
    };
  },
  mounted: function() {
    this.getDataProduct();
  },
  methods: {
    changeCount($event, list){
      const count = $event.target.value
      if (count < 0) {
        list.countProduct = 0;
      }
    },
    changeDiscount($event, list) {
      const discount = parseFloat($event.target.value);
      if (discount > list.sumBeforeDiscount) {
        list.discountProduct = list.sumBeforeDiscount;
      } else if (discount < 0) {
        list.discountProduct = 0;
      } else {
        list.discountProduct = discount;
      }
    },
    getSumPriceProduct: function(list) {    
      list.sumBeforeDiscount = list.unitPriceProduct * list.countProduct;
      return list.sumBeforeDiscount;
    },
    getSumAfterDiscount(list) {
      list.sumAfterDiscount = list.sumBeforeDiscount - list.discountProduct;
      return list.sumAfterDiscount;
    },
    saveListBill() {
      const arryDetail = [];
      let countTable = this.listData.length;
      for (let i = 0; i < countTable; i++) {
        const idProduct = this.listData[i].dataIdProduct;
        const countProduct = this.listData[i].countProduct;
        const detailDiscountProduct = this.listData[i].discountProduct;
        const detailTotalAfter = this.listData[i].sumAfterDiscount;
        const detailTotalBefore = this.listData[i].sumBeforeDiscount;
        const allDetail = {
          IdProduct: parseInt(idProduct),
          Count: parseInt(countProduct),
          Discount: parseFloat(detailDiscountProduct),
          TotalPrice: parseFloat(detailTotalAfter),
          LastPrice: parseFloat(detailTotalBefore),
        };
        arryDetail.push(allDetail);
      }
      const totalBefore = this.outputBillBefore;
      const totalDiscount = this.outputDiscount;
      const totalAfter = this.outputBillAfter;
      const date = this.date;
      const allBill = {
        PriceBefore: parseFloat(totalBefore),
        TotalDiscount: parseFloat(totalDiscount),
        PriceAfter: parseFloat(totalAfter),
        Date: date,
      };
      const dataListBill = { bill: allBill, detail: arryDetail };
      this.$store.dispatch("transaction/saveListBill",dataListBill)
        .then((response) => {
          if (response.data.status == status.SUCCEES) {
           this.$store.commit('transaction/SET_ID_Bill',response.data.idbill);
           this.$store.commit('pageglobal/SET_PAGE', pageManageData.DETAILBILL);
          } else if (response.data.status == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
          }
        });
    },
    getDataProduct() {
          this.allData = this.dataProduct;
          let countProduct = this.dataProduct.length;
          for (let i = 0; i < countProduct; i++) {
            const dataProduct = {
              value: this.dataProduct[i].idProduct,
              text: this.dataProduct[i].nameProduct,
            };
            this.arrayDataProduct.push(dataProduct);
          }
        
    },
    addListBill(value) {
      console.log("value",value)
      this.listData.push({
        dataIdProduct: value[0].idProduct,
        unitProduct: value[0].nameUnit,
        unitPriceProduct: value[0].productPrice,
        countProduct: "",
        sumBeforeDiscount: 0,
        discountProduct: "",
        sumAfterDiscount: 0,
      });
    },
    deleteListBill(index) {
      this.listData.splice(index, 1);
    },
    changProduct(value) {
      let data;
      data = this.allData.find(
        ({ idProduct }) => idProduct === value.idProduct
      );
      this.listData[value.list].unitProduct = data.nameUnit;
      this.listData[value.list].unitPriceProduct = data.productPrice;
      this.listData[value.list].sumBeforeDiscount = 0;
      this.listData[value.list].sumAfterDiscount = 0;
      this.listData[value.list].countProduct = 0;
      this.listData[value.list].discountProduct = 0;
    },
  },
  computed: {
    dataProduct() {
      return this.$store.state.product.allDataProduct
    },
    outputBillBefore: function() {
      let countTable = this.listData.length;
      let result = 0;
      for (let i = 0; i < countTable; i++) {
        const resultDiscount = this.listData[i].sumBeforeDiscount;
        result += parseFloat(resultDiscount);
      }
      return result;
    },
    outputDiscount: function() {
      let countTable = this.listData.length;
      let result = 0;
      let resultBillBefore = 0;
      for (let i = 0; i < countTable; i++) {
        resultBillBefore = this.listData[i].discountProduct;
        if (resultBillBefore == "") {
          resultBillBefore = 0;
        }

        result += parseFloat(resultBillBefore);
      }

      return result;
    },
    outputBillAfter: function() {
      let countTable = this.listData.length;
      console.log(this.listData);
      let result = 0;
      for (let i = 0; i < countTable; i++) {
        const resultAfterDiscount = this.listData[i].sumAfterDiscount;
        result += parseFloat(resultAfterDiscount);
      }
      return result;
    },
  },
};
</script>

<style scoped>
.main {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.main tr,
.main td,
.main th {
  border: 1px solid;
  width: 200px;
}
.main th {
  height: 80px;
}
.ft {
  margin-left: 75rem;
}
.ft tr,
.ft td,
.ft th {
  height: 50px;
  width: 80%;
}
.header {
  margin-left: 80rem;
}
</style>
