'# vue-manyAddress' 

<template>
  <div class="pr full_size" style="z-index:200">
    <a class="font-s4r" href="javascript:void(0)">选择地址</a>
    <three-level-linkage-address
      :showChose="showChose" // 是否展示地址选择插件 --- true||false
      :defaultAddress="defaultAddress" // 插件默认地址 ---- json
      :closeAdressList="closeAdressList" // 选择完成回调函数（data）  在回调中手动关闭插件  ---- function
    />
  </div>
</template>

<script>
  import ThreeLevelLinkageAddress from '@/components/ThreeLevelLinkageAddress'
  export default {

    data () {
      return {
        showChose: true,
        defaultAddress: null,
      }
    },

    methods:{
      closeAdressList (data) {
        console.log(data)
        this.showChose = false
      }
    },

    components:{
      ThreeLevelLinkageAddress
    }

  }
</script>
