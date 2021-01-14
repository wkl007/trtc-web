import type { Client, ClientConfig, RemoteStreamInfo, RemoteUserInfo, RtcError } from 'trtc-js-sdk'
import TRTC from 'trtc-js-sdk'

interface Event {
  handleError: (err: RtcError) => void,
  handleClientBanned: (err: RtcError) => void,
  handlePeerJoin: (remoteUserInfo: RemoteUserInfo) => void,
  handlePeerLeave: (remoteUserInfo: RemoteUserInfo) => void,
  handleStreamAdded: (remoteStreamInfo: RemoteStreamInfo) => void,
  handleStreamSubscribed: (remoteStreamInfo: RemoteStreamInfo) => void,
  handleStreamRemoved: (remoteStreamInfo: RemoteStreamInfo) => void,
  handleStreamUpdated: (remoteStreamInfo: RemoteStreamInfo) => void,
  handleMuteAudio: (remoteUserInfo: RemoteUserInfo) => void,
  handleUnmuteAudio: (remoteUserInfo: RemoteUserInfo) => void,
  handleMuteVideo: (remoteUserInfo: RemoteUserInfo) => void,
  handleUnmuteVideo: (remoteUserInfo: RemoteUserInfo) => void,
}

export default class RtcClient {
  /**
   * 腾讯云sdkAppId
   * @private
   */
  private sdkAppId: number
  /**
   * 用户Id
   * @private
   */
  private userId: string
  /**
   * 用户签名
   * @private
   */
  private userSig: string
  /**
   * 房间id
   * @private
   */
  private roomId: string
  /**
   * 是否已经发布过流
   * @private
   */
  private isPublished: boolean
  /**
   * 是否已经加入过房间
   * @private
   */
  private isJoined: boolean
  /**
   * 本地流
   * @private
   */
  private localStream: null
  /**
   * 远端流
   * @private
   */
  private remoteStreams: any[]
  /**
   * 客户端对象
   * @private
   */
  private client: Client | undefined

  constructor (options: { sdkAppId: number, userId: string, userSig: string, roomId: string }) {
    this.sdkAppId = options.sdkAppId
    this.userId = options.userId
    this.userSig = options.userSig
    this.roomId = options.roomId

    this.isPublished = false
    this.isJoined = false
    this.localStream = null
    this.remoteStreams = []

    this.createClient()
  }

  /**
   * 创建客户端对象
   */
  createClient (): void {
    const clientConfig: ClientConfig = {
      mode: 'rtc',
      sdkAppId: this.sdkAppId,
      userId: this.userId,
      userSig: this.userSig
    }
    this.client = TRTC.createClient(clientConfig)
  }

  /**
   * 绑定监听事件
   */
  initListener ({
    handleError,
    handleClientBanned,
    handlePeerJoin,
    handlePeerLeave,
    handleStreamAdded,
    handleStreamSubscribed,
    handleStreamRemoved,
    handleStreamUpdated,
    handleMuteAudio,
    handleUnmuteAudio,
    handleMuteVideo,
    handleUnmuteVideo
  }: Event): void {
    this.client?.on('error', (err: RtcError) => {
      handleError(err)
    })
    this.client?.on('client-banned', (err: RtcError) => {
      handleClientBanned(err)
      console.log(err, '您被踢出房间')
    })
    this.client?.on('peer-join', (remoteUserInfo: RemoteUserInfo) => {
      handlePeerJoin(remoteUserInfo)
    })
    this.client?.on('peer-leave', (remoteUserInfo: RemoteUserInfo) => {
      handlePeerLeave(remoteUserInfo)
    })
    this.client?.on('stream-added', (remoteStreamInfo: RemoteStreamInfo) => {
      handleStreamAdded(remoteStreamInfo)
    })
    this.client?.on('stream-subscribed', (remoteStreamInfo: RemoteStreamInfo) => {
      handleStreamSubscribed(remoteStreamInfo)
    })
    this.client?.on('stream-removed', (remoteStreamInfo: RemoteStreamInfo) => {
      handleStreamRemoved(remoteStreamInfo)
    })
    this.client?.on('stream-updated', (remoteStreamInfo: RemoteStreamInfo) => {
      handleStreamUpdated(remoteStreamInfo)
    })
    this.client?.on('mute-audio', (remoteUserInfo: RemoteUserInfo) => {
      handleMuteAudio(remoteUserInfo)
    })
    this.client?.on('unmute-audio', (remoteUserInfo: RemoteUserInfo) => {
      handleUnmuteAudio(remoteUserInfo)
    })
    this.client?.on('mute-video', (remoteUserInfo: RemoteUserInfo) => {
      handleMuteVideo(remoteUserInfo)
    })
    this.client?.on('unmute-video', (remoteUserInfo: RemoteUserInfo) => {
      handleUnmuteVideo(remoteUserInfo)
    })
  }

  /**
   * 移除监听事件
   */
  removeListener (): void {
    this.client?.off('*')
  }

  handleError ({ getCode }: RtcError): void {
    console.log(getCode())
  }
}
