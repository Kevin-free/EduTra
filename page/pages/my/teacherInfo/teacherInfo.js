// pages/my/enroll/enroll.js
Page({
  data: {
    tabTxt: ['培训项目', '缴费类型', '缴费状态'], //分类
    tab: [true, true, true, true],
    schoolList: [{
      'id': '1',
      'title': '九江学院'
    }, {
      'id': '2',
      'title': '九江职大'
    }],

    avatar: '/assets/icon/男.png',
    avatarg: '/assets/icon/女.png',
    infosId: '',
    infos: [{
      avatar: "/assets/icon/男.png",
      name: "吴老师",
      header: "25岁",
      phone: "金牌男教师",
      homepage: "任教3年"
    },
    {
      avatar: "/assets/icon/女.png",
      name: "周老师",
      header: "25岁",
      phone: "金牌男教师",
      homepage: "任教3年"
    },
    ],

    schName: '', //设置此data默认为空
    schHeader: '',
    schPhone: '',
    schHomepage: '',

    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    hiddenmodalAdd: true,

    second_height: 0, //剩下的屏幕高度，用于设置movable-area
    x: 280, //用于设置movable-view位置
    y: 472,
  },

  // 监听页面加载
  onLoad: function () {
    var that = this;
    // 获取手机系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log("width:" + res.windowWidth + "height:" + res.windowHeight)
        that.setData({
          x: res.windowWidth - 80,
          y: res.windowHeight - 100,
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将80rpx+10padding转换为px）
          second_height: res.windowHeight - res.windowWidth / 750 * 100
        })
      }
    })

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
    //   success: function (res) {
    //     // 设置显示为对应后台传来的数据
    //     var data = res.data.rows;
    //     console.log(data);
    //     for (var i = 0; i < data.length; i++) {
    //       var name = 'infos[' + i + '].name';
    //       var header = 'infos[' + i + '].header';
    //       var phone = 'infos[' + i + '].phone';
    //       var homepage = 'infos[' + i + '].homepage';
    //       that.setData({
    //         [name]: data[i].name,
    //         [header]: data[i].header,
    //         [phone]: data[i].phone,
    //         [homepage]: data[i].homepage,
    //       });
    //     }
    //   }
    // })
  },

  // 搜索查询事件
  query: function (e) {
    console.log("do query");
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

  //取消事件
  cancel: function () {
    this.setData({
      hiddenmodalAdd: true,
    });
  },

  // 点击添加按钮
  addInfo: function (e) {
    console.log("do add");
    this.setData({
      hiddenmodalAdd: !this.data.hiddenmodalAdd //隐藏模态输入框
    })
  },

  // 更新input输入值
  updateSchName: function (e) {
    this.setData({
      schName: e.detail.value
    });
  },
  updateSchHeader: function (e) {
    this.setData({
      schHeader: e.detail.value
    });
  },
  updateSchPhone: function (e) {
    this.setData({
      schPhone: e.detail.value
    });
  },
  updateSchHomepage: function (e) {
    this.setData({
      schHomepage: e.detail.value
    });
  },

  // 确定按钮
  confirmAdd: function (e) {
    console.log("name:" + this.data.schName + "header:" + this.data.schHeader + "phone:" + this.data.schPhone + "homepage:" + this.data.schHomepage);
    if (this.data.schPhone == '') {
      wx.showToast({
        title: '学校负责人电话不能为空',
        icon: 'none'
      })
      return;
    }
    var that = this;
    wx.request({
      url: "http://localhost:8080/learnning/schoolAction/addSchool/",
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        token: wx.getStorageSync('mobToken'),
        name: this.data.schName,
        header: this.data.schHeader,
        phone: this.data.schPhone,
        homepage: this.data.schHomepage,
      },
      method: 'get', //定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("后台传回的success：" + res.data.success);
        if (res.data.success) {
          wx.showToast({
            title: res.data.msg,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
        that.setData({
          hiddenmodalAdd: true,
          schName: '',
          schHeader: '',
          schPhone: '',
          schHomepage: '',
        });
        that.onLoad(); //添加后重新加载当前页面，即刷新
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  },

  // 长按删除
  deleteItem: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; //获取当前list下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此记录吗？\n' + that.data.infos[index].name,
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          // TODO 对接后台删除学校信息接口
          wx.showToast({
            title: "delete index:" + index,
          })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    var self = this,
      // 获取当前点击目标的id 和 title
      id = e.currentTarget.dataset.id,
      title = e.currentTarget.dataset.title,
      tabTxt = this.data.tabTxt;
    // 判断点击哪个标题
    switch (e.currentTarget.dataset.index) {
      // 下标0 学校名称
      case '0':
        tabTxt[0] = title;
        self.setData({
          tab: [true, true, true, true],
          tabTxt: tabTxt,
          school_id: id,
          school_txt: title
        });
        console.log("schoo_id:" + self.data.school_id + ",school_txt:" + self.data.school_txt)
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function () {
    var self = this;
    //调用数据接口，获取数据
    console.log("do search infos,by school_txt:" + self.data.school_txt);
    wx.request({
      url: 'http://localhost:8080/learnning/schoolAction/get/',
      data: {
        token: wx.getStorageSync('mobToken'),
        name: self.data.school_txt,
      },
      method: 'post', //定义传到后台接受的是post方法还是get方法
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("API 调用失败");
      },
    })
  },

})