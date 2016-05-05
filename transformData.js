a.forEach(item => {
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

d = []
/////
a.forEach(item => {

    c.forEach(cItem => {
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


function ob(id, name) {
    this.id = id;
    this.name = name;
    this.list = []
}

ob.prototype.getMesage = function () {
    return 'message' + this.name;
}

ob.prototype.getMesageList = function () {
    return 'message' + this.list.reduce(function (ant, act, indice, vector) {
        debugger
        if (ant.number > act.number)
            return ant;

        return act

    }).number;
}

x = new ob(1, 'uno')

x.getMesage()


x.list.push({ number: 1 }, { number: 3 }, { number: 2 })

