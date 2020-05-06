<template>
    <view v-if="wallpaper.length>0">
        <!-- 专辑图片 -->
        <view class="album_bg">
            <image mode="widthFix" :src="album.cover"></image>
            <view class="album_info">
                <view class="album_name">{{album.name}}</view>
                <view class="album_btn">+ 关注专辑</view>
            </view>
        </view>

        <!-- 专辑作者 -->
        <view class="album_author">
            <view class="album_author_info">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <view class="author_name">{{album.user.name}}</view>
            </view>
            <view class="album_author_desc">
                <text>
                    {{album.desc}}
                </text>
            </view>
        </view>

        <!-- 图片列表 -->
        <view class="album_list">
            <view class="album_item" v-for="(item, index) in wallpaper" :key="item.id">
                <go-detail :list="wallpaper" :index="index">
                    <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>', 360)"></image>
                </go-detail>
            </view>
        </view>

    </view>
</template>

<script>
    import goDetail from '@/components/goDetail'

    export default {
        name: "index",
        data() {
            return {
                params: {     //请求参数
                    limit: 30,  //获取多少条数据
                    order: "new",  //关键字
                    skip: 0,  //跳过多少条
                    first: 1,  //“1” 表示第一次请求 “0”表示不是第一次请求
                },
                id: -1,   //传递过来的专辑ID
                album: {},
                wallpaper: [],
                hasMore: true
            }
        },
        components: {
            goDetail
        },
        onLoad(options) {
            console.log(options);
            // this.id = options.id;
            this.id = "5d5f8e45e7bce75ae7fb8278";
            this.getData();
        },
        // 页面触底 上拉加载下一页事件
        onReachBottom() {
            console.log("触底事件");
            /*
                  1.修改参数 skip += limit
                  2.重新发送请求 getData()
                  3.请求回来成功 hots 数据叠加
            */
            if (this.hasMore) {
                this.params.skip += this.params.limit;
                this.params.first = 0;
                this.getData();
            } else {
                uni.showToast({
                    title: "没有数据了(╯︵╰)",
                    icon: "none"
                });
            }
        },
        methods: {
            // 获取数据
            getData() {
                this.request({
                    url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                    data: this.params
                }).then(result => {
                    console.log(result);
                    if(Object.keys(this.album).length === 0){
                        this.album = result.res.album;
                    }
                    if (result.res.wallpaper.length === 0){
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有数据了(╯︵╰)",
                            icon: "none"
                        })
                        return;
                    }
                    this.wallpaper = [...this.wallpaper, ...result.res.wallpaper];
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    /*专辑图片*/
    .album_bg {
        position: relative;

        image {

        }

        .album_info {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80rpx;
            color: #ffffff;
            padding: 0 15rpx;

            .album_name {
                font-size: 40rpx;
            }

            .album_btn {
                background-color: $color;
                width: 152rpx;
                height: 60rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10rpx;
            }
        }
    }

    /*专辑作者*/
    .album_author {
        padding: 10rpx;

        .album_author_info {
            padding: 10rpx 0;
            display: flex;

            image {
                width: 50rpx;
            }

            .author_name {
                color: #000000;
                margin-left: 15rpx;
            }
        }

        .album_author_desc {

        }
    }

    /*图片列表*/
    .album_list {
        display: flex;
        flex-wrap: wrap;

        .album_item {
            width: 33.33%;
            border: 3rpx solid #fff;

            image {
                height: 160rpx;
            }
        }
    }
</style>
