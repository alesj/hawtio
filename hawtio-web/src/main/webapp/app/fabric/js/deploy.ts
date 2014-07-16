/// <reference path="fabricPlugin.ts"/>
module Fabric {

  _module.controller("Fabric.DeployController", ["$scope", "$templateCache", "jolokia", ($scope, $templateCache, jolokia) => {
    $scope.myMarkers = [];
    $scope.containers = {};
    $scope.template = "";
    $scope.first = true;
    $scope.myMap = null;

    $scope.start = () => {
    };
  }]);
}

