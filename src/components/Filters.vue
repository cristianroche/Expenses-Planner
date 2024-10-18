<script setup>
defineProps({
  filter: {
    type: String,
    required: true,
  },
});

defineEmits(["update:filter"]);
</script>

<template>
  <div class="filters shadow container">
    <form>
      <div class="field">
        <label for="filter">Filter by Category</label>
        <select
          id="filter"
          :value="filter"
          @input="$emit('update:filter', $event.target.value)"
        >
          <option value="" selected>All</option>
          <option value="food">Food</option>
          <option value="home">Home</option>
          <option value="health">Health</option>
          <option value="leisure">Leisure</option>
          <option value="expense">Expense</option>
          <option value="subcriptions">Subscriptions</option>
          <option value="save">Save</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
.filters {
  margin-top: 10rem;
  width: 100%;
}

.filters .field {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filters label {
  font-size: 3rem;
  color: var(--dark-gray);
  font-weight: 900;
}

.filters select {
  flex: 1;
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  text-align: center;
}
</style>
