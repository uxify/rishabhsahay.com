/*Return a new array with fixed count*/


var CommonFn = function(instance){
    this.instance = instance;
    console.log(this.instance);
}



CommonFn.prototype.pagination = function(page,count,list){
    var starti = (page-1)*count;
    var endi = (page-1)*count+count;
    return list.slice(starti,endi);
}

CommonFn.prototype.search = function(nameKey, name,  arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i][name] == nameKey) {
            return i;
        }
    }
    return -1;
}

//Returns top five key value from given array
CommonFn.prototype.givMeTop = function(arr, top){
    arr.sort(function(a, b) {
        return parseFloat(b.value) - parseFloat(a.value);
    });
    arr.length = (arr.length>top)?top:arr.length;
    return arr;
}

CommonFn.prototype.giveSum5 = function(arr){
    var sum = 0;
    for (var i=0; i < arr.length; i++) {
        sum = sum + arr[i].value;
    }
    return sum;
}

CommonFn.prototype.sortAsc = function(a, b) {
    if (a.score < b.score)
        return -1;
    if (a.score > b.score)
        return 1;
    return 0;
}
CommonFn.prototype.sortDesc = function(a, b) {
    if (a.score > b.score)
        return -1;
    if (a.score < b.score)
        return 1;
    return 0;
}