<template>
  <div id="app">
 <the-table/>
  </div>
</template>

<script>
// import TheTable from '@/components/TheTable.vue'

import TheTable from "@/components/TheTable";
export default {
  name: 'App',
  components: {
      TheTable
    // TheTable
  },
  data() {
    return {
      bitcoin: [],
      connection: null
    }
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@bookTicker/ethusdt@bookTicker/bnbusdt@bookTicker");

    this.connection.onmessage = (event) => {
        if (this.bitcoin.length < 100) {
            this.bitcoin.push(event.data);
            console.log(event.data);
        }
        console.log('onmessage');
      console.log(event);
    };
    this.connection.onopen = function(event) {
      console.log('onopen');
      console.log(event);
      console.log("Successfully connected to the echo websocket server...")
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
