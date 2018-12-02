//This is the http service that can be used to call multiple Api.
dev.service('dev_services', function ($http, $httpParamSerializer) {


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
                //console.log(r);
            },
            function (e) {
                console.log(e);
            }
        )

    };

});