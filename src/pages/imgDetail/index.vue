<template>
    <view>
        <!--用户信息-->
        <view class="user_info">
            <view class="user_icon">
                <image :src="imgDetail.user.avatar" mode="widthFix"></image>
            </view>
            <view class="user_desc">
                <view class="user_name">{{imgDetail.user.name}}</view>
                <view class="user_time">{{imgDetail.atime}}</view>
            </view>
        </view>

        <!--高清大图-->
        <view class="height_img">
            <image :src="imgDetail.newThumb" mode="widthFix"></image>
        </view>

        <!--点赞/收藏-->
        <view class="user rank">
            <view class="rank">
                <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
            </view>
            <view class="user_collect">
                <text class="iconfont iconshoucang">收藏</text>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                imgDetail: {},  //当前点击的图片信息，包含发布的用户信息
            }
        },
        onLoad(){
            console.log(getApp().globalData);
            const {imgList, imgIndex} = getApp().globalData;
            this.imgDetail = imgList[imgIndex];
            this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 360);
        }
    }
</script>

<style lang="scss" scoped>
    /*用户信息*/
    .user_info {
        display: flex;
        padding: 20rpx;
        .user_icon {
            padding: 0 20rpx;
            image {
                width: 88rpx;
                border-radius: 50%;
            }
        }

        .user_desc {
            .user_name {
                color: #000000;
                font-weight: 600;
            }

            .user_time {
                color: #cccccc;
                font-size: 24rpx;
                padding: 10rpx 0;
            }
        }
    }

    /*点赞 收藏*/
    .user.rank {
        display: flex;
        height: 80rpx;
        border-bottom: 5rpx solid #eee;
        .rank {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont.icondianzan {

            }
        }

        .user_collect {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont.iconshoucang {

            }
        }
    }

</style>
