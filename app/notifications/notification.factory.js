(function () {
    'use strict';

    angular
        .module('app.not')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['$http', 'NotificationModel', '$q', '$mdDialog'];

    // controller
    function NotificationService($http, NotificationModel, $q, $mdDialog) {
        var notifications = [];
        var load = false;
        var service = {
            getNotifications: getNotifications,
            clearAll: clearAll,
            dismiss: dismiss
        };

        return service;

        ////////////////
        function getNotifications() {

            //cache
            if (load)
                return $q.when(notifications)


            return $http.get('notifications.json')
                .then(onGetOK)
                .catch(onGetError)

            function onGetOK(res) {
                // console.time('uno')
                if (Array.isArray(res.data))
                    refactorData(res.data)
                //  console.timeEnd('uno')
                load = true;
                return notifications
            }

            function onGetError(error) {
                //logger
                console.error(error)
            }
        }


        function refactorData(data) {
            // var notifications = []
            data.forEach(function (item) {

                var latestIndex;
                switch (item.type) {
                    case "exercise_trouble":
                        add(item);
                        break;
                    case "event_pain":
                        addPain(item)
                        break;
                    case "assessment_needs_review":
                        addAss(item)
                        break;

                }


                function add(ele) {

                    var notification = new NotificationModel(ele.patient_id, ele.patient_name, ele.therapy_session_id, ele.type, ele.timestamp)

                    notifications.push(notification)
                    addToList(ele, notifications.length - 1)
                }

                function addPain(ele) {
                    if (existPain(ele)) {
                        // debugger;
                        addToList(ele, latestIndex)
                    }
                    else {
                        add(ele)
                    }
                }


                function addAss(ele) {
                    if (existAss(ele)) {
                        // debugger;
                        addToList(ele, latestIndex)
                    }
                    else {
                        add(ele)
                    }
                }

                function addToList(ele, idx) {

                    var obj = {
                        id: ele.id,
                        message: ele.message
                    }
                    if (typeof ele.pain_value !== 'undefined') {
                        obj.pain_value = ele.pain_value;
                    }
                    notifications[idx].listEvents.push(obj)
                }


                function existPain(ele, idx) {
                    return notifications.some(function (notification, idx) {
                        // debugger
                        latestIndex = idx;
                        return notification.patient_id === ele.patient_id && notification.type === ele.type && notification.therapy_session_id === ele.therapy_session_id
                    })
                }

                function existAss(ele, idx) {
                    return notifications.some(function (notification, idx) {
                        // debugger
                        latestIndex = idx;
                        return notification.patient_id === ele.patient_id;
                    })
                }


            })

            return notifications
        }

        function clearAll() {
            //
            //TODO HTTP CALLL TO CLEAR ALL             
            notifications.splice(0, notifications.length);
            $mdDialog.hide()
        }

        function dismiss(notification) {
            var index = notifications.indexOf(notification);
            alert('dissmising notification with id´s :' + JSON.stringify(notification.listEvents))
            //TODO HTTP with the id's    
            notifications.splice(index, 1);
        }

    }
})();