export const dataProcesser = (array: string[][]) => {
  const [headers, ...rows] = array;

  return rows.map((row) => {
    return headers.reduce((transform, header, index) => {
      transform[header] = row[index];
      return transform;
    }, {} as { [key: string]: string });
  });
};
