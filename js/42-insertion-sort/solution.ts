const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const x = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > x) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = x;
    }
};
