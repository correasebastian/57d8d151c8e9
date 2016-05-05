(function () {
    'use strict';

    angular
        .module('app.notifications')
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = ['NotificationService', '$timeout'];
    function NotificationsController(NotificationService, $timeout) {
        var vm = this;
        vm.notifications = [];
        vm.spinner = true;
        vm.showNotifications = showNotifications;

        //simulating delay xhr call, to show spinner
        // activate();
        $timeout(activate, 1600)

        ////////////////

        function activate() {

            NotificationService.getNotifications()
                .then(onGetOk)
                .finally(hideSpinner)

            function onGetOk(notifications) {
                vm.notifications = notifications
            }

            function hideSpinner() {
                vm.spinner = false;
            }



        }
        function showNotifications(e) {
            console.info('open');
        }




    }
})();