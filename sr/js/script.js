
var API_URL = "http://starlord.hackerearth.com/";
var ctz = angular.module('GameArema', []);

/*home_controller */
ctz.controller('home_controller', function ($scope, $http, ctz_services) {

    var Common = new CommonFn('init');
    $scope.loading = {
        status: true,
        icon: "../images/loading.png"
    };
    $scope.loading.status = false;

    $scope.init = function () {
        $scope.getGameMasterList();
    }



    /*Controller variables*/

    $scope.page_number = 1;
    $scope.item_count = 10;
    $scope.total_page = 0;

    $scope.filteredList = [];
    $scope.langArray = [];
    $scope.titleArray = [];
    $scope.rowArray = [];
    $scope.statsObj = {};

    /*Controller objects*/
    var stats = function(){
        
    };


    /*Get data from Local Storage*/
    $scope.statsObj = (JSON.parse(localStorage.getItem('stats'))) ? JSON.parse(localStorage.getItem('stats')) : (new stats());
    $scope.langArray = $scope.statsObj.la;

    $scope.submissionArray = [];
    $scope.sortOrder = true;
    $scope.filter = {};
    $scope.filter.platform = {
        xbox: true,
        ps: true,
        wii: true,
        pc: true,
        other: true
    };




    $scope.savelocalStorageStats = function (ob) {

        /*Add new language to language array*/
        var lrs = Common.search(ob.language, 'text', $scope.langArray);
        if (lrs == -1) {
            var l = new lang(ob.language, 1);
            $scope.langArray.push(l);
        }
        else {
            $scope.langArray[lrs].value = $scope.langArray[lrs].value + parseInt(1);
        }


        
        /*Save stats to local*/
        $scope.statsObj = new stats();
        localStorage.setItem('stats', JSON.stringify($scope.statsObj));
    };



    //Search and filter logic
    $scope.filterByPlatform = function () {
        var filteredList = [];
        for (var i = 0; i < $scope.masterList.length; i++) {
            var game = $scope.masterList[i];
            var platform = game.platform.toLowerCase();

            if (($scope.filter.platform.ps && platform.indexOf("playstation") > -1)
                || ($scope.filter.platform.xbox && platform.indexOf("xbox") > -1)
                || ($scope.filter.platform.wii && platform.indexOf("wii") > -1)
                || ($scope.filter.platform.pc && platform.indexOf("pc") > -1)) {
                filteredList.push(game);
            } else if ($scope.filter.platform.other
                && platform.indexOf("playstation") < 0
                && platform.indexOf("xbox") < 0
                && platform.indexOf("wii") < 0
                && platform.indexOf("pc") < 0) {
                filteredList.push(game);
            }
        };

        $scope.filteredList = filteredList;
        $scope.page_number = 1;
        $scope.submissionArray = Common.pagination($scope.page_number, $scope.item_count, $scope.filteredList);
        $scope.total_page = Math.ceil($scope.filteredList.length / $scope.item_count);


    };
    $scope.searchFilter = function () {
        var filteredList = [];
        for (var i = 0; i < $scope.masterList.length; i++) {
            var game = $scope.masterList[i];
            var title = game.title ? ("" + game.title).toLowerCase() : "";
            var genre = game.genre.toLowerCase();
            if ($scope.searchText) {
                var key = $scope.searchText.toLowerCase();
                var filter = (!$scope.searchText || (title.indexOf(key) != -1));
                if (filter) {
                    filteredList.push(game);
                }
            } else {
                filteredList.push(game);
            }
        };
        $scope.filteredList = filteredList;
        $scope.page_number = 1;
        $scope.submissionArray = Common.pagination($scope.page_number, $scope.item_count, $scope.filteredList);
        $scope.total_page = Math.ceil($scope.filteredList.length / $scope.item_count);


    };

    $scope.getPlatformLogo = function (platformtype) {
        var platform = platformtype.toLowerCase();

        if (platform.indexOf("playstation") > -1) {
            return {
                logo: "ps.png",
                class: "ps"
            };
        }
        if (platform.indexOf("xbox") > -1) {
            return {
                logo: "xbox.png",
                class: "xbox"
            };
        }
        if (platform.indexOf("wii") > -1) {
            return {
                logo: "wii.png",
                class: "wii"
            };
        }
        if (platform.indexOf("pc") > -1) {
            return {
                logo: "pc.png",
                class: "pc"
            };
        }
        return {
            logo: "gamepad.png",
            class: "gamepad"
        };
    }

    $scope.sortResult = function () {

        if($scope.sortOrder){
            $scope.filteredList.sort(Common.sortAsc);
        }else{
            $scope.filteredList.sort(Common.sortDesc);
        }
        $scope.page_number = 1;
        $scope.submissionArray = Common.pagination($scope.page_number, $scope.item_count, $scope.filteredList);
        $scope.total_page = Math.ceil($scope.filteredList.length / $scope.item_count);
    }

    /*Paagination*/
    $scope.changePage = function (direction) {
        if (direction === 'prev') {
            $scope.page_number = ($scope.page_number > 1) ? ($scope.page_number - 1) : $scope.page_number;
        }
        else if (direction === 'next') {
            $scope.page_number = ($scope.page_number < $scope.total_page) ? ($scope.page_number + 1) : $scope.page_number;
        }
        $scope.submissionArray = Common.pagination($scope.page_number, $scope.item_count, $scope.filteredList);
    };

    //Get the list
    $scope.getGameMasterList = function () {
        $scope.loading.status = true;
        ctz_services.call_api({
            url: "gamesext",
            method: "GET",
            success: function (r) {
                $scope.loading.status = false;

                $scope.masterList = r;
                $scope.filteredList = $scope.masterList;
                $scope.submissionArray = Common.pagination($scope.page_number, $scope.item_count, $scope.filteredList);
                $scope.total_page = Math.ceil($scope.filteredList.length / $scope.item_count);

                $scope.statsObj.top_5 = $scope.masterList.sort(Common.sortDesc).slice(0,5);
            }
        });

    };

    /*Init*/
    $scope.init();


});


//This is the http service that can be used to call multiple Api.
ctz.service('ctz_services', function ($http, $httpParamSerializer) {


    // call_api
    this.call_api = function (options) {

        var data = {};
        if (options.data != undefined) {
            data = options.data;
        }

        var url = API_URL + options.url;
        var success_function = options.success;


        //Default method as POST
        var method = "POST";
        if (options.method != undefined) {
            method = options.method;
        }

        if (method != "POST") {
            url = url + "?" + $httpParamSerializer(data);
            data = null;
        }

        $http({
            method: method,
            url: url,
            data: data
        }).
            then(function (r) {
                //success returns the response JSON data
                success_function(r.data);
            },
                function (e) {
                    console.log(e);
                }
            )

    };

});


