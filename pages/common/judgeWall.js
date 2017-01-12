var points = require('points')
var clearToBegin = require("clearToBegin")
function judgeIfWall(currentPoint, isWalker) {
    var wall = points.wallPoints;
    for (var index in wall) {
        if (currentPoint == wall[index]) {
            if (isWalker) {
                
            }
            return true;
        }
    }
    return false;
}

module.exports = {
    judgeIfWall: judgeIfWall,
}

