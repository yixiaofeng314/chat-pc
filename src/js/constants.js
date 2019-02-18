/*
 	creatd by wangziyuan on 2019-2-13
 * */
angular.module('starter.constants', [])
    /**--网络请求常量--*/
    .constant('HttpConstant', {
        getSlideFirstMenuList:"data/menu.json",//获取侧边栏一级菜单
        getSecondMenuList:"data/secondMenuList.json",//获取二级菜单
        getNextMenu: "data/secondMenuList.json",//获取三级菜单
        getEmoticon:"data/getEmoticon.json",//获取表情包
        getSpeechcraftList:"data/getSpeechcraftList.json"//获取话术列表
    })
    .constant('AppConfig', {
        HOST: ''//IP地址配置
    });

