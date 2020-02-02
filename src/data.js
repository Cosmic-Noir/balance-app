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
    {
      charge_id: 19,
      charge_name: "Cell Phone Bill",
      category: "Bills/Utilities",
      due_date: "2020-02-07",
      amount: 200,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 1,
      charge_name: "Rent",
      category: "Housing",
      due_date: "2020-02-01",
      amount: 600,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 7,
      charge_name: "Paycheck",
      category: "Income",
      due_date: "2020-01-03",
      amount: 1200,
      month_name: "Jan 2020",
      user_id: 1,
      occurance: "Monthly"
    },

    {
      charge_id: 2,
      charge_name: "Groceries",
      category: "Food/Drink",
      due_date: "2020-02-01",
      amount: 150,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 8,
      charge_name: "Paycheck",
      category: "Income",
      due_date: "2020-02-01",
      amount: 1200,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 3,
      charge_name: "Car Insurance",
      category: "Insurance/Financial",
      due_date: "2020-02-04",
      amount: 100,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 4,
      charge_name: "Paycheck",
      category: "Income",
      due_date: "2020-02-15",
      amount: 1200,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 5,
      charge_name: "Pet Insurance",
      category: "Insurance/Financial",
      due_date: "2020-02-18",
      amount: 60,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 12,
      charge_name: "Birthday Supplies",
      category: "Entertainment",
      due_date: "2020-02-13",
      amount: 200,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "One Time"
    },
    {
      charge_id: 15,
      charge_name: "Emergency Savings",
      category: "Savings",
      due_date: "2020-02-18",
      amount: 100,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 16,
      charge_name: "Vacation Savings",
      category: "Savings",
      due_date: "2020-02-20",
      amount: 100,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 6,
      charge_name: "Groceries",
      category: "Food/Drink",
      due_date: "2020-02-17",
      amount: 150,
      month_name: "Feb 2020",
      user_id: 1,
      occurance: "Monthly"
    },

    {
      charge_id: 9,
      charge_name: "Groceries",
      category: "Food/Drink",
      due_date: "2020-01-02",
      amount: 150,
      month_name: "Jan 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 10,
      charge_name: "Pet Insurance",
      category: "Pets",
      due_date: "2020-01-05",
      amount: 60,
      month_name: "Jan 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 11,
      charge_name: "Medical Bill",
      category: "Health",
      due_date: "2020-01-07",
      amount: 250,
      month_name: "Jan 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 12,
      charge_name: "Clothes Shopping",
      category: "Shopping",
      due_date: "2020-01-12",
      amount: 160,
      month_name: "Jan 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 13,
      charge_name: "Girl Scout Cookie Fund",
      category: "Other",
      due_date: "2020-01-17",
      amount: 30,
      month_name: "Jan 2020",
      user_id: 1,
      occurance: "Monthly"
    },
    {
      charge_id: 14,
      charge_name: "Student Loan",
      category: "Student Loans",
      due_date: "2020-01-22",
      amount: 90,
      month_name: "Jan 2020",
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
