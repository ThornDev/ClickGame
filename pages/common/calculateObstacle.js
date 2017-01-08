var points = require('points');
var judgeWall = require('judgeWall');
var app = getApp()
function calculatePath(currentIndex) {
    var wallPoints = points.wallPoints;
    var leftLinePath = [];          // 左边路径
    var leftTopLinePath = [];       // 左上路径
    var rightTopLinePath = [];      // 右上路径
    var rightLinePath = [];         // 右边路径
    var rightBottomLinePath = [];   // 右下路径
    var leftBottomLinePath = [];    // 左下路径
    // 判断哪一列
    var vertical = (currentIndex + 1) % 11; // 取余
    // 判断哪一行
    var line = parseInt((currentIndex + 1) / 11);       // 取整

    if (vertical) {
        line += 1;
    } else {
        vertical = 11;
    }

    console.log("vertical " + vertical + "line " + line)
    console.log("currentIndex " + currentIndex)
    // 左
    for (var i = 1; i < vertical; i++) {
        leftLinePath.push(currentIndex - i);
    }
    // 右
    for (var i = 1; i <= 11 - vertical; i++) {
        rightLinePath.push(currentIndex + i);
    }
    // 判断奇数行还是偶数行
    var leftTopFirstDesNum = 0;
    var rightTopFirstDesNum = 0;
    var rightBottomFirstDesNum = 0;
    var leftBottomFirstDesNum = 0;
    if (line % 2 == 0) {
        leftTopFirstDesNum = 11;
        rightTopFirstDesNum = 10;
        rightBottomFirstDesNum = 12;
        leftBottomFirstDesNum = 11;
    } else {
        leftTopFirstDesNum = 12;
        rightTopFirstDesNum = 11;
        rightBottomFirstDesNum = 11;
        leftBottomFirstDesNum = 10;
    }
    for (var i = 1; i < line; i++) {
        // 左上 右上
        var leftTopPoint = 0;
        var rightTopPoint = 0;
        var tpNum = i % 2;
        var tpVer = parseInt(i / 2);
        console.log("tpNum" + tpNum + "tpVer" + tpVer);
        if (tpNum == 0) {
            leftTopPoint = currentIndex - tpVer * (12 + 11);
            rightTopPoint = currentIndex - tpVer * (10 + 11);
        } else {
            leftTopPoint = currentIndex - tpVer * (12 + 11) - tpNum * leftTopFirstDesNum;
            rightTopPoint = currentIndex - tpVer * (10 + 11) - tpNum * rightTopFirstDesNum;
        }
        if (leftTopPoint >= 0) {
            leftTopLinePath.push(leftTopPoint);
        }
        if (rightTopPoint >= 0) {
            rightTopLinePath.push(rightTopPoint);
        }
    }

    for (var j = 1; j <= 11 - line; j++) {
        // 左下 右下
        var leftBottomPoint = 0;
        var rightBottomPoint = 0;
        var tpNum = j % 2;
        var tpVer = parseInt(j / 2);
        if (tpNum == 0) {
            leftBottomPoint = currentIndex + tpVer * (11 + 10);
            rightBottomPoint = currentIndex + tpVer * (11 + 12);
        } else {
            leftBottomPoint = currentIndex + tpVer * (11 + 10) + tpNum * leftBottomFirstDesNum;
            rightBottomPoint = currentIndex + tpVer * (11 + 12) + tpNum * rightBottomFirstDesNum;
        }
        if (leftBottomPoint <= 120) {
            leftBottomLinePath.push(leftBottomPoint);
        }
        if (rightBottomPoint <= 120) {
            rightBottomLinePath.push(rightBottomPoint);
        }
    }

    var leftLength = leftLinePath.length;
    var leftTopLength = leftTopLinePath.length;
    var rightTopLength = rightTopLinePath.length;
    var rightLength = rightLinePath.length;
    var rightBottomLength = rightBottomLinePath.length;
    var leftBottomLength = leftBottomLinePath.length;

    var returnList = [];
    var returnLength = 0;

    if (returnLength == 0 && this.obstacle(leftLinePath)) {
        returnList = leftLinePath;
        returnLength = leftLength;
    }

    if ((returnLength >= leftTopLength || returnLength == 0) && this.obstacle(leftTopLinePath)) {
        returnList = leftTopLinePath;
        returnLength = leftTopLength;
    }
    if ((returnLength >= rightTopLength || returnLength == 0) && this.obstacle(rightTopLinePath)) {
        returnList = rightTopLinePath;
        returnLength = rightTopLength;
    }
    if ((returnLength >= rightLength || returnLength == 0) && this.obstacle(rightLinePath)) {
        returnList = rightLinePath;
        returnLength = rightLength;
    }
    if ((returnLength >= rightBottomLength || returnLength == 0) && this.obstacle(rightBottomLinePath)) {
        returnList = rightBottomLinePath;
        returnLength = rightBottomLength;
    }
    if ((returnLength >= leftBottomLength || returnLength == 0) && this.obstacle(leftBottomLinePath)) {
        returnList = leftBottomLinePath;
        returnLength = leftBottomLength;
    }
    if (returnList.length == 0) {
        wx.showModal({
            title: "恭喜你！",
            content: "已将黑暗势力成功擒获！",
            showCancel: false,
            success: function (res) {
                if (res.confirm) {

                }
            }
        })
    }
    return returnList;
}
// 逃脱路径障碍判断
function obstacle(linePath) {
    var circleColorList = app.globalData.circleColorList
    // console.log("judge "+circleColorList)
    var obstacleNum = 0
    var lineLength = linePath.length
    for (var i = 0; i < lineLength; i++) {
        var linePoint = linePath[i];
        var isObstacle = circleColorList[linePoint];
        if (i == 0 && isObstacle) {
            return false
        }
        if (i == 1 && isObstacle) {
            return false
        }
        if (i == lineLength - 1 && isObstacle) {
            return false
        }
        if (isObstacle) {
            obstacleNum++
        }
    }
    if (obstacleNum >= 1) {
        return true
    }
    return true
}

// 判断周围是否有可逃点
function nextPathPoint(nextPoint){
    // 如果是可逃点
var circleColorList = app.globalData.circleColorList
var isObstacle = circleColorList[nextPoint]
    // 判断此可逃点是否有逃脱路径
}
// 判断周围的点是否具有逃脱路径
function expandPath(nextPoint) {

    var escapePath = this.calculatePath(nextPoint);
    var path = []
    path.push(nextPoint)

    if (escapePath.length == 0) {
        return []
    }
    path.concat(escapePath)
    return path
}
module.exports = {
    calculatePath: calculatePath,
    obstacle: obstacle,
}