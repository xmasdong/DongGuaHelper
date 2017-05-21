Page({
  data:{
    name:null,
    from_:null,
    content:null,
    date:null,
    rank:null,
    replay:null,
    detail_id:null,
    hid:true,
    inputShowed: false,
    replay_content:null,
    list_id:null,
  },

   showInput: function (e) {
        this.setData({
            inputShowed: true,
            createShowed:true
        });
    },
 hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            searchShowed:false,
            createShowed:false,
        });
        },
  sendmsg:function(e){
   
    var that=this;
    var openid=wx.getStorageSync('openid');
    var nickname=wx.getStorageSync('nickname');
    var headimgurl=wx.getStorageSync('headimgurl');
    var replay_content=that.data.replay_content;
    var id=that.data.list_id;

    wx.request({
      url: 'https://wx.qylcyz.com/biaobai/create/replay',
      data: {
        'openid':openid,
        'nickname':nickname,
        'headimgurl':headimgurl,
        'replay_content':replay_content,
        'id':id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        wx.hideLoading();
                    if (res.data.errMsg == 'ok') {
                        wx.showToast({
                            title: '回复成功',
                            icon: 'success',
                            duration: 2000
                        })

                    wx.request({
      url: 'https://wx.qylcyz.com/biaobai/list/'+id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
       that.setData(
         {
           hid:false,
           detail_id:id,
           name:res.data.data.toname,
           from_:res.data.data.username,
           date:res.data.data.dateline,
           replay:res.data.replay,
           content:res.data.data.content,
           rank:res.data.rank,
            inputShowed: false,
            searchShowed:false,
            createShowed:false,
         }
       );
      },
    })



                    }
                       
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

  },
inputTyping: function (e) {
       var that =this;
        that.setData({
            replay_content:e.detail.value,
            });
    },

  onLoad:function(options){
    wx.setNavigationBarTitle({
          title: '详情',
          success: function(res) {
            // success
          }
        })
    var that=this;
    var id=options.id
    this.setData({
      list_id:id,
    });

    wx.request({
      url: 'https://wx.qylcyz.com/biaobai/list/'+id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
       that.setData(
         {
           hid:false,
           detail_id:id,
           name:res.data.data.toname,
           from_:res.data.data.username,
           date:res.data.data.dateline,
           replay:res.data.replay,
           content:res.data.data.content,
           rank:res.data.rank,
         }
       );
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
    

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
      title: '清职圈·树洞·表白', // 分享标题
      desc: 'desc', // 分享描述
      path: '/pages/vindicate/detail?id='+this.data.detail_id // 分享路径
    }
  }
})