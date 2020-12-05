const fs = require('fs');

function resolveInput(fileName) {
    const content = fs.readFileSync(fileName, 'utf8');
    return content.split(/\s+/);
}

function resolvePath(set, direction) {
    let newSet = [];
    if (direction === 'B' || direction === 'R') {
        newSet = [(set[0] - 1 + set[1]) / 2 + 1, set[1]];
    } else {
        newSet = [set[0], (set[0] - 1 + set[1]) / 2];
    }
    return newSet;
}

function parseSeatID(series) {
    possibleRows = [1, 128];
    possibleSeats = [1, 8];
    for (var i = 0; i < 7; i++) {
        possibleRows = resolvePath(possibleRows, series[i]);
    }
    for (var i = 7; i < 10; i++) {
        possibleSeats =  resolvePath(possibleSeats, series[i]);
    }
    return (possibleRows[0] - 1) * 8 + possibleSeats[1] - 1;
}

function findHighestSeatID(ids) {
    var highest = 0;

    ids.forEach(id => {
        // const seatID = parseSeatID(id);
        if (id > highest) {
            highest = id;
        }
    });

    return highest;
}

function findMySeat(ids) {
    var seat = undefined;

    ids.forEach(id => {
        if (id === 668) {
            seat = !ids.some(id2 => id2 === id + 1) && ids.some(id2 => id2 === id + 2) ? id + 1 : undefined;
            // console.log(!ids.some(id2 => id2 === id + 1), ids.some(id2 => id2 === id + 2), seat);
        }
    });

    return seat;
}

const seatIds = resolveInput('input.txt').map(bsp => parseSeatID(bsp));
console.log(findHighestSeatID(seatIds));
console.log(findMySeat(seatIds));
