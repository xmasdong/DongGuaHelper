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
        createShowed:true,
        value:null,
        books:null,

    },
    showInput: function (e) {
        this.setData({
            inputShowed: true,
        });
    },

    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            searchShowed:false,
            createShowed:false,
            search_result:null,
            value:null,
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
       that.setData({
        value:e.detail.value,
        createShowed:false
       });
       wx.request({
         url: 'https://wx.qylcyz.com/getSearchBook?name='+e.detail.value,
         data: {},
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         // header: {}, // 设置请求的 header
         success: function(res){
           var str ='未查到记录';
           if(res.data!=null){
             str=res.data;
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

    showtips:function(e){
       var id=e.currentTarget.dataset.id;
       wx.request({
         url: 'https://wx.qylcyz.com/getbookdetail/'+id,
         data: {},
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         // header: {}, // 设置请求的 header
         success: function(res){
           if(res.data==""){
             wx.showModal({
      title: '貌似找不到',
      content: '请尝试用其他关键字检索',})
           }
           wx.showActionSheet({
            itemList: res.data,
            success: function(res) {
                if (!res.cancel) {
                }
            }
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

cheack:function(){
  var book_name=this.data.value;
  var that =this;
  wx.request({
    url: 'https://wx.qylcyz.com/getBook?name='+book_name,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      if(res.data==""){
        
      wx.showModal({
      title: '找不到这本书',
      content: '请尝试用其他关键字检索',})
      }
       that.setData({
            books:null,
            books:res.data,
            search_result:null,
            value:null,
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
          title: '图书检索',
          success: function(res) {
            // success
          }
        })
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
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '图书检索', // 分享标题
      desc: '点击体验小程序', // 分享描述
      path: '/pages/book/index' // 分享路径
    }
  }
})
