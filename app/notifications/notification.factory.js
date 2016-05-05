(function () {
    'use strict';

    angular
        .module('app.notifications')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['$http', 'NotificationModel', '$q'];
    
    // controller
    function NotificationService($http, NotificationModel, $q) {
        var notifications = [];
        var service = {
            getNotifications: getNotifications
        };

        return service;

        ////////////////
        function getNotifications() {

            //cache
            if (notifications.length>0)
                return $q.when(notifications)


            return $http.get('notifications.json')
                .then(onGetOK)
                .catch(onGetError)

            function onGetOK(res) {
                // console.time('uno')
                if (Array.isArray(res.data))
                    refactorData(res.data)
                //  console.timeEnd('uno')
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
            // debugger;
            // return notifications.map(function (notification) {
            //     notification.message = notification.getMessage();
            //     return notification;
            // });

            // return notifications;
            return notifications
        }

    }
})();