
(function () {
    'use strict';
    var page = angular.module('ueditor.directive', []);
    page.directive('ueditor', [
        '$templateCache',
        function ($templateCache) {
            return {
                restrict: 'AE',
                template: '<script id="ueditorId" name="content" type="text/plain">这里写你的初始化内容</script>',
                scope: false,
                compile: function (element, attr) {
                    return {
                        pre: function (scope, iElement, iAttrs, controller) {
                            var editorFunctions = [
                                'source','save', 'cleardoc', 'undo', 'redo', 'bold', 'italic', 
                                'imageleft', 'imageright', 'imagecenter', 'imagenone', 
                                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 
                                'underline', 'fontborder', 'strikethrough', 'forecolor', 
                                'customstyle', 'backcolor', 'paragraph', 'fontfamily', 
                                'fontsize', 'emotion', 'horizontal', 'spechars',
                                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow',
                                'deleterow', 'insertcol', 'deletecol', 'mergecells', 
                                'mergeright', 'mergedown', 'splittocells',
                                'splittorows', 'splittocols', 'charts', 
                            ];
                            scope.ueditorId = attr.id;
                            scope.config = {};
                            if (attr.config != '' && attr.config != undefined) {
                                scope.config = JSON.parse(attr.config);
                                editorFunctions = editorFunctions.concat(scope.config.functions);
                            }

                            UE.delEditor(scope.ueditorId);
                            var editor = UE.getEditor(scope.ueditorId, {
                                toolbars: [editorFunctions],
                                labelMap:{
                                    save:"保存" 
                                },
                                initialContent: scope.config.content ? scope.config.content : '',
                                focus: scope.config.focus ? scope.config.focus : false,
                                indentValue: scope.config.indentValue ? scope.config.indentValue : '2em',
                                initialFrameWidth: scope.config.initialFrameWidth ? scope.config.initialFrameWidth : 1000,  //初始化编辑器宽度,默认1000
                                initialFrameHeight: scope.config.initialFrameHeight ? scope.config.initialFrameHeight : 320, //初始化编辑器高度,默认320
                                readonly: scope.config.readonly ? scope.config.readonly : false,//编辑器初始化结束后,编辑区域是否是只读的，默认是false
                                enableAutoSave: scope.config.enableAutoSave ? scope.config.enableAutoSave : true,     //启用自动保存
                                saveInterval: scope.config.saveInterval ? scope.config.saveInterval : 500,  //自动保存间隔时间， 单位ms
                                fullscreen: scope.config.fullscreen ? scope.config.fullscreen : false,//是否开启初始化时即全屏，默认关闭
                                imagePopup: scope.config.imagePopup ? scope.config.imagePopup : true,     //图片操作的浮层开关，默认打开
                                allHtmlEnabled: scope.config.allHtmlEnabled ? scope.config.allHtmlEnabled : false //提交到后台的数据是否包含整个html字符串        
                            });
                            UE.registerUI('button', function (editor, uiName) {
                                //注册按钮执行时的command命令，使用命令默认就会带有回退操作
                                editor.registerCommand('save', {
                                    execCommand: function (uiName) {
                                        document.querySelectorAll("#" + attr.parentel + " #editContent")[0].innerHTML = editor.getIframeContent();
                                        var canvas = document.querySelectorAll("canvas")[0];
                                        html2canvas(document.querySelectorAll("#" + attr.parentel + " #editContent")[0], { dpi: window.devicePixelRatio,useCORS: true, logging: true}).then(function (canvas) {
                                            document.body.appendChild(canvas);
                                            var myCanvas = document.querySelectorAll("canvas")[0];
                                            myCanvas.style.position = "absolute";
                                            myCanvas.style.top = "0px";
                                            myCanvas.style.left = "0px";
                                            myCanvas.style.zIndex= "-1";
                                            // position: absolute; z - index: -1; top: 0px; left: 0px;
                                            var img2 = myCanvas.toDataURL("image/png", 1.0);
                                            console.log(img2);
                                        });
                                    }
                                });
                                // //创建一个button
                                // var btn = new UE.ui.Button({
                                //     //按钮的名字
                                //     name: 'save',
                                //     //提示
                                //     title: '保存',
                                //     //添加额外样式，指定icon图标，这里默认使用一个重复的icon
                                //     cssRules: 'background-position: -500px 0;',
                                //     //点击时执行的命令
                                //     onclick: function () {
                                //         //这里可以不用执行命令,做你自己的操作也可
                                //         editor.execCommand('保存');
                                //     }
                                // });
                                // console.log(btn);
                                //当点到编辑内容上时，按钮要做的状态反射
                                // editor.addListener('selectionchange', function () {
                                //     var state = editor.queryCommandState(uiName);
                                //     if (state == -1) {
                                //         btn.setDisabled(true);
                                //         btn.setChecked(false);
                                //     } else {
                                //         btn.setDisabled(false);
                                //         btn.setChecked(state);
                                //     }
                                // });
                                //因为你是添加button,所以需要返回这个button
                                // return btn;
                            });
                            editor.ready(function () {
                               
                            });

                            scope.ueditorSetContent = function (id, value) {
                                var editor = UE.getEditor(id);
                                editor.setContent(value);
                            }

                            scope.ueditorGetContent = function (id) {
                                var editor = UE.getEditor(id);
                                return editor.getContent();
                            }

                            scope.ueditorGetContentTxt = function (id) {
                                var editor = UE.getEditor(id);
                                return editor.getContentTxt();
                            }
                        },
                        post: function (scope, iElement, iAttrs, controller) {

                        }
                    }
                }
            }
        }]);
})();