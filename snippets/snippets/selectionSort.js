function selectionSort(arr) {
    let iterations = 0;

    while (iterations !== arr.length - 1) {
        let currentMin = iterations;
        for (let i = iterations; i < arr.length; i++) {
            if (arr[i] < arr[currentMin]) {
                currentMin = i;
            }
        }
        let temp = arr[currentMin];
        arr[currentMin] = arr[iterations];
        arr[iterations] = temp;
        iterations++;
    }
    return arr;
}