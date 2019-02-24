import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import {
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper,
  TextField,
  Select,
  MenuItem,
  Tooltip,
  TableSortLabel
} from  '@material-ui/core';

import { TableRowCmp } from './models';
import fakeDataTable from './fakeDataTable';
import get from 'lodash/get';

const styles = createStyles({
  root: {
    maxWidth: 1000,
    margin: '20px auto'
  },
  inputRoot: {
    padding: 10
  }
});

function stableSort<T>(array: T[], cmp: ReturnType<typeof getSorting>) {
  const stabilizedThis = array.map<[T, number]>((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function desc<T>(a: T, b: T, orderBy: string) {
  const orderA = get(a, orderBy, '');
  const orderB = get(b, orderBy, '');
  if (orderB < orderA) {
    return -1;
  }
  if (orderB > orderA) {
    return 1;
  }
  return 0;
}

function getSorting<T>(order: SortDirection, orderBy: string) {
  return order === 'desc' ? 
         (a: T, b: T) => desc(a, b, orderBy) : 
         (a: T, b: T) => -desc(a, b, orderBy);
}

const rows: TableRowCmp[] = [
  {id: 'lastName', label: 'Фамилия', filter: 'text'},
  {id: 'firstName', label: 'Имя', filter: 'text'},
  {id: 'patronymic', label: 'Отчество', filter: 'text'},
  {id: 'position.name', label: 'Должность', filter: 'select'}
];

type SortDirection = 'asc' | 'desc';

interface Props extends WithStyles<typeof styles> {
  data: any[];
}
interface State {
  filters: any[];
  order: SortDirection;
  orderBy: string;
}

class TableCmp extends React.Component<Props, State> {

  state: State = {
    filters: [],
    order: 'asc',
    orderBy: 'calories',
  };

  static defaultProps = {
    data: fakeDataTable.list
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  }

  createSortHandler = (orderBy: string) => () => this.setState(pv => ({ 
    order: pv.order === 'asc' ? 'desc' : 'asc', 
    orderBy
  }));

  render() {
    const { classes, data } = this.props;
    const { order, orderBy } = this.state;
    const isShowFilter = rows.some(i => !!i.filter);
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              {rows.map(row => (
                <TableCell>
                  <Tooltip
                    title="Sort"
                    placement={'bottom-end'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>

            {isShowFilter && (
              <TableRow>
                {rows.map(row => (
                  <TableCell>
                    {row.filter && row.filter === 'text' && (
                      <TextField
                        value={this.state[row.id] || ''}
                        onChange={this.handleChange}
                        placeholder={row.label}
                        margin="normal"
                        style={{margin: 0}}
                        name={row.id}
                        inputProps={{
                          className: classes.inputRoot
                        }}
                        variant="outlined"
                      />
                    )}
                    {row.filter && row.filter === 'select' && (
                      <Select
                        value={this.state[row.id] || 'All'}
                        onChange={this.handleChange}
                        name={row.id}
                      >
                        <MenuItem value="All">All</MenuItem>
                      </Select>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}

          </TableHead>
          <TableBody>
            {stableSort(data, getSorting(order, orderBy)).map(i => (
              <TableRow key={i.id}>
                {rows.map(row => (
                  <TableCell>
                    {get(i, row.id)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TableCmp);