// pages/login/login.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    SDK_VERSION: app.globalData.SDK_VERSION
  },

  /**
   * 点击登录
   */
  onSubmitSignIn() {
    const { account, password } = this.data;
    console.log("登入", account, password)
    const im = app.getIM();
    im.login({
      name: account,
      password
    });
  },

  /**
   * 注册
   */
  onSubmitRegister() {
    const { account, password } = this.data;
    console.log("注册", account, password);
    const im = app.getIM();
    im.rosterManage.asyncRegester({
      username: account,
      password
    })
      .then(response => {
        wx.showModal({
          title: '注册成功提示',
          content: '注册成功~'
        });
        console.log('im.rosterManage.asyncRegester', response);
      })
      .catch(error => {
        wx.showModal({
          title: '注册失败提示',
          content: JSON.stringify(error)
        });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})