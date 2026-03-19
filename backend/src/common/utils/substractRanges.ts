export function substractRanges(
  start: number,
  end: number,
  blocks: Array<[number, number]>,
): Array<[number, number]> {
  let ranges: Array<[number, number]> = [[start, end] as [number, number]];

  for (const [bs, be] of blocks) {
    const next: Array<[number, number]> = [];

    for (const [rs, re] of ranges) {
      if (be <= rs || bs >= re) {
        next.push([rs, re] as [number, number]);
        continue;
      }

      if (bs > rs) {
        next.push([rs, bs] as [number, number]);
      }

      if (be < re) {
        next.push([be, re] as [number, number]);
      }
    }

    ranges = next;
  }

  return ranges;
}
