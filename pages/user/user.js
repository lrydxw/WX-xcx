var app = getApp();
Page({
  data:{
    isLogin:false,
    headImg:"",
    user:""
  },
  toLogin:function(){
    wx.redirectTo({
      url:"../login/login"
    })
  },
  toUserSet:function(){
    wx.redirectTo({
      url:"../userset/userset"
    })
  },
  toOrder:function(){
    wx.navigateTo({
      url:"../order/order"
    })
  },
  //选择照片显示在用户中心
  chooseImg:function(){
    let that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        if(res.data == "ok"){
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function (res) {
              that.setData({
                headImg:res.tempFilePaths
              })
            }
          });
        }
      }
    }); 
          
  },
  onLoad:function(options){
    let that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        if(res.data == "ok"){
            that.setData({
              isLogin:true
            })
        }
        //选择照片显示在用户中心
        // that.chooseImg();
      } 
    })
    wx.getStorage({
      key: 'username',
      success: function(res){
        that.setData({
          user:res.data
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
