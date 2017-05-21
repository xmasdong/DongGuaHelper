// pages/vindicate/create.js
Page({
  data:{},
  onLoad:function(options){
    wx.setNavigationBarTitle({
          title: '发布树洞·表白',
          success: function(res) {
            // success
          }
        });
    var openid= wx.getStorageSync('openid');
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
  },
  formBindsubmit: function (e) {
        wx.showLoading({
            title: '发布中',
        })
        if (e.detail.value.to.length == 0 || e.detail.value.content.length == 0) {
            wx.showModal({
                title: '至少输入点东西吧',
                content: '不敢说？',
            })
        } 
        wx.request({
                url: 'https://wx.qylcyz.com/biaobai/create/new', //仅为示例，并非真实的接口地址
                data: {
                    openid: wx.getStorageSync('openid'),
                    to: e.detail.value.to,
                    content: e.detail.value.content,
                    from_: e.detail.value.from_
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.errMsg == 'ok') {
                        wx.showToast({
                            title: '发布成功',
                            icon: 'success',
                            duration: 2000
                        })

                        wx.navigateBack({
                            delta: 1
                        })
                        }
                    
                }
            }
        )
    },


})