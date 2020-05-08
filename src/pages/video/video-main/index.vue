<template>
    <!-- 精美视频前四个选项页面 推荐/娱乐/最新/热门 -->
    <scroll-view
        scroll-y
        enable-flex
        @scrolltolower="handleToLower"
        class="video_main">
        <view
            class="video_item"
            v-for="item in videowp"
            :key="item.id"
            @click="handleGoVideo(item)">
            <image :src="item.img" mode="widthFix"></image>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        name: "index",
        data(){
          return{
              videowp: [],  //图片列表
              hasMore: true,  //是否还有下一页
          }
        },
        props: {
            urlobj: Object
        },
        watch: {
            urlobj() {
                this.videowp = [];
                this.getData();
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            //获取数据
            getData(){
                this.request({
                    url: this.urlobj.url,
                    data: this.urlobj.params
                }).then( result => {
                    // console.log(result.res.videowp);

                    if(result.res.videowp.length === 0){
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有数据了(╯︵╰)",
                            icon: "none"
                        });
                        return
                    }
                    this.videowp = [...this.videowp, ...result.res.videowp];
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
                    this.urlobj.params.skip += this.urlobj.params.limit;
                    this.getData();
                }else {
                    uni.showToast({
                        title: "没有数据了(╯︵╰)",
                        icon: "none"
                    });
                }
            },
            // 跳转到视频播放页面
            handleGoVideo(item){
                // 1.将数据保存到全局共享中
                getApp().globalData.video = item;
                // 2.页面跳转
                uni.navigateTo({
                    url: "/pages/videoPlay/index"
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video_main{
        display: flex;
        flex-wrap: wrap;
        /*height:  屏幕的高度 - 头部标题的高度*/
        height: calc(100vh - 40px);
        .video_item{
            width: 33.33%;
            border: 5rpx solid #fff;
            image{

            }
        }
    }
</style>
