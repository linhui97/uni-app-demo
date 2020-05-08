<template>
    <!--精美视频-->
    <view class="video_tab">
        <!--分段器-->
        <view class="video_tab_title">
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
        <view class="video_tab_content">
            <view v-if="current < 4">
                <video-main :urlobj="items[current]"></video-main>
            </view>
            <view v-if="current === 4">
                <video-category></video-category>
            </view>
        </view>

    </view>
</template>

<script>
    //引入uni-ui组件
    import {uniSegmentedControl} from '@dcloudio/uni-ui'
    import videoMain from './video-main'
    import videoCategory from './video-category'

    export default {
        data() {
            return {
                items: [
                    {
                        title: "推荐",
                        url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
                        params: {
                            limit: 30,
                            order: "hot",
                            skip: 0,
                        }
                    },
                    {
                        title: "娱乐",
                        url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
                        params: {
                            limit: 30,
                            order: "new",
                            skip: 0,
                        }
                    },
                    {
                        title: "最新",
                        url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
                        params: {
                            limit: 30,
                            order: "new",
                            skip: 0,
                        }
                    },
                    {
                        title: "热门",
                        url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
                        params: {
                            limit: 30,
                            order: "hot",
                            skip: 0,
                        }
                    },
                    {
                        title: "分类",
                        url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
                        params: {}
                    }
                ],
                current: 0,  //当前显示页面的索引

            }
        },
        components: {
            uniSegmentedControl,
            videoMain,
            videoCategory
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
                }

            },
        }
    }
</script>

<style lang="scss">
    .video_tab {
        .video_tab_title{
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

        .video_tab_content{
        }
    }
</style>
