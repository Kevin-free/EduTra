var t, e, r, n, a, o, i, s;

module.exports = {
    movestart: function(a) {
        console.log("sort", a), t = a.touches[0].clientX, e = a.touches[0].clientY, r = a.currentTarget.offsetLeft, 
        n = a.currentTarget.offsetTop, s = a.currentTarget.dataset.index, console.log("dd", t, e, r, n, s);
    },
    move: function(i) {
        a = i.touches[0].clientX - t + r, o = i.touches[0].clientY - e + n, this.setData({
            sortmainx: s,
            opacity: .7,
            sortstart: {
                x: a,
                y: o
            }
        }), console.log(a, o);
    },
    moveend: function() {
        if (0 != o) {
            for (var t = [], e = this.data.sortArr, r = this.data.originSortArr, n = this.data.sortCellH, a = 0; a < e.length; a++) t.push(e[a]);
            var c = e.length;
            i = 1;
            for (var l = 2; l < c; l++) o > n * (l - 1) + 2 * l - n / 2 && (i = l);
            o > n * (c - 1) + 2 * c - n / 2 && (i = c), console.log(t), t.splice(s - 1, 1), 
            t.splice(i - 1, 0, r[s - 1]), r = [];
            for (var h = 0; h < e.length; h++) console.log(t[h]), t[h].id = h + 1, r.push(t[h]);
            this.setData({
                sortmainx: "",
                sortArr: t,
                originSortArr: r,
                opacity: 1
            });
        }
    },
    optionChoiceClickEvent: function(t) {
        var e = this;
        if ("exercise" === e.data.typeView) {
            var r = t.currentTarget.dataset.choicetype, n = t.currentTarget.dataset.content;
            if (console.log("选项:", n), "single" === r) (a = []).push(n); else {
                var a = e.data.myAnswerArr;
                a.indexOf(n) > -1 ? a.splice(a.indexOf(n), 1) : a.push(n);
            }
            a = a.sort(), e.setData({
                myAnswerArr: a
            }), console.log(a);
        }
    },
    bpactionClickEvent: function(t) {
        var e = this;
        if ("exercise" === e.data.typeView) {
            for (var r = t.currentTarget.dataset.index, n = t.currentTarget.dataset.content, a = e.data.myAnswerArr, o = 0; o < a.length; o++) {
                var i = a[o];
                if ("blank" == i.type && !i.content) {
                    console.log("改变我的选择"), i.content = n, i.index = r;
                    break;
                }
            }
            e.setData({
                myAnswerArr: a
            });
        }
    },
    bpOptionClickEvent: function(t) {
        var e = this;
        if ("exercise" === e.data.typeView) {
            var r = t.currentTarget.dataset.index, n = (t.currentTarget.dataset.content, t.currentTarget.dataset.id), a = e.data.myAnswerArr;
            if (-1 === r) return;
            a[n].content = "", e.setData({
                myAnswerArr: a
            });
        }
    },
    scanPhotoEvent: function(t) {
        var e = t.currentTarget.dataset.src, r = t.currentTarget.dataset.allsrc;
        wx.previewImage({
            current: e,
            urls: r
        });
    },
    adjustExerciseJson: function(t, e) {
        var r = this, n = t, a = [];
        if ("blankProblem" == n.type) {
            for (var o = n.detailMessage, i = 0; i < o.length; i++) {
                var t = {
                    index: -1,
                    content: o[i]
                };
                o[i] ? t.type = "exist" : t.type = "blank", a.push(t);
            }
            if (e && e.length) for (var s = 0, i = 0; i < a.length; i++) "blank" === a[i].type && (a[i].content = e[s], 
            a[i].index = s, s++);
        } else if ("sequenceProblem" === n.type) {
            for (var c = n.options, i = 0; i < c.length; i++) c[i].id = i + 1, a.push(c[i]);
            if (e && e.length) {
                console.log("yourAnswerArr:", e);
                for (var s = 0, l = [], i = 0; i < e.length; i++) for (var h = 0; h < a.length; h++) if (e[i] === a[h].content) {
                    l.push(a[h]);
                    break;
                }
                a = l;
            }
            r.setData({
                sortArr: a,
                originSortArr: a
            });
        } else e && e.length && (a = e);
        r.setData({
            item: n,
            myAnswerArr: a
        });
    },
    handleOrder: function(t, e) {
        var r = this, n = this.data.helpEvent;
        n.dataJson = t;
        for (var a = [], o = 0; o < t.options.length; o++) {
            var i = wx.createSelectorQuery();
            i.select("#option-" + o).boundingClientRect(), i.exec(function(o) {
                o[0].id.split("option-")[1] != e && a.push(o[0]), a.length == t.options.length - 1 && (n.domArray = a, 
                r.setData({
                    helpEvent: n
                }));
            });
        }
    },
    singleTouchStart: function(t) {
        if ("exercise" === this.data.typeView) {
            var e = t.currentTarget.dataset.index, r = this.data.helpEvent;
            r.touchIndex = e, r.clientY = t.touches[0].clientY, r.initY = t.currentTarget.offsetTop, 
            r.y = t.currentTarget.offsetTop, this.setData({
                helpEvent: r
            });
            var n = JSON.parse(JSON.stringify(this.data.item));
            this.handleOrder(n, t.currentTarget.dataset.index);
        }
    },
    singleTouchMove: function(t) {
        if ("exercise" === this.data.typeView) {
            var e = this.data.helpEvent;
            e.y = t.touches[0].clientY - e.clientY + e.initY, this.setData({
                helpEvent: e
            });
        }
    },
    singleTouchEnd: function(t) {
        var e = this;
        if ("exercise" === this.data.typeView) {
            var r = this.data.helpEvent, n = r.touchIndex, a = JSON.parse(JSON.stringify(this.data.item)), o = a.options.splice(n, 1)[0];
            if (r.y <= r.domArray[0].top + r.domArray[0].height / 3) a.options.splice(0, 0, o); else if (r.y >= r.domArray[r.domArray.length - 1].top + r.domArray[r.domArray.length - 1].height / 3) a.options.splice(r.domArray.length, 0, o); else for (var i = 0; i < r.domArray.length - 1; i++) if (r.y > r.domArray[i].top + r.domArray[i].height / 3 && r.y < r.domArray[i + 1].top + r.domArray[i + 1].height / 3) {
                a.options.splice(i + 1, 0, o);
                break;
            }
            r.touchIndex = null, r.y = null, this.setData({
                helpEvent: r,
                item: a,
                myAnswerArr: a.options
            }, function() {
                console.log(e.data.helpEvent);
            });
        }
    }
};