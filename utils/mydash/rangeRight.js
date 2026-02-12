function rangeRight(start, end, step) {
  return range(start, end, step, true);
}

function range(start, end, step, isRight = false) {
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
    if (start === undefined) start = 0;

    let path = end - start;
    if (path === 0) return [];
    toRight = path > 0;
    if (step === undefined) {
      toRight ? (step = 1) : (step = -1);
    }

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

  return isRight ? [...res].reverse() : res;
}
