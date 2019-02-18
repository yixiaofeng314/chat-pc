angular.module('myApp', ['starter.controllers', 'starter.services', 'starter.constants', 'ngRoute', 'ueditor.directive','ms.kindeditor'])
    .config(function ($routeProvider) {
        $routeProvider
            .when(
                '/contentpage', { 
                    templateUrl: 'templates/contentpage.html' ,
                    controller: 'systermCtrl'
                }
            )
            .when(
                '/loginpage', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                }
            )
            .when(
                '/editpage', {
                    templateUrl: 'templates/editpage.html',
                    controller: 'editpageCtrl'
                }
            )
            .otherwise({ redirectTo: '/contentpage' });
    });