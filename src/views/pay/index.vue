<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" fixed left-arrow  @click-left="$router.go(-1)">
    </van-nav-bar>
    <div class="address">
      <van-icon name="logistics" class="shop" />
      <div class="t" v-if="selectedAddress.address_id">
        <span>{{selectedAddress.name}} </span>
        <span>{{ selectedAddress.phone }}</span>
        <span>{{ selectedAddress.detail }}</span>
      </div>
      <div class="arrow">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="content">
      <div class="head" v-for="(item,index) in orderList" :key="index">
        <div class="left">
          <img :src="item.goods_image" alt="">
        </div>
        <div class="word">
          <div class="up">
            <p>{{ item.goods_name }}</p>

          </div>
          <div class="down">
            <span>{{ item.total_num }}</span>
            <span>￥{{ item.goods_price*item.total_num }}</span>
          </div>
        </div>
      </div>
      <div class="foot">
        <span>共{{totalSum}}件商品，合计:￥{{ allPrice }}</span>
      </div>
      <!-- 细节 -->
       <div class="detail">
        <div class="allSum">
        <span>订单总金额</span>
        <span>￥{{ allPrice }}</span>
      </div>
      <div class="youhui">
        <span>优惠券:</span>
        <span>无优惠券可用</span>
      </div>
      <div class="peisong">
        <span>配送费用</span>
        <span>+￥0.00</span>
      </div>

       </div>
       <div class="payway">
        <span class="way">支付方式</span>
        <span class="price">
          <van-icon name="balance-o" />
          <p>余额支付(可用￥{{personal.balance}}元)</p>
          <van-icon name="passed" />

        </span>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea v-model="remark"  placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
      </div>

      <!-- 底部提交 -->
      <div class="footer-fixed">
      <div class="left">实付款：￥{{ allPrice }}<span></span></div>
      <div class="tipsbtn" @click="subOrderFn">提交订单</div>
      </div>

    </div>

  </div>
</template>

<script>
import { CheckOutOrderAPI, submitCheckoutAPI } from '@/api/order'
import { getAddressListAPI } from '../../api/pay'
export default {
  name: 'pay-index',
  data () {
    return {
      addressList: [],
      orderList: [],
      personal: {},
      remark: ''
    }
  },
  methods: {
    async getAddressList () {
      const res = await getAddressListAPI()
      console.log('收货地址', res)
      this.addressList = res.data.list
    },
    async getOrderList () {
      if (this.mode === 'cart') {
        const res = await CheckOutOrderAPI(this.mode, this.cartIds)
        console.log('获取结算', res)
        this.orderList = res.data.order.goodsList
        this.personal = res.data.personal
      }
      if (this.mode === 'buyNow') {
        const res = await CheckOutOrderAPI(this.mode, {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId

        })
        console.log('直接购买', res)
        this.orderList = res.data.order.goodsList
        this.personal = res.data.personal
      }
    },
    async subOrderFn () {
      if (this.mode === 'cart') {
        const res = await submitCheckoutAPI(this.mode, this.cartIds, this.remark)
        console.log('sub', res)
        if (res.status !== 200) {
          this.$toast(res.message
          )
        }
      }
      if (this.mode === 'buyNow') {
        const res = await submitCheckoutAPI(this.mode, {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId,
          remark: this.remark
        })
        console.log('订单', res)
        if (res.status !== 200) {
          this.$toast(res.message
          )
        }
      }
      this.$toast('支付成功')
      this.$router.replace('/myorder')
    }

  },
  created () {
    this.getAddressList()
    this.getOrderList()
  },
  computed: {
    selectedAddress () {
      return this.addressList[0] || {}
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    totalSum () {
      return this.orderList.reduce((sum, item) => {
        return sum + item.total_num
      }, 0)
    },
    allPrice () {
      return this.orderList.reduce((sum, item) => {
        return sum + item.total_num * item.goods_price
      }, 0)
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    }
  }
}
</script>

<style scoped lang="less">
.pay{
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #ebeaea;
  .van-nav-bar{
    border:1px solid #ccc;
  }
  .address{
    height: 120px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border:1px solid #ccc;
    color: #666;

    .shop{
      width: 20px;
      height: 20px;
      margin-top:40px;
    }
    .t{
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      margin-top: 30px;
    }
    .arrow{
      margin-top: 40px;
    }

  }
  .content{
    width: 100%;
    height: 450px;
    background-color: #fff;
    margin-top: 15px;

    .head{
      width: 100%;
      height: 160px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        margin-left: 5px;
        img{
          width: 100px;
          height: 100px;
        }
      }
      .word{
        width: 200px;
        height: 100px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .up{
          margin-top: 10px;
        }
        .down{
          display: flex;
          justify-content: space-between;
          margin-top:30px;
        }
      }
    }
    .foot{
      width: 100%;
      height: 20px;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;

    }
    .detail{
      width: 100%;
      height: 160px;
      background-color: #fff;
      border:1px solid #ccc;
      .allSum{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;
      }
      .youhui{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;
      }
      .peisong{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;

      }
    }
    .payway{
      width: 100%;
      height: 120px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .way{
        width: 100%;
        height: 20px;
        display: flex;
        align-items:center;

      }
      .price{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;

      }

    }
    .buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}
    .footer-fixed {
     position: fixed;
     background-color: #fff;
     left: 0;
     bottom: 0;
     width: 100%;
     height: 46px;
     line-height: 46px;
     border-top: 1px solid #efefef;
     font-size: 14px;
     display: flex;
    .left {
     flex: 1;
     padding-left: 12px;
     color: #666;
    span {
      color:#fa2209;
    }
  }
   .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
   }
}
  }
}

</style>
