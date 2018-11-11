// pages/my/my.js
Page({
  data: {
    userName: '点击登录',
    isLogin: false,
    gridsWho: '',
    whoLogin: '',
  },

  //加载完后，处理事件 
  // 如果有本地数据，则直接显示
  onLoad: function(options) {
    //获取本地数据
    var phone = wx.getStorageSync('phone');
    var roleType = wx.getStorageSync('roleType');

    console.log("phone:" + phone + ", roleType:" + roleType);
    if (phone) {
      this.setData({
        isLogin: true,
        whoLogin: roleType,
        userName: phone,
      });
    }else{
      this.setData({
        isLogin: true,
        whoLogin: 0,
      });
    }

  },

  // 页面显示
  onShow: function(e) {
    var that = this;
    // 应该根据登录完后台传的状态控制显示

    // 如果是0 游客
    if (that.data.whoLogin == 0) {
      console.log("show passenger")
      that.setData({
        gridsWho: [{
          img: '',
          name: '学校信息',
          icon: '/assets/icon/school.png',
        }, {
          img: '',
          name: '报名',
          icon: '/assets/icon/enroll.png',
        }]
      });
    }

    // 如果是校区管理员
    if (that.data.whoLogin == 5) {
      console.log("show manager")
      that.setData({
        gridsWho: [{
          img: '',
          name: '学校信息',
          tap: 'toSchoolInfo',
          icon: '/assets/icon/school.png',
        }, {
          img: '',
          name: '报名',
          tap: 'toEnroll',
            icon: '/assets/icon/enroll.png',
        }, {
          img: '',
          name: '库存',
          icon: 'icon-school',
        }, {
          img: '',
          name: '教师信息',
          icon: 'icon-school',
        }, {
          img: '',
          name: '比赛',
          icon: 'icon-school',
        }, {
          img: '',
          name: '活动',
          icon: 'icon-school',
        }, {
          img: '',
          name: '演出信息',
          icon: 'icon-school',
        }, {
          img: '',
          name: '财务',
          icon: 'icon-school',
        }, {
          img: '',
          name: '统计',
          icon: 'icon-school',
        }]
      });
    }

    // 如果是2 教师
    if (that.data.whoLogin == 2) {
      console.log("show teacher")
      that.setData({
        gridsWho: [{
          img: '',
          name: '个人信息',
          icon: 'icon-school',
        }, {
          img: '',
          name: '班级',
          icon: 'icon-school',
        }, {
          img: '',
          name: '考勤',
          icon: 'icon-school',
        }, {
          img: '',
          name: '课酬',
          icon: 'icon-school',
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
  toEnroll: function() {
    wx.navigateTo({
      url: 'enroll/enroll',
    })
  },

})