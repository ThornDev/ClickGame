//index.js
//获取应用实例
var points = require('../common/points')
var judgeWall = require('../common/judgeWall')
var calculatePath = require('../common/calculatePath')
var app = getApp()
Page({
  // 这里声明的是类的全局变量
  data: {
    userInfo: {},
    circleBlackList: [],           // 黑色圆点位置
    circleList: [],                // 圆点数组
    colorCircleFirst: '#FFDF2F',  // 圆点颜色1
    colorCircleSecond: '#FE4D32', // 圆点颜色2
    colorCircleBlack: '#000000',  // 圆点颜色黑色
    isRunning: false,             // 是否正在进行
    blackCircleIndex: 60,           // 黑色圆点
    steps: 0,                      // 点击步数
    modalOut: true,                // 提示框初始状态
    modalTitle: "",                // 提示标题
    modalMessage: "",              // 提示信息
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 黄色圆点 点击方法
  tapCircle: function (event) {
    console.log(event);
    var circleID = event.target.id;
    var tpCircleColorList = app.globalData.circleColorList;
    var tpBlackCircleList = this.data.circleBlackList;
    var colorStatus = tpCircleColorList[circleID];
    var blackIndex = this.data.blackCircleIndex;

    if (!colorStatus) {
      // 将点击的点选中
      tpCircleColorList[circleID] = true;
      app.globalData.circleColorList = tpCircleColorList;

      // 如果是墙 则 成功找到出口
      var judge = judgeWall.judgeIfWall(blackIndex, true);
      if (judge) {
        var tstep = this.data.steps;
        tstep = tstep + 1;
        this.setData({
          circleColorList: tpCircleColorList,
          steps: tstep,
          modalOut: false,
          modalTitle: "很抱歉！",
          modalMessage: "黑色势力已逃出包围圈！",
        });
        return;
      }

      // 判断逃脱路径
      var path = calculatePath.calculatePath(blackIndex, true);
      // 如果已经没路走了 则成功围困
      if (path.length == 0) {
        var tstep = this.data.steps;
        tstep = tstep + 1;
        this.setData({
          circleColorList: tpCircleColorList,
          steps: tstep,
        });
        return
      }
      // 有路的话则将 原来黑点还原 继续逃出路径的下一点
      tpBlackCircleList[blackIndex] = false;
      blackIndex = path[0];
      tpBlackCircleList[blackIndex] = true;
      // 操作步数
      var tstep = this.data.steps;
      tstep = tstep + 1;

      // 这里是暴露对wxml的数据接口
      this.setData({
        circleColorList: tpCircleColorList,
        circleBlackList: tpBlackCircleList,
        blackCircleIndex: blackIndex,
        steps: tstep,
      });
    }
  },
  // 逃出成功点击事件
  modalOutAction: function (e) {
    var tpBlackCircleList = this.data.circleBlackList;
    var tpCircleColorLists = app.globalData.circleColorList
    for (var i = 0; i < tpCircleColorLists.length; i++) {
      tpCircleColorLists[i] = false
    }
    app.globalData.circleColorList = tpCircleColorLists
    tpBlackCircleList[this.data.blackCircleIndex] = false
    tpBlackCircleList[60] = true
    this.setData({
        circleColorList: tpCircleColorLists,
        modalOut: true,
        steps: 0,
        blackCircleIndex: 60,
        circleBlackList:tpBlackCircleList,
      });
  },

  onLoad: function () {
    console.log('onLoad');
    var that = this;
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var numPerLine = 11;
    var numPerVertical = 11;
    var circleList = [];
    var circleMap = {};
    var circleColorList = [];
    var circleBlackList = [];
    var circleBlackIndexList = [];
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        cuserInfo: userInfo
      })
    })
    // 计算每个圆点的top和left
    for (var i = 0; i < numPerLine; i++) {
      for (var j = 0; j < numPerVertical; j++) {
        if ((i + 1) % 2 == 0) {
          if (j != 0) {
            leftCircle = (50 + 8) * j + 36;
          } else {
            leftCircle = 36;
          }
        } else {
          leftCircle = 50 * j + 8 * (j + 1);
        }
        topCircle = 50 * i + 8 * (i + 1);
        circleColorList.push(false);
        circleBlackList.push(false);
        circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
      }
    }
    // 注入黑色圆点初始位置随机点位
    circleBlackIndexList = points.blackPoints;
    // 生成随机整数
    var randomIndex = parseInt(24 * Math.random());
    var randomCircleIndex = 60
    // circleBlackIndexList[randomIndex];
    circleBlackList[randomCircleIndex] = true;

    // 构造初始二叉树

    // 为全局变量赋值
    app.globalData.circleColorList = circleColorList;
    that.setData({
      circleColorList: circleColorList,
      circleList: circleList,
      circleBlackList: circleBlackList,
      blackCircleIndex: randomCircleIndex,
    })
  },

})

module.exports = {

}
