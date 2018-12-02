/*Common function*/

    //Searches a key value pair in array of objects
    function search(nameKey, name,  arr){
        for (var i=0; i < arr.length; i++) {
            if (arr[i][name] == nameKey) {
                return i;
            }
        }
        return -1;
    }

    //Returns top five key value from given array
    function givMeTop(arr, top){
        arr.sort(function(a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        });
        arr.length = (arr.length>top)?top:arr.length;
        return arr;
    }

    function giveSum5(arr){
        var sum = 0;
        for (var i=0; i < arr.length; i++) {
            sum = sum + arr[i].value;
        }
        return sum;
    }


    
    /*Get and Set data from Local Storage*/
    var localStore = function(key) {

        return {
                getStore : function () {
                    return (JSON.parse(localStorage.getItem(key))) ? JSON.parse(localStorage.getItem(key)) : undefined;
                },
                setStore : function (value) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
        }
        
    };