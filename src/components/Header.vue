<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark" style="margin-left: auto;">
      <b-navbar-brand style="font-size:30px">Shop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>

        <b-nav-item 
         @click="numMenu(1)" style="font-size:20px">รายการบิล</b-nav-item>

        <b-nav-item 
         @click="numMenu(2)" style="font-size:20px">หน่วยสินค้า</b-nav-item>

        <b-nav-item  
         @click="numMenu(3)" style="font-size:20px">สินค้า</b-nav-item>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
 methods:{
     numMenu(value){
         this.$emit("num",{idMenu:value});
     }
 }

}
</script>

<style scoped>
.navbar-brand {
   margin-left: 1rem;
}
</style>