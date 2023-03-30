/**
 * React Twitter Pixel Module
 *
 * @package react-twitter-pixel
 */

//
let initialized = false;
let debug = false;

/**
 * Utilities
 */

const verifyInit = () => {
    if (!initialized) {
        console.warn('Pixel not initialized before using call ReactTwitterPixel.init with required params');
    }
    return initialized;
};

//
const log = (...args) => {
    console.info(...['[react-twitter-pixel]'].concat(args));
};

//
const defaultOptions = {
    debug: false,
};

//
export default {
    init(pixelId, advancedMatching = {}, options = defaultOptions) {
        /* eslint-disable */
        !function (e, t, n, s, u, a) {
            e.twq || (s = e.twq = function () {
                s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = 'https://static.ads-twitter.com/uwt.js',
                a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
        }(window, document, 'script');
        /* eslint-enable */

        if (!pixelId) {
            console.warn('Please insert pixel id for initializing');
        } else {
            twq('config', pixelId, advancedMatching); // eslint-disable-line no-undef

            initialized = true;
            ({ debug } = options);
        }
    },

    pageView() {
        if (!verifyInit()) {
            return;
        }

        twq('track', 'PageView'); // eslint-disable-line no-undef

        if (debug) {
            log('called twq(\'track\', \'PageView\');');
        }
    },

    track(title, data) {
        if (!verifyInit()) {
            return;
        }

        twq('track', title, data); // eslint-disable-line no-undef

        if (debug) {
            log(`called twq('track', '${title}');`);

            if (data) {
                log('with data', data);
            }
        }
    },

    event(title, data) {
        if (!verifyInit()) {
            return;
        }

        twq('event', title, data); // eslint-disable-line no-undef

        if (debug) {
            log(`called twq('track', '${title}');`);

            if (data) {
                log('with data', data);
            }
        }
    },

    twq(...args) {
        if (!verifyInit()) {
            return;
        }

        twq(...args); // eslint-disable-line no-undef

        if (debug) {
            log(`called twq('${args.slice(0, 2).join('\', \'')}')`);

            if (args[2]) {
                log('with data', args[2]);
            }
        }
    },
};
