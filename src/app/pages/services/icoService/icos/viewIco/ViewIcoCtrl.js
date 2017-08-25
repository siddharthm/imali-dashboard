(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.viewIco')
        .controller('ViewIcoCtrl', ViewIcoCtrl);

    /** @ngInject */
    function ViewIcoCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$stateParams,$ngConfirm) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.icoPhases = {};
        $scope.loadingPhases = false;

        vm.getIco =  function () {
            $scope.loadingPhases = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPhases =  false;
                    if (res.status === 200) {
                        $scope.ico = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingPhases =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIco();

        vm.getIcoPhases =  function () {
            $scope.loadingPhases = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/phases/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPhases =  false;
                    if (res.status === 200) {
                        $scope.icoPhases = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingPhases =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIcoPhases();

        $scope.deletePhasePrompt = function(phase) {
            $ngConfirm({
                title: 'Delete phase',
                contentUrl: 'app/pages/services/icoService/icos/viewIco/deleteIcoPhasePrompt.html',
                animationBounce: 1,
                animationSpeed: 100,
                scope: $scope,
                buttons: {
                    close: {
                        text: "Cancel",
                        btnClass: 'btn-default'
                    },
                    Add: {
                        text: "Delete",
                        btnClass: 'btn-danger',
                        keys: ['enter'], // will trigger when enter is pressed
                        action: function(scope,button){
                            if(scope.proceedText != 'confirm'){
                                toastr.error('Please enter confirm to proceed');
                                return;
                            }
                            scope.deletePhase(phase);
                        }
                    }
                }
            });
        };

        $scope.deletePhase = function (phase) {
            $scope.loadingPhases =  true;
            if(vm.token) {
                $http.delete(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/phases/' + phase.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Phase successfully deleted');
                        vm.getIcoPhases();
                    }
                }).catch(function (error) {
                    $scope.loadingPhases =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.goToIcoListView = function () {
            $location.path('services/ico/list');
        };

        $scope.goToAddPhaseView = function () {
            $location.path('services/ico/' +  $stateParams.id + '/phase/add');
        }


    }
})();