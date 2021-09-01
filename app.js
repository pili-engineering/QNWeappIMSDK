import * as QNIM from './im/qnweapp-im';

//app.js
App({
  onLaunch: function() {
    this.initSDK();
  },
  globalData: {
    im: {},
    SDK_VERSION: QNIM.version
  },

  /**
   * 初始化 SDK
   */
  initSDK() {
    const im = QNIM.init({
      appid: 'dxdjbunzmxiu'
    });
    if (im) {
      this.globalData.im = im;
      this.addEventListenersOfIM();
    }
  },

  /**
   * 设置 IM 事件监听
   */
  addEventListenersOfIM() {
    const im = this.getIM();
    im.on({
      loginSuccess: this.loginSuccess,
      loginerror: this.loginFail
    });
  },

  /**
   * 登录成功
   */
  loginSuccess() {
    // console.log(this.getCurrentPages())
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    if (currentPage.route === 'pages/login/login') {
      wx.navigateTo({
        url: '/pages/home/home',
      });
    }
  },

  /**
   * 登录失败提示
   * @param {*} error 
   */
  loginFail(error) {
    wx.showModal({
      title: '登录失败提示',
      content: error
    });
  },

  /**
   * 获取 IM 对象
   * @returns {{}}
   */
  getIM() {
    return this.globalData.im;
  }
});