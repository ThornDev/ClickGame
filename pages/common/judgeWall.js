var points = require('points');
function judgeIfWall(currentPoint, isWalker) {
    var wall = points.wallPoints;
    for (var index in wall) {
        if (currentPoint == wall[index]) {
            if (isWalker) {
                wx.showModal({
                    title: "很抱歉！",
                    content: "黑色势力已逃出包围圈！",
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {

                        }
                    }
                })
            }
            return true;
        }
    }
    return false;
}

module.exports = {
    judgeIfWall: judgeIfWall,
}

