<script setup>
import { computed, ref } from "vue";
import iconClose from "../assets/img/close.svg";
import Alert from "./Alert.vue";

const error = ref("");

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  id: {
    type: [String, null],
    required: true,
  },
});

const previousQuantity = props.quantity;

const emit = defineEmits([
  "close-modal",
  "add-expense",
  "delete-expense",
  "update:name",
  "update:quantity",
  "update:category",
]);

const addExpense = () => {
  const { name, quantity, category, available, id } = props;
  if ([name, quantity, category].includes("")) {
    error.value = "All fields are required";

    setTimeout(() => {
      error.value = "";
    }, 3000);

    return;
  }

  if (quantity <= 0) {
    error.value = "Quantity must be greater than 0";

    setTimeout(() => {
      error.value = "";
    }, 3000);

    return;
  }

  const isExceedingBudget = id
    ? quantity > available + previousQuantity
    : quantity > available;

  if (isExceedingBudget) {
    error.value = "You don't have enough budget";

    setTimeout(() => {
      error.value = "";
    }, 3000);

    return;
  }

  emit("add-expense");
};

const isEditing = computed(() => !!props.id);
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="iconClose" @click="$emit('close-modal')" />
    </div>

    <div
      class="container form-container"
      :class="[modal.animate ? 'active' : 'close']"
    >
      <form class="new-expense" @submit.prevent="addExpense">
        <legend>{{ isEditing ? "Edit" : "Add" }} Expense</legend>

        <Alert v-if="error">{{ error }}</Alert>

        <div class="field">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Add an Expense Name"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>

        <div class="field">
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            placeholder="Add a quantity, ex: 300"
            :value="quantity"
            @input="$emit('update:quantity', +$event.target.value)"
          />
        </div>

        <div class="field">
          <label for="category">Category:</label>
          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
          >
            <option value="" disabled selected>-- Select a category --</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="health">Health</option>
            <option value="leisure">Leisure</option>
            <option value="expense">Expense</option>
            <option value="subcriptions">Subscriptions</option>
            <option value="save">Save</option>
          </select>
        </div>

        <input
          type="submit"
          :value="[isEditing ? 'Edit Expense' : 'Add Expense']"
        />
      </form>

      <button
        v-if="isEditing"
        class="delete-btn"
        type="submit"
        @click="$emit('delete-expense')"
      >
        Delete Expense
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.close-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
}

.form-container {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.form-container.active {
  opacity: 1;
}

.form-container.close {
  opacity: 0;
}

.new-expense {
  display: grid;
  gap: 2rem;
  margin: 10rem auto 0 auto;
}

.new-expense input,
.new-expense select {
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}

.new-expense label {
  font-size: 3rem;

  color: var(--white);
}

.new-expense input[type="submit"] {
  background-color: var(--blue);
  border: none;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--white);
  font-weight: 700;
  width: 100%;
  transition: background-color 300ms ease;
  cursor: pointer;
}

.new-expense legend {
  font-size: 3rem;
  font-weight: 700;
  color: var(--white);
  text-align: center;
}

.field {
  display: grid;
  gap: 2rem;
}

.delete-btn {
  background-color: #ef4444;
  color: var(--white);
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 2rem;
  cursor: pointer;
  width: 100%;
  border: none;
}
</style>
