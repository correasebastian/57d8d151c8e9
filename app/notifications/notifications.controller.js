(function () {
    'use strict';

    angular
        .module('app.notifications')
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = ['NotificationService'];
    function NotificationsController(NotificationService) {
        var vm = this;
        vm.notifications = []

        activate();

        ////////////////

        function activate() {
            // $http.get('notifications.json')
            //     .then(onGetOK)
            //     .catch(onGetError)

            // function onGetOK(res) {
            //     if (Array.isArray(res.data))
            //         return vm.notifications = refactorData(res.data)
            // }

            // function onGetError(error) {
            //     console.error(error)
            // }

            NotificationService.getNotifications()
            .then(onGetOk)
            
            function onGetOk(notifications){
                vm.notifications = notifications
            }
            
            

        }




    }
})();