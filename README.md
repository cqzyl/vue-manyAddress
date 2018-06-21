'# vue-manyAddress' 
<h1>vue多级地址选取插件</h1>
<dl>
  <dt>适用情况：</dt>
  <dd>3级地址  -------  省市区</dd>  
  <dd>4级地址  -------  省市区镇</dd>  
  <dd>多级地址  ------  省市区（镇）</dd>  
</dl>
<pre>
&lt;template&gt;
  &lt;div class="pr full_size" style="z-index:200"&gt;
    &lt;a class="font-s4r" href="javascript:void(0)"&gt;选择地址&lt;/a&gt;
    &lt;three-level-linkage-address
      :showChose="showChose" // 是否展示地址选择插件 --- true||false
      :defaultAddress="defaultAddress" // 插件默认地址 ---- json
      :closeAdressList="closeAdressList" // 选择完成回调函数（data）  在回调中手动关闭插件  ---- function
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
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
&lt;/script&gt;
</pre>
