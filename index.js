const { getProp } = require('./getProp/getProp');

console.log(
    getProp(
        {a:{b:{c:[1,2,3]}}},
        'a.b.c[2]'
    )
);