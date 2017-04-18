Page({
  data:{
    leftList:"",
    rightList:"",
    rgiht2:"",
    page:1
  },
  upper:function(e){
    console.log(e);
    this.setData({
      page:0
    })
    var that = this;
    wx.request({    
      url:"http://m.lifevc.com/special/strollData",
      data:{
        Page:that.data.page,
        PageCount:10
      },
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
        //console.log("下拉刷新",res.data.InnerData.StrollList);
        let result = res.data.InnerData.StrollList;
        let length = result.length;
        let left = [];
        let right = [];
        for(let i=0;i<length;i++){
          if(i%2 == 0){
            left.push(result[i]);
          }else{
            right.push(result[i]);
          }
        }
        for(let j=0;j<left.length;j++){
          if(left[j].MarketPrice == null){
            left.splice(j,1);
          }
        }
        for(let j=0;j<right.length;j++){
          if((j>0)&&(right[j].MarketPrice == null)){
            right.splice(j,1);
          }
        }
        let right1 = right.splice(1,right.length);
        let right2 = right.splice(0,1);
        console.log("right2刷新",right2[0]);
        that.setData({
          leftList:left,
          rightList:right1,
          right2:right2[0].ConfigerList
        })
      }
    })
  },
  //上拉加载
  lower:function(e){
    console.log(e);
    var that = this;
    let leftNow = that.data.leftList;
    let rightNow = that.data.rightList;
    let page = that.data.page;
    page++;
    that.setData({
      page:page
    })
    wx.request({    
      url:"http://m.lifevc.com/special/strollData",
      data:{
        Page:that.data.page,
        PageCount:10
      },
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
        console.log("ajax数据请求闲逛",res.data.InnerData.StrollList);
        let result = res.data.InnerData.StrollList;
        let length = result.length;
        let left = [];
        let right = [];
        for(let i=0;i<length;i++){
          if(i%2 == 0){
            left.push(result[i]);
          }else{
            right.push(result[i]);
          }
        }
        for(let j=0;j<left.length;j++){
          if(left[j].MarketPrice == null){
            left.splice(j,1);
          }
        }
        for(let j=0;j<right.length;j++){
          if(right[j].MarketPrice == null){
            right.splice(j,1);
          }
        }
        let leftOver = leftNow.concat(right);
        let rightOver = rightNow.concat(left);
        //console.log("right2",right2[0]);
        that.setData({
          leftList:leftOver,
          rightList:rightOver,
        })
      }
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    wx.request({    
      url:"http://m.lifevc.com/special/strollData",
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
        console.log("ajax数据请求闲逛",res.data.InnerData.StrollList);
        let result = res.data.InnerData.StrollList;
        let length = result.length;
        let left = [];
        let right = [];
        for(let i=0;i<length;i++){
          if(i%2 == 0){
            left.push(result[i]);
          }else{
            right.push(result[i]);
          }
        }
        for(let j=0;j<left.length;j++){
          if(left[j].MarketPrice == null){
            left.splice(j,1);
          }
        }
        for(let j=0;j<right.length;j++){
          if((j>0)&&(right[j].MarketPrice == null)){
            right.splice(j,1);
          }
        }
        let right1 = right.splice(1,right.length);
        let right2 = right.splice(0,1);
        console.log("right1",right1);
        that.setData({
          leftList:left,
          rightList:right1,
          right2:right2[0].ConfigerList
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