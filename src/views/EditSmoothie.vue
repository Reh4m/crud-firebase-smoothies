<template>
  <div v-if="smoothie" class="edit-smoothie  container">

    <h2 class="center-align indigo-text">Edit a {{ smoothie.title }}</h2>
    <form @submit.prevent="editSmoothie()">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ing, index) of smoothie.ingredients" :key="index" class="field">
        <label for="Ingredient">Ingredient {{ index+1 }}:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">close</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="waves-effect waves-light btn pink">Add smoothie</button>
      </div>
    </form>

  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from "slugify"

export default {
  name: 'EditSmoothie',
  props: ['smoothieSlug'],
  data: () => ({
    smoothie: null,
    another: null,
    feedback: null,
  }),
  created() {
    let ref = db.collection('smoothies')
    .where('slug', '==', this.smoothieSlug)
    ref.get().then((snapshot) => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      });
    }).catch(err => console.error(err))
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then(() => {
          this.$router.push('/')
        }).catch(err => console.error(err))
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => ingredient != ing
      )
    }
  }
}
</script>

<style>
  .edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 600px;
  }
  .edit-smoothie h2 {
    font-size: 3em;
    margin: 20px auto;
  }
  .edit-smoothie .field {
    margin: 20px auto;
    position: relative;
  }
  .edit-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
    color: #aaa;
    cursor: pointer;
  }
</style>
