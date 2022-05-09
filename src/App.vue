<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6">
            <div class="logo">
              <img height="50px" src="@/assets/img/boolflix-logo.png" alt="" />
            </div>
          </div>
          <div class="col-6">
            <form action="#" method="get" @submit.prevent="searchFilm">
              <input
                placeholder="Cosa vuoi guardare?"
                type="text"
                name="search"
                id="search"
                v-model="searchInput"
              />
              <button type="submit">Cerca</button>
            </form>
          </div>
        </div>
      </div>
    </header>
    <main>
      <ul>
        <li v-for="(film, index) in films" :key="film.id">
          <img :src="'https://image.tmdb.org/t/p/w200/' + film.poster_path " alt="">
          <h4>{{ film.title || film.name }}</h4>
          <p>{{ film.original_title || film.original_name }}</p>
          <img
            :src="'https://flagcdn.com/28x21/' + nationFlag(index) + '.png'"
            alt="film.title"
          />
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
      searchInput: "",
      films: null,
    };
  },
  methods: {
    searchFilm() {
      const APIrequestFilms = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=be95f9eaaa0cffacac52f868a0272550&language=it-IT&page=1&include_adult=false&query=${this.searchInput}`);
      const APIrequestSeries = axios.get(`https://api.themoviedb.org/3/search/tv?api_key=be95f9eaaa0cffacac52f868a0272550&language=it-IT&page=1&include_adult=false&query=${this.searchInput}`);
      axios.all([APIrequestFilms, APIrequestSeries]).then(axios.spread((...responses) => {
          this.films = [
            ...responses[0].data.results,
            ...responses[1].data.results
          ]
          this.searchInput = "";
        }));
    },
    nationFlag(index) {
      if (this.films[index].original_language === "en") {
        this.films[index].original_language = "us";
      } else if (this.films[index].original_language === "ja") {
        this.films[index].original_language = "jp";
      } else if (this.films[index].original_language === "el") {
        this.films[index].original_language = "gr";
      } else if (this.films[index].original_language === "cs") {
        this.films[index].original_language = "cz";
      }
      return this.films[index].original_language;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style.scss";
</style>