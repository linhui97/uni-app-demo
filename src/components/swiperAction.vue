<template>
    <!--
        图片详情高清大图组件
        1.slot
        2.对外提供数据 滑动的方向
    -->
    <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: "swiperAction",
        data() {
          return {
              startTime: '',    //按下时间
              startX: '',    //按下X轴位置
              startY: '',    //按下X轴位置
              endTime: '',    //离开时间
              endX: '',    //离开X轴位置
              endY: '',    //离开X轴位置
          }
        },
        methods: {
            //手指按下屏幕
            handleTouchStart(event){
                // console.log("按下：" + event.changedTouches[0].clientX);
                // console.log("按下：" + event.changedTouches[0].clientY);

                this.startTime = Date.now();
                this.startX = event.changedTouches[0].clientX;
                this.startY = event.changedTouches[0].clientY;
            },
            //手指离开屏幕
            handleTouchEnd(event){
                // console.log("离开：" + event.changedTouches[0].clientX);
                // console.log("离开：" + event.changedTouches[0].clientY);

                this.endTime = Date.now();
                this.endX = event.changedTouches[0].clientX;
                this.endY = event.changedTouches[0].clientY;
                // 判断按下的时长
                if(this.endTime - this.startTime > 2000){
                    return;
                }
                // 滑动的方向
                let direction = "";
                //先判断用户滑动的距离 是否合法；合法：判断滑动的方向； 注意：距离要加上绝对值
                if(Math.abs(this.endX - this.startX) > 10 && Math.abs(this.endY - this.startY) < 10){
                    direction = this.endX - this.startX>0 ? "right" : "left";
                }else {
                    return;
                }
                //用户做了合法的滑动操作
                // console.log(direction);
                this.$emit("swiperAction", {direction});
            },

        }
    }
</script>

<style scoped>

</style>
