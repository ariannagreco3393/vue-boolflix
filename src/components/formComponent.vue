<template>
  <form action="#" method="get" @submit.prevent="$emit('formSubmit')">
    <input
      placeholder="Cosa vuoi guardare?"
      type="text"
      name="search"
      id="search"
      :value="searchInput"
      v-on:input="$emit('input', $event.target.value)"
    />
    <button type="submit">Cerca</button>
  </form>
</template>

<script>
export default {
  name: "formComponent",
  props: {
    searchInput: String,
  },
};
</script>