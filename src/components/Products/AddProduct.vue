<template>
<SlotProduct :optionUnit=" arrayDataUnit">
    <template v-slot:header >
    <h3>เพิ่มสินค้า</h3>
    </template>
    <br />
    <template v-slot:body>
    </template> 
    <br />
  <template v-slot:footer="slotProps">
    <b-button class="text-center" variant="success" @click="saveProduct(slotProps.data)">บันทึก</b-button>
  </template>
</SlotProduct>
</template>

<script>
import { pageManageData } from "../../utils/constant.js";
import { status } from "../../utils/constant.js";
import SlotProduct from "./SlotProduct.vue";
export default {
  components:{  
    SlotProduct,
    
  },
  data() {
    return { 
      pageManageData:pageManageData,
      arrayDataUnit: [],
    };
  }, 
  mounted: function(){
    this.setOption();
    
  },
  methods: { 
    saveProduct(value) {
      const objProduct = { 
        ProductPrice: parseFloat(value.namePrice),
        ProductName: value.nameProduct,
        IdUnit: parseInt(value.nameUnit),
      };
     this.$store.dispatch("product/addProduct", objProduct)
        .then((response) => {
         // console.log(response)
          if(response == status.SUCCEES) {
            alert("บันทึกสำเร็จ");
            this.$emit("save");
          }else if(response == status.DUPLICATE){
            alert("หน่วยสินค้าซ้ำ");
          }else if(response == status.ERROR){
            alert("เกิดข้อผิดพลาด")
            this.$emit("save");
        }
        });
    },
    setOption(){
       console.log("unit",this.dataUnit)
      let countUnit = this.dataUnit.length;
   //   this.nameUnit = this.dataUnit[0].idUnit;
      for (let i = 0; i < countUnit; i++) {
        const objDataUnit = {
          value: this.dataUnit[i].idUnit,
          text: this.dataUnit[i].name,
        };
        this.arrayDataUnit.push(objDataUnit);
     }
    }
  },
  computed: { 
    dataUnit() {
      console.log("HH",this.$store.state.unit.allDataUnit)
      return this.$store.state.unit.allDataUnit;
    },
  },

};
</script>

<style scoped>
h3{
  color: aquamarine;
}
</style>
