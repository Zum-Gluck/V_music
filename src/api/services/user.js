import api from './instance'

/**
 * @method 手机登录
 * @params phone 用户id
 */
export const login = (phone, password, timestamp) =>
  api.get(`/login/cellphone?phone=${phone}&password=${password}&timestamp=${timestamp}`, {
    withCredentials: true
  })


/**
 * @method 邮箱登录
 */
export const loginEmail = (email, password) => api.get(`/login?email=${email}&password=${password}`, {
  withCredentials: true
})

/**
 * @method 获取用户详情
 * @params uid 用户id
 */
export const getUserDetail = uid => api.get(`/user/detail?uid=${uid}`, {})

/**
 * @method 获取用户播放记录
 * @params uid 用户 id
 * @params type : type=1 时只返回 weekData, type=0 时返回 allData
 */

export const getUserRecord = (uid, type) =>
  api.get(`/user/record?uid=${uid}&type=${type}`, {})

/**
 * @method 获取用户歌单
 * @params uid 用户 id
 */

export const getUserArtist = uid => api.get(`/user/playlist?uid=${uid}`, {})

/**
 * @method 获取验证码
 */
export const getValidateCode = (phone, timestamp) => api.get(`/captcha/sent?phone=${phone}&timestamp=${timestamp}`)

/**
 * @method 校验验证码
 */
export const checkValidateCode = params => api.get(`/captcha/verify`, { params })

/**
 * @method 获取登录状态
 */

export const getLoginStatus = () => api.get(`/login/status`, {})

/**
 * @method 退出登录
 */
export const loginOut = () => api.get(`/logout`, {})

/**
 * @method 获取二维码Key用于生成二维码
 */
export const getQrKey = timestamp => api.get(`/login/qr/key?timestamp=${timestamp}`, { withCredentials: true })

/**
 * @method 注册（修改密码）
 * @param captcha: 验证码
 * @param phone : 手机号码
 * @param password: 密码
 * @param nickname: 昵称
 */
export const resiger = params => api.get(`/register/cellphone`, { params })

/**
 * @method 检测用户是否已经注册
 */
export const checkUserHava = phone => api.get(`/cellphone/existence/check?phone=${phone}`, {})