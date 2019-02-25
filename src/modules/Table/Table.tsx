import * as React from 'react';

import fakeDataTable from './fakeDataTable';
import { TableRowCmp } from './models';
import EnhancedTable from './EnhancedTable';

const TableCmp = () => {
  const rows: TableRowCmp<typeof fakeDataTable.list[0]>[] = [
    {id: 'lastName', label: 'Фамилия', filter: 'text'},
    {id: 'firstName', label: 'Имя', filter: 'text'},
    {id: 'patronymic', label: 'Отчество', filter: 'text'},
    {id: 'position.name', label: 'Должность', filter: 'select', getValue: item => item.position.name}
  ];
  return (
      <EnhancedTable
        rows={rows}
        data={fakeDataTable.list}
      />
  );
};

export default TableCmp;