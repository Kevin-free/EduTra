// pages/my/schoolInfo/schoolInfo.js
var h = require("../../../../utils/http.js");

Page({
  data: {
    infos: [{
      list: '学校名称',
      value: '曼妙舞姿艺术中心',
    }, {
      list: '学校负责人',
      value: '徐校长',
    }, {
      list: '负责人电话',
      value: '13012341234',
    }, {
      list: '学校官网',
      value: 'www.test.com',
    }, {
      list: '学校简介',
      value: '',
    }, ],

    list: '',
    hiddenmodal: true,
  },

  onLoad: function () {
    var that = this;
    // 发送请求后台学校信息数据
    wx.request({
      url: "http://localhost:8080/learnning/schoolAction/get/",
      data: {
        token: wx.getStorageSync('mobToken'),
      },
      method: 'GET', //定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // 设置显示为对应后台传来的数据
        wx.showToast({
          title: res.data.msg,
        });
        var data = res.data.rows;
        console.log(data[0]);
        that.setData({
          id: data[0].id,
          'infos[0].value': data[0].name,
          'infos[1].value': data[0].header,
          'infos[2].value': data[0].phone,
          'infos[3].value': data[0].homepage,
          'infos[4].value': data[0].memo,
        });
      }
    })
  },

  updateInput0: function (e) {
    // var index = e.currentTarget.dataset.index;
    // console.log("taped index:" + index);
    // console.log("---" + e.detail.value)
    this.setData({
      'infos[0].value': e.detail.value
    });
  },
  updateInput1: function (e) {
    this.setData({
      'infos[1].value': e.detail.value
    });
  },

  confirmUpdate: function (e) {
    console.log("do confirm");
    var that = this;
    console.log("--" + that.data.infos[0].value);
    console.log("--" + that.data.infos[1].value);

    // 发送请求后台学校信息数据
    wx.request({
      url: "http://localhost:8080/learnning/schoolAction/updateSchool/",
      data: {
        id:that.data.id,
        name: that.data.infos[0].value,
        header: that.data.infos[1].value,
        phone: that.data.infos[2].value,
        homepage: that.data.infos[3].value,
        memo: that.data.infos[4].value,
        token: wx.getStorageSync('mobToken'),
      },
      method: 'GET', //定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // 设置显示为对应后台传来的数据
        wx.showToast({
          title: res.data.msg,
        });
      }
    })
  },


  // 点击一栏改变事件
  change: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log("taped index:" + index);
    this.setData({
      list: this.data.infos[index].list,
      hiddenmodal: !this.data.hiddenmodal //隐藏模态输入框
    })
  },

  // 更新input输入值
  update: function (e) {
    this.setData({
      value: e.detail.value
    });
  },
  // 取消事件
  cancel: function () {
    this.setData({
      hiddenmodal: true,
    });
  },
  // 确定事件
  confirm: function (e) {
    console.log("do confirm");
    this.setData({
      hiddenmodal: true,
    });
  },

})