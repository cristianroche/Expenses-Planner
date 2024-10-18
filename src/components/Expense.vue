<script setup>
import { formatDate, formatQuantity } from "../helpers";
import HealthIcon from "../assets/img/health_icon.svg";
import SaveIcon from "../assets/img/save_icon.svg";
import HomeIcon from "../assets/img/home_icon.svg";
import FoodIcon from "../assets/img/food_icon.svg";
import ExpenseIcon from "../assets/img/expense_icon.svg";
import LeisureIcon from "../assets/img/leisure_icon.svg";
import SubscriptionsIcon from "../assets/img/subscriptions_icon.svg";

const iconsDictionary = {
  save: SaveIcon,
  food: FoodIcon,
  home: HomeIcon,
  expense: ExpenseIcon,
  leisure: LeisureIcon,
  health: HealthIcon,
  subcriptions: SubscriptionsIcon,
};

const props = defineProps({
  expense: {
    type: Object,
    required: true,
  },
});

defineEmits(["select-expense"]);
</script>

<template>
  <div class="expense shadow">
    <div class="content">
      <img
        :src="iconsDictionary[expense.category]"
        alt="Category icon"
        class="icon"
      />
      <div class="details">
        <p class="category">{{ expense.category }}</p>
        <p class="name" @click="$emit('select-expense', expense.id)">
          {{ expense.name }}
        </p>
        <p class="date">
          Date: <span>{{ formatDate(expense.date) }}</span>
        </p>
      </div>
    </div>
    <p class="quantity">{{ formatQuantity(expense.quantity) }}</p>
  </div>
</template>

<style scoped>
.expense {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.icon {
  width: 5rem;
}

.details p {
  margin: 0 0 1rem 0;
}

.category {
  color: var(--gray);
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
}

.name {
  color: var(--dark-gray);
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
}

.date {
  color: var(--dark-gray);
  font-size: 1.6rem;
  font-weight: 900;
}

.quantity {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}

.date span {
  font-weight: 400;
}
</style>
