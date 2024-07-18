// Calculate Cutoff for Given Marks
// Check Whether he/she is eligible to apply the course

/* Input */
const studentMarks = {
    "maths": 50,
    "physics": 50,
    "chemistry": 50,
    "biology": 50
};
/* Input */


/* Logic Implementation Function */
let cutoff = 0
function calculateCutoff(marksJson) {
    
    /* Write your logic here --- Start */
    for (let subject in marksJson) {
        cutoff += marksJson[subject]; 
    }

    cutoff /= Object.keys(marksJson).length;
    console.log('The cutoff is:'+ cutoff);
    return cutoff; 

    /* Write your logic here --- End */

}
/* Logic Implementation Function */


/* Logic Implementation Function */
const eligibilityCutOff = 75
function checkEligibility(mark){
    /* Write your logic here --- Start */ 
        if(calculateCutoff(studentMarks)>=75){
            console.log("You are Eligible")
        }else{
            console.log("You are not Eligible")
        }

    // this function should return message like "You are Eligible" or "You are not Eligible"

    /* Write your logic here --- End */
}
/* Logic Implementation Function */


/* Function Call */
calculateCutoff(studentMarks);
checkEligibility(cutoff);
/* Function Call */

/* Expected Output */

// The cutoff is: 77.80
// You are Eligible

/* Expected Output */
