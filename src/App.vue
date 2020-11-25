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
                <th>{{ item.name }}</th>
                <td>${{ item.a.toFixed(4) }}</td>
                <td>${{ item.b.toFixed(4) }}</td>
            </tr>
        </table>
        <div class="control-group">
            <div class="field">
                <label class="label" for="limit">Performance: </label>
                <select id="limit" v-model="performanceType" @change="changePerformanceType">
                    <option v-for="[item, key] in PERFORMANCE_TYPES" :key="key" :value="key">{{ item.toLowerCase() }}</option>
                </select>
            </div>
            <div class="field">
                <label class="label" for="performance">Show:</label>
                <select id="performance" v-model="limit" @change="onChangeLimit">
                    <option v-for="(item, key) in limits" :key="key" :value="item">{{ item }}</option>
                </select>
            </div>
        </div>
        <the-table :value="list"/>
    </div>
</template>

<script>
import Utills from "@/common/mixins/Utills";
import TheTable from "@/components/TheTable";

let connection;

const PERFORMANCE_TYPES = {
    NOTHING: 0,
    THROTTLE: 1,
    DEBOUNCE: 2,
}

const savedPerformance = localStorage.getItem('performance');

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
            PERFORMANCE_TYPES: Object.entries(PERFORMANCE_TYPES),
            performanceType: savedPerformance ? parseInt(savedPerformance) : PERFORMANCE_TYPES.NOTHING,
            wait: 2000,
        }
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
        changePerformanceType() {
            if (connection) {
                switch (this.performanceType) {
                    case PERFORMANCE_TYPES.THROTTLE:
                        console.log('IT IS THROTTLE')
                        connection.onmessage = this.throttle(this.onMessage.bind(this), this.wait);
                        break;
                    case PERFORMANCE_TYPES.DEBOUNCE:
                        console.log('IT IS DEBOUNCE')
                        connection.onmessage = this.debounce(this.onMessage.bind(this), this.wait);
                        break;
                    default:
                        connection.onmessage = this.onMessage;
                }
            }
            localStorage.setItem('performance', this.performanceType);
        },
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
        init() {
            if (!connection) {
                connection = new WebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@bookTicker/ethusdt@bookTicker/bnbusdt@bookTicker");
            }

            // второй - когда соединено закроется
            connection.onclose = () => console.log("Connection closed...");
            connection.onopen = () => console.log("Connection opened...");
            connection.onerror = err => console.error(err);

            this.changePerformanceType();
        }
    },
    created() {
        this.init();
    },
    beforeDestroy() {
        connection.close();
    }
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

    .control-group {
        display: flex;
        justify-content: space-between;
        text-align: right;
        margin: 1rem 0;

        label {
            padding-right: 0.5rem;
        }
    }
}
</style>
