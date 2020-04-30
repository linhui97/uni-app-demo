<template>
    <view>
        最新
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
                    title: "最新"
                })
            },
        }
    }
</script>

<style scoped>

</style>
