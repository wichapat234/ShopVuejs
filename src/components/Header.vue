<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand style="font-size:30px">Shop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>

        <b-nav-item 
         v-on:click="numMenu(1)">รายการบิล</b-nav-item>

        <b-nav-item 
         v-on:click="numMenu(2)">หน่วยสินค้า</b-nav-item>

        <b-nav-item  
        v-on:click="numMenu(3)">สินค้า</b-nav-item>

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

<style>

</style>