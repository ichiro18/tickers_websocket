<template>
    <div class="the-table">
        <table class="table is-6" v-if="items.length">
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
                    :class="{'is-selected': selected.toString() === [cellIndex, rowIndex].toString()}"
                    @click="select(cellIndex, rowIndex)"
                >
                    <template v-if="selected.toString() === [cellIndex, rowIndex].toString()">
                        <textarea v-model="items[rowIndex][cellIndex]" class="textarea"/>
                    </template>
                    <span v-else>{{ cell }}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: "TheTable",
    props: {
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
                rows: 0,
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
                        rows: this.items.length || 0,
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
.table {
    margin: 0.5rem 0;
    border-collapse: collapse;

    td, th {
        height: 40px;
        text-align: left;
        padding: 0 10px;
        font-size: 14px;
        font-family: 'Arial', sans-serif;

        .textarea {
            max-height: 40px;
            min-height: 40px;
            border: none;
            border-radius: 0;
            resize: none;
            text-align: right;
            font-size: 14px;
            font-family: 'Arial', sans-serif;
            padding: 5px 10px 0 0;
            box-sizing: border-box;
        }

        &:not(:first-child):not(:nth-child(2)) {
            text-align: right;
        }
    }

    @for $i from 1 through 10 {
        &.is-#{$i} {
            td, th {
                width: 100% / $i;
            }
        }
    }

    .is-selected {
        padding: 0;

        .textarea {
            border: 1px solid #238cd1;
        }
    }
}
</style>
