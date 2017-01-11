var app = getApp();

function judgeIfObstacle(point){
    var circleColorList = app.globalData.circleColorList
    var circleStatus = circleColorList[point]
    if(circleStatus){
        return true
    }
    return false
}

module.exports = {
    judgeIfObstacle:judgeIfObstacle
}