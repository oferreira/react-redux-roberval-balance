const GROUP_EQUALS = 0;
const GROUP_LEFT = 1;
const GROUP_RIGHT = 2;


/**
 * Get which side of the balance is the heavier
 *
 * @param left
 * @param right
 * @returns {number}
 */
const whichSideIsHeavier = (left, right) => {
    return right > left ? GROUP_RIGHT : left > right ? GROUP_LEFT : GROUP_EQUALS;
};

/**
 * Compute weight for a set of items
 *
 * @param items
 * @returns {number}
 */
const weight = (items) => items.reduce((i, j) => i + j.weight, 0);


/**
 * Divide an array in three groups (GROUP_LEFT, GROUP_RIGHT, GROUP_EQUALS)
 *
 * @param items
 * @returns {*}
 */
const divide = (items) => {
    let count = Math.ceil(items.length / 3);

    return {
        [GROUP_LEFT]: items.slice(0, count),
        [GROUP_RIGHT]: items.slice(count, count * 2),
        [GROUP_EQUALS]: items.slice(count * 2, items.length),
    };
}


/**
 * Function returning what to do next
 * If *set* is somehow empty (all items weigh the same), returns -1
 * If *set* contains one element, return it
 * Else, keep searching
 *
 * @param set
 * @param round
 */


/**
 * Search for the heavier item
 *
 * @param items
 * @param round
 * @returns {*}
 */
const compute = (items, round = 0) => {
    // Divide the items in 3 groups  (GROUP_LEFT, GROUP_RIGHT, GROUP_EQUALS)
    let groups = divide(items)

    // Find the heaviest result between left and right groups
    let id = whichSideIsHeavier(weight(groups[GROUP_LEFT]), weight(groups[GROUP_RIGHT]));

    // Increment weight counter
    round++;

    // Continue
    let next = (items, round) => items.length === 0 ? '-1' : items.length === 1 ? {
                item: items[0],
                round
            } : compute(items, round);

    return next(groups[id], round);
};


const findHeaviestItem = (callback, error = (e) => console.log(e), items) => {
    let $return = compute(items);
    if ($return === '-1') {
        error('NOT_FOUND')
        return;
    }

    callback(compute(items));
}

export default {
    findHeaviestItem
}
