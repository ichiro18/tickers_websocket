'use strict';

/**
 * @mixin
 * @module mixins/UtilsMixin
 * @desc Utility methods collection
 */
export default {
    methods: {
        /**
         * Creates a throttled function that only invokes `func` at most once per
         * every `wait` milliseconds (or once per browser frame).
         * The `func` is invoked with the last arguments provided to the
         * throttled function. Subsequent calls to the throttled function return the
         * result of the last `func` invocation.
         * @param {Function} func The function to throttle.
         * @param {Number} [wait=0] The number of milliseconds to throttle invocations to
         * @return {Function} Returns the new throttled function.
         */
        throttle(func, wait) {
            let now, lastExec, timer, context, args;

            const execute = function() {
                func.apply(context, args);
                lastExec = now;
            };

            return function() {
                context = this;
                args = arguments;

                now = Date.now();

                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }

                if (lastExec) {
                    const diff = wait - (now - lastExec);
                    if (diff < 0) {
                        execute();
                    } else {
                        timer = setTimeout(() => {
                            execute();
                        }, diff);
                    }
                } else {
                    execute();
                }
            };
        },
    },
};