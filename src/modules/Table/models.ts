export interface TableRowCmp<T = any> {
  id: string;
  label: string;
  filter?: 'text' | 'select';
  getValue?: (item: T) => string;
}