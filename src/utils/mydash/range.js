function range(start = 0, end, step = 1) {
  let res = [];
  let toRight;

  if (start === undefined && end === undefined && step === undefined) return [];
  if (end === undefined && step === undefined) {
    end = start;
    start = 0;

    let path = end - start;
    if (path === 0) return [];
    toRight = path > 0;

    step = toRight ? 1 : -1;
    for (let i = start; toRight ? i < end : i > end; i = i + step) {
      res.push(i);
    }
  } else {
    let path = end - start;
    if (path === 0) return [];
    toRight = path > 0;
    if ((toRight && step < 0) || (!toRight && step > 0)) return [];

    if (step === 0) {
      step = toRight ? 1 : -1;

      for (let i = start; toRight ? i < end : i > end; i = i + step) {
        res.push(start);
      }
    } else {
      for (let i = start; toRight ? i < end : i > end; i = i + step) {
        res.push(i);
      }
    }
  }
  return res;
}
