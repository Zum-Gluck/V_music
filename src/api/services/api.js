import api from './instance'

/**
 * @method 获取轮播图
 */
export const getBanner = () => api.get('/banner', {})

/**
 * @method 获取推荐歌单
 * @param  list 取出数量默认8
 */
export const getPersonalizeds = limit => api.get(`/personalized?limit=${limit}`, {})

/**
 * @method 获取新歌曲
 * @param  limit 取出数里默认为三十
 */
export const getNewsongs = limit => api.get(`/personalized/newsong?limit=${limit}`, {})

/**
 * @method 获取歌曲详情
 */
export const getSongDetail = (ids, timestamp) => api.post(`/song/detail?timestamp=${timestamp}`, { ids })

/**
 * @method 获取歌词
 */
export const getLyric = id => api.post(`/lyric?id=${id}`, {})

/**
 * @method 获取歌手
 */
export const getHotSinger = () => api.get('/top/artists?offset=0&limit=30', {})

/**
 * @method 获取歌手分类列表
 */
export const getSingerList = params => api.get(`/artist/list`, { params })