/** Rows of an RFC 4180 CSV text: quoted fields may hold commas, doubled quotes and line breaks. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let i = 0;
  while (i < text.length) {
    let field;
    if (text[i] === '"') {
      let end = i + 1;
      while (true) {
        end = text.indexOf('"', end);
        if (end === -1) throw new Error('unterminated quoted field');
        if (text[end + 1] !== '"') break;
        end += 2;
      }
      field = text.slice(i + 1, end).replaceAll('""', '"');
      i = end + 1;
    } else {
      let end = i;
      while (end < text.length && text[end] !== ',' && text[end] !== '\n' && text[end] !== '\r') end++;
      field = text.slice(i, end);
      i = end;
    }
    row.push(field);
    if (text[i] === ',') {
      i++;
      continue;
    }
    if (text[i] === '\r') i++;
    if (text[i] === '\n') i++;
    rows.push(row);
    row = [];
  }
  return rows;
}
