/**
 * Created by tangniye on 17/4/14.
 */
(function () {
  'use strict';

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.site', {
        url: '/site',
        title: '站点信息',
        templateUrl: '/app/pages/dashboard/site/site.html',
        controller: 'siteCtrl'
      });
  }

  angular.module('app.pages.dashboard.site', [])
    .config(routeConfig);
})();