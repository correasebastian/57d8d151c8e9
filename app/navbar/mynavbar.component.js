(function () {
    "use strict";

    angular.module("app.myNavbar", [])

        .component("myNavbar", {
            templateUrl: "app/navbar/mynavbar.component.html",
            controllerAs: "vm",
            controller: NavController

        });

    NavController.$inject = ['NotificationService', '$timeout', '$mdDialog'];

    //CONTROLLER
    function NavController(NotificationService, $timeout, $mdDialog) {
        var vm = this;
        vm.notifications = [];
        vm.spinner = true;
        vm.showNotifications = showNotifications;
        var useFullScreen = false

        //simulating delay xhr call, to show spinner
        // activate();
        $timeout(activate, 1200)

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
        function showNotifications(ev) {
            if (!vm.notifications.length) {
                alert('you dont have new notifications')
                return
            }



            $mdDialog.show({                
                templateUrl: 'app/navbar/dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })


        }



    }



} ());