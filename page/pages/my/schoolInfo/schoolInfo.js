// pages/my/schoolInfo/schoolInfo.js
Page({
  data: {
    schoolName: '九江学院',
    schoolAddress: '前进东路551',
  },

  onLoad: function() {
    // 发送请求后台学校信息数据
    wx.request({
      url: '',
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(e){
        // 设置显示为对应后台传来的数据
      }
    })
  },

})