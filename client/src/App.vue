<template>
<div class="app">
  <header>
    <h1>Ekran görüntüsü al</h1>
  </header>
  <main>
    <form @submit.prevent="requestScreenshot">
      <input type="url" name="url" id="url" v-model="url"/>
      <input type="submit" value="Go!"/>
    </form>
    <div class="loading" v-if="loading">
      <p>Yükleniyor...</p>
    </div>
    <div class="imageContainer" v-if="screenshotUrl != '' ">
      <h2>Sonuç </h2>
      <a :href="screenshotUrl" target="_blank">
        <img :src="screenshotUrl" alt="image"/>
      </a>
      <p>{{ screenshotUrl }} </p>
    </div>
  </main>
</div>
</template>

<script>

import { ref } from "vue"
import { onMounted } from 'vue'

export default {
  name: 'App',
  setup(){

    onMounted(() => {
    })
  
    const url = ref('http://')
    const screenshotUrl = ref("")
    const loading = ref(null)

    const requestScreenshot = async () => {
      screenshotUrl.value = ""
      loading.value = true;

      const res = await fetch('http://localhost:5000/screenshot' , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            url : url.value,
        })
      }).then(data => data.json())
      screenshotUrl.value = `http://localhost:5000/static/screenshots/${res.ID}.png`
      loading.value = false;
    }

     
    return {
      url,
      screenshotUrl,
      requestScreenshot,
      loading,

    }

  }
  
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Manrope', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.imageContainer{
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.imageContainer p {
  font-size: 13px;
}

img {
  display: block;
  width: 60%;
  max-width: 100%;
  margin : 32px auto;
  border: 1px solid #2c3e50;
  border-radius: 10px;
}

input,
input[type=submit] {
  margin-top: 30px;
  padding: 15px;
  margin-left: 1em;
  border-radius: 5px;
  border: 1px solid;
}

input[type=submit]{
  background-color: rgb(17, 96, 116);
  color: #FFF;
  border-radius: 5px;
  outline: 0;
  border: 0px;
  cursor: pointer;
}

.loading{
  margin-top : 20px;
}

</style>
