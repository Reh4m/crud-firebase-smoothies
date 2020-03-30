<template>
  <div class="index container">

    <div class="row">
      <div class="col s12 m6 l4" v-for="smoothie in smoothies" :key="smoothie.id">

        <div class="card">
          <div class="card-content">
            <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete_outline</i>
            <h2 class="indigo-text">
              {{ smoothie.title }}
            </h2>
            <ul class="ingredients">
              <li v-for="(ing, index) of smoothie.ingredients" :key="index">
                <span class="chip">{{ ing }}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
            <router-link :to="`/edit-smoothie/${ smoothie.slug }`">
              <i class="material-icons">edit</i>
            </router-link>
          </span>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Home',
  data: () => ({
    smoothies: []
  }),
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smoothie => smoothie.id != id)
      })
    }
  },
  created() {
    // fetch data from the firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      });
    })
  }
}
</script>
<style scoped>
  .row {
    margin-top: 60px;
  }
  .index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0px;
  }
  .index .ingredients {
    margin: 30px auto;
  }
  .index .ingredients li{
    display: inline-block;
  }
  .index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
</style>
