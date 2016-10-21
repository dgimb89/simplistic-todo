'use strict';

// browserify-css
require('./app.css')

// ---------------
var angular = require('angular');

angular
.module('todoApp', [require('angular-bootstrap-calendar'), require('angular-ui-bootstrap')])
.controller('TodoCtrl', function($scope, $http) {
    $scope.formData = {};

// when landing on the page, get all todos and show them
$http.get('/api/todos')
.success(function(data) {
    $scope.todos = data;
    console.log(data);
})
.error(function(data) {
    console.log('Error: ' + data);
});

// when submitting the add form, send the text to the node API
$scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
    .success(function(data) {
$scope.formData = {}; // clear the form so our user is ready to enter another
$scope.todos = data;
console.log(data);
})
    .error(function(data) {
        console.log('Error: ' + data);
    });
};

// delete a todo after checking it
$scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
    .success(function(data) {
        $scope.todos = data;
        console.log(data);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
};

})
.controller('DraggableEventsCtrl', function(moment, calendarConfig) {
    var vm = this;

    vm.events = [
    {
        title: 'Draggable event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        draggable: true
    },
    {
        title: 'Non-draggable event',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate(),
        draggable: false
    }
    ];

    vm.calendarView = 'week';
    vm.viewDate = moment().toDate();
    vm.cellIsOpen = true;

    vm.eventTimesChanged = function(event) {
        vm.viewDate = event.startsAt;
        //alert.show('Dragged and dropped', event);
    };

    vm.timespanClicked = function(date, cell) {

        if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        }

    };
});