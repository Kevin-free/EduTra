// page/pages/my/enroll/toDetail/toDetail.js
Page({
  data: {
    infos: [{
      key: '姓名',
      value: '吴老师',
    }, {
      key: '年龄',
      value: '25',
    }, {
      key: '性别',
      value: '男',
    }, {
      key: '教师级别',
      value: '金牌',
    }, {
      key: '电话',
      value: '13012341234',
    }, {
      key: '毕业院校',
      value: '江西职业艺术学院',
    }, {
      key: '专业',
      value: '拉丁舞',
    }, {
      key: '经历',
      value: '',
    }, {
      key: '个人秀',
      value: '',
    }, ],

    avatar: '/assets/icon/boy.png',
    name: '吴俊文',
    disabled: true, // 确认按钮是否禁用

  },

  onLoad: function(e) {
    console.log("received infosId:" + e.infosId);
    var that = this;
    // 发送请求后台学校信息数据
    // wx.request({
    //   url: "http://localhost:8080/learnning/schoolAction/get/",
    //   data: {
    //     token: wx.getStorageSync('mobToken'),
    //   },
    //   method: 'GET', //定义传到后台接受的是post方法还是get方法
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function(res) {
    //     // 设置显示为对应后台传来的数据
    //     wx.showToast({
    //       title: res.data.msg,
    //     });
    //     var data = res.data.rows;
    //     console.log(data);
    //     // var infosLength = that.data.infos.length;
    //     // for (var i = 0; i < infosLength; i++) {
    //     //   var value = 'infos[' + i + '].value';
    //     //   that.setData({
    //     //     [value]: data[e.infosId].id,
    //     //   });
    //     // }
    //     that.setData({
    //       'infos[0].value': data[e.infosId].id,
    //       'infos[1].value': data[e.infosId].name,
    //       'infos[2].value': data[e.infosId].header,
    //       'infos[3].value': data[e.infosId].phone,
    //       'infos[4].value': data[e.infosId].homepage,
    //     });
    //   }
    // })
  },

  // input改变value
  changeValue: function(e) {
    console.log("do changeValue")
    this.setData({
      disabled: false
    })
  },

  // 确认修改
  confirm: function(e) {
    console.log("do confirm");
  },

})