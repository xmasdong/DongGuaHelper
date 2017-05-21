Page({
   data: {
        inputShowed: false,
        searchShowed: true,
        load_more:'查看更多',
        inputVal: "",
        search_result:null,
        biaobai_lists:null,
        next_page_url:null,
        current_page:null,
        prev_page_url:null,
        total:null,
        click:false,
        createShowed:false,
    },
    navigate_to:function(e){
      var id=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../vindicate/detail?id='+id,
        success: function(res){
          // success
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    },
    
     onPullDownRefresh:function(e){
     console.log(e);
    },
    showInput: function (e) {
        this.setData({
            inputShowed: true,
            createShowed:true
        });
    },

    create_new:function(e){
     var that=this
      this.setData({
        click:true
      });
      wx.navigateTo({
        url: '/pages/vindicate/create',
        success: function(res){
          that.setData({
          click:false
        });
        },
      })
    },

    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            searchShowed:false,
            createShowed:false,
        });
        
    var that = this
    wx.request({
      url: 'https://wx.qylcyz.com/biaobai/get',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
      
        that.setData({
          biaobai_lists:res.data.data,
          next_page_url:res.data.next_page_url
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
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
       var that =this;
       wx.request({
         url: 'https://wx.qylcyz.com/biaobai/search/'+e.detail.value,
         data: {},
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         // header: {}, // 设置请求的 header
         success: function(res){
           var str ='未查到记录';
           if(res.data.resault!=null){
             str=res.data.resault;
            }
            that.setData({
            searchShowed:true,
            search_result:str,
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
    addToFront: function(e) {
    var that = this;
    var url_ = that.data.next_page_url;
    if(url_!=null){
     
     wx.request({
      url: url_,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.data.biaobai_lists = that.data.biaobai_lists.concat(res.data.data)
        that.setData({
          biaobai_lists:that.data.biaobai_lists,
          next_page_url:res.data.next_page_url
         })
      }
    })

    }else{
      that.setData({
        load_more:'没有更多数据了'
      });
    }
    

    
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
          title: '树洞·表白吧',
          success: function(res) {
            // success
          }
        })
  // var that = this
  //   wx.request({
  //     url: 'https://wx.qylcyz.com/biaobai/get',
  //     data: {},
  //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     // header: {}, // 设置请求的 header
  //     success: function(res){
      
  //       that.setData({
  //         biaobai_lists:res.data.data,
  //         next_page_url:res.data.next_page_url
  //       });
        
       
  //     },
  //     fail: function(res) {
  //       // fail
  //     },
  //     complete: function(res) {
  //       // complete
  //     }
  //   })
  },

  searche:function(){
   var that = this
    wx.request({
      url: 'https://wx.qylcyz.com/biaobai/get/'+that.data.search_result,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          biaobai_lists:res.data.data,
          next_page_url:res.data.next_page_url
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
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    var that=this;
    wx.request({
      url: 'https://wx.qylcyz.com/biaobai/get',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
      
        that.setData({
          biaobai_lists:res.data.data,
          next_page_url:res.data.next_page_url
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
  onPullDownRefresh: function(e) {
  var that=this;
  wx.request({
      url: 'https://wx.qylcyz.com/biaobai/get',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
      
        that.setData({
          biaobai_lists:res.data.data,
          next_page_url:res.data.next_page_url
        });
        
        wx.stopPullDownRefresh()
      },
     
    })
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '清职圈·树洞·表白首页', // 分享标题
      desc: '点击查看', // 分享描述
      path: '/pages/vindicate/index' // 分享路径
    }
  }
})
