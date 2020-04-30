<template>
    <view>
        分类
    </view>
</template>

<script>
    export default {
        name: "index",
        mounted() {
            this.showTitle();
        },
        methods: {
            //修改页面标题
            showTitle(){
                uni.setNavigationBarTitle({
                    title: "分类"
                })
            },
        }
    }
</script>

<style scoped>

</style>
