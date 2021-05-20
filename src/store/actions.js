export default {
  addCart(context, payload) {
    // 对是否有相同商品进行判断
    let old = context.state.cartList.find(item => item.iid == payload.iid)

    if (old) {
      context.commit('addCounter', old)
    } else {
      context.commit('addNew', payload)
    }
  }
}