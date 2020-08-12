import React, { Component } from 'react'
import { VictoryPie } from "victory";

export default class ChartsClientes extends Component {
    state={
        novos: 0,
        total:0
    }


    componentDidMount(){
        setTimeout(
            this.setState({
                novos:20,
                total:50
            }),3000
        )
    }





    render() {

        
        return (
            <div>
                <VictoryPie
                data={[
                    { x: "Novos", y: this.state.novos },
                    { x: "Total", y: this.state.total }
                  ]}
                  animate={{ duration: 1000, easing: "bounce" }}
                  colorScale={["purple","navy" ]}
                  style={{ labels: { fill: "white", fontSize: 18, fontWeight: "bold" } }}
                  innerRadius={25}
                  labelRadius={({ innerRadius }) => innerRadius + 10 }
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                   />
            </div>
        )
    }
}
