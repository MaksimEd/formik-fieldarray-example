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

type SortDirection = 'asc' | 'desc';

interface Props extends WithStyles<typeof styles> {
  data: any[];
  rows: TableRowCmp[];
}
interface State {
  order: SortDirection;
  orderBy: string;
  fieldsValue: {[x: string]: string};
}

class TableCmp extends React.Component<Props, State> {

  state: State = {
    fieldsValue: {},
    order: 'asc',
    orderBy: '',
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    this.setState(pV => ({ 
      fieldsValue: {...pV.fieldsValue, [field]: value}
    }) as any);
  }

  createSortHandler = (orderBy: string) => () => this.setState(pv => ({ 
    order: pv.order === 'asc' ? 'desc' : 'asc', 
    orderBy
  }));

  filteringTableData<T>(array: T[]) {
    const { fieldsValue } = this.state;
    const newArray = array.filter(i => {
      return Object.keys(fieldsValue).every(f => {
        return !!get(i, f).toLowerCase().includes(fieldsValue[f].toLowerCase());
      });
    });
    return newArray;
  }

  render() {
    const { classes, data, rows } = this.props;
    const { order, orderBy } = this.state;
    const isShowFilter = rows.some(i => !!i.filter);

    const filterData = this.filteringTableData(stableSort(data, getSorting(order, orderBy)));
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              {rows.map(row => (
                <TableCell key={row.id}>
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
                  <TableCell key={row.id}>
                    {row.filter && row.filter === 'text' && (
                      <TextField
                        value={this.state.fieldsValue[row.id] || ''}
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
                        value={this.state.fieldsValue[row.id] || 'All'}
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
            {filterData.map(i => (
              <TableRow key={i.id}>
                {rows.map(row => (
                  <TableCell key={row.id}>
                    {row.getValue ? row.getValue(i) : get(i, row.id)}
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