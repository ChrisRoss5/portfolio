import sidebar from "../scripts/sidebar.json";

interface Line {
  indents: number;
  key?: string;
  value?: string;
  bracket?: boolean;
  noComma?: boolean;
}

const lines: Line[] = [{ value: "{", bracket: true, indents: 0 }];
const keys = Object.keys(sidebar);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = sidebar[key as keyof typeof sidebar];
  const noComma = i == keys.length - 1;
  const indents = 1;
  if (typeof value == "string") lines.push({ key, value, indents });
  else if (Array.isArray(value)) {
    lines.push({ indents, key, value: "[", bracket: true });
    for (let j = 0; j < value.length; j++) {
      const noComma2 = j == value.length - 1;
      lines.push({ value: value[j], indents: 2, noComma: noComma2 });
    }
    lines.push({ indents, value: "]", bracket: true, noComma });
  } else {
    lines.push({ indents, key, value: "{", bracket: true });
    const keys2 = Object.keys(value);
    for (let j = 0; j < keys2.length; j++) {
      const key2 = keys2[j];
      const value2 = value[key2 as keyof typeof value];
      const noComma2 = j == keys2.length - 1;
      lines.push({ key: key2, value: value2, indents: 2, noComma: noComma2 });
    }
    lines.push({ indents, value: "}", bracket: true, noComma });
  }
}
lines.push({ value: "}", bracket: true, indents: 0 });

export default lines;