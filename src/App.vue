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
        <div class="row">
          <div class="col" v-for="(film, index) in films" :key="film.id">
            <div class="card_films">
              <img
                class="img-fluid"
                :src="'https://image.tmdb.org/t/p/w342/' + film.poster_path"
                alt=""
              />
              <ul class="card_text">
                <li class="title">
                  <p><strong>Titolo: </strong>{{ film.title || film.name }}</p>
                </li>
                <li class="original_title">
                  <p>
                    <strong>Titolo originale: </strong
                    >{{ film.original_title || film.original_name }}
                  </p>
                </li>
                <li class="original_language">
                  <strong>Lingua originale: </strong
                  ><img
                    :src="
                      'https://flagcdn.com/20x15/' + nationFlag(index) + '.png'
                    "
                    alt="film.title"
                  />
                </li>
                <li class="rate">
                  <strong class="text-white">Voto: </strong>
                  <font-awesome-icon
                    class="stars"
                    style="color: gold"
                    v-for="rate in voteStars(index)"
                    :key="rate"
                    icon="fa-solid fa-star"
                  />
                </li>
                <li>
                  <p class="overview">
                    <strong>Overview: </strong
                    >{{ film.overview || film.overview }}
                  </p>
                </li>
              </ul>
            </div>
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
      return starsVote;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

header {
  .row {
    height: 100px;
  }
}

main {
  .card_films {
    width: 400px;
    height: 550px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.84);
    position: relative;
    margin: 1rem 0;
    overflow-y: scroll;
  }
  .card_text {
    padding: 2rem;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.759);
  }
  .overview {
    text-align: justify;
    text-justify: inter-word;
  }


}

/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #040404;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #484242;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>>

