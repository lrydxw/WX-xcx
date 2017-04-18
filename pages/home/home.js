var app = getApp();
Page({
  data:{
    currentIndex:0,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    current:0,
    bannerList:"",
    proList:"",
    jiawu_isshow_tag:false,
    work_header:[],
    work_bannerimg:"",
    work_contit:"",
    work_conList:[],
    tap:true
  },
  changeCon:function(e){
    console.log(e.target);
    this.setData({
        currentIndex:e.target.dataset.id,
        current:e.target.dataset.id,
        work_header:[],
        work_bannerimg:"",
        work_contit:"",
        work_conList:[],
        tap:false  
    })
    let id = e.target.dataset.id;
    if(id>0){
      this.qiehuan(id);
    }
  },
  changeItem:function(e){
    // console.log(e.detail);
    this.setData({
      currentIndex:e.detail.current
    })
    let count = e.detail.current.toString();
    //console.log(typeof count.toString());
    if(this.data.tap && (count>0)){
      this.qiehuan(count);
    } 
  },
  all:function(url){
    console.log("all");
    let that = this;
    wx.request({
      url: url,
      success: function(res){
        console.log(res.data);
        let result = res.data.InnerData;
        that.setData({
          work_header:result.Categories,
          work_bannerimg:result.DesignerMessageImg,
          work_contit:result.CEORecommendTitle.Text,
          work_conList:result.CEORecommends,
          tap:true
        })
      }
    })
  },
  qiehuan:function(id){
    let urlArr = ['http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2860','http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2859',
'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2865',
'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2861',
'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=3260',
'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2862',
'http://app.lifevc.com/1.0/v_and_4.4.0_32/Categories/Category?itemindexid=2863'
    ];
    this.all(urlArr[id*1-1]);
  },
  toDetail:function(e){
    console.log("toDetail",e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  onLoad:function(options){
    var that = this;
    wx.request({    url:"http://app.lifevc.com/1.0/v_and_4.4.0_32/contents/home_v2?&nt=1&w=1080&h=1800",
      header: {
      'content-type': 'application/json'
      },
      success: function(res){
        console.log("ajax数据请求用户中心",res.data);
        let result = res.data.InnerData;
        let resultArr = result.splice(3,result.length-4);
        console.log("result__yonghu",result);
        console.log("resultArr__yonghu",resultArr);
          that.setData({
            bannerList:result[0].InnerData,
            proList:resultArr
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
