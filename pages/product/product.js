// pages/product/product.js
Page({
  data:{
    product:[]
  },
  geturl:function(url,id){
    let that = this;
    wx.request({
      url: url,
      method: 'GET', 
      success: function(res){
        // success
        console.log(res.data.InnerData.Categories)
        let allArr = res.data.InnerData.Categories;
        let len = allArr.length;
        for(let i=0;i<len;i++){
          if(id == allArr[i].ItemIndexId){
            that.setData({
              product:allArr[i].Items
            });
            console.log("shangpin",that.data.product);
            break;
          }
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    let id = options.id;
    let name = options.name;
    let urlArr = [{
     name: "家务",      url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2860'
    },{
      name:"下厨",url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2859'
    },{
      name:"家居服",url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2865'
    },{
      name:"生活",url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2861'
    },{
      name:"软装",url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=3260'
    },{
      name:"床品",url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2862'
    },{
      name:"工作和旅行",url:'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2863'
    }
    ];
    let len = urlArr.length;
    let str = "";
    for(let i=0;i<len;i++){
      if(name == urlArr[i].name){
        str = urlArr[i].url;
      }
    }
    this.geturl(str,id);
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