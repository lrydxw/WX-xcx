Page({
  data:{
    current:0,
    currentIndex:0,
    random:"获取验证码",
    typePage:""
  },
  //切换手机登录和密码登录
  changeCon:function(e){
    console.log(e.target);
    this.setData({
        currentIndex:e.target.dataset.id,
        current:e.target.dataset.id      
    })
  },
  //获取验证码
  changeRandom:function(){
    let arr = [];
    while(arr.length<4){
      let n = this.getRandom(48,122);		
      if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
        arr.push(String.fromCharCode(n));	
      }
    }
    this.setData({
      random:arr.join("")
    })
  },
  getRandom:function(start,end){
    let d = end+1-start;
	  return Math.floor(Math.random()*d+start);
  },
  //跳转到注册页面
  toRegister:function(){
    wx.navigateTo({
      url:"../register/register"
    })
  },
  //手机登录
  phoneSubmit:function(e){
    console.log("手机号登录",e.detail.value);
    let value = e.detail.value;
    let user = value.phone;
    let short = value.short;
    if(!/^1[34578][0-9]{9}$/.test(user)){
        wx.showModal({
          title: '提示',
          content: '手机号格式输入有误，请重新填写'
        })
    }else if(short != this.data.random){
        wx.showModal({
          title: '提示',
          content: '验证码输入有误，请重新填写'
        })
    }else{
      wx.setStorage({
        key:"isLogin",
        data:"ok",
      })
      wx.setStorage({
        key:"username",
        data:user
      })
      if(this.data.typePage == "detail1"){
        wx.switchTab({
          url:"../cart/cart"
        })
      }else if(this.data.typePage == "detail2"){
         wx.switchTab({
          url:"../find/find"
        })
      }else{
        wx.switchTab({
          url:"../user/user"
        });
      }
    }
  },
  //密码登录
  mimaSubmit:function(e){
    console.log("密码登录",e.detail.value);
    let value = e.detail.value;
    let username = value.username;
    let password = value.password;

    wx.getStorage({
      key: 'register',
      success: function(res) {
          let registerArr = JSON.parse(res.data);
          let flag = true;
          let len = registerArr.length;
          for(let i=0;i<len;i++){
              if(((registerArr[i].username == username)||(registerArr[i].email == username))&&(registerArr[i].password == password)){
                  wx.setStorage({
                    key: 'isLogin',
                    data: "ok",
                  });
                  wx.setStorage({
                    key:"username",
                    data:username
                  })
                  flag = false;
                  if(that.data.typePage == "detail"){
                    let detail = that.data.typePage;
                    wx.switchTab({
                      url:"../cart/cart"
                    })
                  }else{
                    wx.switchTab({
                      url:"../user/user"
                    });
                  }
                  
                  break;
              }
          }
          if(flag){
              wx.showModal({
                title: '提示',
                content: '用户名和密码不符请重新输入'
              });
          }
      },
      //如果失败，说明本地没有存注册信息，那么就把本次的注册信息存进去
      fail:function(){
          wx.showModal({
            title: '提示',
            content: '请先注册账号'
          });
      }
    });
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log("查看登录来源1",options);
    if(options.type){
      this.setData({
        typePage:options.type
      });
    }
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    console.log("查看登录来源2","22");
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    console.log("查看登录来源3","33");
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    console.log("查看登录来源4","44");
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