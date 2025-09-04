<template>
  <div class="container">
    <div class="header">
      <span class="he" @click="$router.push('/home')">
        <van-icon name="revoke" />
      </span>
      <h2>商品搜索</h2>

    </div>
    <div class="search">
      <input type="text" placeholder="请输入您搜索的商品" v-model="goods">
      <van-button type="primary" size="small" @click="searchFn(goods)">搜索</van-button>

    </div>
    <div class="main" v-if="searchArr.length > 0">
      <span class="m1">最近搜索</span>
      <span class="m2" @click="delFn">
        <van-icon name="delete-o"></van-icon>
      </span>
      <ul v-for="(item,index) in searchArr" :key=index @click="searchFn(goods)">
        <li>{{ item }}</li>

      </ul>
    </div>

  </div>
</template>

<script>
import { getSearchInfo, setSearchInfo } from '@/utils/storage'
export default {
  name: 'search-index',
  data () {
    return {
      searchArr: getSearchInfo(),
      goods: ''

    }
  },
  methods: {
    searchFn (key) {
      const categoryId = 1
      const ind = this.searchArr.indexOf(key)
      if (ind !== -1) {
        this.searchArr.splice(ind, 1)
      }
      this.searchArr.unshift(this.goods)

      setSearchInfo(this.searchArr)
      // 携带查询参数
      this.$router.push(`/searchlist/${categoryId}?search=${key}`)
    },
    delFn () {
      this.searchArr = []
      setSearchInfo([])
    }
  }
}
</script>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #f8f7f7;
}
.header{
  position: fixed;
  width: 98%;
  height: 50px;
  top:0;
  bottom: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:3px;

  h2{
    display: inline-block;

  }
  .he{
    position: absolute;
    left:6px;
  }
}
.search{
  width: 90%;

  position: absolute;
  top:58px;
  display: flex;
  margin-left: 30px;
  input{
    width: 230px;
    border:1px solid #fff;

  }

}
.main{
  width: 100%;
  position: absolute;
  top:120px;
  .m1{
    margin-left:6px;
  }
  .m2{
    float:right;
  }
  ul{
    margin-top:10px;
    box-sizing: border-box;
    width: 70px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-left:8px;
    text-align: center;
  }
}

</style>
