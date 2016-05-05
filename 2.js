a.forEach(function (item) {

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
        
        var notification= new Notification(ele.patient_id, ele.patient_name, ele.therapy_session_id,ele.type, ele.timestamp)
        // {
        //     patient_id: ele.patient_id,
        //     patient_name: ele.patient_name,
        //     type: ele.type,
        //     therapy_session_id: ele.therapy_session_id,
        //     listEvents: []
        // }
        notifications.push(notification)
        addToList(ele, notifications.length - 1)
    }

    function addPain(ele) {
        if (existPain(ele)) {
            debugger;
            addToList(ele, latestIndex)
        }
        else {
            add(ele)
        }
    }


    function addAss(ele) {
        if (existAss(ele)) {
            debugger;
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
            debugger
            latestIndex = idx;
            return notification.patient_id === ele.patient_id && notification.type === ele.type && notification.therapy_session_id === ele.therapy_session_id
        })
    }

    function existAss(ele, idx) {
        return notifications.some(function (notification, idx) {
            debugger
            latestIndex = idx;
            return notification.patient_id === ele.patient_id;
        })
    }


})
