// pages/my/schoolInfo/schoolInfo.js
var h = require("../../../../utils/http.js");

Page({
  data: {
    list1: '学校名称',
    list2: '学校负责人',
    list3: '负责人电话',
    list4: '学校官网',

    name: '',
    header: '',
    phone: '',
    homepage: '',
  },

  onLoad: function() {
    var that = this;
    // 发送请求后台学校信息数据
    wx.request({
      url: "http://localhost:8080/learnning/schoolAction/get/",
      data:{
        token: wx.getStorageSync('mobToken'),
      },
      method: 'GET',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        // 设置显示为对应后台传来的数据
        wx.showToast({
          title: res.data.msg,
        });
        var data = res.data.rows;
        console.log(data[0])
        that.setData({
          name: data[0].name,
          header: data[0].header,
          phone: data[0].phone,
          homepage: data[0].homepage,
        });
      }
    })
  },

})