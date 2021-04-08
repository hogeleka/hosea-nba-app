import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as React from "react";
import { PlayerStatSheet } from "../../types/types";
import { PLAYER_STATS_TABLE } from "../../utils/constants";
import { autoSizeGrid } from "../../utils/utilityFunctions";

interface Props {
    playerStats: Array<PlayerStatSheet>;
}

export class PlayerStatSheetForTeam extends React.Component<Props, {}> {

    render = (): React.ReactNode => {
        return (
            <div
                className="ag-theme-balham"
                style={{ height: '400px'}}
            >
                <AgGridReact
                    columnDefs={PLAYER_STATS_TABLE.columnDefs}
                    defaultColDef={PLAYER_STATS_TABLE.defaultColDef}
                    rowData={this.props.playerStats}
                    onGridReady={autoSizeGrid}
                >
                </AgGridReact>
            </div>
        )
    }
}