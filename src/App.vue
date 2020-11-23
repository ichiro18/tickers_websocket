<template>
    <div id="app" class="wrapper">
        <table v-if="tickersAverage.length" cellspacing="1" border="1" cellpadding="10" class="average-table">
            <caption>Среднее значение</caption>
            <tr>
                <td>Название</td>
                <td>a</td>
                <td>b</td>
            </tr>
            <tr v-for="item in tickersAverage" :key="item.name">
                <th>{{item.name}}</th>
                <td>${{item.a.toFixed(4)}}</td>
                <td>${{item.b.toFixed(4)}}</td>
            </tr>
        </table>
        <div class="select">
            <label class="label" for="limit">Показывать по</label>
            <select id="limit" v-model="limit" @change="onChangeLimit">
                <option v-for="(item, key) in limits" :key="key" :value="item">{{item}}</option>
            </select>
        </div>
        <the-table :value="list"/>
    </div>
</template>

<script>
    import Utills from "@/common/mixins/Utills";
    import TheTable from "@/components/TheTable";

    let connection;

    export default {
        name: 'App',
        components: {TheTable},
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
            },
        },
    }
</script>

<style lang="scss">
    .wrapper {
        font-family: 'Arial', sans-serif;
        padding: 5rem 10rem;


        .table {
            width: 100%;
            border: 1px solid;
        }

        .average-table {
            margin-top: 5rem;
            caption {
                padding-bottom: 0.5rem;
            }
            td {
                text-align: center;
            }
        }

        .select {
            text-align: right;
            margin-bottom: 1rem;

            label {
                padding-right: 0.5rem;
            }
        }
    }
</style>
