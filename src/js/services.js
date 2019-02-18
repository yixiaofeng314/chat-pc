angular.module('starter.services', [])
    .factory("ajax", function ($q,$http) {
        return {
            get: function (url, params) {
                var defer = $q.defer();
                $http({
                    method: "GET",
                    url: url,
                    params: params,
                    cache: false,
                    timeout: 30000,
                    headers: { 'Content-Type': 'application/json' }
                }).then(function (result) {
                    defer.resolve(result);
                }, function (error) {
                    defer.resolve('error');
                });
                return defer.promise;
            },
            post: function (url, params, loadingTemplate, showLoading) {
                var defer = $q.defer();
                $http({
                    method: "POST",
                    url: url,
                    data: params,
                    cache: false,
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    transformRequest: function (data) {
                        /**
                         * The workhorse; converts an object to x-www-form-urlencoded serialization.
                         * @param {Object} obj
                         * @return {String}
                         */
                        var param = function (obj) {
                            var query = '';
                            var name, value, fullSubName, subName, subValue, innerObj, i;

                            for (name in obj) {
                                value = obj[name];

                                if (value instanceof Array) {
                                    for (i = 0; i < value.length; ++i) {
                                        subValue = value[i];
                                        fullSubName = name + '[' + i + ']';
                                        innerObj = {};
                                        innerObj[fullSubName] = subValue;
                                        query += param(innerObj) + '&';
                                    }
                                } else if (value instanceof Object) {
                                    for (subName in value) {
                                        subValue = value[subName];
                                        fullSubName = name + '[' + subName + ']';
                                        innerObj = {};
                                        innerObj[fullSubName] = subValue;
                                        query += param(innerObj) + '&';
                                    }
                                } else if (value !== undefined && value !== null) {
                                    query += encodeURIComponent(name) + '='
                                        + encodeURIComponent(value) + '&';
                                }
                            }

                            return query.length ? query.substr(0, query.length - 1) : query;
                        };

                        return angular.isObject(data) && String(data) !== '[object File]'
                            ? param(data)
                            : data;
                    }
                }).then(function (result) {

                    defer.resolve(result);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            }
        };
    })
    .factory('systermHttp', function (ajax, HttpConstant, AppConfig) {
        return {
            getSlideFirstMenuList: function (params,showLoading) {
                return ajax.get(HttpConstant.getSlideFirstMenuList, params, null, showLoading);
            },
            getSecondMenuList: function (params, showLoading) {
                return ajax.get(HttpConstant.getSecondMenuList, params, null, showLoading);
            },
            getNextMenu: function (params, showLoading) {
                return ajax.get(HttpConstant.getNextMenu, params, null, showLoading);
            },
            getEmoticon: function (params, showLoading) {
                return ajax.get(HttpConstant.getEmoticon, params, null, showLoading);
            },
            getSpeechcraftList: function (params, showLoading) {
                return ajax.get(HttpConstant.getSpeechcraftList, params, null, showLoading);
            },
        }
    })