//index.js
//获取应用实例
var app = getApp()
var that = this;
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        xuehao: null,
        password: null,
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../vindicate/index',
        })
    },
    bindViewTapTO: function () {
        wx.navigateTo({
            url: '../score/index',
        })
    },
    formBindsubmit: function (e) {
        wx.showLoading({
            title: '绑定中',
        })
        if (e.detail.value.xuehao.length == 0 || e.detail.value.password.length == 0) {
            wx.showModal({
                title: '输入有误',
                content: '学号或者密码不能为空',
            })
        } else {
            this.setData({
                tip: '',
                xuehao: e.detail.value.xuehao,
                password: e.detail.value.password
            })
        }
        wx.request({
                url: 'https://wx.qylcyz.com/api/score', //仅为示例，并非真实的接口地址
                data: {
                    order: '2',
                    xuehao: this.data.xuehao,
                    password: this.data.password,
                    openid: app.globalData.openid
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    wx.hideLoading(res);
                    console.log();
                    if (res.data.errMsg == 'ok') {
                        wx.setStorageSync('sign', 1);
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 2000
                        })

                        wx.navigateBack({
                            delta: 1
                        })
                    } else {
                        wx.showModal({
                            title: '学号或者密码错误',
                            content: '请检查后再试',
                            showCancel: false,
                            success: function (res) {

                            }
                        })

                    }

                }
            }
        )
    },


    onLoad: function () {
      wx.setNavigationBarTitle({
     title: '教务绑定'
    })
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
            wx.setStorageSync('userInfo', userInfo)
        })
    },
    
})
