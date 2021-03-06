/**
 * Created by tangniye on 17/4/14.
 */
(function () {
  'use strict';

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('app.pages.dashboard.schedule.student', {
        url: '/student',
        title: '按学生排课',
        templateUrl: 'app/pages/dashboard/schedule/student/studentSchedule.html',
        controller: 'studentScheduleCtrl',
        data: {
          permissions: {
            only: 'ADMIN',
            redirectTo: 'app.pages.dashboard.personal.info'
          }
        }
      });
  }

  angular.module('app.pages.dashboard.schedule.student', [])
    .config(routeConfig);
})();
