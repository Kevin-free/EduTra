// pages/my/my.js
Page({
  data: {
    userName: '',
    isLogin: false,
    gridsWho: '',
    whoLogin: '',
  },

  //加载完后，处理事件 
  // 如果有本地数据，则直接显示
  onLoad: function (options) {
    //获取本地数据
    var telInputValue = wx.getStorageSync('telInputValue');
    var identify = wx.getStorageSync('identify');

    console.log("tel:"+telInputValue);
    if (telInputValue) {
      this.setData({
        isLogin: true,
        whoLogin: 'manager',
        userName: telInputValue,
      });
    }

  },

  // 页面显示
  onShow: function(e) {
    var that = this;
    // 应该根据登录完后台传的状态控制显示
    // 如果是校区管理员
    if (that.data.whoLogin == "manager") {
      console.log("show manager")
      that.setData({
        gridsWho: [{
          img: '',
          name: '学校信息',
          tap: 'toSchoolInfo',
        }, {
          img: '',
          name: '报名',
          tap: 'toEnroll',
        }, {
          img: '',
          name: '库存',
        }, {
          img: '',
          name: '教师信息',
        }, {
          img: '',
          name: '比赛',
        }, {
          img: '',
          name: '活动',
        }, {
          img: '',
          name: '演出信息',
        }, {
          img: '',
          name: '财务',
        }, {
          img: '',
          name: '统计',
        }]
      });
    }

    // 如果是教师
    if (that.data.whoLogin == "teacher") {
      console.log("show teacher")
      that.setData({
        gridsWho: [{
          img: '',
          name: '个人信息',
        }, {
          img: '',
          name: '班级',
        }, {
          img: '',
          name: '考勤',
        }, {
          img: '',
          name: '课酬',
        }]
      });
    }
  },

  // 跳转至登录界面
  goLogin: function() {
    wx.navigateTo({
      url: "getTelVerifycode/getTelVerifycode"
    });
  },

  // 跳转至学校信息界面
  toSchoolInfo: function() {
    wx.navigateTo({
      url: 'schoolInfo/schoolInfo',
    })
  },

  // 跳转至报名界面
  toEnroll: function () {
    wx.navigateTo({
      url: 'enroll/enroll',
    })
  },

})