angular.module('starter.controllers', [])
    .controller('loginCtrl', function ($scope) {

    })
    .controller('systermCtrl', function ($scope, systermHttp, $location) {
        /**
         * 获取窗口高度
         */
        $scope.winHeight = function () {
            return window.innerHeight;
        };
        /**
         * 获取侧边一级菜单
         * @param {*} showloading  boolean 是否显示loading框
         * @param {*} showloading  1:表示综合 2:表示实务
         */
        function getSlideFirstMenuList(showloading, type) {
            systermHttp.getSlideFirstMenuList({ type: type }, showloading).then(function (res) {
                $scope.slideFirstMenuList = res.data || [];
            });
        }
        getSlideFirstMenuList(false);
        /**
         * 菜单下标存储
         */
        $scope.menuIndex = {
            firstMenuListIndex: -1,
            secondMenuListIndex: -1,
            nextMenuListIndex: -1
        }
        /**
         * 一级菜单点击事件
         */
        $scope.getSecondMenu = function (obj, index) {
            if ($scope.menuIndex.firstMenuListIndex !== index) {
                $scope.menuIndex.firstMenuListIndex = index;
                $scope.menuIndex.secondMenuListIndex = -1;
                getSecondMenuList(obj.childId, false);
            } else {
                $scope.menuIndex.firstMenuListIndex = -1;
                $scope.menuIndex.secondMenuListIndex = -1;
            }
        }
        /**
         * 获取侧边二级菜单
         * @param {*} showloading   boolean 是否显示loading框
         * @param {*} id 一级菜单childId
         */
        function getSecondMenuList(id, showloading) {
            systermHttp.getSecondMenuList({ id: id }, showloading).then(function (res) {
                $scope.secondMenuList = res.data || [];
            });
        }
        /**
         * 二级菜单点击事件
         */
        $scope.getNextMenu = function (e, obj, index) {
            e.stopPropagation();
            if ($scope.menuIndex.secondMenuListIndex !== index) {
                $scope.menuIndex.secondMenuListIndex = index;
                $scope.menuIndex.nextMenuListIndex = -1;
                if (obj.childId) {
                    getNextMenu(obj.childId, false);
                } else {

                }

            } else {
                $scope.menuIndex.nextMenuListIndex = $scope.menuIndex.secondMenuListIndex = -1;
            }
        }
        /**
         * 获取三级菜单
         * @param {*} id 二级菜单childid
         * @param {*} showloading  boolean 是否显示loading框
         */
        function getNextMenu(id, showloading) {
            systermHttp.getNextMenu({ id: id }, showloading).then(function (res) {
                $scope.nextMenuList = res.data || [];
                console.log($scope.nextMenuList);
            });
        }
        /**
         * 三级菜单点击事件
         */
        $scope.childNavChange = function (e, obj, index) {
            e.stopPropagation();
            if ($scope.menuIndex.nextMenuListIndex !== index) {
                $scope.menuIndex.nextMenuListIndex = index;
            }
        }
        /**
         * tab面板切换
         */
        $scope.tabItemIndex = 0;
        $scope.tabItemChange = function (index) {
            if (index === 3) {
                $location.path("/editpage")
            } else {
                $scope.tabItemIndex = index;
            }
        }
        /**
        * 获取表情包
        */
        function getEmoticon() {
            systermHttp.getEmoticon(null, false).then(function (res) {
                // $scope.emoticon = res.data || []; //最后数据对接完使用这个代码
                $scope.emoticon = [];
                for (var i = 1; i <= 100; i++) {
                    $scope.emoticon.push(res.data[0] + i + ".png");
                }
            });
        }
        getEmoticon();
        /**
         * 发送表情
         */
        $scope.sendEmo = function (src) {
            console.log(src);
        }
        /**
         * 获取话术列表
         * @param {*} showloading 
         */
        function getSpeechcraftList(showloading) {
            systermHttp.getSpeechcraftList(null, showloading).then(function (res) {
                var data = res.data || [];
                data.push({ //用于判断是否是新增按钮
                    type: "add"
                });
                var len = Math.ceil(data.length / 4);
                $scope.speechcraftList = [];
                for (var i = 0; i < len; i++) {
                    $scope.speechcraftList.push([]);
                    for (var j = 0; j < 4; j++) {
                        if (data[i * 4 + j]) {
                            $scope.speechcraftList[i].push(data[i * 4 + j]);
                        }
                    }
                }
            });
        }
        getSpeechcraftList(false);

        /**
         * 话术发送点击事件
         */
        $scope.sendSpeechcraft = function (obj) {
            console.log(obj);
        }
        /**
         * 话术插入点击事件
         */
        $scope.addSendConetent = function (obj) {
            console.log(obj);
        }
    })
    .controller("editpageCtrl", function ($scope) {
        $scope.config = {
            //初始化编辑器内容
            content: '<p>请输入内容</p>',
            //是否聚焦 focus默认为false
            focus: true,
            //首行缩进距离,默认是2em
            indentValue: '2em',
            //初始化编辑器宽度,默认1000
            initialFrameWidth: '100%',
            //初始化编辑器高度,默认320
            initialFrameHeight: '100%',
            //编辑器初始化结束后,编辑区域是否是只读的，默认是false
            readonly: false,
            //启用自动保存
            enableAutoSave: false,
            //自动保存间隔时间， 单位ms
            saveInterval: 500,
            //是否开启初始化时即全屏，默认关闭
            fullscreen: false,
            //图片操作的浮层开关，默认打开
            imagePopup: true,
            //提交到后台的数据是否包含整个html字符串
            allHtmlEnabled: false,//额外功能添加  

            functions: ['insertimage']
        }
        var editor;

        KindEditor.ready(function (K) {
            console.log(K);
            editor = KindEditor.create('textarea[name="content"]', {
                allowFileManager: true
            });
            K('input[name=getHtml]').click(function (e) {
                alert(editor.html());
            });
            K('input[name=isEmpty]').click(function (e) {
                alert(editor.isEmpty());
            });
            K('input[name=getText]').click(function (e) {
                alert(editor.text());
            });
            K('input[name=selectedHtml]').click(function (e) {
                alert(editor.selectedHtml());
            });
            K('input[name=setHtml]').click(function (e) {
                editor.html('<h3>Hello KindEditor</h3>');
            });
            K('input[name=setText]').click(function (e) {
                editor.text('<h3>Hello KindEditor</h3>');
            });
            K('input[name=insertHtml]').click(function (e) {
                editor.insertHtml('<strong>插入HTML</strong>');
            });
            K('input[name=appendHtml]').click(function (e) {
                editor.appendHtml('<strong>添加HTML</strong>');
            });
            K('input[name=clear]').click(function (e) {
                editor.html('');
            });
        });
    })
