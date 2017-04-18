// pages/order/order.js
Page({
  data:{
    orderList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    //从本地获取商品列表
    wx.getStorage({
      key: 'orderList',
      success: function(res){
        console.log("购物车",res.data == "[null]");
        if((res.data == "[]")||(res.data == "[null]")){
          that.setData({
            isShow:true
          })
        }else{
          let proList = JSON.parse(res.data);
            that.setData({
              orderList:proList,
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
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})