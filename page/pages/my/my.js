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
    } else {
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
          tap: 'toSchoolInfo',
          icon: '../../../assets/my/学校.png',
        }, {
          img: '',
          name: '教师信息',
          tap: 'toTeacherInfo',
          icon: '/assets/my/教师.png',
        }, {
          img: '',
          name: '学员信息',
          tap: 'toStudentInfo',
          icon: '/assets/my/学员.png',
        }, {
          img: '',
          name: '报名',
          tap: 'toEnroll',
          icon: '/assets/my/报名.png',
        }, {
          img: '',
          name: '比赛',
          tap: 'toComp',
          icon: '/assets/my/比赛.png',
        }, {
          img: '',
          name: '学员风采',
          tap: 'toStudentAct',
          icon: '/assets/my/库存.png',
        }, ]
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
          icon: '../../../assets/my/学校.png',
        }, {
          img: '',
          name: '教师信息',
          tap: 'toTeacherInfo',
          icon: '/assets/my/教师.png',
        }, {
          img: '',
          name: '学员信息',
          tap: 'toStudentInfo',
          icon: '/assets/my/学员.png',
        }, {
          img: '',
          name: '报名',
          tap: 'toEnroll',
          icon: '/assets/my/报名.png',
        }, {
          img: '',
          name: '比赛',
          tap: 'toComp',
          icon: '/assets/my/比赛.png',
        }, {
          img: '',
          name: '学员风采',
          tap: 'toStudentAct',
          icon: '/assets/my/库存.png',
        }, {
          img: '',
          name: '演出信息',
          icon: '/assets/my/报名.png',
        }, {
          img: '',
          name: '财务',
          icon: '/assets/my/报名.png',
        }, {
          img: '',
          name: '统计',
          tap: 'toCount',
          icon: '/assets/my/报名.png',
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
          icon: 'icon-tongji',
        }, {
          img: '',
          name: '班级',
          icon: 'icon-tongji',
        }, {
          img: '',
          name: '考勤',
          icon: 'icon-tongji',
        }, {
          img: '',
          name: '课酬',
          icon: 'icon-tongji',
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

  // 跳转至教师信息界面
  toTeacherInfo: function() {
    wx.navigateTo({
      url: 'teacherInfo/teacherInfo',
    })
  },

  // 跳转至学员信息界面
  toStudentInfo: function() {
    wx.navigateTo({
      url: 'studentInfo/studentInfo',
    })
  },

  // 跳转至报名界面
  toEnroll: function() {
    wx.navigateTo({
      url: 'enroll/enroll',
    })
  },

  // 跳转至报名界面
  toComp: function() {
    wx.navigateTo({
      url: 'comp/comp',
    })
  },

  // 跳转至学员风采界面
  toStudentAct: function () {
    wx.navigateTo({
      url: 'studentAct/studentAct',
    })
  },


  // 跳转至统计界面
  toCount: function() {
    wx.navigateTo({
      url: 'count/count',
    })
  },

})