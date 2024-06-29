// Sample initial transaction data
let transactions = [];
let currentUser = null;

// Function to update the transaction table
function updateTransactionTable() {
  const table = document.getElementById("transactionTable");
  table.innerHTML = `
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Actions</th>
    </tr>
  `;

  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${transaction.type}</td>
      <td>${transaction.description}</td>
      <td>₹${transaction.amount.toFixed(2)}</td>
      <td>
        <button onclick="editTransaction(${index})">Edit</button>
        <button onclick="deleteTransaction(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Function to update the current balance
function updateBalance() {
  const balance = document.getElementById("balance");
  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === "Income") {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);

  balance.textContent = `Current Balance: ₹${total.toFixed(2)}`;
}

// Function to add a new transaction
function addTransaction(event) {
  event.preventDefault();

  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  const transaction = {
    type,
    description,
    amount
  };

  transactions.push(transaction);
  updateTransactionTable();
  updateBalance();

  // Save transaction data to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("transactionForm").reset();
}

// Function to edit a transaction
function editTransaction(index) {
  const transaction = transactions[index];
  const { type, description, amount } = transaction;

  document.getElementById("type").value = type;
  document.getElementById("description").value = description;
  document.getElementById("amount").value = amount;

  transactions.splice(index, 1);
  updateTransactionTable();
  updateBalance();

  // Save transaction data to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateTransactionTable();
  updateBalance();

  // Save transaction data to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to create a user account
function createAccount(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  currentUser = { name };

  // Save user data to local storage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  document.getElementById("accountInfo").style.display = "none";
  document.getElementById("transactionDetails").style.display = "block";
  document.getElementById("welcomeMessage").textContent = `Welcome 👋🏻, ${name}!`;
  const title = document.querySelector(".title");
  title.remove();
}

// Function to delete user account
function deleteAccount() {
  currentUser = null;
  transactions = [];

  // Remove user and transaction data from local storage
  localStorage.removeItem("currentUser");
  localStorage.removeItem("transactions");

  document.getElementById("accountInfo").style.display = "block";
  document.getElementById("transactionDetails").style.display = "none";
  document.getElementById("transactionTable").innerHTML = `
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Actions</th>
    </tr>
  `;
  document.getElementById("balance").textContent = "Current Balance: ₹0.00";
  document.getElementById("transactionForm").reset();
}

// Attach event listeners
document.getElementById("accountForm").addEventListener("submit", createAccount);
document.getElementById("transactionForm").addEventListener("submit", addTransaction);
document.getElementById("deleteAccountBtn").addEventListener("click", deleteAccount);

// Check if user data exists in local storage
const storedUserData = localStorage.getItem("currentUser");
if (storedUserData) {
  currentUser = JSON.parse(storedUserData);

  document.getElementById("accountInfo").style.display = "none";
  document.getElementById("transactionDetails").style.display = "block";
  document.getElementById("welcomeMessage").textContent = `Welcome Back ❤️, ${currentUser.name}!`;
  const title = document.querySelector(".title");
  title.remove();
}

// Check if transaction data exists in local storage
const storedTransactionData = localStorage.getItem("transactions");
if (storedTransactionData) {
  transactions = JSON.parse(storedTransactionData);
  updateTransactionTable();
  updateBalance();
}
