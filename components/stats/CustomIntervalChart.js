//make sure to let user either set custom props or take in props from a parent
//different from live data and large data 

import * as React from "react";

import Chart from "./Chart";


//Default grid line count
const gridLineCount = 10

export default class CustomIntervalChart extends React.Component {

    intervalData = () => {
        const { data } = this.props;
        const { interval } = this.props;
        const today = new Date();
        switch (interval) {
            case "day":
                let dayData = data.filter(obj => Date.parse(obj.date) >= Date.parse(today) - 86400000)
                return dayData;
            case "week":
                let weekData = data.filter(obj => Date.parse(obj.date) >= Date.parse(today) - 2628000000)
                return weekData;
            case "month":
                let monthData = data.filter(obj => Date.parse(obj.date) >= Date.parse(today) - 2678400000)
                return monthData;
            case "quarter":
                let quarterData = data.filter(obj => Date.parse(obj.date) >= Date.parse(today) - 7884000000)
                return quarterData;
            case "semi-annual":
                let semiData = data.filter(obj => Date.parse(obj.date) >= Date.parse(today) - 15768000000)
                return semiData;
            case "annual":
                let annualData = data.filter(obj => new Date(obj.date).getFullYear() >= today.getFullYear())  
                return annualData;
            case "decade":
                let decadeData = data.filter(obj => Date.parse(obj.date) >= Date.parse(today) - 315360000000)
                return decadeData;
            default:
                return data;
        }
    }

    render(){
        const { interval } = this.props;

        if(interval){                      
          return(
            <Chart
            data={this.intervalData()}
            gridLineCount={this.props.gridLineCount ? this.props.gridLineCount : gridLineCount}
            maxTicks={this.props.maxTicks}
            height={this.props.height}
            width={this.props.width}
            tickIncrement={this.props.tickIncrement}
        />
        )
        } else {
            return(
                <Chart
                data={this.props.data}
                gridLineCount={this.props.gridLineCount ? this.props.gridLineCount : gridLineCount}
                maxTicks={this.props.maxTicks}
                height={this.props.height}
                width={this.props.width}
                tickIncrement={this.props.tickIncrement}
            />
            )
        }
    }
}