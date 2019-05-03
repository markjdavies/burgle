export function valueFromPath(dice) {
    if (dice){
        return dice.reduce((result, die) => {
            return `${result}${die.showingFace.value.toLowerCase()}`;
        }, '');
    }
    else {
        return '';
    }
}
