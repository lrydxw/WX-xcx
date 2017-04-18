// pages/search/search.js
Page({
  data:{
    proList:[],
    totalNum:0,
    totalPrice:0,
    checked:false,
    allChecked:false,
    isShow:false,
    totalList:[]
  },
  //删除商品
  del:function(e){
    console.log("删除",e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: '提示',
      content: "亲,您确定要删除该商品吗？",
      success: function(res) {
        let proList = that.data.proList;
        let len = proList.length;
        console.log("proList1",proList);
        if (res.confirm) {
          console.log('用户点击确定');
          for(let i=0;i<len;i++){
            if(proList[i].id == id){
              proList.splice(i,1);
              console.log("proList2",proList);
              break;
            }
          }
          wx.setStorage({
            key: 'proList',
            data: JSON.stringify(proList)
          })
          that.setData({
            proList:proList,
            totalNum:0,
            totalPrice:0,
            checked:false,
            allChecked:false
          })
        }
      }
    })
  },
  //全选
  changeAll:function(e){
    console.log("全选按钮",e.target.dataset.name);
    let name = e.target.dataset.name;
    if(name){
      this.onHide();
    }else{
      //console.log("test");
      let proList = this.data.proList;
      let proList_len = proList.length;
      let totalNum = 0;
      let totalPrice = 0;
      for(let i=0;i<proList_len;i++){
        totalNum = totalNum*1+proList[i].num*1;
        totalPrice = totalPrice*1+proList[i].totalPrice*1
      }
      this.setData({
        checked:true,
        allChecked:true,
        totalNum:totalNum,
        totalPrice:totalPrice,
        totalList:proList
      })
    }
  },
  //单选
  checkboxChange:function(e){
    //console.log("单选",e.detail.value)
    let id = e.detail.value;
    let proList = this.data.proList;
    let id_len = id.length;
    let proList_len = proList.length;
    let totalNum = 0;
    let totalPrice = 0;
    let totalList = [];
    for(let i=0;i<id_len;i++){
      for(let j=0;j<proList_len;j++){
        if(id[i] == proList[j].id){
          totalNum = totalNum*1+proList[j].num*1;
          totalPrice = totalPrice*1+proList[j].totalPrice*1
          totalList.push(proList[j]);
        }
      }
    }
    this.setData({
      totalNum:totalNum,
      totalPrice:totalPrice,
      totalList:totalList
    })
  },
  //结算
  count:function(){
    let totalList = this.data.totalList;
    let proList = this.data.proList;
    let total_len = totalList.length;
    let pro_len = proList.length;
    //存订单列表
    if(this.data.totalNum>0){
      wx.getStorage({
        key: 'orderList',
        success: function(res){
          //获取成功，说明之前存的有数据
          let orderList = JSON.parse(res.data);
          wx.setStorage({
            key: 'orderList',
            data: JSON.stringify(orderList.concat(totalList))
          })
        },
        fail: function() {
          // 获取失败，说明之前没有存订单
          wx.setStorage({
            key: 'orderList',
            data: JSON.stringify(totalList)
          })
        }
      });
      //把结算的数据从原有的数组中去除
      console.log("结算时",totalList);
      let newList = [];
      for(let i=0;i<pro_len;i++){
        let flag = true;
        for(let j=0;j<total_len;j++){
          if(totalList[j].id == proList[i].id){
            flag = false;
            break;
          }
        }
        if(flag){
          newList.push(proList[i]);
        }
      }
      console.log("订单列表",newList);
      //重新更新状态
      this.setData({
        proList:newList,
        totalNum:0,
        totalPrice:0,
        checked:false,
        allChecked:false
      });
      //如果结算后，购物车没有商品了
      if(newList.length<1){
        this.setData({
          isShow:true
        });
      }
      //重新存储本地商品列表
      wx.setStorage({
        key: 'proList',
        data: JSON.stringify(newList)
      });
      wx.showModal({
        title: '提示',
        content: '结算成功，可以前往订单页查看订单',
        success:function(res){
          if (res.confirm) {
            wx.navigateTo({
              url: '../order/order'
            });
          }
        }
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择商品'
      });
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    //从本地获取商品列表
    wx.getStorage({
      key: 'proList',
      success: function(res){
        console.log("购物车",res.data == "[null]");
        if((res.data == "[]")||(res.data == "[null]")){
          that.setData({
            isShow:true
          })
        }else{
          let proList = JSON.parse(res.data);
            that.setData({
              proList:proList,
              isShow:false
            })
        }
        
      },
      fail: function() {
        // fail
        that.setData({
          isShow:true
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log("购物车","onShow")
    this.onLoad();
  },
  onHide:function(){
    // 页面隐藏
    console.log("购物车","onHide");
    this.setData({
      totalNum:0,
      totalPrice:0,
      checked:false,
      allChecked:false
    });
  },
  onUnload:function(){
    // 页面关闭
    console.log("购物车","onUnload")
  }
})