<script setup>
import { formatQuantity } from "../helpers";
import { computed } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";

const props = defineProps({
  budget: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
});

defineEmits(["reset-app"]);

const percentage = computed(() => {
  return parseInt(((props.budget - props.available) / props.budget) * 100);
});
</script>

<template>
  <div class="two-columns">
    <div class="graphic-container">
      <p class="percentage">{{ percentage }}%</p>
      <CircleProgress
        :percent="percentage"
        :size="250"
        :border-width="30"
        :border-bg-width="30"
        fill-color="#3b82f6"
        empty-color="#e1e1e1"
      />
    </div>
    <div class="budget-container">
      <button type="button" class="reset-app" @click="$emit('reset-app')">
        Reset App
      </button>
      <p><span>Budget: </span>{{ formatQuantity(budget) }}</p>
      <p><span>Available: </span>{{ formatQuantity(available) }}</p>
      <p><span>Spent: </span>{{ formatQuantity(spent) }}</p>
    </div>
  </div>
</template>

<style scoped>
.two-columns {
  display: flex;
  flex-direction: column;
}

.two-columns > :first-child {
  margin-bottom: 3rem;
}

.budget-container {
  width: 100%;
}

.budget-container p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--dark-gray);
}

.budget-container p span {
  font-weight: 900;
  color: var(--blue);
}

.reset-app {
  background-color: #db2777;
  color: var(--white);
  border: none;
  padding: 1rem;
  width: 100%;
  font-size: 2rem;
  font-weight: 900;
  border-radius: 1rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  transition-property: background-color;
  transition-duration: 300ms;
}

.reset-app:hover {
  background-color: #be185d;
}

.graphic-container {
  position: relative;
}

.percentage {
  position: absolute;
  margin: auto;
  top: calc(50% - 1.5rem);
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;
  font-size: 3rem;
  font-weight: 900;
  color: var(--dark-gray);
}

@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }
  .two-columns > :first-child {
    margin-bottom: 0;
  }

  .budget-container p {
    font-size: 2.4rem;
    text-align: left;
  }
}
</style>
