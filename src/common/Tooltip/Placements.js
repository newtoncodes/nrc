module.exports = {
    left: {
        points: ['cr', 'cl'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [-3, 0],
        targetOffset: [0, 0]
    },
    right: {
        points: ['cl', 'cr'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [3, 0],
        targetOffset: [0, 0]
    },
    top: {
        points: ['bc', 'tc'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [0, -3],
        targetOffset: [0, 0]
    },
    bottom: {
        points: ['tc', 'bc'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [0, 3],
        targetOffset: [0, 0]
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [0, -3],
        targetOffset: [0, 0]
    },
    leftTop: {
        points: ['tr', 'tl'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [-3, 0],
        targetOffset: [0, 0]
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [0, -3],
        targetOffset: [0, 0]
    },
    rightTop: {
        points: ['tl', 'tr'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [3, 0],
        targetOffset: [0, 0]
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [0, 3],
        targetOffset: [0, 0]
    },
    rightBottom: {
        points: ['bl', 'br'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [3, 0],
        targetOffset: [0, 0]
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [0, 3],
        targetOffset: [0, 0]
    },
    leftBottom: {
        points: ['br', 'bl'],
        overflow: {adjustX: 1, adjustY: 1},
        offset: [-3, 0],
        targetOffset: [0, 0]
    }
};