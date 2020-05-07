<template>
    <!--图片分类页面-->
    <view class="home_category">
        <navigator
            class="category_item"
            v-for="item in category"
            :url='`/pages/imgCategory/index?id=${item.id}`'>
            <image mode="aspectFill" :src="item.cover"></image>
            <view class="category_name">{{item.name}}</view>
        </navigator>
    </view>
</template>

<script>
    export default {
        name: "index",
        data() {
            return{
                category: [], //分类列表
            }
        },
        mounted() {
            this.showTitle();
            this.getData();
        },
        methods: {
            //修改页面标题
            showTitle(){
                uni.setNavigationBarTitle({
                    title: "分类"
                })
            },
            // 获取数据
            getData(){
                this.request({
                    url: "http://157.122.54.189:9088/image/v1/vertical/category",
                }).then( result => {
                    console.log(result);
                    this.category = result.res.category;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .home_category {
        display: flex;
        flex-wrap: wrap;
        .category_item {
            width: 33.33%;
            position: relative;
            border: 5rpx solid #fff;
            image {
                height: 240rpx;
            }

            .category_name {
                position: absolute;
                width: 100%;
                height: 50rpx;
                left: 0;
                bottom: 0;
                color: #ffffff;
                /*css3渐变*/
                background-image: linear-gradient(to right top, rgba(0,0,0,0.2),rgba(0,0,0,0));
                font-size: 36rpx;
                display: flex;
                align-items: center;
                padding-left: 20rpx;
            }
        }
    }
</style>
