export function substractRanges(
  start: number,
  end: number,
  blocks: Array<[number, number]>,
): Array<[number, number]> {
  let ranges: Array<[number, number]> = [[start, end]];

  for (const [bs, be] of blocks) {
    const next: Array<[number, number]> = [];

    for (const [rs, re] of ranges) {
      if (be <= rs || bs >= re) {
        next.push([rs, re]);
        continue;
      }

      if (bs > rs) {
        next.push([rs, bs]);
      }

      if (be < re) {
        next.push([be, re]);
      }
    }

    ranges = next;
  }

  return ranges;
}
