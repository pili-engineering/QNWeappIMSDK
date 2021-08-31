// pages/chatroom/chatroom.js
import {
  sendMessage
} from '../../utils/im';
import request from '../../api/request';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue: '',
    messageId: 0
  },

  /**
   * 加入聊天室(群组)
   */
  joinChatRoom() {
    return request({
      url: '/v1/mock/group',
      method: 'post',
      data: {
        group_id: this.groupId
      }
    }).then(response => {
      console.log('joinChatRoom response', response);
      this.imGroupId = response.data.im_group_id;
      app.globalData.im.chatroomManage.join(this.imGroupId);
    });
  },

  /**
   * 输入要发送的内容
   * @param event
   */
  onChangeInputValue(event) {
    this.setData({
      inputValue: event.detail
    });
  },

  /**
   * 发送消息
   */
  onSubmitMessage() {
    const {
      inputValue
    } = this.data;
    sendMessage(app.globalData.im, {
      group_id: this.imGroupId,
      text: inputValue
    });
    this.setData({
      inputValue: ''
    });
  },

  /**
   * 设置 IM 事件监听
   */
  setEventListeners() {
    console.log('setEventListeners');
    app.globalData.im.on({
      onGroupMessage: this.onGroupMessage,
      // onMessageStatusChanged: response => {
      //   console.log('response1', response);
      // },
      // onSendingMessageStatusChanged: response => {
      //   console.log('response2', response);
      // },
      // onRosterMessage: response => {
      //   console.log('response3', response);
      // }
    });
  },

  /**
   * 监听消息
   * @param {*} message
   */
  onGroupMessage(message) {
    console.log('onGroupMessage', message);
    const content = JSON.parse(message.content || '{}');
    const {
      messages: prevMessages
    } = this.data;
    const messages = [
      ...prevMessages,
      {
        ...message,
        content
      }
    ];
    this.setData({
      messages,
      messageId: messages.length - 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.groupId = options.groupId;
    this.joinChatRoom().finally(() => {
      if (this.imGroupId) {
        // 获取历史记录
        app.globalData.im.sysManage.requireHistoryMessage(this.imGroupId, 0, 20);
      }
      this.setEventListeners();
    });
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
    console.log('leave')
    app.globalData.im.off({
      onGroupMessage: this.onGroupMessage
    });
    // app.globalData.im.chatroomManage.leave(this.imGroupId);
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
});