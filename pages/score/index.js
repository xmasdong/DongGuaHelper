// pages/score/index.js
var app = getApp()
Page({
  data:{
    name:null,
    openid:null,
    user:null,
    score:null,
  },
onLoad:function(options){
     wx.setNavigationBarTitle({
     title: '成绩单'
    })
    var sign=wx.getStorageSync('sign');
    console.log(sign);
    // 生命周期函数--监听页面加载
   if(sign!=1) {//未绑定教务系统
      wx.showLoading({
      title: '需要授权...',
      })
      setTimeout(function(){
      wx.navigateTo({
        url: '../login/login',
      })
      },1500)
      
   }
    this.setData({
      openid:app.globalData.openid,
      name:app.globalData.openid,
    });
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow:function(){
     var that=this
     var openid =wx.getStorageSync('openid');
     wx.request({
     url: 'https://wx.qylcyz.com/api/user/'+openid,
     data: {},
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     // header: {}, // 设置请求的 header
     success: function(res){
      console.log(res)
      that.setData({
        user:res.data.user,
        score:res.data.score
      });
     },
     fail: function(res) {
       // fail
     },
     complete: function(res) {
       // complete
     }
   })
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
      title: '围观'+wx.getStorageSync('userInfo').nickName+'的成绩单', // 分享标题
      desc: '这个是？？？', // 分享描述
      path: '/page/index/index' // 分享路径
    }
  }
})