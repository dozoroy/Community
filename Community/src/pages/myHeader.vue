<template>
    <header class="header-nav">
        <el-row>
            <el-col :xs="10" :sm="3" :md="3" :lg="3" :offset="1">
                <router-link to="/" class="header" tag="div">
                    <img src="../assets/wingling.png" alt="">
                    <h1>翼灵社区</h1>
                </router-link>
            </el-col>
            <el-col :xs="13" :sm="20" :md="20" :lg="20" class="offcanvas-collapse">
                <el-col :xs="18" :sm="18" :md="15" :lg="18">
                    <el-menu :default-active="this.$router.path || '/'" class="el-menu-demo" router mode="horizontal">
                        <el-menu-item v-for="(item,i) in navList" v-show="item.show" :key="i" :index="item.name">
                            {{item.navItem}}
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :xs="6" :sm="6" :md="8" :lg="7" class="rightNav">
                    <div>
                        <router-link to="/write/new">
                            <el-button class="follow-btn" size="mini" type="success">写博客</el-button>
                        </router-link>
                    </div>
                    <div class="lo-re-box">
                        <router-link to="/login" v-if="this.isLogin == false">登录</router-link>
                        <div class="isLogin" v-else>
                            <img :src="this.$store.state.myHeaderImg" >
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <span class="username">{{this.$store.state.myName}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" style="text-align:center">
                                    <el-dropdown-item><router-link to="/center" tag="span">个人中心</router-link></el-dropdown-item>
                                    <el-dropdown-item><span>注销</span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <!-- <span>|</span>
                        <a href="javascrit:;">注册</a> -->
                    </div>
                </el-col>   
            </el-col>
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :offset="6" class="showBtn">
                <div class="rightNav">
                <el-button class="showDrawer" @click="drawer = true" type="primary" style="margin-left: 16px;" icon="el-icon-s-fold">
                </el-button>
                </div>
                <el-drawer
                    title="导航"
                    :visible.sync="drawer"
                    direction="ltr"
                    size="50%"
                    style="text-align:center"
                    >
                    <router-link to="/login" v-if="this.isLogin == false" >登录</router-link>
                    <div class="isLogin" v-else>
                        <img :src="this.$store.state.myHeaderImg" >
                        <span>注销</span>
                    </div>
                    <el-menu :default-active="this.$router.path" class="el-menu-demo" router mode="horizontal">
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                            {{item.navItem}}
                        </el-menu-item>
                    </el-menu>
                </el-drawer>
            </el-col>         
        </el-row>
    </header>
</template>
<script>
import axios from 'axios'
export default {
    name:'Header',
    data() {
      return {
        activeIndex: '1',
        isLogin:false,
        navActive:false,
        searchCont:'',
        drawer: false,
        navList:[
            {name:'/',navItem:'首页',show:true},
            {name:'/center',navItem:'个人中心',show:false},
            {name:'/admin',navItem:'管理员',show:true},
            {name:'/question',navItem:'问答',show:true}
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getInformation(){
        axios.get('http://blog.swpuiot.com/user/information')
        .then(res => {
            res = res.data
            if(res.code == 200){
                this.isLogin = true
                this.$store.commit('change_myHeaderImg', res.headimg)
                this.$store.commit('change_myName', res.userName)
                this.$store.commit('isLogin',100)
                sessionStorage.setItem('token',res.userName)
            }
        })
      }
    },
    mounted(){
        this.getInformation()
    }
}
</script>
<style lang="stylus" scoped>
header{
    border-bottom: 1px solid #ccc;
    background: white;
    width: 100%;
    position: fixed;
    z-index:1600;
    cursor:pointer;
}
.header,.lo-re-box,.rightNav{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.header img{
    width:40px;
    vertical-align middle;
}
header h1{
    font-size: 22px;
    color: rgb(119, 111, 111);
}
.el-menu{
    border:none;
}
.el-menu-item a{
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
}
.rightNav{
    position: absolute;
    right: 20px;
    height: 60px;
}
.lo-re-box{
    margin-left: 20px;
}
.rightNav a{
    font-size: 14px;
    width: 30px;
    text-decoration: none;
    color: rgb(4, 61, 168);
}
.rightNav a:hover{
    text-decoration: underline blue;
}
.isLogin{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.isLogin img{
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
}
.el-dropdown .username{
    display: inline-block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.lo-re-box-mobile .username{
    width: 100%;
}
span.nav-on{
    display:none;
    width:25px;
    position: absolute;
    top:20px;
    right:12px;
    cursor: pointer;
}
.nav-on i{
    display:block;
    width:100%;
    height:2px;
    background:rgb(137, 167, 192);
    border-radius: 1px;
    margin-bottom:5px;
} 
.collaps-nav{
    margin-top: 60px;
    display: none;
}
.showBtn{
    display none
}
@media screen and (max-width: 768px) {
    .offcanvas-collapse{
        display: none;
    }
    .navActive{
        display: block;
    }
    span.nav-on{
        display: block;
    }
    .header h1{
        width:150px;
    }
    .showBtn{
        display inline
    }
    .showDrawer{
        vertical-align middle
        font-size 25px
        padding 5px 10px
    }
    .el-menu--horizontal>.el-menu-item {
        float none 
        text-align center
        border none
    }
    .el-menu-item.is-active {
        color #409EFF !important 
    }
    .isLogin{
        display flex
        flex-direction column
        align-items center
        justify-content center
        font-size 14px
        color #000
        margin 10px 0
    }
    .isLogin img{
        width 50px
        border-radius 50%
        margin-right 0
    }
    .isLogin span{
        margin 5px 0
    }
}
</style>