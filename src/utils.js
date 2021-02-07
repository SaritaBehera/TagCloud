/**
 * Step -1 Get the frequency of each words from the body text
 * In next step form a list of each words and it's frequency of use
 * Step -2 Now form the desired list of words with frequency
 * @param bodyText  string
 */
const processWordsFromBodyText = (bodyText) => {
    // Step -1
    let freqMap = wordFreq(bodyText);
    let wordsList = [];
    let count = 0

    // Step -2
    Object.keys(freqMap).forEach(function(key) {
        wordsList[count] = {
            word: key,
            freq: freqMap[key]
        }
        count++;
    });

    return wordsList;
}

/**
 * OnChange handler for body text input
 * OnChange event is very costlier for this operation hence using debounce
 * @param event     @event  field change event
 */
function wordFreq(text) {
    let words = text.replace(/[,.]/g, '').split(/\s/);

    let freqMap = {};

    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;

}

/**
 * Run the callbacks between two consecutive event calls
 * OnChange event is very costlier for this operation hence using debounce
 * @param func callback to be executed
 * @param delay execute callback after a certain delay
 */
const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

export {processWordsFromBodyText, wordFreq, debounce}