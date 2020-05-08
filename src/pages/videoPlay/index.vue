<template>
    <!-- 视频播放页面 -->
    <view class="video_play">
        <!--背景图片-->
        <image :src="videoObj.img"></image>
        <!--工具栏-->
        <view class="video_tool">
            <view :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']" @click="handleMuted"></view>
            <view class="iconfont iconzhuanfa">
                <button open-type="share"></button>
            </view>
        </view>
        <!--视频-->
        <view class="video_wrap">
            <video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
        </view>
        <!--下载-->
        <view class="download">
            <view class="download" @click="handleDownload">下载高清</view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                videoObj: {},
                muted: false,  //是否静音
            }
        },
        onLoad(){
            console.log(getApp().globalData.video);
            this.videoObj = getApp().globalData.video;
        },
        methods: {
            //开关声音
            handleMuted(){
                this.muted = !this.muted;
            },
            //下载视频
            async handleDownload(){
                await uni.showLoading({
                    title: '下载中...'
                });

                //1.将远程文件下载到小程序的内存中 tempFilePath
                const result1 = await uni.downloadFile({ url: this.videoObj.video });
                const { tempFilePath } = result1[1];
                // const { tempFilePath } = (await uni.downloadFile({ url: this.videoObj.video }))[1];
                // 2.将小程序内存中临时文件下载到本地上
                const result2 = await uni.saveVideoToPhotosAlbum({ filePath: tempFilePath });
                //3.提示用户下载成功
                // console.log("下载衣服");
                // console.log(result2)
                uni.hideLoading();
                await uni.showToast({
                    title: '下载成功'
                    // icon
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .video_play {
        position: relative;
        image {
            position: absolute;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            /*css3滤镜*/
            filter: blur(20px);
        }

        .video_tool {
            height: 80rpx;
            display: flex;
            justify-content: flex-end;
            .iconfont {
                width: 80rpx;
                color: #ffffff;
                font-size: 50rpx;
                border-radius: 40rpx;
                background-color: rgba(0,0,0,0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20rpx;
            }
            .iconzhuanfa{
                position: relative;
                button{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }

        .video_wrap {
            display: flex;
            justify-content: center;
            video {
                width: 360rpx;
                height: 600rpx;
            }
        }

        .download {
            display: flex;
            justify-content: center;
            margin-top: 30rpx;
            .download {
                width: 360rpx;
                height: 80rpx;
                border-radius: 40rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                border: 1rpx solid #fff;
                background-color: rgba(0,0,0,0.6);
            }
        }
    }
</style>
