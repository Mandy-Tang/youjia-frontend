/**
 * Created by tangniye on 17/4/6.
 */
(function () {
    'use strict';

    /** @ngInject */
    function sidebarCtrl($scope, Common) {
        'ngInject';

      $scope.promptAudition = function () {
        Common.model.promptModel('auditionModalCtrl', 'app/components/audition-modal/audition-modal.html', 'sm', '', 'login-modal audition-modal')
      };

    }

    angular.module('app.components').controller('sidebarCtrl', sidebarCtrl);
})();
