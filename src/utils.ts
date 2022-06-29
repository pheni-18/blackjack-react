export const sleep = (sec: number) => {
    return new Promise(resolve => setTimeout(resolve, sec*1000));
};

export const shuffleArray = (array: any[]) => {
    for (let i = (array.length - 1); 0 < i; i--){
      const r = Math.floor(Math.random() * (i + 1));
  
      const tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
};
