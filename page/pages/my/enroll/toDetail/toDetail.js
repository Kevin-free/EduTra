// page/pages/my/enroll/toDetail/toDetail.js
Page({
  data: {
    infos: [{
      key: '培训项目',
      value: '拉丁舞',
    }, {
      key: '缴费类型',
      value: '年费',
    }, {
      key: '缴费金额',
      value: '2500',
    }, {
      key: '培训日期',
      value: '2018年9月1日-2019年8月31日',
    }, {
      key: '缴费时间',
      value: '2018年6月30日',
    }, {
      key: '缴费状态',
      value: '已交清',
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
  changeValue: function(e){
    console.log("do changeValue")
    this.setData({
      disabled: false
    })
  },

  // 确认修改
  confirm: function(e){
    console.log("do confirm");
  },

})