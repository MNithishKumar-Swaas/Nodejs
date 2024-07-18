const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let studentData = {};

rl.question("Enter student roll number : ", function (rollNumber) {
  while (!(/^[a-zA-Z]{2}\d{3}$/.test(rollNumber))) {
    console.log("Invalid roll number format");
    rl.question("Enter student roll number : ", function (newRollNumber) {
      rollNumber = newRollNumber;
      if (/^[a-zA-Z]{2}\d{3}$/.test(rollNumber)) {
        studentData.rollNumber = rollNumber;
        collectName();
      }
    });
    return;
  }
  studentData.rollNumber = rollNumber;
  collectName();
});

function collectName() {
  rl.question("Enter student name: ", function (name) {
    while (!(/^[A-Za-z\s]+$/.test(name))) {
      console.log("Invalid name. Name should not contain numbers or special characters.");
      rl.question("Enter student name: ", function (newName) {
        name = newName;
        if (/^[A-Za-z\s]+$/.test(name)) {
          studentData.name = name;
          collectDepartment();
        }
      });
      return;
    }
    studentData.name = name;
    collectDepartment();
  });
}

function collectDepartment() {
  rl.question("Enter student department: ", function (department) {
    studentData.department = department;
    collectDob();
  });
}

function collectDob() {
  rl.question("Enter student date of birth (DD-MM-YYYY): ", function (dob) {
    let validDob = false;
    while (!validDob) {
      let parts = dob.split("-");
      if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];
        dob = `${year}-${month}-${day}`;
        let dobDate = new Date(dob);
        if (!isNaN(dobDate.getTime())) {
          validDob = true;
          let age = calculateAge(dobDate);
          studentData.dob = dob;
          studentData.age = age;
          collectMobileNumber();
        }
      }
      if (!validDob) {
        console.log("Invalid date format. Please enter the date in DD-MM-YYYY format.");
        rl.question("Enter student date of birth (DD-MM-YYYY): ", function (newDob) {
          dob = newDob;
          let parts = dob.split("-");
          if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
            let day = parts[0];
            let month = parts[1];
            let year = parts[2];
            dob = `${year}-${month}-${day}`;
            let dobDate = new Date(dob);
            if (!isNaN(dobDate.getTime())) {
              validDob = true;
              let age = calculateAge(dobDate);
              studentData.dob = dob;
              studentData.age = age;
              collectMobileNumber();
            }
          }
        });
        return;
      }
    }
  });
}

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

function collectMobileNumber() {
  rl.question("Enter student mobile number (10-digit): ", function (mobileNumber) {
    while (!(/^\d{10}$/.test(mobileNumber))) {
      console.log("Invalid mobile number. Please enter a 10-digit number.");
      rl.question("Enter student mobile number (10-digit): ", function (newMobileNumber) {
        mobileNumber = newMobileNumber;
        if (/^\d{10}$/.test(mobileNumber)) {
          studentData.mobileNumber = mobileNumber;
          collectEmail();
        }
      });
      return;
    }
    studentData.mobileNumber = mobileNumber;
    collectEmail();
  });
}

function collectEmail() {
  rl.question("Enter student email ID: ", function (email) {
    while (!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email))) {
      console.log("Invalid email format. Please enter a valid email ID.");
      rl.question("Enter student email ID: ", function (newEmail) {
        email = newEmail;
        if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
          studentData.email = email;
          displayStudentData();
        }
      });
      return;
    }
    studentData.email = email;
    displayStudentData();
  });
}

function displayStudentData() {
  console.log("\nCollected Student Information:");
  for (let key in studentData) {
    console.log(`${key}: ${studentData[key]}`);
  }
  rl.close();
}
