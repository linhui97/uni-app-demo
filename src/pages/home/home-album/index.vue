<template>
    <scroll-view
            scroll-y
            @scrolltolower="handleToLower"
            class="album_scroll_view">
        <!--
            轮播 swiper
            1.自动轮播 autoplay
            2.指示器 indicator-dots
            3.衔接轮播 circular
            4.swiper 默认高度 150rpx
            5.image 默认宽度 320px ==> 在基本样式中设置了 100%
            6.计算图片的宽度和高度的比例
            7.把图片的比例也写到swiper标签样式
            8.swiper 宽高默认都是 100%
        -->
        <view class="album_swiper">
            <swiper autoplay indicator-dots circular>
                <swiper-item v-for="item in banner" :key="item.id">
                    <image :src="item.thumb"></image>
                </swiper-item>
            </swiper>
        </view>

        <!--列表-->
        <view class="album_list">
            <view class="album_item" v-for="item in album" :key="item.id">
                <view class="album_img">
                    <image mode='aspectFill' :src="item.cover"></image>
                </view>
                <view class="album_info">
                    <view class="album_name">{{item.name}}</view>
                    <view class="album_desc">{{item.desc}}</view>
                    <view class="album_btn">
                        <view class="album_attention">关注 +</view>
                    </view>
                </view>
            </view>
        </view>

    </scroll-view>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                params: {     //请求参数
                    limit: 30,  //获取多少条数据
                    order: "new",  //关键字
                    skip: 0,  //跳过多少条
                },
                banner: [],  //轮播图数组
                album: [],  //列表数组
                hasMore: true,  //是否还有下一页
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
                    title: "专辑"
                })
            },
            // 获取数据
            getData(){
                this.request({
                    url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
                    data: this.params
                }).then( result => {
                    console.log(result);
                    // 第一次加载数据
                    if(this.banner.length === 0){
                        // 轮播
                        this.banner = result.res.banner;
                    }
                    // 判断还有没有下一页数据
                    if(result.res.album.length === 0){
                        this.hasMore = false;
                        return
                    }
                    // 列表
                    this.album = [...this.album, ...result.res.album];
                })
            },
            // 滚动条滑到底部触发的事件
            handleToLower(){
                /*
                    1.修改参数 skip += limit
                    2.重新发送请求 getData()
                    3.请求回来成功 hots 数据叠加
                */
                if(this.hasMore){
                    this.params.skip += this.params.limit;
                    this.getData();
                }else {
                    uni.showToast({
                        title: "没有数据了(╯︵╰)",
                        icon: "none"
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .album_scroll_view{
        /*height:  屏幕的高度 - 头部标题的高度*/
        height: calc(100vh - 40px);

    }
    /*轮播*/
    .album_swiper{
        height: calc(750rpx/2.3);
        image{
            height: 100%;
        }
    }
    /*列表*/
    .album_list {
        margin-top: 20rpx;
        padding: 10rpx;
        .album_item {
            padding: 10rpx 0;
            display: flex;
            border-bottom: 1rpx solid #ccc;
            .album_img {
                flex: 1;
                padding: 10rpx;
                image {
                    width: 200rpx;
                    height: 200rpx;
                }
            }

            .album_info {
                flex: 2;
                padding: 0 10rpx;
                overflow: hidden;
                .album_name {
                    font-size: 30rpx;
                    color: #000;
                    padding: 10rpx 0;
                }

                .album_desc {
                    padding: 10rpx 0;
                    font-size: 24rpx;

                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .album_btn {
                    padding: 10rpx;
                    display: flex;
                    justify-content: flex-end;
                    .album_attention {
                        color: $color;
                        border: 1rpx solid $color;
                        padding: 10rpx;
                    }
                }
            }
        }
    }
</style>
