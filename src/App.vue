<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";

import Budget from "./components/Budget.vue";
import BudgetControl from "./components/BudgetControl.vue";
import Modal from "./components/Modal.vue";
import Expense from "./components/Expense.vue";

import iconNewExpense from "./assets/img/new_expense_icon.svg";
import { generateID } from "./helpers";
import Filters from "./components/Filters.vue";

const budget = ref(0);
const available = ref(0);
const spent = ref(0);
const filter = ref("");
const expenses = ref([]);

const modal = reactive({
  show: false,
  animate: false,
});
const expense = reactive({
  id: null,
  name: "",
  quantity: 0,
  category: "",
  date: Date.now(),
});

watch(
  expenses,
  () => {
    const totalSpent = expenses.value.reduce(
      (total, expense) => total + expense.quantity,
      0
    );

    spent.value = totalSpent;

    available.value = budget.value - totalSpent;

    localStorage.setItem("expenses", JSON.stringify(expenses.value));
  },
  { deep: true }
);

watch(budget, () => {
  localStorage.setItem("budget", budget.value);
});

onMounted(() => {
  const savedBudget = localStorage.getItem("budget");

  if (savedBudget) {
    budget.value = Number(savedBudget);
    available.value = Number(savedBudget);
  }

  const savedExpenses = localStorage.getItem("expenses");

  if (savedExpenses) {
    expenses.value = JSON.parse(savedExpenses);
  }
});

const defineBudget = (quantity) => {
  budget.value = quantity;
  available.value = quantity;
};

const showModal = () => {
  modal.show = true;

  setTimeout(() => {
    modal.animate = true;
  }, 300);
};

const closeModal = () => {
  modal.animate = false;

  setTimeout(() => {
    modal.show = false;
  }, 300);

  cleanExpense();
};

const cleanExpense = () => {
  Object.assign(expense, {
    id: null,
    name: "",
    quantity: 0,
    category: "",
    date: Date.now(),
  });
};

const addExpense = () => {
  if (expense.id) {
    const index = expenses.value.findIndex((item) => item.id === expense.id);

    expenses.value[index] = { ...expense };
  } else {
    expenses.value.push({
      ...expense,
      id: generateID(),
    });
  }

  closeModal();
};

const deleteExpense = () => {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.value = expenses.value.filter((item) => item.id !== expense.id);
    closeModal();
  }
};

const selectExpense = (id) => {
  const selectedExpense = expenses.value.find((expense) => expense.id === id);

  Object.assign(expense, selectedExpense);

  showModal();
};

const filteredExpenses = computed(() => {
  if (!filter.value) {
    return expenses.value;
  }

  return expenses.value.filter((expense) => expense.category === filter.value);
});

const resetApp = () => {
  if (confirm("Are you sure you want to reset your budget?")) {
    budget.value = 0;
    expenses.value = [];
  }
};
</script>

<template>
  <div
    :class="{
      fix: modal.show,
    }"
  >
    <header>
      <h1>Expenses Planner</h1>
      <div class="header-container container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />
        <BudgetControl
          v-else
          :budget="budget"
          :available="available"
          :spent="spent"
          @reset-app="resetApp"
        />
      </div>
    </header>
    <main v-if="budget > 0">
      <div class="expenses-list container">
        <Filters v-if="expenses.length > 0" v-model:filter="filter" />

        <h2>
          {{
            filteredExpenses.length > 0 ? "Expenses" : "There are no expenses"
          }}
        </h2>

        <Expense
          v-for="expense in filteredExpenses"
          :key="expense.id"
          :expense="expense"
          @select-expense="selectExpense"
        />
      </div>

      <div class="create-expense">
        <img :src="iconNewExpense" alt="New Expense" @click="showModal" />
      </div>

      <Modal
        v-if="modal.show"
        @close-modal="closeModal"
        @add-expense="addExpense"
        @delete-expense="deleteExpense"
        :modal="modal"
        v-model:name="expense.name"
        v-model:quantity="expense.quantity"
        v-model:category="expense.category"
        :available="available"
        :id="expense.id"
      />
    </main>
  </div>
</template>

<style>
:root {
  --blue: #3b82f6;
  --white: #fff;
  --light-gray: #f5f5f5;
  --gray: #94a3b8;
  --dark-gray: #64748b;
  --black: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--light-gray);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--blue);
}

header h1 {
  padding: 3rem;
  margin: 0;
  color: var(--white);
  text-align: center;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.header-container {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 1.2rem;
  padding: 5rem;
}

.create-expense {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expense img {
  width: 5rem;
  cursor: pointer;
}

.expenses-list {
  margin-top: 10rem;
}

.expenses-list h2 {
  color: var(--dark-gray);
  font-weight: 900;
}

.fix {
  overflow: hidden;
  height: 100vh;
}
</style>
