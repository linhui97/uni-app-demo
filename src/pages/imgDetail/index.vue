<template>
    <!-- 图片详情页面 -->
    <view>
        <!--用户信息-->
        <view class="user_info">
            <view class="user_icon">
                <image :src="imgDetail.user.avatar" mode="widthFix"></image>
            </view>
            <view class="user_desc">
                <view class="user_name">{{imgDetail.user.name}}</view>
                <view class="user_time">{{imgDetail.cnTime}}</view>
            </view>
        </view>

        <!--高清大图-->
        <view class="height_img">
            <swiper-action @swiperAction="handleSwiperAction">
                <image :src="imgDetail.thumb" mode="widthFix"></image>
            </swiper-action>
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

        <!--专辑-->
        <view class="album_wrap" v-if="album.length>0">
            <!--标题-->
            <view class="album_title">相关</view>
            <!--内容-->
            <view class="album_list">
                <view class="album_item" v-for="item in album" :key="item.id">
                    <!--专辑图片-->
                    <view class="album_cover">
                        <image :src="item.cover" mode="aspectFill"></image>
                    </view>
                    <!--右边专辑内容-->
                    <view class="album_info">
                        <view class="album_info_text">专辑</view>
                        <view class="album_name">{{item.name}}</view>
                        <text class="iconfont iconiconfontjiantou4"></text>
                    </view>
                </view>
            </view>
        </view>

        <!--最热评论-->
        <view class="comment hot" v-if="hot.length>0">
            <view class="comment_title">
                <text class="iconfont iconhot1"></text>
                <text class="comment_text">最热评论</text>
            </view>
            <!--评论列表-->
            <view class="comment_list">
                <view class="comment_item" v-for="item in hot" :key="item.id">
                    <!--用户信息-->
                    <view class="comment_user">
                        <!--用户头像-->
                        <view class="user_icon">
                            <image :src="item.user.avatar" mode="widthFix"></image>
                        </view>
                        <!--用户名称-->
                        <view class="user_name">
                            <view class="user_nickname">{{item.user.name}}</view>
                            <view class="user_time">{{item.cTime}}</view>
                        </view>
                        <!--用户徽章-->
                        <view class="user_badge" v-if="item.user.title.length>0">
                            <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon" :title="item2.name"></image>
                        </view>
                    </view>
                    <!--评论数据-->
                    <view class="comment_desc">
                        <view class="comment_content">{{item.content}}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!--最新评论-->
        <view class="comment new" v-if="comment.length>0">
            <view class="comment_title">
                <text class="iconfont iconpinglun"></text>
                <text class="comment_text">最新评论</text>
            </view>
            <!--评论列表-->
            <view class="comment_list">
                <view class="comment_item" v-for="item in comment" :key="item.id">
                    <!--用户信息-->
                    <view class="comment_user">
                        <!--用户头像-->
                        <view class="user_icon">
                            <image :src="item.user.avatar" mode="widthFix"></image>
                        </view>
                        <!--用户名称-->
                        <view class="user_name">
                            <view class="user_nickname">{{item.user.name}}</view>
                            <view class="user_time">{{item.cTime}}</view>
                        </view>
                        <!--用户徽章-->
                        <view class="user_badge" v-if="item.user.title.length>0">
                            <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon" :title="item2.name"></image>
                        </view>
                    </view>
                    <!--评论数据-->
                    <view class="comment_desc">
                        <view class="comment_content">{{item.content}}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!--下载按钮-->
        <view class="download">
            <view class="download_btn" @click="handleDownload">下载图片</view>
        </view>

    </view>
</template>

<script>
    import moment from 'moment'
    import swiperAction from '@/components/swiperAction'
    //设置语言为中文
    moment.locale("zh-cn");

    export default {
        name: "index",
        data() {
            return {
                imgDetail: {},  //当前点击的图片信息，包含发布的用户信息
                album: [],  //专辑数据
                comment: [],  //最新评论
                hot: [],  //最热评论
                imgIndex: 0,  //当前图片索引
                imgList: [],  //图片列表
            }
        },
        components: {
            swiperAction
        },
        onLoad(){
            // console.log(getApp().globalData);
            const {imgList, imgIndex} = getApp().globalData;
            this.imgIndex = imgIndex;
            this.imgList = imgList;

            this.setData();
        },
        methods: {
            // 给当前页面赋值
            setData(){
                this.imgDetail = this.imgList[this.imgIndex];
                // this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 360);

                // 将时间转换成 "XXX年"
                this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow();

                //获取图片评论
                this.getComments(this.imgDetail.id);
            },
            // 获取评论数据
            getComments(id) {
                this.request({
                    url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
                }).then(result => {
                    console.log(result);
                    this.album = result.res.album;

                    //给hot/comment数组中的对象添加一个时间属性 XXX月前
                    result.res.comment.forEach(v => v.cTime = moment(v.atime*1000).fromNow());
                    result.res.hot.forEach(v => v.cTime = moment(v.atime*1000).fromNow());
                    this.comment = result.res.comment;
                    this.hot = result.res.hot;
                })
            },
            //图片切换滑动事件
            handleSwiperAction(e){
                // console.log(e);
                /*
                    1.用户 左滑 imgIndex++
                    2.用户 右滑 imgIndex++
                    3.判断 数组是否有越界问题
                    4.左滑 e.direction === "left" && this.imgIndex < this.imgList.length
                    5.右滑 e.direction === "right" && this.imgIndex >= 0
                */
                if(e.direction === "left" && this.imgIndex < this.imgList.length -1){
                    //左滑
                    ++this.imgIndex;
                    this.setData();
                }else if(e.direction === "right" && this.imgIndex > 0){
                    --this.imgIndex;
                    this.setData();
                }else {
                    uni.showToast({
                        title: "没有数据了(╯︵╰)",
                        icon: "none"
                    });
                    return;
                }
            },
            //点击下载图片
            async handleDownload(){
                // uni.downloadFile()
                // uni.saveImageToPhotosAlbum()

                await uni.showLoading({
                    title: '图片下载中...'
                });

                //1.将远程文件下载到小程序的内存中 tempFilePath
                const result1 = await uni.downloadFile({ url: this.imgDetail.img });
                const { tempFilePath } = result1[1];
                // 2.将小程序内存中临时文件下载到本地上
                const result2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath });
                //3.提示用户下载成功
                // console.log("下载衣服");
                // console.log(result2)
                uni.hideLoading();
                await uni.showToast({
                    title: '下载成功'
                    // icon
                })
            }
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

    /*高清大图*/
    .height_img{
        image{
            border-bottom: 1rpx solid #eee;
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

    /*专辑详情*/
    .album_wrap {
        padding: 20rpx;
        .album_title {
            padding: 10rpx 0;
        }

        .album_list {
            .album_item {
                display: flex;
                padding: 10rpx 0;
                border-bottom: 10rpx solid #eee;
                .album_cover {
                    flex: 1;
                    image {
                        width: 180rpx;
                        height: 180rpx;
                    }
                }

                .album_info {
                    flex: 3;
                    padding-left: 20rpx;
                    position: relative;
                    .album_info_text {
                        width: 100rpx;
                        height: 50rpx;
                        background-color: $color;
                        color: #ffffff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .album_name {
                        padding: 10rpx 0;
                        color: #888;
                    }

                    .iconiconfontjiantou4{
                        font-size: 40rpx;
                        position: absolute;
                        top: 50%;
                        right: 10%;
                        transform: translateY(-50%);
                        color: #000000;
                    }
                }
            }
        }
    }

    /*最热/最热评论*/
    .comment {
        .comment_title {
            padding: 15rpx;
            .iconhot1 {
                color: #f00;
                font-size: 40rpx;
            }

            .comment_text {
                font-weight: 600;
                font-size: 28rpx;
                color: #666;
                margin-left: 10rpx;
            }
        }

        .comment_list {
            .comment_item {
                /*用户信息*/
                border-bottom: 15rpx solid #eee;
                .comment_user {
                    display: flex;
                    padding: 20rpx 0;
                    .user_icon {
                        width: 15%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        image {
                            width: 88rpx;
                            border-radius: 50%;
                        }
                    }

                    .user_name {
                        flex: 1;
                        .user_nickname {
                            color: #777;
                        }

                        .user_time {
                            color: #ccc;
                            font-size: 24rpx;
                            padding: 5prx;
                        }
                    }

                    .user_badge {
                        display: flex;
                        justify-content: flex-end;
                        padding-right: 10rpx;
                        image {
                            width: 40rpx;
                            height: 40rpx;
                        }
                    }
                }
                /*评论内容*/
                .comment_desc {
                    display: flex;
                    padding: 20rpx 0;
                    .comment_content {
                        flex: 1;
                        padding-left: 15%;
                        color: #000;
                    }

                    .comment_like {
                        text-align: right;
                        margin-right: 10rpx;
                        .icondianzan {

                        }
                    }
                }
            }
        }
    }

    /*最新评论*/
    .new{
        .iconpinglun{
            color: aqua !important;
        }
    }

    /*下载图片*/
    .download{
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .download_btn{
            width: 90%;
            height: 80%;
            background-color: $color;
            color: #ffffff;
            font-size: 36rpx;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
