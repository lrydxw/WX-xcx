Page({
  data:{
    inputValue:"",
    name:"家务",
    proList:"",
    proName:""
  },
  bindinput:function(e){
    console.log(e.detail.value);
    this.setData({
      inputValue:e.detail.value,
    })
  },
  bindButtonTap:function(){
    let str = this.data.inputValue;
  },
  changeCon:function(e){
    console.log("列表",e.target.id);
    this.setData({
      name:e.target.id
    })
    var that = this;
    wx.request({    url:"http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/AllCategory_v2",
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
        console.log("全部产品",res.data.InnerData);
        let result = res.data.InnerData;
        for(let i=0;i<result.length;i++){
          if(result[i].Name == that.data.name){
            that.setData({
              proList:result[i].Children,
              proName:result[i].Name
            })
          }
        }
        console.log("过滤后的数据",that.data.proList);
      }
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    wx.request({    url:"http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/AllCategory_v2",
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
        console.log("全部产品",res.data.InnerData);
        let result = res.data.InnerData;
        that.setData({
              proList:result[0].Children,
              proName:result[0].Name
            })
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})