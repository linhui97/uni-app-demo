<template>
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
                <homeRecommend></homeRecommend>
            </view>
            <view v-if="current === 1">
                <homeCategory></homeCategory>
            </view>
            <view v-if="current === 2">
                <homeNew></homeNew>
            </view>
            <view v-if="current === 3">
                <homeAlbum></homeAlbum>
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
                current: 3
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
            },
            getData(){
                this.request({
                    url: "http://157.122.54.189:9088/image/v3/homepage/vertical"
                }).then( res => {
                    console.log(res);
                })
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
