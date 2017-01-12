// var calculatePath = require("calculatePath")
var app = getApp()

// 判断周围是否有可逃点
function predicatePath(path) {
    // 如果是可逃点
    var nextPoint = path[0]
    var circleColorList = app.globalData.circleColorList
    var isObstacle = circleColorList[nextPoint]
    // 判断此可逃点是否有逃脱路径
    var predicatePath = [];
    if (isObstacle) {
       predicatePath =  this.expandPath(nextPoint)
    }
    return predicatePath;
}
// 判断周围的点是否具有逃脱路径
function expandPath(nextPoint) {

    var escapePath = calculatePath.calculatePath(nextPoint,false);
    var path = []
    path.push(nextPoint)

    if (escapePath.length == 0) {
        return []
    }
    path.concat(escapePath)
    return path
}

module.exports={
    predicatePath:predicatePath,
    expandPath:expandPath
}