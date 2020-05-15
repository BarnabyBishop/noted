const defaultGap = 100;
export const getMiddleSortOrder = (firstIndex, secondIndex) => {
    // todo - updates
    // defaultGap = 1000
    // caller passes in full list + insertAfterIndex
    // If sort order of both items are the same reorder the whole list
    if (!firstIndex && !secondIndex) {
        return 0;
    }
    if (!firstIndex) {
        return secondIndex - defaultGap;
    }
    if (!secondIndex) {
        return firstIndex + defaultGap;
    }
    const difference = secondIndex - firstIndex;
    const middle = parseInt(difference / 2, 10);
    return firstIndex + middle;
};

export const sortList = (list) => {
    // Create copy of array and sort it
    let sortedList = Array.from(list);
    return sortedList.sort((a, b) => {
        if (!!a.completed === !!b.completed) {
            // If both items are completed sort them in the order
            // in which they were completed
            if (a.completed) {
                return a.completed - b.completed;
            }
            // If they aren't completed sort by their sort order
            return a.sortOrder - b.sortOrder;
        }
        // If they have different completed statuses sort by if they are completed or not.
        return a.completed ? 1 : -1;
    });
};
