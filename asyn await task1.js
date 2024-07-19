// Shopping Portal Cart Value Evaluation

/* Input */
const shoppingCart = [
    { name: "Apple", price: 10, quantity: 4 },
    { name: "Banana", price: 5, quantity: 5 },
    { name: "Orange", price: 15, quantity: 3 },
    { name: "pineapple",price: 10, quantity:10}
];
/* Input */
let total = 0;

/* Logic Implementation Function */
function calculateTotal(cart) {
    
    return new Promise((_resolve) => {
        setTimeout(() => {
            for (let i=0; i<shoppingCart.length; i++){
                let amount = shoppingCart[i].price * shoppingCart[i].quantity;
                total += amount
                    if(shoppingCart[i].name ==="Apple"){
                        console.log(shoppingCart[i].name + amount)
                    }
                    else if(shoppingCart[i].name ==="Banana"){
                        console.log(shoppingCart[i].name + amount)
                    }
                    else{
                        console.log(shoppingCart[i].name + amount)
                    }
                }
            console.log(total)
        });
    });
    
    /* Write your logic here --- Start */

}

/* Logic Implementation Function */

/* Function Call */
//const totalCost = calculateTotal(shoppingCart);
/* Function Call */
/* Output */
/* Output */
async function asyncCall() {
    console.log('calling');
    const result = await calculateTotal();
    console.log(result);
  } 
asyncCall();
/* Expected Output */
//Total cost: Rs.110
/* Expected Output */
