import React from 'react';
import { ICreature } from '../../../models/ICreature';
import { YearlyCreatureRow } from './YearlyCreatureRow';
import { TableHead, TableCell, TableRow, TableBody, TableContainer, Table, Modal } from '@material-ui/core';
import { CreatureDetails } from '../CreatureDetails';

interface IYearlyViewProps {
  selectedCreatureType: string;
  selectedArea: string;
  creaturesList: ICreature[];
}

interface IYearlyViewState {
}

export class YearlyView extends React.Component<IYearlyViewProps, IYearlyViewState> {
  constructor(props) {
    super(props);
  }

  render() {
    const _selectedCreaturesList: ICreature[] = this.props.creaturesList;
    const _selectedCreatureType: string = this.props.selectedCreatureType;
    const _selectedArea: string = this.props.selectedArea;

    return (
      <div>
        <TableContainer className="ac-table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{_selectedCreatureType}</TableCell>
                <TableCell>Jan</TableCell>
                <TableCell>Feb</TableCell>
                <TableCell>Mar</TableCell>
                <TableCell>Apr</TableCell>
                <TableCell>May</TableCell>
                <TableCell>Jun</TableCell>
                <TableCell>Jul</TableCell>
                <TableCell>Aug</TableCell>
                <TableCell>Sep</TableCell>
                <TableCell>Oct</TableCell>
                <TableCell>Nov</TableCell>
                <TableCell>Dec</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { _selectedCreaturesList && 
                _selectedCreaturesList.map((c: ICreature) => <YearlyCreatureRow key={c.id} creature={c} area={_selectedArea}/>)
              }
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    )
  }
}