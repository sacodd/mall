import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.log = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // img可能没有值，所以需要判断
    this.image = info.image ? info.image[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}