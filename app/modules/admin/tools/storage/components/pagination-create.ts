export const paginationCreate = (
  total: number,
  pageSize: number,
  current: number,
  nav: any,
) => {
  return {
    total,
    pageSize,
    current,
    onChange(page: number, pageSize: number) {
      nav({ page, pageSize });
    },
  };
};
