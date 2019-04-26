const isEmpty = (value: string) => value.trim().length === 0;

export function formikSubmitTrim<T>(values: T): {value: T, error: object} {
  // return Object.keys(values).reduce(
  //   (accum, curr) => (
  //     typeof values[curr] === 'string' ? (
  //       {...accum, [curr]: values[curr].trim()}
  //     ) : (
  //       {...accum, [curr]: values[curr]}
  //     )
  //   ), 
  //   {} as T
  // );
  const newError = {};
  const newValues = {} as T;
  const keys = Object.keys(values);
  // tslint:disable-next-line:prefer-for-of
  for (let index = 0; index < keys.length; index++) {
    const element = keys[index];
    if (typeof values[element] === 'string') {
      newValues[element] = values[element].trim();

      if (isEmpty(values[element].trim())) {
        newError[element] = 'Request';
      }
    } else if (Array.isArray(values[element])) {
      const valArray = [];
      for (let index2 = 0; index2 < values[element].length; index2++) {
        const {value, error} = formikSubmitTrim(values[element][index2]);
        if (Object.keys(error).length) {
          if (!newError[element]) {
            newError[element] = [];
          }
          newError[element][index2] = error;
        }
        valArray[index2] = value;
      }
      newValues[element] = valArray;
    } else {
      newValues[element] = values[element];
    }
    if (Array.isArray(newError[element])) {
      const error = values[element].map((_: string, n: number) => !newError[element][n] ? null : newError[element][n]);
      newError[element] = error;
    }
  }
  
  return { value: newValues, error: newError };
}