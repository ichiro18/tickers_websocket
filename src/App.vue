<template>
    <div id="app">
        <label for="limit">limit</label>
        <select id="limit" v-model="limit" @change="onChangeLimit">
            <option v-for="(item, key) in limits" :key="key" :value="item">{{item}}</option>
        </select>
        <ul>
            <li v-for="item in tickersAverage" :key="item.name">{{item.name}} <b>a:</b> ${{item.a.toFixed(4)}} <b>b:</b>${{item.b.toFixed(4)}}
            </li>
        </ul>
        <table class="table" cellspacing="1" border="1" cellpadding="10">
            <tr>
                <th>#</th>
                <th>ticker (s)</th>
                <th>updateId (u)</th>
                <th>best bid price (b)</th>
                <th>best bid qty (B)</th>
                <th>best ask price (a)</th>
                <th>best ask qty (A)</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
                <td>{{index + 1}}</td> <!-- ticket -->
                <td>{{item.s}}</td> <!-- ticket -->
                <td>{{item.u}}</td> <!-- updateId -->
                <td>{{item.b}}</td> <!-- best bid price -->
                <td>{{item.B}}</td> <!-- best bid qty -->
                <td>{{item.a}}</td> <!-- best ask price -->
                <td>{{item.A}}</td> <!-- best ask qty -->
            </tr>
        </table>
    </div>
</template>

<script>
    import Utills from "@/common/mixins/Utills";

    let connection;

    export default {
        name: 'App',
        mixins: [Utills],
        data() {
            return {
                list: [],
                limit: 10,
                limits: [10, 100, 200],
                tickers: {},
            }
        },
        created() {
            console.log("Starting connection to WebSocket Server");
            if (!connection) {
                connection = new WebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@bookTicker/ethusdt@bookTicker/bnbusdt@bookTicker");
            }

            connection.onmessage = this.throttle(this.onMessage.bind(this), 500);
        },
        computed: {
            tickersAverage() {
                let res = [];
                if (Object.entries(this.tickers).length) {
                    for (const [ticker, items] of Object.entries(this.tickers)) {
                        const arr = items.slice(Math.max(items.length - this.limit, 0));
                        const sum = arr.reduce((acc, item) => {
                            acc.a += parseFloat(item.a.toString());
                            acc.b += parseFloat(item.b.toString());
                            return acc;
                        }, {a: 0, b: 0});
                        res.push({
                            name: ticker,
                            a: sum.a / arr.length,
                            b: sum.b / arr.length,
                        })
                    }
                }
                return res;
            }
        },
        methods: {
            onMessage(event) {
                if (typeof event.data === 'string') {
                    const payload = JSON.parse(event.data);
                    if (payload && payload.data) {
                        // if (this.list.length < 100) {
                        this.createStatLog(payload.data)
                        // }
                    }
                }
            },
            onChangeLimit() {
                if (this.list.length > this.limit) {
                    this.list = this.list.slice(Math.max(this.list.length - this.limit, 0));
                }
            },
            createStatLog(data) {
                if (!this.tickers[data.s]) {
                    this.$set(this.tickers, data.s, []);
                }
                if (this.tickers[data.s].length >= Math.max(...this.limits)) {
                    this.tickers[data.s].shift();
                }
                this.tickers[data.s].push(data);
                if (this.list.length === this.limit) {
                    this.list.shift();
                }
                this.list.push(data);
            }
        },
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        margin-top: 60px;
    }

    .table {
        border: 1px solid;
    }
</style>
