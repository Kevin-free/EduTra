var e = require("util.js"), s = require("http.js");

module.exports = {
    unlockCourse: function(s) {
        var a = this, t = s.currentTarget.dataset.pk, o = s.currentTarget.dataset.unlock;
        if (!0 === s.currentTarget.dataset.open) if (0 == o) {
            var n = s.currentTarget.dataset.redZuan, i = a.data.userinfo.red_diamond;
            if (n = parseInt(n), (n = 2e3) <= i) var r = "红钻足够购买课程", u = "解锁此课程需" + n + "红钻，是否确认学习。", d = "确认", c = "取消", g = "pay"; else var r = "红钻不足够购买", h = n - i, u = " 解锁此课程需" + n + "红钻，当前红钻不足，需购买" + h + "红钻，折合人民币" + h / 100 + "元。", d = "确认购买", c = "取消", g = "buy";
            e.showAlert(r, u, function() {
                "pay" === g ? a.fetchPayCourseWithRedZuan(t, s) : a.fetchBuyRedZuan(t, h, s);
            }, function() {}, d, c);
        } else a.courseClickEvent(s); else e.showMessage("此课程尚未开放，我们正在努力哦");
    },
    fetchPayForOrder: function(a, t, o) {
        var n = this;
        wx.request({
            url: s.payForOrder(a),
            method: "put",
            data: {
                channel: "wx_small_program",
                session: getApp().globalData.loginSession
            },
            header: {
                Authorization: "Token " + getApp().globalData.token
            },
            success: function(s) {
                if (wx.hideLoading(), 200 == s.statusCode) {
                    var a = s.data;
                    a.package ? wx.requestPayment({
                        timeStamp: a.timeStamp + ".0",
                        nonceStr: a.nonceStr + "",
                        package: a.package + "",
                        signType: a.signType,
                        paySign: a.paySign + "",
                        success: function(e) {
                            console.log("发起支付成功", e), n.fetchPayCourseWithRedZuan(t, o);
                        },
                        fail: function(e) {
                            console.log("发起支付失败", e);
                        }
                    }) : e.showMessage("发起支付请求失败");
                } else if (400 == s.statusCode || 403 == s.statusCode) {
                    var i = s.data.message;
                    e.showMessage(i);
                } else 500 == s.statusCode && e.showMessage("服务器开小差了");
            },
            fail: function(s) {
                wx.hideLoading(), e.showMessage("请求异常");
            }
        });
    },
    fetchBuyRedZuan: function(a, t, o) {
        var n = this;
        wx.getSystemInfo({
            success: function(i) {
                i.system.indexOf("iOS") > -1 ? e.showMessage("由于微信禁止iOS系统小程序内支付，请登录橙旭园官网（cxy61.com）完成购买。") : wx.request({
                    url: s.buyRedDiamond(t),
                    method: "post",
                    header: {
                        Authorization: "Token " + getApp().globalData.token
                    },
                    success: function(s) {
                        if (wx.hideLoading(), 201 == s.statusCode) {
                            var t = s.data;
                            n.fetchPayForOrder(t.order_number, a, o);
                        } else if (400 == s.statusCode || 403 == s.statusCode) {
                            var i = s.data.message;
                            e.showMessage(i);
                        } else 500 == s.statusCode && e.showMessage("服务器开小差了");
                    },
                    fail: function(s) {
                        wx.hideLoading(), e.showMessage("请求异常");
                    }
                });
            }
        });
    },
    fetchPayCourseWithRedZuan: function(a, t) {
        var o = this;
        wx.request({
            url: s.payForCourse(a),
            method: "post",
            header: {
                Authorization: "Token " + getApp().globalData.token
            },
            success: function(s) {
                if (wx.hideLoading(), 201 == s.statusCode) s.data, o.courseClickEvent(t); else if (400 == s.statusCode || 403 == s.statusCode) {
                    var a = s.data.message;
                    e.showMessage(a);
                } else 500 == s.statusCode && e.showMessage("服务器开小差了");
            },
            fail: function(s) {
                wx.hideLoading(), e.showMessage("请求异常");
            }
        });
    }
};