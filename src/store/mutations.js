export default {
  addCounter(state, payload) {
    payload.count += 1
  },
  addNew(state, payload) {
    payload.count = 1
    payload.Checked = true
    state.cartList.push(payload)
  }
}