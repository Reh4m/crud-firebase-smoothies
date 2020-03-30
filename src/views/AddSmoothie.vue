<template>
  <div class="add-smoothie container">

    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddNewSmoothie()">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) of ingredients" :key="index" class="field">
        <label for="Ingredient">Ingredient {{ index+1 }}:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
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
import db from "@/firebase/init"
import slugify from "slugify"

export default {
  name: 'AddSmoothie',
  data: () => ({
    title: null,
    ingredients: [],
    slug: null,
    another: null,
    feedback: null,
  }),
  methods: {
    AddNewSmoothie() {
      if (this.title) {
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push('/')
        }).catch((err) => console.error(err))
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => ingredient != ing)
    }
  }
}
</script>

<style scoped>
  .add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 600px;
  }
  .add-smoothie h2 {
    font-size: 3em;
    margin: 20px auto;
  }
  .add-smoothie .field {
    margin: 20px auto;
    position: relative;
  }
  .add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
    color: #aaa;
    cursor: pointer;
  }
</style>
