// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployees = (nestedArray)=>{
    return nestedArray.map(array => createEmployeeRecord(array))
}

const createTimeInEvent = (record, date)=>{
    let formattedDate = {
        type: "TimeIn",
        hour: Number(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    
    record['timeInEvents'].push(formattedDate)
    return record
}

const createTimeOutEvent = (record, date)=>{
    let formattedDate = {
        type: "TimeOut",
        hour: Number(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    
    record['timeOutEvents'].push(formattedDate)
    return record
}

const hoursWorkedOnDate = (record, date)=>{
    let timeIn = record.timeInEvents.find(function(e){
        return e.date === date
    })

    let timeOut = record.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (record, date)=>{
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

const allWagesFor = (record)=>{
    let availableDates = record.timeInEvents.map(function(e){
        return e.date
    })

    let payable = availableDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(record, date)
    }, 0);

    return payable
}

function createEmployeeRecords(nestedArray){
    
    return nestedArray.map(function(a){
        return createEmployeeRecord(a)
    })
}

let findEmployeebyFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }


function calculatePayroll(records){
    return records.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}