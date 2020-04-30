<template>
    <scroll-view
        scroll-y
        @scrolltolower="handleToLower"
        class="recommend_view"
        v-if="recommends.length>0">
        <!--推荐-->
        <view class="recommend_wrap">
            <view
                class="recommend_item"
                v-for="item in recommends"
                :key="item.id">
                <image mode="widthFix" :src="item.thumb"/>
            </view>
        </view>

        <!--月份-->
        <view class="months_wrap">
            <!--标题-->
            <view class="months_title">
                <view class="months_title_info">
                    <view class="months_info">
                        <text>{{months.DD}} /</text>
                        {{months.MM}} 月
                    </view>
                    <view class="months_text">{{months.title}}</view>
                </view>
                <view class="months_title_more">更多 ></view>
            </view>
            <!--内容-->
            <view class="months_content">
                <view
                    class="months_item"
                    v-for="item in months.items"
                    :key="item.id">
                    <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>', 360)"></image>
                </view>
            </view>
        </view>

        <!--热门-->
        <view class="hots_wrap">
            <view class="hots_title">
                <text>热门</text>
            </view>
            <view class="hots_content">
                <view
                    class="hots_item"
                    v-for="item in hots"
                    :key="item.id">
                    <image mode="widthFix" :src="item.thumb"/>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "index",
        data(){
            return{
                recommends: [], //推荐列表
                months: [], //月份列表
                hots: [], //热门列表
                params: {     //请求参数
                    limit: 30,  //获取多少条数据
                    order: "hot",  //关键字
                    skip: 0,  //跳过多少条
                },
                hasMore: true,  //是否还有下一页
            }
        },
        computed: {

        },
        mounted() {
            this.getData();
        },
        methods: {
            // 获取数据
            getData(){
                this.request({
                    url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
                    data: this.params
                }).then( result => {
                    // console.log(result);
                    // 第一次加载数据
                    if(this.recommends.length === 0){
                        // 推荐数据
                        this.recommends = result.res.homepage[1].items;
                        // 月份数据
                        this.months = this.getMonthsDate(result.res.homepage[2]);
                    }
                    // 判断还有没有下一页数据
                    if(result.res.vertical.length === 0){
                        this.hasMore = false;
                        return
                    }

                    // 热门数据
                    this.hots = [...this.hots, ...result.res.vertical];
                })
            },
            // 格式化日期
            getMonthsDate(months){
                months.MM = moment(months.stime).format("MM");
                months.DD = moment(months.stime).format("DD");
                return months;
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
    .recommend_view{
        /*height:  屏幕的高度 - 头部标题的高度*/
        height: calc(100vh - 40px);

    }
    /*推荐*/
    .recommend_wrap{
        /*flex布局*/
        display: flex;
        flex-wrap: wrap;

        .recommend_item{
            width: 50%;
            border: 5rpx solid #fff;
        }
    }
    /*月份*/
    .months_wrap {
        .months_title {
            display: flex;
            justify-content: space-between;
            padding: 20rpx;
            color: $color;
            .months_title_info {
                font-size: 30rpx;
                font-weight: 600;
                display: flex;
                .months_info {
                    text {
                        font-size: 36rpx;
                    }
                }

                .months_text {
                    font-size: 34rpx;
                    color: #666;
                    margin-left: 30rpx;
                }
            }

            .months_title_more {
                font-size: 30rpx;
            }
        }

        .months_content {
            display: flex;
            flex-wrap: wrap;

            .months_item{
                width: 33.33%;
                border: 5rpx solid #fff;
            }
        }
    }
    /*热门*/
    .hots_wrap {
        .hots_title {
            padding: 20rpx;
            text {
                border-left: 5rpx solid $color;
                padding-left: 20rpx;
                font-size: 34rpx;
                font-weight: 600;
                color: #666;
            }
        }

        .hots_content {
            display: flex;
            flex-wrap: wrap;
            .hots_item {
                width: 33.33%;
                border: 5rpx solid #fff;
                img {

                }
            }
        }
    }
</style>
