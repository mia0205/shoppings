<template>
  <div>
    <router-view></router-view>

  <van-tabbar v-model="active" class="tab" route>
     <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
     <van-tabbar-item icon="apps-o" to="/cate">分类页</van-tabbar-item>
     <van-tabbar-item icon="cart-o" to="/shop">购物车</van-tabbar-item>
     <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
div{
  width: 100%;
  height: 100vh;
  position: relative;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.tab{
  width: 100%;
  height: 350px;
  bottom:0;
  position: fixed;
  margin: 0;
  left: 0;
  right: 0;
}

</style>
