export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 对是否有相同商品进行判断
      let old = context.state.cartList.find(item => item.iid == payload.iid)

      if (old) {
        context.commit('addCounter', old)
        resolve('商品数量+1')
      } else {
        context.commit('addNew', payload)
        resolve('加入购物车')
      }
    })
  }
}