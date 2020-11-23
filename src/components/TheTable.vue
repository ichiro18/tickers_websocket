<template>
    <div class="the-table">
        <table class="table is-bordered is-fullwidth" :class="[`is-${config.columns}`]" v-if="list.length">
            <thead>
            <tr>
                <th :colspan="this.config.columns"><the-input v-model="title" type="textarea"/></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, rowIndex) in items" :key="rowIndex">
                <td
                        v-for="(cell, cellIndex) in row"
                        :key="cellIndex"
                        :class="{'is-selected': helpers.isEqual(selected,[cellIndex, rowIndex])}"
                        @click="select(cellIndex, rowIndex)"
                >
                    <template v-if="helpers.isEqual(selected,[cellIndex, rowIndex])">
                        <the-input v-model="list[rowIndex][cellIndex]" type="textarea"/>
                    </template>
                    <span v-else>{{ cell }}</span>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="table-controls" v-if="list.length">
            <button class="button control-item" @click="createRow">
                <span class="icon">
                  <i class="far fa-plus-square"></i>
                </span>
                <span>Строку</span>
            </button>
            <button class="button control-item" @click="deleteRow">
                <span class="icon">
                  <i class="far fa-minus-square"></i>
                </span>
                <span>Строку</span>
            </button>
            <button class="button control-item" @click="createColumn">
                <span class="icon">
                  <i class="far fa-plus-square"></i>
                </span>
                <span>Столбец</span>
            </button>
            <button class="button control-item" @click="deleteColumn">
                <span class="icon">
                  <i class="far fa-minus-square"></i>
                </span>
                <span>Столбец</span>
            </button>
        </div>
    </div>
</template>

<script>
    import {isEqual,} from 'lodash';
    import TheInput from '@/components/TheInput';
    import VModelMixin from '@/common/mixins/VModelMixin';

    export default {
        name:       'TheTable',
        mixins:     [VModelMixin,],
        components: {TheInput,},
        props:      {
            index: {
                type:    String,
                default: '0',
            },
            value: {
                type:    Array,
                default: () => ({
                    list: [],
                }),
            },
        },
        data() {
            return {
                title:   '',
                list:   [],
                config: {
                    columns: 0,
                    rows:    0,
                },
                selected: [-1, -1,],
                helpers:  {
                    isEqual,
                },
            };
        },
        methods: {
            createRow() {
                const columnsCount = this.config.columns || 1;
                this.list.push(Array(columnsCount).fill(''));
                this.config.rows += 1;
            },
            createColumn() {
                for (const item of this.list) {
                    item.push('');
                }
                this.config.columns += 1;
            },
            deleteColumn() {
                for (const item of this.list) {
                    item.splice(-1, 1);
                }
                this.config.columns -= 1;
            },
            deleteRow() {
                this.list.splice(this.selected[1], 1);
                this.config.rows -= 1;
            },
            select(row, column) {
                this.selected = [row, column,];
            },
        },
        watch: {
            value: {
                immediate: true,
                handler(val) {
                    this.list = val.list;
                    if (this.list.length) {
                        this.config = {
                            rows:    this.list.length || 0,
                            columns: this.list[0].length || 0,
                        };
                    }
                },
            },
        },
    };
</script>

<style lang="scss">

    .the-table {
        .table-creator {
            border: 1px solid #00d1b2;
            border-radius: 0.5rem;
            padding: 1rem;
        }

        .table-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.5rem;
            padding: 0.5rem;

            .control-item {
                cursor: pointer;
                font-size: 1.25rem;

                &:hover {
                    color: #00d1b2;
                }

                & + .control-item {
                    margin-left: 0.5rem;
                }
            }
        }

        .table {
            margin: 0.5rem 0;
            border-collapse: collapse;

            td, th {
                padding: 0;
                height: 40px;
                .textarea {
                    padding: 0;
                    max-height: 40px;
                    min-height: 40px;
                    border: none;
                    border-radius: 0;
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
                .textarea {
                    border: 1px solid #238cd1;
                }
            }
        }
    }
</style>
