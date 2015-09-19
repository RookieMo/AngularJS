angular.module('todo', [])
    .controller('page', ['$scope',

function ($s) {
    var uiCurrent = 1;
    $s.tabArr = ["shopping","business"];
    $s.ui = {
        current: function (newUICurrent) {
            if (typeof newUICurrent != 'undefined') {
                uiCurrent = newUICurrent;
            }
            return uiCurrent;
        },
        isCurrent: function (c) {
            return (uiCurrent === c);
        }
        
    };
    $s.getTab = function (){
        return uiCurrent;
    }
}])
    .controller('tab', ['$scope', 'todoApi', 

function ($s, todoApi) {

    $s.data = todoApi.query();

    $s.newItem = "";
    $s.addItem = function (tabName) {
        $s.newItem.list = tabName;
        $s.newItem.complete = false;
        todoApi.create($s.newItem);

        $s.newItem = {};
    };
    $s.markItem = function (item) {
        var index = $s.data.indexOf(item);
        todoApi.update(index, item);
    };

    $s.newTab = "";
    $s.addTab = function (index) {
        $s.tabArr.push($s.newTab);

        $s.newTab = "";
    };
}])

    .factory('todoApi', [function () {
    var data = [
        {
            list: 'shopping',
            name: 'buy eggs',
            complete: false
        }, 
        {
            list: 'shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'business',
            name: 'collect underpants',
            complete: false
        }, 
        {
            list: 'business',
            name: '...',
            complete: false
        }, 
        {
            list: 'business',
            name: 'profit',
            complete: false
        }
    ];
    return {
        query: function () {
            return data;
        },
        get: function (id) {
            return data[id];
        },
        create: function(obj) {
            data.push(obj);
            return obj;
        },
        update: function(id, obj) {
            data[id] = obj;
            return obj;
        },
        destroy: function(id) {
            data.splice(id, 1);
            return data;
        }
    };
}]);
