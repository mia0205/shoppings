<template>
  <div class="cart">
    <div v-if="isLogin && cartlist.length >0">
      <van-nav-bar title="购物车" fixed>
    </van-nav-bar>
    <div class="cart-title">
      <span class="left">共{{cartTotal}}件商品</span>
      <span class="right" @click="editFn">
        <van-icon name="edit" />
        编辑
      </span>
    </div>
    <div class="content" v-for="(item,index) in cartlist" :key="index">

        <van-checkbox  icon-size="18" @click="handleCheck(item.goods_id)" :value="item.isChecked"></van-checkbox>
        <div class="show">
          <img :src="item.goods.goods_image" alt="">
        </div>

      <div class="info">
        <span class="name">{{ item.goods.goods_name }}</span>
        <span class="bottom">
          <div class="pri">￥{{ item.goods.goods_price_max }}</div>
          <CountBox :value="item.goods_num" @input="(value)=>changeCount(value,item.goods_id,item.goods_sku_id)"></CountBox>
        </span>
      </div>

    </div>
    <div class="cart-footer">
      <div class="all-check">
          <van-checkbox icon-size="18" :value="isAllChecked" @click="allCheckedFn"></van-checkbox>
          全选
      </div>
      <div class="all-price">
        <span class="price">合计:￥{{ cartSum }}</span>

      <van-button class="sum" color="orange" v-if="flag" @click="deleteFn">删除</van-button>
      <van-button color="orange" class="sun" v-else>结算({{ cartNum }})</van-button>
      </div>
    </div>
    </div>
    <div v-else class="empty">
      <span class="shop">您的购物车是空的，快去逛逛吧</span>
      <div class="btn" @click="this.$router.push('/')">逛一逛
      </div>

    </div>

  </div>
</template>

<script>

import CountBox from '@/components/CountBox.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CountBox
  },
  data () {
    return {
      isChecked: false,
      flag: false

    }
  },
  methods: {
    handleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    allCheckedFn () {
      this.$store.commit('cart/reversCheck', !this.isAllChecked)
    },
    changeCount (goodsNum, goodsId, goodsSkuId) {
      console.log(goodsNum, goodsId, goodsSkuId)
      this.$store.dispatch('cart/updateCountBox', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    editFn () {
      this.flag = !this.flag
    },
    deleteFn () {
      if (this.cartNum === 0) {
        return false
      }
      this.$store.dispatch('cart/deleteFn')
    }

  },
  created () {
    if (this.$store.getters.token) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  computed: {
    cartlist () {
      const list = this.$store.state.cart.cartlist
      console.log('购物车数量', list)
      return list
    },
    ...mapGetters('cart', ['cartTotal', 'cartNum', 'cartSum', 'isAllChecked']),
    isLogin () {
      return this.$store.getters.token
    }

  },
  watch: {
    flag (value) {
      if (value) {
        this.$store.commit('cart/reversCheck', false)
      } else {
        this.$store.commit('cart/reversCheck', true)
      }
    }

  }

}
</script>

<style scoped lang="less">
.cart{
  width: 100%;
  height: 100vh;
  padding-bottom: 100px;
  padding-top: 45px;
  background-color: #f5f5f5;
  .cart-title{
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    .left{
      margin-left:5px;
    }
    .right{
      margin-right: 5px;
    }

  }
  .content{
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .van-checkbox{
      margin-left:8px;
      margin-right: 10px;
    }
    .show{
      width: 100px;
      height: 110px;
    }
    .show img{
      width: 100px;
      height: 100px;
      padding-top: 5px;
      margin-bottom: 5px;

    }

    .info{
      display: flex;
      flex-direction: column;
      width: 200px;
      position: relative;
      .name{
        padding-top: 5px;
        margin-left:5px;
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0px;
        .pri{
          margin-right:20px;
          margin-left:8px;
        }
        .CountBox{
          margin-right:6px;

        }
      }

    }

  }
  .cart-footer{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom:50px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .all-check{
      display: flex;
      align-items: center;
      .van-checkbox {
      margin-right: 5px;
      margin-left:5px;
    }
    }
    .price{
      margin-right:12px;
    }

  }
  .empty{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn{
      width: 50px;
      height: 25px;
      background-color: orange;
      border-radius: 15px;
      text-align: center;
      font-size: 13px;
      margin-top:10px;
    }
  }
}

</style>
