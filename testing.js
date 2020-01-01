
// Seed Data
const Data = {
    users: [
      {
        user_id: 1,
        username: "dudest",
        email: "cool@email.com",
        pass: "cool123"
      
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
        user_id: 1,
        occurance: 'monthly'
      },
      {
        charge_id: 2,
        charge_name: "Groceries",
        category: "Food/Drink",
        due_date: 1,
        amount: 150,
        month_id: 1,
        user_id: 1,
        occurance: 'biweekly'

      },
      {
        charge_id: 3,
        charge_name: "Car Insurance",
        category: "Insurance/Financial",
        due_date: 4,
        amount: 100,
        month_id: 1,
        user_id: 1, 
        occurance: 'monthly'

      },
      {
        charge_id: 4,
        charge_name: "Paycheck",
        category: "Income",
        due_date: 6,
        amount: 1200,
        month_id: 1,
        user_id: 1,
        occurance: 'biweekly'

      },
      {
        charge_id: 5,
        charge_name: "Pet Insurance",
        category: "Insurance/Financial",
        due_date: 7,
        amount: 60,
        month_id: 1,
        user_id: 1,
        occurance: 'monthly'

      },
      {
        charge_id: 6,
        charge_name: "Groceries",
        category: "Food/Drink",
        due_date: 9,
        amount: 150,
        month_id: 1,
        user_id: 1,
        occurance: 'biweekly'

      },
      {
        charge_id: 7,
        charge_name: "Paycheck",
        category: "Income",
        due_date: 20,
        amount: 1200,
        month_id: 1,
        user_id: 1,
        occurance: 'biweekly'
      }
    ]
  };


// I need functions to :
// - Search and return all charges for matching user_id and month_id - DONE - will likely be done server side 
// - Sort array of "charges" by due date
// Then with matching charges correctly sorted
// Return dependent components, where a paycheck triggers a remainder report and income/expenses are reported, then returns the new paycheck and moves onto the next charges after reseting calculations. -DONE 
// Eventually need a function that asses the "occurance" category and then increases the due_date based on selection. Can map each charge, could do BEFORE sorting. 


let chargesArray = Data.charges;

const filterArray = (array, user_id, month_id) => {
    const matchingCharges = array.filter(charge => {
        if (charge.user_id === user_id && charge.month_id === month_id){
            return charge;
        } 
    })
    return matchingCharges;

}

let matchingCharges = filterArray(chargesArray, 1, 1);
// console.log(matchingCharges);

// console.log(filterArray(chargesArray, 2, 2));

// Responsible for updating the dates of paychecks? Probably needs more work like when paychecks go into next month.
const dueDateUpdater = incomeArr => {
  // Should only have to update income, and then check whether weekly or biweekly and add 7 or 14 days. 
  let updatedPaychecks = incomeArr.map(charge => {
    if (charge.occurance === 'monthly'){
      console.log(charge.due_date);
      // console.log(`${charge.charge_name} occures monthly`)
      return charge;
    } else if (charge.occurance === 'biweekly'){
      console.log(charge.due_date);
      // if biweekly, increase due date by 14
      console.log(`${charge.charge_name} occures biweekly`)
    } else if (charge.occurance === 'weekly'){
      console.log(charge.due_date);
      // if biweekly, increase due date by 7
      console.log(`${charge.charge_name} occures weekly`)

    }
  })
  return updatedPaychecks;
}

dueDateUpdater(matchingCharges);


// Responsible for returning correct element based on charge type of array, as well as remainder reports and monthly reports.

const returnElement = arr => {
  let totalIncome = 0;
  let totalExpenses = 0;
    let currentPaycheck = 0;
    let expenses = 0;

    for (let i=0; i <= arr.length; i++){
        if (arr[i] === undefined){
            let remainder = currentPaycheck + expenses;
            console.log(`${remainder} left over from paycheck`);
            console.log(`Monthly Income: ${totalIncome}. Montly Expenses: ${totalExpenses}. Montlhy leftover: ${totalIncome + totalExpenses}`)
        } else if (arr[i].category !== 'Income'){
            expenses -= arr[i].amount;
            totalExpenses -= arr[i].amount;
            console.log(`${arr[i].charge_name} added to expnses: ${arr[i].amount} total: ${expenses}`)
        } else if (arr[i].category === 'Income'){
            // if income, calculate previous paychecks remainder
            let remainder = currentPaycheck + expenses;
            console.log(`Current paycheck: ${currentPaycheck} means ${remainder} left over from paycheck`);
            // Then set the current paycheck to the selected one
            currentPaycheck = arr[i].amount;
            totalIncome += arr[i].amount;
            // Then reset expenses
            expenses = 0;
            console.log('---------');
            console.log(`Yay, a paycheck for ${arr[i].amount}`)
        } 
    }
}

// returnElement(matchingCharges);