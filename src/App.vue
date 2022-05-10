<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <div class="logo">
              <img height="50px" src="@/assets/img/boolflix-logo.png" alt="" />
            </div>
          </div>
          <div class="col text-center">
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
      <div class="container">
        <div class="row d-flex">
          <div class="col films-card" v-for="(film, index) in films" :key="film.id">
            <ul>
              <li >
                <img
                  :src="'https://image.tmdb.org/t/p/w342/' + film.poster_path"
                  alt=""
                />
                <h4>{{ film.title || film.name }}</h4>
                <p>{{ film.original_title || film.original_name }}</p>
                <img
                  :src="
                    'https://flagcdn.com/28x21/' + nationFlag(index) + '.png'
                  "
                  alt="film.title"
                />
                <p class="stars">
                  <font-awesome-icon
                    v-for="vote in voteStars(index)"
                    :key="vote"
                    icon="fa-solid fa-star"
                  />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
      const APIrequestFilms = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=be95f9eaaa0cffacac52f868a0272550&language=it-IT&page=1&include_adult=false&query=${this.searchInput}`
      );
      const APIrequestSeries = axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=be95f9eaaa0cffacac52f868a0272550&language=it-IT&page=1&include_adult=false&query=${this.searchInput}`
      );
      axios.all([APIrequestFilms, APIrequestSeries]).then(
        axios.spread((...responses) => {
          this.films = [
            ...responses[0].data.results,
            ...responses[1].data.results,
          ];
          this.searchInput = "";
        })
      );
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
    voteStars(index) {
      const starsVote = Math.round(this.films[index].vote_average / 2);
      console.log(starsVote);
      return starsVote
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style.scss";

header {
  .row {
  height: 100px;

  }
}

main {
  height: calc(100vh - 100px);
}

.stars {
  color: gold;
}



</style>