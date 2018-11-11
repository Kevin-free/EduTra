//服务器url配置
var e = "https://app.cxy61.com/program_face2face",
  r = "https://app.cxy61.com/server",
  s = "http://localhost:8080/learnning",
  o = {
    server: s,
    serverDomain: r,
    domain: e,
    login: e + "/userinfo/invitation_code_login/",
    whoami: e + "/userinfo/whoami/",
    classrooms: r + "/classroom/my_recent_classrooms/",
    evaluations: r + "/classroom/evaluations/",
    addReward: e + "/userinfo/add_reward/",
    updateExtent: e + "/userinfo/update_learnextent/",
    findPassword: e + "/userinfo/reset_password/",
    updateUserInfo: e + "/userinfo/userinfo_update/",
    getQiniuToken: e + "/upload/token/",
    getRongYunToken: e + "/im/user_get_token/",
    courseList: e + "/course/courses/",
    homeworks: "https://app.cxy61.com/face2face/course/myhomeworks/?status=unwork",
    myhomeworks: e + "/course/myhomeworks/",
    dohomeworks: e + "/course/do_homework/",
    mycertificates: e + "/userinfo/mycertificates/",
    activityTypes: function(e) {
      return r + "/course/activity_types/?page=" + e;
    },
    activitys: function(e, o) {
      return o ? r + "/course/time_limit_activities/?page=" + e + "&type=" + o : r + "/course/time_limit_activities/?page=" + e;
    },
    myActivity: function(e, o) {
      return o ? r + "/course/time_limit_activities/?join=true&page=" + e + "&type=" + o : r + "/course/time_limit_activities/?join=true&page=" + e;
    },
    activityDeatil: function(e) {
      return r + "/course/time_limit_activities/" + e + "/";
    },
    getBanner: r + "/userinfo/banners/",
    getBannerDetail: function(e) {
      return r + "/userinfo/banners/" + e + "/";
    },
    courseInfo: function(r) {
      return e + "/course/courses/" + r + "/";
    },
    resetAdaptCourse: e + "/course/reset_mycourse/",
    beginAdaptCourse: e + "/course/begin_mycourse/",
    getForumList: function(r) {
      return e + "/forum/posts/?page=" + r;
    },
    getForumDetail: function(r) {
      return e + "/forum/posts/" + r + "/";
    },
    getForumReplyList: function(r, o) {
      return e + "/forum/replies/?posts=" + r + "&page=" + o;
    },
    forumReply: e + "/forum/replies_create/",
    forumReplyAgain: e + "/forum/replymore_create/",
    deleteForum: function(r) {
      return e + "/forum/posts/" + r + "/";
    },
    deleteForumReply: function(r) {
      return e + "/forum/replies/" + r + "/";
    },
    deleteForumReplyAgain: function(r) {
      return e + "/forum/replymores/" + r + "/";
    },
    forumSections: function(r, o) {
      return e + "/forum/sections/?page=" + r + "&page_size=" + o;
    },
    forumCreate: e + "/forum/posts_create/",
    forumAllNews: function(r) {
      return e + "/message/messages/?page=" + r;
    },
    forumNewsDetail: function(r) {
      return e + "/message/messages/" + r + "/";
    },
    myForum: function(r) {
      return e + "/forum/posts/?section=&isessence=&myposts=true&page=" + r;
    },
    classsrecords: function(e) {
      return r + "/classroom/classsrecords/" + e + "/";
    },
    lessonList: r + "/course/courses/",
    createGroup: r + "/userinfo/group_create/",
    myGroup: function(e) {
      return r + "/userinfo/my_group/?activity=" + e;
    },
    groupDetail: function(e) {
      return r + "/userinfo/group_detail/" + e + "/";
    },
    joinGroup: function(e) {
      return r + "/userinfo/join_group/" + e + "/";
    },
    exitGroup: function(e) {
      return r + "/userinfo/exit_group/?activity=" + e;
    },
    deleteGroup: function(e) {
      return r + "/userinfo/delete_group/" + e + "/";
    },
    payOrder: function(e) {
      return r + "/market/order/payment/" + e + "/";
    },
    cancelOrder: function(e) {
      return r + "/market/order/cancel/" + e + "/";
    },
    submitOrder: function(e) {
      return r + "/market/course/purchase/" + e + "/";
    },
    payCourseList: r + "/course/courses/?teach_types=wxapp",
    lessonPackageList: r + "/course/courses/?teach_types=online&sift=jingdong&teach_types=online",
    lessonInfo: function(e) {
      return r + "/course/courses/" + e + "/";
    },
    loginWX: r + "/userinfo/login_wx/",
    signupWX: r + "/userinfo/signup_wx/",
    whoamiWX: r + "/userinfo/whoami/",
    bindPhoneVerifyCodeWX: r + "/userinfo/bind_wx_request/",
    bindPhoneWX: r + "/userinfo/bind_wx/",
    teacherList: function(e, o) {
      return r + "/userinfo/teacher_list/?page=" + e + "&ordering=" + o;
    },
    teacherDetail: function(e) {
      return r + "/userinfo/teacher_info/" + e + "/";
    },
    getClassschedules: function(e, o) {
      return r + "/classroom/classschedules/?day=" + e + "&teacher=" + o;
    },
    selectSchedule: function(e) {
      return r + "/classroom/classschedule/choice/" + e + "/";
    },
    cancelSchedule: function(e, o) {
      return r + "/classroom/classschedule/cancel/" + e + "/";
    },
    getEvaluations: function(e, o) {
      return r + "/classroom/evaluations/?teacher=" + e + "&all=1&page=" + o;
    },
    startQuestionnaire: e + "/course/questionnaire_start/",
    judgeQuestion: e + "/course/questionnaire_judge/",
    createStudyLine: e + "/course/study_line_create/",
    createDefaultStudyLine: e + "/course/study_line_default/",
    getStudyLine: e + "/course/my_study_line/",
    getCurrentCourse: e + "/course/present_course/",
    getRecommendCourse: e + "/course/recommend_course/",
    buyRedDiamond: function(r) {
      return e + "/market/product/diamond/?number=" + r;
    },
    payForOrder: function(r) {
      return e + "/market/order/payment/" + r + "/";
    },
    payForCourse: function(r) {
      return e + "/market/product/purchase/" + r + "/";
    },
    zuanRecords: function(r, o, t) {
      var u = r;
      return o && (u += "&diamond=", u += o), t && (u += "&record=", u += t), e + "/userinfo/diamond_records/?page=" + u;
    },
    createQrcode: r + "/userinfo/qrcode/",
    updateNickName: e + "/userinfo/userinfo_update/",
    getCertificate: e + "/userinfo/receive_certificate/",
    myUnlockCourse: function(r) {
      return e + "/course/my_unlock_records/?page=" + r;
    },
    isPay: r + "/userinfo/is_pay/",
    courseDetail: function(r) {
      return e + "/course/course_catalogue/" + r + "/";
    },
    myOrder: r + "/market/orders/",
    getPromoCode: r + "/userinfo/my_promo/",
    promoCheck: function(e, o) {
      return r + "/userinfo/promo_check/?promo_code=" + e + "&course=" + o;
    }
  };

module.exports = o;