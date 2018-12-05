// page/pages/my/comp/comp.js
Page({
  data: {
    //轮播图片链接
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true, //是否显示轮播点
    autoplay: true, //自动转换
    interval: 3000, //间隔
    duration: 1000, //持续时间

    infos: [{
        title: '第四届南昌国际拉丁舞锦标赛',
        address: '南昌',
        data: '2018.12.1-12.2'
      },
      {
        title: '第四届南昌国际拉丁舞锦标赛',
        address: '南昌',
        data: '2018.12.1-12.2'
      },
      {
        title: '第四届南昌国际拉丁舞锦标赛',
        address: '南昌',
        data: '2018.12.1-12.2'
      }
    ],

  },

  // 点击某个list到详情信息
  toDetail: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log("taped index:" + index);
    wx.navigateTo({
      url: 'toDetail/toDetail?infosId=' + index,
    })
  },

})