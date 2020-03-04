<template id="">
    <div class="StudyNotes">
        <BreadCrumb :breadCrumb="breadCrumb"/>
        <div class="StudyNotes-imgS">
            <ul class="clearfix">
                <li>
                    <div
                            class="demo-image__preview"
                            v-for="(item,index) in StudyNotesData"
                            :key="index"
                            @click="getStudyNotesData(item._id)"
                    >
                        <el-image
                                style="width: 100%; height: 100%"
                                :src="item.headPortrait"
                                :preview-src-list="getSrcList.length?getSrcList:urls">
                        </el-image>
                       <h3>{{item.TheAlbumName}}</h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getNotesData,getPhotoList} from "../../api/homeRouter"
    import {Message} from "element-ui"
    export default {
        name: "index",
        data(){
            return{
                breadCrumb:["相册馆"],
                srcList: [],
                StudyNotesData:[],
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                ]
            }
        },
        computed:{
            getSrcList(){
                return this.srcList.map((v)=>{
                    return v.imgName;
                })
            }
        },
        async activated(){
            let {data} = await getNotesData();
            this.StudyNotesData = data;
        },
        methods:{
            async getStudyNotesData(PhotoAlbumId){
                if(this.oldSrcList !== PhotoAlbumId){
                    let {data} = await getPhotoList({PhotoAlbumId});
                    this.oldSrcList = PhotoAlbumId;
                    this.srcList = data.length?this.srcList = data:[];
                    if(data.length===0){
                        Message.error('当前相册还没有照片，请先添加')
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .StudyNotes{
        padding: 100px;
        background-color: #fff;
        .demo-image__preview{
            float: left;
            width: 310px;
            padding: 20px;
            border-radius: 6px;
            border: 3px solid #ccc;
            text-align: center;
            margin-left: 55px;
            margin-bottom: 55px;
        }
        h3{
            font-family: STKaiti;
            font-size: 21px;
        }
    }
</style>