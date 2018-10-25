var e = require("http.js"), t = (require("util.js"), require("qiniuUploader"));

module.exports = {
    deletePhotoClickEvent: function(e) {
        for (var t = this, o = t.data.tempImgs, n = t.data.photos, a = t.data.content, s = e.currentTarget.dataset.src, l = 0; l < o.length; l++) o[l].url == s && o.splice(l, 1);
        for (l = 0; l < n.length; l++) if (s == n[l].originUrl) {
            n.splice(l, 1);
            break;
        }
        a = a.replace(s, ""), t.setData({
            tempImgs: o,
            photos: n,
            content: a
        }, function() {});
    },
    scanPhotoClickEvent: function(e) {
        for (var t = this, o = e.currentTarget.dataset.src, n = t.data.tempImgs, a = [], s = 0; s < n.length; s++) a.push(n[s].url);
        wx.previewImage({
            current: o,
            urls: a
        });
    },
    addPhotoClickEvent: function() {
        var e = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original, compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                for (var o = t.tempFilePaths, n = e.data.tempImgs, a = 0; a < o.length; a++) {
                    var s = {
                        url: o[a],
                        progress: 0
                    };
                    n.push(s);
                }
                e.setData({
                    tempImgs: n
                }, function() {
                    console.log(e.data.tempImgs);
                }), e.uploadImages(o, function(t) {
                    console.log("上传已全部完成:", t);
                    for (var o = e.data.tempImgs, n = 0; n < o.length; n++) o[n].progress = 100, e.setData({
                        tempImgs: o
                    });
                    for (var a = e.data.photos, n = 0; n < t.length; n++) a.push(t[n]);
                    e.setData({
                        photos: a
                    }, function() {});
                });
            }
        });
    },
    uploadImages: function(e, t) {
        function o(t) {
            for (var o = "fail" == t ? -1 : "success" == t ? 100 : t, n = s.data.tempImgs, a = 0; a < n.length; a++) if (n[a].url == e[l]) {
                n[a].progress = o, s.setData({
                    tempImgs: n
                }, function() {
                    console.log(s.data.tempImgs);
                });
                break;
            }
        }
        function n(e) {
            console.log("第", l, "张图片的进度:", e), o(e);
        }
        function a(i) {
            if (i) {
                console.log("上传成功:", i), o("success");
                var c = "img[" + i + "]", u = s.data.content;
                u = u + " " + c, s.setData({
                    content: u
                }), console.log("img[url]:", c);
                var g = {
                    originUrl: e[l],
                    qiniuUrl: i,
                    imgUrl: c
                };
                r.push(g), l++;
            } else console.log("上传失败"), o("fail"), l++;
            r.length != e.length && l < e.length ? (console.log("第", l, "张图片开始上传"), s.uploadSingleImage(e[l], a, n)) : t(r);
        }
        var s = this, l = 0, r = [];
        console.log("第", l, "张图片开始上传"), s.uploadSingleImage(e[0], a, n);
    },
    uploadSingleImage: function(o, n, a) {
        wx.getStorage({
            key: "token",
            success: function(s) {
                var l = s.data;
                wx.request({
                    url: e.getQiniuToken,
                    header: {
                        Authorization: "Token " + l
                    },
                    data: {
                        filename: o
                    },
                    method: "POST",
                    success: function(e) {
                        var s = e.data.token, l = e.data.key;
                        t.upload(o, function(e) {
                            n && n(e.imageURL);
                        }, function(e) {
                            console.log("error: " + e), n && n("");
                        }, function(e) {
                            a && a(e);
                        }, {
                            region: "ECN",
                            uploadURL: "https://up.qbox.me",
                            domain: "https://static1.bcjiaoyu.com",
                            uptoken: s,
                            key: l
                        });
                    },
                    fail: function(e) {
                        console.log("-------请求失败---");
                    },
                    complete: function(e) {}
                });
            },
            fail: function(e) {
                console.log("--不存在 token--");
            },
            complete: function() {}
        });
    }
};