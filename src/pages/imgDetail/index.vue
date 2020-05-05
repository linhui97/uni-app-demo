<template>
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
            <image :src="imgDetail.thumb" mode="widthFix"></image>
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

    </view>
</template>

<script>
    import moment from 'moment'
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
            }
        },
        onLoad(){
            console.log(getApp().globalData);
            const {imgList, imgIndex} = getApp().globalData;
            this.imgDetail = imgList[imgIndex];
            this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 360);

            // 将时间转换成 "XXX年"
            this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow();

            //获取图片评论
            this.getComments(this.imgDetail.id);
        },
        methods: {
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
                            width: 80%;
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

</style>
