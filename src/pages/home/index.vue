<template>
    <view class="content">
        <view>
            <uni-segmented-control
                :current="current"
                :values="titleItem"
                @clickItem="onClickItem"
                style-type="text"
                active-color="#FF69B4">
            </uni-segmented-control>
            <view class="content">
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
        computed:{
          titleItem(){
              return this.items.map(v => v.title)
          }
        },
        onLoad() {

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

<style>
.content{

}
</style>
