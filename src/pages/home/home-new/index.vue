<template>
    <!-- 首页最新页面 -->
    <scroll-view
            scroll-y
            enable-flex
            @scrolltolower="handleToLower"
            class="new_main"
            v-if="newList.length>0">
        <view
                class="new_item"
                v-for="(item, index) in newList"
                :key="item.id">
            <go-detail :list="newList" :index="index">
                <image mode="widthFix" :src="item.thumb"/>
            </go-detail>
        </view>
    </scroll-view>
</template>

<script>
    import goDetail from '@/components/goDetail'

    export default {
        name: "index",
        data(){
            return{
                newList: [], //最新列表
                params: {     //请求参数
                    limit: 30,  //获取多少条数据
                    order: "hot",  //关键字
                    skip: 0,  //跳过多少条
                },
                hasMore: true,  //是否还有下一页
            }
        },
        components: {
            goDetail
        },
        mounted() {
            this.getData();
            this.showTitle();
        },
        methods: {
            //修改页面标题
            showTitle(){
                uni.setNavigationBarTitle({
                    title: "最新"
                })
            },
            //获取数据
            getData(){
                this.request({
                    url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
                    data: this.params
                }).then( result => {
                    // 判断还有没有下一页数据
                    if(result.res.vertical.length === 0){
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有数据了(╯︵╰)",
                            icon: "none"
                        });
                        return
                    }

                    // 热门数据
                    this.newList = [...this.newList, ...result.res.vertical];
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .new_main{
        display: flex;
        flex-wrap: wrap;
        /*height:  屏幕的高度 - 头部标题的高度*/
        height: calc(100vh - 40px);
        .new_item{
            width: 33.33%;
            border: 5rpx solid #fff;
            image{

            }
        }
    }
</style>
