a.forEach(function (item) {

    var latestIndex;
    switch (item.type) {
        case "exercise_trouble":
            // add(item);
            break;
        case "event_pain":
            addPain(item)
            break;

    }


    function add(ele) {
        c.push({
            patient_id: ele.patient_id,
            patient_name: ele.patient_name,
            type: ele.type,
            therapy_session_id: ele.therapy_session_id,
            listEvents: []
        })
        addToList(ele,c.length -1)
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

    function addToList(ele, idx) {
        c[idx].listEvents.push({
            id: ele.id,
            message: ele.message
        })
    }


    function existPain(ele, idx) {
        return c.some(function (cItem, idx) {
            debugger
            latestIndex = idx;
            return cItem.patient_id === ele.patient_id && cItem.type === ele.type && cItem.therapy_session_id === ele.therapy_session_id
        })
    }


})





if (item.type === 'exercise_trouble') {
    c.push({
        patient_id: item.patient_id,
        patient_name: item.patient_name,
        type: item.type,
        therapy_session_id: item.therapy_session_id,
        listEvents: [{
            id: item.id,
            message: item.message
        }]
    })
}
else {

}



var exists = c.some(cItem => {
    return cItem.patient_id === item.patient_id && cItem.type === item.type && cItem.therapy_session_id === item.therapy_session_id
});

if (!exists) {
    c.push({
        patient_id: item.patient_id,
        patient_name: item.patient_name,
        type: item.type,
        therapy_session_id: item.therapy_session_id,
        listEvents: [{
            id: item.id,
            message: item.message
        }]
    })
}
else {

}


})