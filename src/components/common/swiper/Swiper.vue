<template>
  <div class="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 轮播图时间
    interval: {
	    type: Number,
      default: 3000
    },
    // 动画速度
    animDuration: {
	    type: Number,
      default: 300
    },
    // 拖动换图的距离百分比
    moveRatio: {
      type: Number,
      default: 0.3
    }
  },
  data () {
    return {
      slideCount: 0,
      width: 0,
      style: {},
      currentIndex: 1,
      scrolling: false  // 滚动时禁止滑动，否则会出问题
    }
  },
  mounted () {
    // 初始化
    setTimeout(() => {
      // 创建元素
      this.handleDom()
      // 开始轮播图
      this.setTimer()
    }, 500)
  },
  methods: {

    // 创建dom元素，并初始化参量
    handleDom () {
      // 获取操作元素
      let swiperEl = document.querySelector('.swiper')
      let slideEl = swiperEl.querySelectorAll('.slide')

      // 保存slide的个数
      this.slideCount = slideEl.length

      // 在前后添加图片
      let firstClone = slideEl[0].cloneNode(true)
      let lastClone = slideEl[this.slideCount - 1].cloneNode(true)
      swiperEl.insertBefore(lastClone, slideEl[0])
      swiperEl.appendChild(firstClone)

      // 初始化参量
      this.width = swiperEl.offsetWidth
      this.style = swiperEl.style

      // 初始位置
      this.setTransform(-this.width)
      
      // 设置动画时间
      
    },

    // 移动元素
    setTransform (position) {
      this.style.transform = `translate(${position}px, 0)`
    },

    /* 
      轮播图操作    
    */

    // 定时器设置
    setTimer () {
      this.timer = window.setInterval(() => {
        this.currentIndex++

        // 定时器的滚动操作
        this.swiperMove(-this.width * this.currentIndex)
      }, this.interval)
    },
    stopTimer () {
      window.clearInterval(this.timer)
    },

    // 定时器滚动
    swiperMove(position) {
      this.scrolling = true

      // 设置滚动动画
      this.style.transition = 'transform ' + this.animDuration + 'ms' // 注意transform后面的空格  transition = transform ***ms (动画的动作   时间)
      this.setTransform(position)

      // 矫正轮播图位置
      this.checkPosition()

      this.scrolling = false
    },

    // 轮播图矫正
    checkPosition () {
      window.setTimeout (() => {
        this.style.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.setTransform(-this.width * this.currentIndex)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.width * this.currentIndex)
        }
      }, this.animDuration);
    },

    /*
      手指滑动位置
    */
    touchStart (e) {
      // 如果正在轮播，不能进行操作
      if (this.scrolling) return

      // 停止定时器
      this.stopTimer()

      // 记录开始位置
      this.startX = e.touches[0].pageX
    },
    touchMove (e) {
      // 计算移动距离
      this.distanceX = e.touches[0].pageX - this.startX

      // 计算最终位置
      let endX = -this.currentIndex * this.width + this.distanceX

      // 进行初步移动
      this.setTransform(endX)
    },
    touchEnd () {
      // 对移动距离进行判断
      if (this.distanceX == 0) {
        return
      } else if (this.distanceX > 0 && this.distanceX > this.width * this.moveRatio) {
        this.currentIndex--
      } else if (this.distanceX < 0 && this.distanceX < -this.width * this.moveRatio) {
        this.currentIndex++
      }

      // 进行最终的移动
      this.swiperMove(-this.width * this.currentIndex)

      // 开启定时器
      this.setTimer()
    }
  }
}
</script>

<style>
  .hy-swiper {
    overflow: hidden;
    position: relative;
  }
  
  .swiper {
    display: flex;
  }

  

</style>
