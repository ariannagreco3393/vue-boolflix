<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6">
            <div class="logo">
              <img src="@/assets/img/boolflix-logo.png" alt="" />
            </div>
          </div>
          <div class="col-6">
            <form action="#" method="get" @submit.prevent="searchFilm">
              <input
                placeholder="Cosa vuoi guardare?"
                type="text"
                name="search"
                id="search"
                v-model="searchText"
              />
              <button type="submit">Cerca</button>
            </form>
          </div>
        </div>
      </div>
    </header>
    <main>
      <ul>
        <li v-for="film in films" :key="film.id">
          <p>{{ film.title }}</p>
          <p>{{ film.original_title }}</p>
          <p>{{ film.original_language }}</p>
          <p>{{ film.vote_average }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      searchText: "",
      films: null,
    };
  },
  methods: {
    searchFilm() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=be95f9eaaa0cffacac52f868a0272550&language=it-IT&page=1&include_adult=false&query=${this.searchText}`
        )
        .then((response) => {
          this.films = response.data.results;
        });
    },
  },
  components: {},
};
</script>

<style lang="scss">
@import "@/assets/style.scss"

</style>