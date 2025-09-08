<template>
  <div class="countbox">
    <button class="minus" @click="minusFn">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button class="add" @click="addFn">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      // 默认值
      default: 1
    }

  },
  data () {
    return {

    }
  },
  methods: {
    minusFn () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    addFn () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      console.log(e.target)
      const num = +e.target.value
      this.$emit('input', num)
    }
  }

}
</script>

<style lang="less" scoped>
.countbox{
  width: 110px;
  display: flex;
  .add,.minus{
    width: 30px;
    height: 30px;
    outline: none;
    border:none;
    background-color: #efefef;
  }
  .inp{
    width: 40px;
    height: 30px;
    outline: none;
    border:none;
    margin:0 5px;
    background-color: #efefef;
    text-align: center;
  }

}
</style>
