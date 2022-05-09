<template>
  <div id="app">
    <form action="search" method="get">
      <input placeholder="Cerca per titolo" type="text" value="">
      <button type="submit">Cerca</button>
    </form>
    <div class="film">
      <ul v-for="result in results" :key="result.id">
        <li>{{}}</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from "axios"
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      API_URL: 'https://api.themoviedb.org/3/search/movie?api_key=be95f9eaaa0cffacac52f868a0272550&language=it-IT&page=1&include_adult=false&query=star wars',
      results: null,
      loading: true,
      error: null
    }
  },
  methods: {
    callApi() {
      axios
      .get(this.API_URL)
      .then((response) => {
        this.results = response.data
        this.loading = false

      })
      .catch((error) => {
        console.error();
        error;
        this.error = 'Sorry there is a problem ${error}'
      })

    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
