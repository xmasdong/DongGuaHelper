//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (e) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.setStorageSync('headimgurl', res.userInfo.avatarUrl);
              wx.setStorageSync('nickname', res.userInfo.nickName);
            }
          });
          var js_code=e.code;
          wx.request({
            url: 'https://wx.qylcyz.com/openid',
            data: {
              code:js_code,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function(res){
            
             that.globalData.openid=res.data.openid;
             that.globalData.session_key=res.data.session_key;
             that.globalData.sign=res.data.sign;
             wx.setStorageSync('openid', res.data.openid);
             
            
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          });
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    openid:null,
    session_key:null,
    sign:null,
  }
})