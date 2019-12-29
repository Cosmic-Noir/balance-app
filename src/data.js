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
      pass: "cold789"
    }
  ],
  monthReport: [
    // hard coded values for now
    {
      month_id: 1,
      month_name: "February 2020",
      total_income: 2400,
      totale_expenses: 1826,
      total_remainder: 574,
      user_id: 1
    },
    {
      month_id: 2,
      month_name: "March 2020",
      total_income: 2400,
      totale_expenses: 1866,
      total_remainder: 774,
      user_id: 1
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
      due_date: 1,
      amount: 150,
      month_id: 1,
      user_id: 1
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
    -Insurance/Financial
    -Other
    -Pets
    -Shopping
    -Travel
    -Income */
