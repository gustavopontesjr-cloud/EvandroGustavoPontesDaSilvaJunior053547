// Esse arquivo define o formato da paginação que vimos no seu print (page, size, total)
export interface PaginatedResponse<T> {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: T[];
}