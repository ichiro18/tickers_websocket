<template>
    <div class="the-table">
        <table class="table" :class="[`is-${config.columns}`]" v-if="items.length" cellspacing="1" border="1" cellpadding="10">
            <tbody>
            <tr>
                <th>ticker (s)</th>
                <th>updateId (u)</th>
                <th>best bid price (b)</th>
                <th>best bid qty (B)</th>
                <th>best ask price (a)</th>
                <th>best ask qty (A)</th>
            </tr>
            <tr v-for="(row, rowIndex) in items" :key="rowIndex" class="table--row">
                <td
                        v-for="(cell, cellIndex) in row"
                        :key="cellIndex"
                        @click="select(cellIndex, rowIndex)"
                >
                    <template v-if="selected.toString() === [cellIndex, rowIndex].toString()">
                        <input v-model="items[rowIndex][cellIndex]"/>
                    </template>
                    <span >{{ cell }}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default  {
        name: "TheTable",
        props: {
            index: {
                type: String,
                default: '0',
            },
            value: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                items: [],
                config: {
                    columns: 0,
                    rows:    0,
                },
                selected: [-1, -1,],
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(val) {
                    this.items = val;
                    if (this.items.length) {
                        this.config = {
                            rows:    this.items.length || 0,
                            columns: this.items[0].length || 0,
                        };
                    }
                },
            },
        },
        methods: {
            select(row, column) {
                this.selected = [row, column,];
            },
        }
    }
</script>

<style lang="scss">

</style>