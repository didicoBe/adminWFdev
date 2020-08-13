import React, { Component } from 'react'
import { VictoryChart, VictoryBar, VictoryTheme } from "victory";

export default class Meses extends Component {
    render() {
        return (
            <VictoryChart
                theme={VictoryTheme.material}
            >
                <VictoryBar
                    style={{ data: { fill: "purple" } }}
                    data={[
                        
                        { x: "Junho", y: 50 },
                        { x: "Julho", y: 20 },
                        { x: "Ago", y:35 }
                      ]}
                      alignment="start"
                      labels={({ datum }) => 'R$ '+datum.y+' mil'}
                />
            </VictoryChart>
        )
    }
}
