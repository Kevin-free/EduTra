function e(e, t) {
    var a = e.replace(/img\[([^\s]+?)\]/g, ""), l = [];
    (function(e) {
        return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    })(e || "").replace(/img\[([^\s]+?)\]/g, function(e) {
        var t = e.replace(/(^img\[)|(\]$)/g, "");
        l.push({
            url: t
        });
    });
    t(a, l);
}

var t = require("http.js"), a = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, l = {
    formatTime: function(e) {
        var t = e.getFullYear(), l = e.getMonth() + 1, n = e.getDate(), r = e.getHours(), o = e.getMinutes(), s = e.getSeconds();
        return [ t, l, n ].map(a).join("/") + " " + [ r, o, s ].map(a).join(":");
    },
    dealContent: function(t, a) {
        return e(t, a);
    },
    dealTime: function(e) {
        var t = e.split(".")[0].split("T"), a = t[0].split("-")[0], l = t[0].split("-")[1], n = t[0].split("-")[2], r = t[1].split(":")[0], o = t[1].split(":")[1], s = t[1].split(":")[2], i = new Date(a, l - 1, n, r, o, s), c = new Date().getTime() - i.getTime();
        return c / 6e4 < 1 ? "刚刚" : c / 6e4 < 60 ? parseInt(c / 6e4) + "分钟前" : c / 6e4 < 1440 ? parseInt(c / 36e5) + "小时前" : c / 6e4 < 2880 ? "昨天 " + e.slice(11, 16) : e.slice(0, 10).replace("T", " ");
    },
    defaultAvatar: "https://static1.bcjiaoyu.com/userAvatar.png",
    setValue: function(e, t) {
        wx.setStorage({
            key: e,
            data: t
        });
    },
    getValue: function(e, t) {
        wx.getStorage({
            key: e,
            success: function(e) {
                t(e.data);
            },
            fail: function() {
                t(null);
            }
        });
    },
    showMessage: function(e) {
        wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1
        });
    },
    showAlertWithOutCancel: function(e, t, a) {
        var e = e || "提示", t = t || "这是一条警告消息";
        wx.showModal({
            showCancel: !1,
            title: e,
            content: t,
            success: function(e) {
                console.log(e), e.confirm && a && a();
            }
        });
    },
    showAlert: function(e, t, a, l, n, r) {
        var e = e || "提示", t = t || "这是一条警告消息", o = n || "确定", r = r || "取消";
        wx.showModal({
            title: e,
            content: t,
            confirmText: o,
            cancelText: r,
            success: function(e) {
                console.log(e), e.confirm ? a && a() : e.cancel && l && l();
            }
        });
    },
    getStorageData: function(e) {
        l.getValue("chatData", function(t) {
            var a = JSON.parse(t);
            l.getValue("data", function(t) {
                var n = JSON.parse(t);
                l.getValue("index", function(t) {
                    var r = JSON.parse(t);
                    l.getValue("optionData", function(t) {
                        var o = JSON.parse(t);
                        l.getValue("optionIndex", function(t) {
                            var s = JSON.parse(t);
                            l.getValue("currentCourse", function(t) {
                                var i = JSON.parse(t);
                                l.getValue("currentCourseIndex", function(t) {
                                    var c = JSON.parse(t);
                                    l.getValue("currentCourseTotal", function(t) {
                                        var l = JSON.parse(t);
                                        e(a, n, r, o, s, i, c, l);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
    blankMyAnswerToString: function(e) {
        for (var t = [], a = 0; a < e.length; a++) "blank" == e[a].type && t.push(e[a].content);
        return t.join(",");
    },
    sequenceMyAnswerToString: function(e) {
        for (var t = [], a = 0; a < e.length; a++) t.push(e[a].content);
        return t.join(",");
    },
    choiceMyAnswerToString: function(e) {
        return e.join(",");
    },
    hasBlankAnswer: function(e) {
        for (var t = !1, a = 0; a < myAnswers.length; a++) if ("blank" == myAnswers[a].type && !myAnswers[a].content) {
            t = !0;
            break;
        }
        return t;
    },
    hasChoiceAnswer: function(e) {
        var t = !1;
        return e.length && (t = !0), t;
    },
    getwxUserInfo: function(e) {
        wx.request({
            url: t.whoamiWX,
            method: "GET",
            header: {
                Authorization: "Token " + getApp().globalData.wxtoken
            },
            success: function(t) {
                console.log("wxuserinfo", t), 200 == t.statusCode && (getApp().globalData.wxuserInfo = t.data, 
                e.setData({
                    wxSeller: t.data.my_seller
                }, function() {
                    getApp().globalData.token ? l.getTelUserInfo(e, function(e) {}) : t.data.my_seller || e.data.receiveSeller && "null" != e.data.receiveSeller && l.wxBindSeller(e.data.receiveSeller);
                }));
            },
            fail: function(e) {
                l.showMessage("请求异常"), console.log("获取wx用户信息失败", e);
            }
        });
    },
    getTelUserInfo: function(e, a) {
        wx.request({
            url: t.whoamiWX,
            method: "GET",
            header: {
                Authorization: "Token " + getApp().globalData.token
            },
            success: function(t) {
                console.log("userinfo", t), getApp().globalData.userInfo = t.data, 200 == t.statusCode && (t.data.is_seller ? (e.setData({
                    isSeller: t.data.is_seller,
                    telSeller: t.data.owner
                }), t.data.my_seller || l.telBindSeller(t.data.owner), e.data.wxSeller || l.wxBindSeller(t.data.owner)) : t.data.my_seller ? e.setData({
                    telSeller: t.data.my_seller
                }) : e.data.receiveSeller && "null" != e.data.receiveSeller && (l.wxBindSeller(e.data.receiveSeller), 
                l.telBindSeller(e.data.receiveSeller)), a(t));
            },
            fail: function(e) {
                l.showMessage("请求异常"), console.log("获取用户信息失败", e);
            }
        });
    },
    wxBindSeller: function(e) {
        wx.request({
            url: t.serverDomain + "/userinfo/whoami/",
            method: "PUT",
            header: {
                Authorization: "Token " + getApp().globalData.wxtoken
            },
            data: {
                my_seller: e
            },
            success: function(e) {
                console.log("微信绑定分销商", e);
            },
            fail: function(e) {
                console.log("微信绑定分销商失败", e), l.showMessage("请求异常");
            }
        });
    },
    telBindSeller: function(e) {
        wx.request({
            url: t.serverDomain + "/userinfo/whoami/",
            method: "PUT",
            header: {
                Authorization: "Token " + getApp().globalData.token
            },
            data: {
                my_seller: e
            },
            success: function(t) {
                console.log("手机绑定分销商", t), 200 == t.statusCode && (getApp().globalData.sellerOwner = e);
            },
            fail: function(e) {
                console.log("手机绑定分销商失败", e), l.showMessage("请求异常");
            }
        });
    },
    getSeller: function(e, t) {
        if (getApp().globalData.token) {
            if (e.data.isSeller) a = e.data.telSeller; else if (e.data.telSeller || !e.data.telSeller && e.data.receiveSeller) a = e.data.telSeller; else if (!e.data.telSeller && !e.data.receiveSeller) a = null;
        } else if (this.data.wxSeller || !e.data.wxSeller && e.data.receiveSeller) a = e.data.wxSeller; else if (!e.data.wxSeller && !e.data.receiveSeller) var a = null;
        t(a);
    }
};

module.exports = l;