export function union(arr: any[]): any[] {
  return [...new Set([].concat(...arr))];
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function shuffle<T>(array: T[]): T[] {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
