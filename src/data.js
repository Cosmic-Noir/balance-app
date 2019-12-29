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
    {
      month_id: 1,
      month_name: "",
      total_income: "",
      totale_expenses: "",
      total_remainder: "",
      user_id: ""
    }
  ],
  charges: [
    {
      id: 1,
      charge_name: "",
      due_date: "",
      amount: "",
      month_id: "",
      user_id: ""
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
    -Home
    -Insurance/Financial
    -Other
    -Pets
    -Shopping
    -Travel */
