// @ts-ignore
import * as LibGenerateTestUserSig from '../../public/js/lib-generate-test-usersig.min'

interface UseTRTC {
  getUserSig: () => { userSig: string }
}

export function useTRTC (): UseTRTC {
  // 前端生成签名
  function getUserSig () {
    // const EXPIRE_TIME = 604800 // 签名过期时间
    // const { sdkInfo: { sdkAppId, secretKey }, userInfo: { username } } = store.getters
    // eslint-disable-next-line new-cap
    // const generator = new LibGenerateTestUserSig.default(Number(sdkAppId), secretKey, EXPIRE_TIME)
    // return generator.genTestUserSig(username)
    return { userSig: '' }
  }

  return {
    getUserSig
  }
}
