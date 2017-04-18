Page({
  data:{
    id:"",
    headerList:[],
    Caption:"",
    name:"",
    price:"",
    youhui:[],
    prompts:[],
    server:"",
    num:1,
    totalNum:0,
    isLogin:false
  },
  toCart:function(){
    console.log("toCart",this);
    if(this.data.isLogin){
      console.log("1111");
      wx.switchTab({
        url: '../cart/cart'
      })
    }else{
      console.log("2222");
      wx.navigateTo({
        url: '../login/login?type=detail1'
      });
    }
  },
  addCart:function(){
    //首先判断是否登录。如果是登录状态，然后存数据，否则跳转到登录页面
    if(this.data.isLogin){
      let proList = {
        id:this.data.id,
        name:this.data.name,
        img:this.data.headerList[0].ImageUrl,
        price:this.data.price,
        num:this.data.num,
        totalPrice:(this.data.price*1)*(this.data.num*1)
      };
      console.log("加入购物车",proList);
      let proArr = [];
      let that = this;
      let totalNum = 0;
      //先判断本地是否存有商品列表
      wx.getStorage({
        key: 'proList',
        success: function(res){
          //调用成功，说明本地存有商品列表
          //如果商品列表被清除过，只剩下[]或者[null]
          if((res.data == "[]")||(res.data == "[null]")){
            console.log("xiangqing111");
            proArr.push(proList);
            that.setData({
              totalNum:proList.num
            });
            wx.setStorage({
              key: 'proList',
              data: JSON.stringify(proArr),
            });
          }else{
            //如果本地存的是json字符串，先取出来，判断现在添加的商品，是否已经添加过
            console.log("xiangqing222");
            proArr = JSON.parse(res.data);
            let len = proArr.length;
            let flag = true;
            for(let i = 0;i<len;i++){
              if(proArr[i].id == proList.id){
                proArr[i].num = (proArr[i].num)*1+(proList.num)*1;
                proArr[i].totalPrice = (proArr[i].totalPrice)*1+(proList.totalPrice)*1;
                flag = false;
                break;
              }
            }
            for(let j=0;j<len;j++){
              totalNum = proArr[j].num*1+totalNum*1;
            }
            if(flag){
              proArr.push(proList);
              totalNum = totalNum*1+proList.num*1;
            }
            console.log("总数量33",totalNum);
            that.setData({
              totalNum:totalNum
            });
            console.log("总数量11",that.data.totalNum);
            wx.setStorage({
              key: 'proList',
              data: JSON.stringify(proArr),
            });
          }
        },
        //调用失败，说明本地没有存过列表
        fail: function() {
          // fail
          proArr.push(proList);
          wx.setStorage({
            key: 'proList',
            data: JSON.stringify(proArr),
            success:function(){
              that.setData({
                totalNum:proList.num*1
              });
              console.log("总数量22",that.data.totalNum);
            }
          });
        }
      });
    }else{
      wx.navigateTo({
        url: '../login/login?type=detail2'
      });
    }
  },
  prev:function(){
    let num = this.data.num;
    num--;
    this.setData({
      num:num
    })
  },
  add:function(){
    let num = this.data.num;
    num++;
    this.setData({
      num:num
    })
    console.log(this.data.num);
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log(options);
     this.setData({
      id: options.id
    });
    var that = this;
    wx.request({    
      url:"http://app.lifevc.com/1.0/v_and_4.4.0_32/items/itemview",
      data:{
          Iteminfoid:that.data.id
      },
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
          console.log("详情页",res.data.InnerData);
          let result = res.data.InnerData;
          that.setData({
            Caption:result.Caption,
            headerList:result.Headers,
            name:result.Name,
            price:result.SalePrice,
            youhui:result.ServiceIcon,
            prompts:result.Prompts,
            server:result.Services[0].Text
          })
      }
    });

    wx.getStorage({
      key: 'proList',
      success: function(res){
        
        let arr = JSON.parse(res.data);
        let len = arr.length;
        let totalNum = that.data.totalNum;
        for(let i=0;i<len;i++){
          totalNum = totalNum*1+arr[i].num*1
        }
        that.setData({
          totalNum:totalNum
        })
        //console.log("总数量",that.data.totalNum);
      }
    });
    wx.getStorage({
      key: 'isLogin',
      success: function(res){
        if(res.data == "ok"){
          that.setData({
            isLogin:true
          });
        }
      }
    });
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