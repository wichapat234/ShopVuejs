<template>
  <div class="text-center ">
    <h1>เลือกสินค้า</h1>
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
          <td>{{ list.unitPriceProduct }}</td>
          <td>
            <input
              v-model="list.countProduct"
              type="number"
              @keyup="
                calSumProduct({
                  price: list.unitPriceProduct,
                  count: list.countProduct,
                  list: index,
                })
              "
            />
          </td>
          <td>{{ list.sumPriceProduct }}</td>
          <td>
            <input
              v-model="list.discountProduct"
              type="number"
              @keyup="
                sumBeforeDiscount({
                  sumpPrice: list.sumPriceProduct,
                  discount: list.discountProduct,
                  list: index,
                })
              "
            />
          </td>
          <td>{{ list.sumBeforeDiscount }}</td>
          <td>
            <b-button variant="danger" @click="deleteListProduct(index)"
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
          <th>{{ this.totalBefore }}</th>
          <th>บาท</th>
        </tr>
        <tr>
          <th>ส่วนลดทั้งหมด :</th>
          <th>{{ this.totalDiscount }}</th>
          <th>บาท</th>
        </tr>
        <tr>
          <th>ราคารวมทั้งหมด :</th>
          <th>{{ this.totalAfter }}</th>
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
import { status } from "../utils/constant.js";
import { transactionPageId } from "../utils/constant.js";
export default {
  data() {
    return {
      countid: 0,
      showBody: 0,
      arrayDataProduct: [],
      dataProduct: { value: "", text: "" },
      listData: [],
      lengthData: 0,
      allData: [],
      totalAfter: 0,
      totalDiscount: 0,
      totalBefore: 0,
      date: "",
      dataListBill: {},
    };
  },
  mounted: function() {
    this.getDataProduct();
  },
  methods: {
    saveListBill() {
      //
      const arryDetail = [];
      let countTable = this.listData.length;
      for (let i = 0; i < countTable; i++) {
        console.log("for:", this.listData[0].dataIdProduct);
        const idProduct = this.listData[i].dataIdProduct;
        const countProduct = this.listData[i].countProduct;
        const detailDiscountProduct = this.listData[i].discountProduct;
        const detailTotalAfter = this.listData[i].sumPriceProduct;
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
      console.log(arryDetail);
      const totalBefore = this.totalBefore;
      const totalDiscount = this.totalDiscount;
      const totalAfter = this.totalAfter;
      const date = this.date;
      const allBill = {
        PriceBefore: parseFloat(totalBefore),
        TotalDiscount: parseFloat(totalDiscount),
        PriceAfter: parseFloat(totalAfter),
        Date: date,
      };
      this.dataListBill = { bill: allBill, detail: arryDetail };
      console.log(this.dataListBill);

      this.axios
        .post(
          "http://localhost:40019/Transaction/insert_detail_bill",
          this.dataListBill
        )
        .then((response) => {
          // this.dataUnit = response.data.unit;
          console.log(response);
          if (response.data.status == status.SUCCEES) {
            this.$emit("subPageTransaction", {
              idPage: transactionPageId.DETAILBILL,
              idBill: response.data.idbill,
            });
          } else if (response.data == status.ERROR) {
            alert("เกิดข้อผิดพลาด");
          }
        });
    },
    getDataProduct() {
      this.axios
        .post("http://localhost:40019/Transaction/GatdataProduct")
        .then((response) => {
          // this.dataUnit = response.data.unit;
          console.log(response.data);
          this.allData = response.data;
          let countProduct = response.data.length;
          this.lengthData = countProduct;
          //   this.listData.dataIdProduct = response.data[0].product_Id;
          for (let i = 0; i < countProduct; i++) {
            this.dataProduct = {
              value: response.data[i].product_Id,
              text: response.data[i].nameProduct,
            };
            this.arrayDataProduct.push(this.dataProduct);
          }
        });
    },
    addListBill(value) {
      //console.log(value)
      this.listData.push({
        dataIdProduct: value[0].product_Id,
        unitProduct: value[0].nameUnit,
        unitPriceProduct: value[0].productPrice,
        countProduct: "",
        sumPriceProduct: "",
        discountProduct: "",
        sumBeforeDiscount: "",
      });
    },
    deleteListProduct(index) {
      this.listData.splice(index, 1);
      this.calSamBefore();
      this.calSumDiscount();
      this.calSumAfter();
    },
    changProduct(value) {
      let data;
      data = this.allData.find(
        ({ product_Id }) => product_Id === value.idProduct
      );
      this.listData[value.list].unitProduct = data.nameUnit;
      this.listData[value.list].unitPriceProduct = data.productPrice;
      this.listData[value.list].sumPriceProduct = 0;
      this.listData[value.list].sumAfterDiscount = 0;
      this.listData[value.list].countProduct = "";
      this.listData[value.list].discountProduct = "";
    },
    calSumProduct(value) {
      let result = 0;
      result = value.price * value.count;
      this.listData[value.list].sumPriceProduct = result.toFixed(2);
      this.calSamBefore();
    },
    sumBeforeDiscount(value) {
      let result;
      result = value.sumpPrice - value.discount;
      this.listData[value.list].sumBeforeDiscount = result.toFixed(2);
      this.calSumDiscount();
      this.calSumAfter();
    },
    calSamBefore() {
      let result = 0;
      let countTable = this.listData.length;
      for (let i = 0; i < countTable; i++) {
        let data = this.listData[i].sumPriceProduct;
        result += parseFloat(data);
      }
      this.totalBefore = result.toFixed(2);
    },
    calSumDiscount() {
      let result = 0;
      let countTable = this.listData.length;
      for (let i = 0; i < countTable; i++) {
        let data = this.listData[i].discountProduct;
        result += parseFloat(data);
      }
      this.totalDiscount = result.toFixed(2);
    },
    calSumAfter() {
      let result = 0;
      let countTable = this.listData.length;
      for (let i = 0; i < countTable; i++) {
        let data = this.listData[i].sumBeforeDiscount;
        // alert(data)
        result += parseFloat(data);
      }
      this.totalAfter = result.toFixed(2);
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
  margin-left: 75rem;;

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
