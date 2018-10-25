// pages/getTelVerifycode2/getTelVerifycode2.js
var e, t = require("../../../../utils/http.js"),
  a = require("../../../../utils/util.js"),
  s = getApp();

Page({
  data: {
    phone: '',
    password: '',

    telInputValue: "",
    identify: "",
    verifyTime: 0,
    btnText: "获取验证码",
    cityCode: "+86",

    countryCodes: ["+86", "+00"],
    countryCodeIndex: 0,
  },

  inputPhone: function(e){
    this.setData({
      phone: e.detail.value
    });
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  loginByPsw:function(e){
    var that = this;
    // 判断登录
    wx.request({
      url: 'http://localhost:8080/learnning/userAction/commonLogin',
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        userName: this.data.phone,
        password: this.data.password,
        loginType: "mob",
      },
      method: 'GET',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log("res.success:"+res.data.success);
        var phone = that.data.phone, password = that.data.password;
        if (res.data.success) {
          // 同步方式存储表单数据
          wx.setStorageSync('phone', phone);
          wx.setStorageSync('password', password);

          let pages = getCurrentPages(); //当前页面
          let prevPage = pages[pages.length - 2]; //上一页面
          prevPage.setData({ //直接给上移页面赋值
            isLogin: true,
            whoLogin: 'manager',
            userName: that.data.phone,
          });
          // 跳转页面
          wx.navigateBack({ //返回  navigateTo不能调至tabbar中的页面，所以得用navigateBack
            delta: 1 //指上1层
          })
        }
      },
    }) 

  },

  //输入手机号码事件
  telInputChange: function(e) {
    var t = e.detail.value;
    this.setData({
      telInputValue: t
    });
  },
  //输入验证码事件
  onChange: function(e) {
    var t = e.detail.value;
    this.setData({
      identify: t
    });
  },
  //点击获取验证码事件
  getIdentify: function() {
    "" == this.data.telInputValue ? wx.showToast({
      title: "请输入手机号码",
      icon: "none"
    }) : (this.getIdentifyRequest(), this.setData({
      verifyTime: 60
    }), this.time(), e = setInterval(this.time, 1e3));
  },
  //更新时间
  time: function() {
    this.data.verifyTime--, this.setData({
      btnText: this.data.verifyTime + "s 后再试"
    }), 0 == this.data.verifyTime && (clearInterval(e), this.setData({
      btnText: "重新获取"
    }));
  },

  //发请求后台发送验证码短信
  getIdentifyRequest: function() {
    var e = this;
    if ("+86" == e.data.cityCode) s = e.data.telInputValue;
    else var s = encodeURI(e.data.cityCode + e.data.telInputValue).replace(/\+/g, "%2B");
    wx.request({
      url: t.serverDomain + "/userinfo/login_request/?telInputValue=" + s,
      method: "GET",
      success: function(e) {
        console.log(e), 200 == e.statusCode ? (console.log("成功发送验证码"), wx.showToast({
          title: "成功发送验证码"
        })) : 400 == e.statusCode && (console.log("获取验证码", e), wx.showModal({
          title: "请勿频繁操作",
          content: e.data.message,
          showCancel: !1
        }));
      },
      fail: function(e) {
        console.log(e), a.showMessage("请求异常");
      }
    });
  },

  //点击登录按钮
  login: function() {
    var that = this;
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({ //直接给上移页面赋值
      isLogin: true,
      whoLogin: 'manager',
      userName: that.data.telInputValue,
    });

    // 获取输入数据
    console.log("tel:" + this.data.telInputValue + ",verid:" + this.data.identify);
    var telInputValue = this.data.telInputValue,
      identify = this.data.identify;
    if (telInputValue && identify) {
      // 同步方式存储表单数据
      wx.setStorageSync('telInputValue', telInputValue);
      wx.setStorageSync('identify', identify);
      // 跳转页面
      wx.navigateBack({ //返回  navigateTo不能调至tabbar中的页面，所以得用navigateBack
        delta: 1 //指上1层
      })
    }

    // "" != this.data.telInputValue ? "" != this.data.identify ? this.regLogin() : wx.showToast({
    //   title: "请输入验证码",
    //   icon: "none"
    // }) : wx.showToast({
    //   title: "请输入手机号码",
    //   icon: "none"
    // });
  },

  //与后台判断验证码是否正确,并注册登录
  regLogin: function() {
    if (s.globalData.friendOwner) e = s.globalData.friendOwner;
    else var e = "";
    var l = this;
    if ("+86" == l.data.cityCode) n = l.data.telInputValue;
    else var n = l.data.cityCode + l.data.telInputValue;
    wx.request({
      url: t.serverDomain + "/userinfo/login_verifycode/",
      method: "POST",
      header: {
        Authorization: "Token " + s.globalData.wxtoken
      },
      data: {
        telInputValue: n,
        verification_code: l.data.identify,
        userinfo: {
          inviter: e,
          name: s.globalData.wxuserInfo.name,
          avatar: s.globalData.wxuserInfo.avatar
        }
      },
      success: function(e) {
        console.log(e), "Invalid verification code." == e.data.message ? wx.showToast({
          title: "验证码错误",
          icon: "none"
        }) : e.data.token ? (wx.setStorage({
          key: "token",
          data: e.data.token
        }), s.globalData.token = e.data.token, l.bindTel()) : "数据错误" == e.data.message && a.showMessage(e.data.message);
      },
      fail: function(e) {
        console.log(e), a.showMessage("请求异常");
      }
    });
  },
})