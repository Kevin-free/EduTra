//index.js
//获取应用实例
const app = getApp()

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

    listDatas: [{
      img: 'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      text: '文本1'
    }, {
      img: 'https://p0.meituan.net/movie/5d4fa35c6d1215b5689257307c461dd2541448.jpeg',
      text: '文本2'
    }, {
      img: 'https://p0.meituan.net/movie/0c49f98a93881b65b58c349eed219dba290900.jpg',
      text: '文本3'
    }],
  }
})