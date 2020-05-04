<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: "goDetail",
        props: {
            list: Array,
            index: Number
        },
        mounted() {
            // console.log(this.list);
            // console.log(this.index);
        },
        methods: {
            //点击跳转到图片详情页
            handleClick(){
                // 1.将数据缓存下来
                getApp().globalData.imgList = this.list;
                getApp().globalData.imgIndex = this.index;
                // 2.跳转到详情页
                uni.navigateTo({
                    url: "/pages/imgDetail/index"
                })
            }
        }
    }
</script>

<style scoped>

</style>
