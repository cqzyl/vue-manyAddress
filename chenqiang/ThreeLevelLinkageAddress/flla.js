/**
 * Created by Administrator on 2018/3/6.
 */

import {
  CITY
} from './city'

export default {
  name: 'ThreeLevelLinkageAddress',
  props:{ // 是否显示插件
    showChose:{
      type: Boolean,
      default(){
        return true;
      }
    },
    defaultAddress: null,// 默认地址 不存在则不传 格式：。。。
        //  [
        //    {//省 0
        //      id: 0,
        //      name: '省'
        //    },{// 市 1
        //      id: 1,
        //      name: '市'
        //    },{// 区 2
        //      id: 2,
        //      name: '区'
        //    },{// 镇 3
        //      id: 3,
        //      name: '镇'
        //    }
        //  ]
    closeAdressList:{
      type: Function, // 插件回调 
      default(){
        return function(data){
          console.log(data);
          //  data：[
          //    {//省
          //      id: 0,
          //      name: '省'
          //    },{// 市
          //      id: 1,
          //      name: '市'
          //    },{// 区
          //      id: 2,
          //      name: '区'
          //    },{// 镇
          //      id: 3,
          //      name: '镇'
          //    },
          //  ]
        }
      }
    }
  },
  data () {
    return {
      
      showLastNav: true,
      showLoading: true,
      addressArr: [],
      addressNavActive: 0,

      // 静态地址库
      info: [],
      addressWarehouse:[]
    }
  },
  methods: {
    async setdefaultAddress(a){

      this.addressArr = [];
      this.showLoading = true;
      if(!a || !a.length){
        let data = this.addressWarehouseSet(1);
        this.setAddressData(data,0);
        // this.addressSelected(1);
        // this.showLastNav = true;
      }else{
        // 数据过滤
        for(let i = 0, alen = a.length; i < alen; i++){
          if(!a[i].name){
            a.splice(i,alen);
          }
        }
        // 请求列表
        let data = await Promise.all([
            this.addressWarehouseSet(1),
            a[0] && this.addressWarehouseSet(2,a[0].id),
            a[1] && this.addressWarehouseSet(3,a[1].id),
            a[2] && this.addressWarehouseSet(4,a[2].id)
        ]);
        let dlen = data.length;
        for(let i = 0; i < dlen; i ++){
          if(data[i]) {
            this.setAddressData(data[i],i);
          }
        }
        this.addressSelected(a.length - 1);
        this.showLastNav = false;
        this.addressArr = a;
      }
      this.showLoading = false;
      this.closeOut()
      // this.closeAdressList(this.addressArr);
    },
    addressSelected(navIndex){
      // 正在选择的 省||市||区
      this.addressNavActive = navIndex;
    },

    async getAddressId(id, name, navIndex){
      // loading.start
      this.showLoading = true;

      // 当前选中的 省||市||区
      this.addressArr.splice(
        navIndex,
        this.addressArr.length - navIndex,
        { id, name }
      )

      // 请求数据
      if(navIndex < 2) {
        let data = this.addressWarehouseSet(navIndex + 2, id) // level,id
        console.log(data,123)
        // 数据处理
        let n = this.setAddressData(data, navIndex + 1);
        
        // 正在选择的 省||市||区
        if (n) {
          this.addressNavActive = navIndex + 1;
          this.showLastNav = true;
        }else{
          this.showLastNav = false;
          // 导出数据并关闭列表 addressWarehouseSet
          this.closeOut();
        }
      }else{
        this.showLastNav = false;
        // 导出数据并关闭列表 addressWarehouseSet
        this.closeOut();
      }
      // loading.end
      this.showLoading = false;
    },
    setAddressData(data,navIndex) {
      let r = true;

      if(data){
        this.info.splice(
          navIndex,
          this.info.length - navIndex,
          data
        );
        r = true;
      } else {
        r = false;
      }

      return r;
    },
    closeOut(){
      let dataOut = null;
      if(!this.showLastNav){
        dataOut = this.addressArr
      }
      // console.log(this.showLastNav);
      // 导出数据并关闭列表
      this.closeAdressList(dataOut);
      // console.log(JSON.stringify(this.addressArr));
    },

    addressWarehouseSet (level, id) {
      let res = id ? CITY[level][id]: CITY[level]
      return res
    }
  },

  mounted(){
    window.setTimeout(()=>{
      this.setdefaultAddress(this.defaultAddress);
    }, 10);
    // console.log(this.defaultAddress);
  }
};
