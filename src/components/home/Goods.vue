<template>
  <div class="goods">
    <div class="left">
      <img :src="item.goods_image" alt="">
    </div>
    <div class="right">
      <p class="text-ellipsis-2">
        {{ item.goods_name }}
      </p>
      <p class="count">已售{{item.goods_sales}}件</p>
      <p class="price">
        <span class="new">￥{{item.line_price_min}}</span>
        <span class="old">￥{{item.goods_price_max}}</span>
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'goods-index',
  data () {
    return {

    }
  },
  props: {
    item: Object

  }
}
</script>

<style lang="less" scoped>
.goods{
  height: 148px;
  margin-bottom: 6px;
  padding:10px;
  background-color: #fff;
  display: flex;
  .left{
    width: 127px;
    img{
      width: 120px;
      height: 120px;
      border: 1px solid #999;
    }

  }

  .right{
    flex:1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .price{
      color: #999;
      font-size: 16px;
    }
    .new{
      color: #f03c3c;
      margin-right:10px;
    }
    .old{
      text-decoration: line-through;
      font-size: 12px;
    }
  }
}

</style>
