export default (params) => {
    // 显示数据请求加载提示
    uni.showLoading({
        title: "加载中..."
    });
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success(res) {  //请求成功
                resolve(res.data);
            },
            fail(err) {  //请求错误
                reject(err);
            },
            complete() {
                // 请求结束隐藏加载提示
                uni.hideLoading();
            }
        })
    });
}
