(function () {
    'use strict';

    angular
        .module('app.not')
        .factory('NotificationModel', NotificationModel);

    NotificationModel.$inject = [];
    function NotificationModel() {
        function Notification(patient_id, patient_name, therapy_session_id, type, timestamp) {
            this.patient_id = patient_id;
            this.patient_name = patient_name;
            this.timestamp = timestamp;
            this.type = type
            this.therapy_session_id = therapy_session_id;
            this.listEvents = []

        }

        Notification.prototype.getMessage = function () {
            // console.log('click')
            var msg = ''
            switch (this.type) {
                case "exercise_trouble":
                    msg = this.listEvents[0].message;
                    break;
                case "event_pain":
                    msg = "Reported pain " + this.listEvents.length + " times with highest pain " + this.getMaxPain();
                    break;
                case "assessment_needs_review":
                    msg = "Has " + this.listEvents.length + " assessments ready to review";
                    break;

            }
            return msg;
        }

        Notification.prototype.getIcon = function () {
            // console.log('click')
            var icon = ''
            switch (this.type) {
                case "exercise_trouble":
                
                    icon = 'fa-info-circle';
                    break;
                case "event_pain":
                    icon = 'fa-exclamation-triangle'
                    break;
                case "assessment_needs_review":
                    icon = "fa-pencil-square";
                    break;

            }
            return icon;
        }



        Notification.prototype.getMaxPain = function () {
            return this.listEvents.reduce(function (ant, act, idx, vector) {
                // debugger
                if (ant.pain_value > act.pain_value)
                    return ant;

                return act

            }).pain_value;
        }


        return Notification;
    }
})();