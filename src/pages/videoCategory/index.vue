<template>
    <!--分类详情页-->
    <view class="category_tab">
        <!--分段器-->
        <view class="category_tab_title">
            <view class="title_inner">
                <uni-segmented-control
                        :current="current"
                        :values="titleItem"
                        @clickItem="onClickItem"
                        style-type="text"
                        active-color="#FF69B4">
                </uni-segmented-control>
            </view>
            <!--搜索按钮-->
            <view class="iconfont iconsearch"></view>
        </view>
        <!--标签页内容-->
        <scroll-view
            scroll-y
            enable-flex
            @scrolltolower="handleToLower"
            class="category_tab_content">
            <view
                class="category_item"
                v-for="item in videowp"
                :key="item.id"
                @click="handleGoVideo(item)">
               <image :src="item.img" mode="widthFix"></image>
            </view>
        </scroll-view>

    </view>
</template>

<script>
    //引入uni-ui组件
    import {uniSegmentedControl} from '@dcloudio/uni-ui'
    import goDetail from '@/components/goDetail'

    export default {
        data() {
            return {
                items: [
                    {title: "最新", order: "new"},
                    {title: "热门", order: "hot"}
                ],
                current: 0,  //当前显示页面的索引
                params: {     //请求参数
                    limit: 30,  //获取多少条数据
                    order: "new",  //“new” 最新 “hot” 热门
                    skip: 0,  //跳过多少条
                },
                id: 0,  //分类id
                videowp: [],  //视频列表
                hasMore: true,  //是否还有下一页
            }
        },
        onLoad(options){
            this.id = options.id;
            this.getData();
        },
        components: {
            uniSegmentedControl,
            goDetail
        },
        computed: {
            titleItem() {
                return this.items.map(v => v.title)
            }
        },
        methods: {
            //切换选项卡
            onClickItem(e) {
                /*
                    1.根据被点击的标题 切换页面
                    2.切换请求数据order
                    3.重新发请求
                */
                if (this.current !== e.currentIndex) {
                    this.current = e.currentIndex;
                }else {     //点击相同选项
                    return;
                }
                this.params.order = this.items[e.currentIndex].order;
                this.params.skip = 0;
                this.videowp = [];
                this.getData();
            },
            //获取数据
            getData(){
                this.request({
                    url: `http://157.122.54.189:9088/videoimg/v1/videowp/category/${this.id}`,
                    data: this.params
                }).then( result => {
                    console.log(result);
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
                    this.params.skip += this.params.limit;
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

<style lang="scss">
    .category_tab {
        .category_tab_title{
            position: relative;
            .title_inner{
                width: 60%;
                margin: 0 auto;
            }
            .iconsearch{
                position: absolute;
                top: 50%;
                right: 5%;
                transform: translateY(-50%);
            }
        }

        .category_tab_content{
            display: flex;
            flex-wrap: wrap;
            /*height:  屏幕的高度 - 头部标题的高度*/
            height: calc(100vh - 40px);
            .category_item{
                width: 33.33%;
                border: 5rpx solid #fff;
                image{

                }
            }
        }
    }
</style>
