<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />
    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"

    >
      <template>
        <van-icon class="tool" name="apps-o"></van-icon>
      </template>
    </van-search>
    <!-- 排序选项按钮 -->
     <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格</div>
     </div>
     <div class="goods-list">
      <Goods v-for="(item,index) in searchArr" :key="index" :item="item"></Goods>

     </div>
  </div>
</template>

<script>
import { searchGoodsAPI } from '@/api/search'
import Goods from '@/components/home/Goods.vue'
export default {
  components: {
    Goods

  },
  name: 'search-index',
  data () {
    return {

      page: 1,
      searchArr: []

    }
  },
  computed: {
    // 拿地址栏的参数
    querySearch () {
      return this.$route.query.search
    }
  },
  async created () {
    const res = await searchGoodsAPI({
      categoryId: this.querySearch,
      goodsName: this.$route.query.categoryId,
      page: this.page
    })
    this.searchArr = res.data.list.data
    console.log('search', res)
  }
}
</script>

<style scoped lang="less">
.search{
  width: 100%;
  height: 100vh;
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left{
    color:#333;
  }
  .tool{
    font-size:24px;
    height:40px;
    line-height:40px;
  }
  .sort-btns{
    display: flex;
    height:36px;
    line-height: 36px;
    .sort-item{
      text-align: center;
      flex:1;
      font-size: 16px;
    }
  }

}
.goods-list{
  background-color: #f6f6f6;
}

</style>
