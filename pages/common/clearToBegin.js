var app = getApp()
function clearToBegin(){
    var tpCircleColorList = app.globalData.circleColorList
    for(var i = 0;i < tpCircleColorList.length; i++){
        tpCircleColorList[i] = false
    }
    this.setData({
        circleColorList: tpCircleColorList,
    })
}
module.exports = {
    clearToBegin:clearToBegin
}