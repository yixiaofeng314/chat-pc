angular.module("ms.kindeditor", [])
    .directive('msKindeditor', [function () {
        return {
            restrict: 'EA',
            //transclude:true,
            //replace: false,
            require: '?ngModel',
            scope: {
            },
            link: function (scope, element, attrs, kindEditorController) {
                var kindeditor;
                console.log(element)
                editor = KindEditor.create(element[0], {
                    allowFileManager: true
                });
                KindEditor.ready(function (K) {
                    kindeditor = K.create(element[0], {
                        afterChange: function () {
                            kindEditorController.$setViewValue(this.html());
                        }
                    });

                    kindEditorController.$render = function () {
                        kindeditor.html(kindEditorController.$viewValue);
                    }

                });
            }
        }
    }]);