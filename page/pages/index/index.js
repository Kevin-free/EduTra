//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图片链接
    advertisements: [
      'http://img1.vzmapp.com/uploadPic/2016/10/09/20161009174811cut_r750x400p.jpg',
      'http://img1.vzmapp.com/uploadPic/2017/03/30/20170330175405cut_r750x400p.png',
      'http://channel.bestmath.cn/activity-static/img/experience-4.53ece1a4.png'
    ],

    // listDatas: [{
    //   img: '/assets/my/topBg.png',
    //   text: '文本1'
    // }, {
    //   img: 'https://p0.meituan.net/movie/5d4fa35c6d1215b5689257307c461dd2541448.jpeg',
    //   text: '文本2'
    // }, {
    //   img: 'https://p0.meituan.net/movie/0c49f98a93881b65b58c349eed219dba290900.jpg',
    //   text: '文本3'
    // }],

    item: [{
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110822cut.jpg',
      txt: '乐器类1',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110822cut.jpg',
      txt: '乐器类2',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110822cut.jpg',
      txt: '乐器类3',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110822cut.jpg',
      txt: '乐器类4',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110822cut.jpg',
      txt: '乐器类5',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110822cut.jpg',
      txt: '乐器类',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2016/10/09/20161009170214cut.jpg',
      txt: '书法类',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2016/07/27/20160727144459cut.png',
      txt: '绘画类',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407110928cut.jpg',
      txt: '语言类',
    }, {
      img: 'http://img1.vzmapp.com/uploadPic/2017/04/07/20170407111157cut.jpg',
      txt: '音乐舞蹈类',
    }],

    proList: [
      { itemName: "乐器类", code: "010", id: "2c92cf3c603468430160496b257a4bf8", productList: Array(4) }],
  }
})