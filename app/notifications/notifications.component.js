(function () {
    "use strict";

    angular.module("app.not", [])

        .component("notifications", {
            templateUrl: "app/notifications/notifications.component.html",
            controllerAs: "vm",
            controller: NotificationsController,
            replace: true

        });


    NotificationsController.$inject = ['NotificationService'];
    function NotificationsController(NotificationService) {
        var vm = this;
        vm.notifications = [];
        vm.goToSummary = goToSummary;
        vm.clearAll = clearAll;
        vm.dismiss = dismiss;

        activate();
        ////////////////

        function activate() {

            NotificationService.getNotifications()
                .then(onGetOk)

            function onGetOk(notifications) {
                vm.notifications = notifications
            }

        }

        function goToSummary(notification) {
            console.info(notification)
            alert('go to summary view patien_id: ' + notification.patient_id)
        }

        function clearAll() {
            NotificationService.clearAll()
        }
        function dismiss(notification) {
            NotificationService.dismiss(notification)
        }
    }
})()