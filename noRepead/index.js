module.exports.noRepead = function(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
        }
    }
    newArr.sort(function(a, b) {
        return a - b;
    });

    return newArr;
};
