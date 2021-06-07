<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      style="margin-left: auto;"
    >
      <b-navbar-brand>Shop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            @click="numMenu(pageManageData.LISTBILL)"
            :class="{active: this.$store.getters['pageglobal/isBillComponentsActive'],}"
            >รายการบิล</b-nav-item
          >

          <b-nav-item
            @click="numMenu(pageManageData.LISTUNIT)"
            :class="{active: this.$store.getters['pageglobal/isUnitComponentsActive'],}"
            >หน่วยสินค้า</b-nav-item
          >

          <b-nav-item
            @click="numMenu(pageManageData.LISTPRODUCT)"
            :class="{active: this.$store.getters['pageglobal/isProductComponentsActive'],}"
            >สินค้า</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { pageManageData } from "../utils/constant.js";
export default {
  data() {
    return {
   //   isActive: true,
      pageManageData: pageManageData,
    };
  },

  methods: {
    numMenu(value) {
      // this.$store.commit("unit/SET_PAGE", pageManageData.LISTUNIT);
      // this.$store.commit("product/SET_PAGE", pageManageData.LISTPRODUCT);
      this.$store.commit("pageglobal/SET_PAGE", value);
    },
  },
  computed: {
  },
};
</script>

<style scoped>
  .navbar-brand {
    margin-left: 1rem;
    font-size: 30px;
  }
  .active {
  font-size: 20px;
}
</style>
