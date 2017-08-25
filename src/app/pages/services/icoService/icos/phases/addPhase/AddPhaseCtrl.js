(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.addIcoPhase')
        .controller('AddPhaseCtrl', AddPhaseCtrl);

    /** @ngInject */
    function AddPhaseCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$stateParams,currencyModifiers) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.createPhaseParams = {
            level: 1
        };
        $scope.creatingPhase = false;
        $scope.levelOptions = [1,2,3,4,5,6,7];

        vm.getIco =  function () {
            $scope.creatingPhase = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.creatingPhase =  false;
                    if (res.status === 200) {
                        $scope.icoObj = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.creatingPhase =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIco();

        $scope.addPhase = function(){

            var createPhaseParams = {
                level: $scope.createPhaseParams.level,
                percentage: parseInt($scope.createPhaseParams.percentage),
                base_rate: $scope.createPhaseParams.base_rate
            };

            if($scope.createPhaseParams.base_rate){
                if(currencyModifiers.validateCurrency($scope.createPhaseParams.base_rate,$scope.icoObj.base_currency.divisibility)){
                    createPhaseParams.base_rate = parseInt(currencyModifiers.convertToCents($scope.createPhaseParams.base_rate,$scope.icoObj.base_currency.divisibility));
                } else {
                    toastr.error('Please input base rate to ' + $scope.icoObj.base_currency.divisibility + ' decimal places');
                    return;
                }
            }

            $scope.creatingPhase = true;
            if(vm.token) {
                $http.post(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/phases/',createPhaseParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    console.log(res);
                    $scope.creatingPhase =  false;
                    if (res.status === 200) {
                        toastr.success('Phase created successfully');
                        $location.path('services/ico/' + $stateParams.id);
                    }
                }).catch(function (error) {
                    console.log(error);
                    $scope.creatingPhase =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.goToIcoView = function () {
            $location.path('services/ico/' + $stateParams.id);
        }


    }
})();