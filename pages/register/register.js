Page({
  data:{
    randomMsg:"验证码"
  },
  changeRandom:function(){
    let arr = [];
    while(arr.length<4){
      let n = this.getRandom(48,122);		
      if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
        arr.push(String.fromCharCode(n));	
      }
    }
    this.setData({
      randomMsg:arr.join("")
    })
  },
  getRandom:function(start,end){
    let d = end+1-start;
	  return Math.floor(Math.random()*d+start);
  },
  formSubmit:function(e){
      //console.log("注册",e.detail.value);
      let that = this;
      let value = e.detail.value;
      let msg = {
          username:value.username,
          email:value.email,
          password:value.password
      };
      if(!/^1[34578][0-9]{9}$/.test(value.username)){
          wx.showModal({
            title: '提示',
            content: '手机号格式输入有误，请重新填写'
        })
      }else if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value.email)){
          wx.showModal({
            title: '提示',
            content: '邮箱格式输入有误，请重新填写'
        })
      }else if(!/[0-9a-zA-Z\~\!\@\#\$\%\^\&\*\?]{6,20}/.test(value.password)){
          wx.showModal({
            title: '提示',
            content: '密码格式输入有误，请重新填写'
        })
      }else if(value.password != value.password2){
          wx.showModal({
            title: '提示',
            content: '两次输入密码不一致，请重新填写'
        })  
      }else if(that.data.randomMsg != value.random){
          wx.showModal({
            title: '提示',
            content: '验证码输入有误，请重新填写'
        })  
      }else{
          //如果本地存的有注册的信息，那么就先取出来，再把本次注册的信息添加进去
          let registerArr = [];
          wx.getStorage({
            key: 'register',
            success: function(res) {
                registerArr = JSON.parse(res.data);
                let flag = true;
                let len = registerArr.length;
                for(let i=0;i<len;i++){
                    if(registerArr[i].username == msg.username){
                        registerArr[i] = msg;
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    registerArr.push(msg);
                }
                wx.setStorage({
                  key: 'register',
                  data: JSON.stringify(registerArr),
                });
            },
            //如果失败，说明本地没有存注册信息，那么就把本次的注册信息存进去
            fail:function(){
                registerArr.push(msg);
                wx.setStorage({
                  key: 'register',
                  data: JSON.stringify(registerArr),
                })
            }
          });
          wx.navigateTo({
            url:"../login/login"
          });
      }
      
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
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