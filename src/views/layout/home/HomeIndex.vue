<template>
  <div class="home" >

    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请在此输入搜索关键词"
      @click="$router.push('/search')"

    />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in swipArr" :key="index">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>

    </van-swipe>

    <!-- 导航 -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        text="新品首发"
        v-for="(item,index) in navArr" :key="index"
        :icon="item.imgUrl"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.jpeg" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <Goods v-for="(item,index) in proArr" :key="index" :item="item"></Goods>

      </div>
    </div>

  </div>
</template>

<script>
import { getHomeDataAPI } from '@/api/home'
import Goods from '@/components/home/Goods.vue'

export default {
  components: {
    Goods

  },
  data () {
    return {
      swipArr: [],
      navArr: [],
      proArr: []

    }
  },
  methods: {

  },
  async created () {
    const res = await getHomeDataAPI()
    console.log(res)

    this.swipArr = res.data.pageData.items[1].data
    this.navArr = res.data.pageData.items[3].data
    this.proArr = res.data.pageData.items[6].data
  }

}
</script>

<style scoped lang="less">
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}

</style>
