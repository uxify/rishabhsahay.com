

var API_URL = "api/";
var dev = angular.module('Devcafe', []);

/*home_controller */
dev.controller('home_controller', function ($scope, $http, dev_services) {


    $scope.loading = {
        status:true,
        icon : "../images/loading.png"
    };
    $scope.loading.status = false;


    /*Controller variables*/

    $scope.page_number = 1;
    $scope.langArray = [];
    $scope.platformArray = [];
    $scope.rowArray = [];
    $scope.statsObj = {};

    /*Controller objects*/
    var sublevel = {
        Veteran: 0,
        Expert: 0,
        Novice:0
    };
     var lang = function(l, val){
         this.text = l;
         this.value = val;
         //console.log(search(this.text,'language',$scope.iconsArray),this.text);
         this.icon = $scope.iconsArray[search(this.text,'language',$scope.iconsArray)].link;
     };
    var prog = function(p, val){
        this.text = p;
        this.value = val;
    };

    var stats = function(){
        this.la = $scope.langArray;
        this.ta = $scope.platformArray;
        this.top_5 = givMeTop($scope.langArray.slice(0), 5);
        this.top5_total = giveSum5(this.top_5);
        this.top_2 = givMeTop($scope.platformArray.slice(0), 2);
        this.sub_level = sublevel;
        this.total_sub = $scope.rowArray.length;
    };

    var Icon = function(ic){
        this.id = ic.id;
        this.language = ic.language;
        this.link = ic.link;
    };

    // /*Get data from Local Storage*/
    $scope.statsObj = localStore('stats').getStore()?localStore('stats').getStore(): new stats();
    $scope.langArray = $scope.statsObj.la;
    $scope.platformArray = $scope.statsObj.ta;
    sublevel = $scope.statsObj.sub_level;

    $scope.rowArray =  localStore('subArray').getStore()?localStore('subArray').getStore():[];

    $scope.iconsArray = localStore('iconArray').getStore()?localStore('iconArray').getStore():[];


    /*Developer Object*/
    var Developer = function(sub){
        //id, name, linkedin, twitter, designation, rating, projects_done, domain, skills
        this.id = sub.id;
        this.name = sub.name;
        this.linkedin = sub.linkedin;
        this.twitter = sub.twitter;
        this.designation = sub.designation;
        this.level = sub.metadata[0].level;
        this.rating = sub.metadata[0].rating;
        this.projects_done = sub.metadata[0].projects_done;
        this.skills = sub.skills;
        this.domain = sub.domain;
    

        var cs = this.domain.toLowerCase();
        if(cs.indexOf('frontend') != -1){
            this.status_code = 1;
        }
        if(cs.indexOf('mobile') != -1){
            this.status_code = 2;
        }
        if(cs.indexOf('backend') != -1){
            this.status_code = 3;
        }
        if(cs.indexOf('database') != -1){
            this.status_code = 4;
        }
        if(cs.indexOf('fullstack') != -1){
            this.status_code = 5;
        }

    };


    $scope.developerArray = [];

    $scope.filter = {};
    $scope.filter.status = {
        frontend:true,
        mobile:true,
        backend:true,
        database:true,
        fullstack:true
    };


    //Get the list
    $scope.getWebsites = function(){

        return new Promise(function(resolve, reject) {
            $scope.loading.status = true;
            $scope.developerArray = [];
            dev_services.call_api({
                url: "getlist.json",
                method: "GET",
                success: function (r) {
                    $scope.loading.status = false;

                    for(var i=0; i< r.developers.length; i++){
                        $scope.developerArray[i] = new Developer(r.developers[i]);
                        $scope.localProcess($scope.developerArray[i]);
                    }
                
                    resolve();
                }
            });
        });
    };


    $scope.getCodeIcon =function(){
        return new Promise(function(resolve, reject) {
            $scope.loading.codeIcon = true;
            $scope.iconsArray = [];
            dev_services.call_api({
                url: "geticons.json",
                method: "GET",
                success: function (r) {
                    $scope.loading.codeIcon = false;

                    for(var i=0; i< r.icons.length; i++){
                        $scope.iconsArray[i] = new Icon(r.icons[i]);
                    }
                    localStore('iconArray').setStore($scope.iconsArray);
                    resolve();
                }
            });
        });
    };





    $scope.savelocalStorageStats = function(ob){

        if(ob.level == "Veteran"){
            sublevel.Veteran = sublevel.Veteran + parseInt(1);
        }
        else if(ob.level == "Expert"){
            sublevel.Expert = sublevel.Expert + parseInt(1);
        }
        else if(ob.level == "Novice"){
            sublevel.Novice = sublevel.Novice + parseInt(1);
        }


        var skills = ob.skills.split(",");

         /*Add new language to language array*/
         for(var i=0;i<skills.length;i++){
             var lrs = search(skills[i], 'text', $scope.langArray);
             if (lrs == -1) {
                 var l = new lang(skills[i], 1);
                 $scope.langArray.push(l);
             }
             else {
                 $scope.langArray[lrs].value = $scope.langArray[lrs].value + parseInt(1);
             }
         }
         


        /*Add new code platform to platform array*/
        var pname = search(ob.domain, 'text', $scope.platformArray);
        
        if(pname==-1){
            var t = new prog(ob.domain, 1);
            $scope.platformArray.push(t);

        }
        else{
            $scope.platformArray[pname].value = $scope.platformArray[pname].value + parseInt(1);
        }

        /*Save stats to local*/
        $scope.statsObj = new stats();
        localStore('stats').setStore($scope.statsObj);
    };

    $scope.localProcess = function(ob){

        /*Add any new submission to localstorage*/
        if($scope.rowArray.length>0){

            var rs = search(ob.id, 'id', $scope.rowArray);


            /*Adds only new entities*/
            if(rs==-1){
                $scope.rowArray.push(ob);
                localStore('subArray').setStore($scope.rowArray);
                $scope.savelocalStorageStats(ob);
            }
        }
        else{
            $scope.rowArray.push(ob);
            localStore('subArray').setStore($scope.rowArray);
            $scope.savelocalStorageStats(ob);
        }

    };

    //Sorting functions
    $scope.sortOrder = 'none';
    $scope.reverse = false;
    $scope.order = function(sortOrder) {
        $scope.reverse = false;
        $scope.sortOrder = sortOrder;
    };

    //Search logic
    $scope.filterByStatus = function(submission){

        var s_code = submission.status_code;

        if(s_code === 1){
            return $scope.filter.status.frontend;
        }
        if(s_code === 2){
            return $scope.filter.status.mobile;
        }
        if(s_code === 3){
            return $scope.filter.status.backend;
        }
        if(s_code === 4){
            return $scope.filter.status.database;
        }
        if(s_code === 5){
            return $scope.filter.status.fullstack;
        }
    };
    $scope.searchFilter = function(developer){


        var name = developer.name.toLowerCase();
        var level = developer.level.toLowerCase();
        var skills = developer.skills.toLowerCase();

        if($scope.searchText){
            var key = $scope.searchText.toLowerCase();
        }

        return (!$scope.searchText || (name.indexOf(key) != -1) || (level.indexOf(key) != -1) || (skills.indexOf(key) != -1) )

    };

    /*popup modal*/
    $scope.open_code_modal = function(sub){
        $("#viewcode_modal_pop").modal();
        $scope.pop = sub;
    };

    /*Stats*/
    $scope.stats = function(){
        var rs = search('', 'text', $scope.rowArray);
    };

    $scope.changePage = function(direction){
        if(direction==='prev'){
            $scope.page_number = ($scope.page_number>1)?($scope.page_number-1):$scope.page_number;
        }
        else if(direction==='next'){
            $scope.page_number = ($scope.page_number<1347)?($scope.page_number+1):$scope.page_number;
        }
        $scope.getWebsites();
    };

    /*Autorun*/
    if($scope.iconsArray.length<1){
        $scope.getCodeIcon();
        $scope.getWebsites();
    }
    else{
        $scope.getWebsites();
    }

    if($scope.iconsArray.length<1){
        $scope.getCodeIcon().then(function(){
            return $scope.getWebsites();
        });
    }
    else{
        $scope.getWebsites();
    }
    

});



