<template>
    <!-- 首页 -->
    <view class="home_tab">
        <!--分段器-->
        <view class="home_tab_title">
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
        <view class="home_tab_content">
            <view v-if="current === 0">
                <home-recommend></home-recommend>
            </view>
            <view v-if="current === 1">
                <home-category></home-category>
            </view>
            <view v-if="current === 2">
                <home-new></home-new>
            </view>
            <view v-if="current === 3">
                <home-album></home-album>
            </view>
        </view>

    </view>
</template>

<script>
    import homeRecommend from './home-recommend'
    import homeCategory from './home-category'
    import homeNew from './home-new'
    import homeAlbum from './home-album'

    //引入uni-ui组件
    import {uniSegmentedControl} from '@dcloudio/uni-ui'

    export default {
        data() {
            return {
                items: [
                    {title: "推荐"},
                    {title: "分类"},
                    {title: "最新"},
                    {title: "专辑"},
                ],
                current: 0
            }
        },
        components: {
            homeRecommend,
            homeCategory,
            homeNew,
            homeAlbum,
            uniSegmentedControl
        },
        computed: {
            titleItem() {
                return this.items.map(v => v.title)
            }
        },
        onLoad() {
            // this.getData();
        },
        methods: {
            onClickItem(e) {
                if (this.current !== e.currentIndex) {
                    this.current = e.currentIndex;
                }
            }
        }
    }
</script>

<style lang="scss">
    .home_tab {
        .home_tab_title{
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

        .home_tab_content{

        }
    }
</style>
