Page({
 
    data: {
        grids: null,
    },
   onLoad:function(options){
    
    // 生命周期函数--监听页面加载
    var that=this;
    wx.request({
      url: 'https://wx.qylcyz.com/get/menu',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
            grids:res.data
        });
      },
    })
    wx.setNavigationBarTitle({
      title: '冬瓜学长pro',
      success: function(res) {
        // success
      }
    })
   },
  
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '清职人自己的小程序', // 分享标题
      desc: '点击开启小程序', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  }
})
