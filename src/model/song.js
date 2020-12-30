import utils from '../utils/utils'


export default class Song {
  constructor({
    id,
    singer,
    name,
    album,
    duration,
    image,
    playOCount,
    score
  }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.playOCount = playOCount
    this.score = score
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSings(musicData.ar || musicData.artists),
    name: musicData.name,
    album: musicData.al ? musicData.al.name : musicData.album.name,
    duration: utils.formatSecond(musicData.dt || musicData.duration),
    image: musicData.al ? musicData.al.picUrl : musicData.album.artist.img1v1Url,
    playOCount: musicData.playOCount || '',
    score: musicData.score || ''
  })
}

function filterSings(singer) {
  let ret = []

  //  过滤掉undifind 让他返回空
  if (!singer) return ''

  // 取出所有name
  singer.forEach(item => {
    ret.push(item.name)
  })

  return ret.join("/")
}