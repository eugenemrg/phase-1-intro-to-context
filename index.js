// Your code here
function createEmployeeRecord(employeeDetails) {
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeeRecords) {
    return employeeRecords.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let hoursWorked;
    employeeRecord.timeInEvents.forEach((timeLog, index) => {
        if(dateStamp === timeLog.date){
            hoursWorked = Math.trunc((employeeRecord.timeOutEvents[index].hour - employeeRecord.timeInEvents[index].hour) / 100)
            return 
        }
    })
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let totalEmployeePay = 0
    employeeRecord.timeOutEvents.forEach(timeLog => {
        totalEmployeePay += wagesEarnedOnDate(employeeRecord, timeLog.date)
    })
    return totalEmployeePay
}

function calculatePayroll(formattedEmployeeRecords) {
    let totalPay = 0
    formattedEmployeeRecords.forEach(employeeRecord => {
        totalPay += allWagesFor(employeeRecord)
    })
    return totalPay
}