import { AgGridReact } from "ag-grid-react";
import * as React from "react";
import { GameEvent } from "../../types/types";
import { GAME_EVENTS_TABLE } from "../../utils/constants";
import { autoSizeGrid } from "../../utils/utilityFunctions";

interface Props {
    gameEvents: Array<GameEvent>;
}

export class GameEventsGrid extends React.Component<Props, {}> {

    render = (): React.ReactNode => {
        return (
            <div
                className="ag-theme-balham"
                style={{ height: '400px'}}
            >
                <AgGridReact
                    columnDefs={GAME_EVENTS_TABLE.columnDefs}
                    defaultColDef={GAME_EVENTS_TABLE.defaultColDef}
                    rowData={this.props.gameEvents}
                    onGridReady={autoSizeGrid}
                >
                </AgGridReact>
            </div>
        )
    }
}