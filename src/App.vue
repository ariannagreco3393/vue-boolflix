<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <logoComponent/>
          </div>
          <div class="col text-center">
            <formComponent @formSubmit="searchFilm" v-model="searchInput"/>
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
                class="img-fluid cover_film"
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
import logoComponent from "@/components/logoComponent.vue";
import formComponent from "@/components/formComponent.vue";
export default {
  name: "App",
  components: {
    logoComponent,
    formComponent
  },
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

input[type="text"] {
  padding: 0.3rem;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  margin-left: 10px;
  color: white;
  padding: 0.4rem;
  background-color: rgb(220, 27, 39);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

main {
  height: 100%;
  .card_films {
    width: 400px;
    height: 550px;
    border: 1px solid rgba(255, 255, 255, 0.84);
    position: relative;
    margin: 1rem 0;
    overflow-y: auto;
    .cover_film {
      height: 100%;
      width: 100%;
    }
  }

  .card_text {
    padding: 2rem;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.759);
    display: none;
  }

  .card_films:hover .card_text {
    display: block;
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

