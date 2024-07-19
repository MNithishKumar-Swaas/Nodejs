const employeeDataIn = {
    employee_1:{
        empid: "101",
        empname:"Vikram",
        empexperience: "2",
        empsalary: "10000",
        empdepartment: "IT"
    },
    employee_2:{
        empid: "102",
        empname:"Surya",
        empexperience: "3",
        empsalary: "20000",
        empdepartment: "IT"
    },
    employee_3:{
        empid: "103",
        empname:"Kamal",
        empexperience: "5",
        empsalary: "30000",
        empdepartment: "Finance"
    },
    employee_4:{
        empid: "104",
        empname:"Dhanush",
        empexperience: "2",
        empsalary: "15000",
        empdepartment: "Finance"
    },
    employee_5:{
        empid: "105",
        empname:"Surya",
        empexperience: "3",
        empsalary: "20000",
        empdepartment: "HR"
    },
    employee_6:{
        empid: "106",
        empname:"Kamal",
        empexperience: "5",
        empsalary: "30000",
        empdepartment: "HR"
    },
};

function dataCategorizer(data, key, categoryValue) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let categorizedData = {};
                for (let employeeKey in data) {
                    if (data[employeeKey][key] === categoryValue) {
                        categorizedData[employeeKey] = data[employeeKey];
                    }
                }
                resolve(categorizedData);
            } catch (error) {
                reject(error);
            }
        }, 0);
    });
}

const categoryKey = 'empexperience';
const categoryValue = '5';

dataCategorizer(employeeDataIn, categoryKey, categoryValue)
    .then((result) => {
        console.log("Categorized Data:");
        console.log(result);
    })
    .catch((error) => {
        console.error("Error occurred:", error);
    });
