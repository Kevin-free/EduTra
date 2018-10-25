function o(o) {
    console.log(u.queue.length, o), u.status && (u.status = !1, n.src = o, n.pause(), 
    n.play());
}

function e(o) {
    console.log(u.queue.length, o), u.status && (u.status = !1, console.log("开始播放"), 
    wx.playBackgroundAudio({
        dataUrl: o,
        title: "录音",
        coverImgUrl: ""
    }));
}

var u = {
    status: !0,
    queue: []
}, n = wx.createInnerAudioContext();

n.volume = 1, n.obeyMuteSwitch = !1, n.autoplay = !0, n.onPlay(function() {
    console.log("开始播放");
}), n.onEnded(function() {
    console.log("play successful"), u.status = !0, u.queue.shift(), u.queue.length >= 1 && o(u.queue[0]);
}), n.onError(function(o) {
    console.log(o.errMsg), console.log(o.errCode), 10004 === o.errCode && console.log("该音频资源文件不存在");
}), wx.onBackgroundAudioPlay(function(o) {
    console.log("播放：", o);
}), wx.onBackgroundAudioPause(function(o) {
    console.log("暂停:", o);
}), wx.onBackgroundAudioStop(function(o) {
    console.log("停止:", o), console.log("play successful"), u.status = !0, u.queue.shift(), 
    u.queue.length >= 1 && e(u.queue[0]);
}), module.exports = {
    playMsgSound: function(e) {
        e = decodeURIComponent(e), u.queue.push(e), u.queue.length >= 1 && o(u.queue[0]);
    },
    playMessageSoun1: function(o) {
        n.src = o, n.play();
    },
    playSound: function(e) {
        n.src = e, o(e);
    }
};