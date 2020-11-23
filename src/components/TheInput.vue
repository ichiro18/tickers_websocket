<template>
    <div :class="rootClasses">
        <label v-if="label" class="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <textarea v-if="type==='textarea'"
                  :counter="counter"
                  :value="model"
                  class="textarea"
                  :placeholder="placeholder"
                  @input="change"
        ></textarea>
        <p v-else :class="controlClasses">
            <input ref="input" :type="inputType" :class="inputClasses" :message="message" :disabled="disabled" :counter="counter"
                   :placeholder="placeholder" :value="model" @input="change">
            <span v-if="iconLeft" class="icon is-small is-left">
              <i :class="iconLeft"></i>
            </span>
            <span v-if="iconRight" class="icon is-small is-right">
              <i :class="iconRight"></i>
            </span>
        </p>
        <span v-if="counter" class="control-counter"><span
                class="current-length">{{lengthModel}}</span>/{{maxLength}}</span>
        <p v-if="message" :class="helpClasses">
            {{ message.text || message }}
        </p>
    </div>
</template>

<script>

    import VModelMixin from "@/common/mixins/VModelMixin";

    export default {
        name:     'TheInput',
        mixins:   [VModelMixin,],
        props:    {
            label:       {
                type:    String,
                default: '',
            },
            message:     {
                type:    [Object, String,],
                default: '',
            },
            loading:     {
                type:    Boolean,
                default: false,
            },
            required:     {
                type:    Boolean,
                default: false,
            },
            disabled:    {
                type:    Boolean,
                default: false,
            },
            placeholder: {
                type:    String,
                default: '',
            },
            name:        {
                type:    String,
                default: '',
            },
            inputType:        {
                type:    String,
                default: 'text',
            },
            status:      {
                type:    String,
                default: '', // danger, success
                // validator: value => {
                //     return ['danger', 'success', 'info',].indexOf(value) >= 0;
                // },
            },
            type:        {
                type:      String,
                default:   'text',
                validator: value => {
                    const result = ['text', 'number', 'date', 'tel',].includes(value);
                    if (!result) {
                        return value;
                    }
                    return true;
                },
            },
            iconLeft:    {
                type:    String,
                default: '',
            },
            iconRight:   {
                type:    String,
                default: '',
            },
            counter:     {
                type:    Boolean,
                default: false,
            },
            maxLength:   {
                type:    Number,
                default: 0,
            },
        },
        computed: {
            rootClasses() {
                const baseClass = 'field';
                const res = [baseClass,];
                if (this.disabled) {
                    res.push('is-disabled');
                }
                if (this.status) {
                    res.push(`is-${this.status}`);
                }
                if (this.counter && this.maxLength < this.lengthModel) {
                    res.push('counter-error');
                }
                return res;
            },
            inputClasses() {
                const baseClass = 'input';
                const res = [baseClass,];
                if (this.status) {
                    res.push(`is-${this.status}`);
                }
                return res;
            },
            controlClasses() {
                const baseClass = 'control';
                const res = [baseClass,];
                if (this.iconLeft) {
                    res.push('has-icons-left');
                }
                if (this.iconRight) {
                    res.push('has-icons-right');
                }
                if (this.disabled) {
                    res.push('disabled');
                }
                if (this.loading) {
                    res.push('is-loading');
                }
                if (this.counter) {
                    res.push('is-counter');
                }
                return res;
            },
            helpClasses() {
                const baseClass = 'help';
                const res = [baseClass,];
                if (this.message && this.message.type) {
                    res.push(`is-${this.message.type}`);
                }
                return res;
            },
            lengthModel() {
                return this.value.length;
            },
        },

    };
</script>
<style lang="scss">
    .field {
        .required {
            color: red;
        }

        .control-counter {
            font-size: .75rem;
            display: block;
            text-align: end;
            align-items: center;
        }

        &.counter-error {
            border-color: red;

            .control-counter {
                font-size: .75rem;
                border-color: red !important;

                .current-length {
                    color: red;
                }
            }
        }
    }
</style>
