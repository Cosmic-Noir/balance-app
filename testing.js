
// Seed Data
const Data = {
    users: [
      {
        user_id: 1,
        username: "dudest",
        email: "cool@email.com",
        pass: "cool123",
        score: 25
      },
      {
        user_id: 2,
        username: "dudette",
        email: "cooler@email.com",
        pass: "cool123"
      }
    ],
    charges: [
      // dudest charges
      {
        charge_id: 1,
        charge_name: "Rent",
        category: "Housing",
        due_date: 1,
        amount: 600,
        month_id: 1,
        user_id: 1
      },
      {
        charge_id: 2,
        charge_name: "Groceries",
        category: "Food/Drink",
        due_date: 1,
        amount: 150,
        month_id: 1,
        user_id: 1
      },
      {
        charge_id: 3,
        charge_name: "Car Insurance",
        category: "Insurance/Financial",
        due_date: 4,
        amount: 100,
        month_id: 1,
        user_id: 1
      },
      {
        charge_id: 4,
        charge_name: "Paycheck",
        category: "Income",
        due_date: 6,
        amount: 1200,
        month_id: 1,
        user_id: 1
      },
      {
        charge_id: 5,
        charge_name: "Pet Insurance",
        category: "Insurance/Financial",
        due_date: 7,
        amount: 60,
        month_id: 1,
        user_id: 1
      },
      {
        charge_id: 6,
        charge_name: "Groceries",
        category: "Food/Drink",
        due_date: 9,
        amount: 150,
        month_id: 1,
        user_id: 1
      },
      {
        charge_id: 7,
        charge_name: "Paycheck",
        category: "Income",
        due_date: 20,
        amount: 1200,
        month_id: 2,
        user_id: 2
      }
    ]
  };


// I need functions to :
// - Search and return all charges for matching user_id and month_id
// - Sort array of "charges" by due date
// Then with matching charges correctly sorted
// Return dependent components, where a paycheck triggers a remainder report and income/expenses are reported, then returns the new paycheck and moves onto the next charges after reseting calculations.

/* for (every charge in matching array) {
    if (category !== income){
        return <Charge />
    } else if (category === 'income'){
        return <Remainder />
    }
}
*/
let chargesArray = Data.charges;

const filterArray = (array, user_id, month_id) => {
    const matchingCharges = array.filter(charge => {
        if (charge.user_id === user_id && charge.month_id === month_id){
            return charge;
        } 
    })
    return matchingCharges;

}

console.log(filterArray(chargesArray, 2, 2));