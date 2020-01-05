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
      month_name: "December 2019",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 8,
      charge_name: "Paycheck",
      category: "Income",
      due_date: 1,
      amount: 1200,
      month_name: "December 2019",
      user_id: 1,
      occurance: "Biweekly"
    },
    {
      charge_id: 2,
      charge_name: "Groceries",
      category: "Food/Drink",
      due_date: 1,
      amount: 150,
      month_name: "December 2019",
      user_id: 1,
      occurance: "Weekly"
    },
    {
      charge_id: 3,
      charge_name: "Car Insurance",
      category: "Insurance/Financial",
      due_date: 4,
      amount: 100,
      month_name: "December 2019",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 4,
      charge_name: "Paycheck",
      category: "Income",
      due_date: 6,
      amount: 1200,
      month_name: "December 2019",
      user_id: 1,
      occurance: "Biweekly"
    },
    {
      charge_id: 5,
      charge_name: "Pet Insurance",
      category: "Insurance/Financial",
      due_date: 7,
      amount: 60,
      month_name: "December 2019",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 6,
      charge_name: "Groceries",
      category: "Food/Drink",
      due_date: 9,
      amount: 150,
      month_name: "December 2018",
      user_id: 1,
      occurance: "Weekly"
    },
    {
      charge_id: 7,
      charge_name: "Paycheck",
      category: "Income",
      due_date: 20,
      amount: 1200,
      month_name: "January 2020",
      user_id: 1,
      occurance: "Biweekly"
    },
    {
      charge_id: 9,
      charge_name: "Groceries",
      category: "Food/Drink",
      due_date: 9,
      amount: 150,
      month_name: "January 2020",
      user_id: 1,
      occurance: "Weekly"
    },
    {
      charge_id: 10,
      charge_name: "Pet Insurance",
      category: "Insurance/Financial",
      due_date: 7,
      amount: 60,
      month_name: "January 2020",
      user_id: 1,
      occurance: "Monthly"
    }
  ]
};

export default Data;

/* Categories for bills:
    -Auto
    -Bills/Utilities
    -Entertainment
    -Food/Drink
    -Health
    -Housing
    -Income 
    -Insurance/Financial
    -Other
    -Pets
    -Savings
    -Shopping
    -Travel
    */
