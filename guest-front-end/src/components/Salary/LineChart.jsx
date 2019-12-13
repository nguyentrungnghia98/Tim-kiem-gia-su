import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';
import {converCurrency} from '../../utils/pipe';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Thu nhập theo ngày"
			},
			axisY: {
				includeZero: true,
				suffix: "đ"
			},
			axisX:{      
        valueFormatString: "DD-MMM" ,
        labelAngle: -50
      },
			data: [{
				type: "line",
        toolTipContent: "Ngày: {x}: {y}đ",  
        dataPoints: [
          { x: new Date(2019,12, 0), y: 100000 },
          { x: new Date(2019,12, 1), y: 0 },
          { x: new Date(2019,12, 2), y: 0 },
          { x: new Date(2019,12, 3), y: 0 },
          { x: new Date(2019,12, 4), y: 1000000 },
          { x: new Date(2019,12, 5), y: 50000 },
          { x: new Date(2019,12, 6), y: 0 },
          { x: new Date(2019,12, 7), y: 0 },
          { x: new Date(2019,12, 8), y: 0 },
          { x: new Date(2019,12, 9), y: 500000 },
          { x: new Date(2019,12, 10), y: 0 },
          { x: new Date(2019,12, 11), y: 100000 },
          { x: new Date(2019,12, 12), y: 50000 },
          { x: new Date(2019,12, 13), y: 0 },
          { x: new Date(2019,12, 14), y: 0 },
          { x: new Date(2019,12, 15), y:0 },
          { x: new Date(2019,12, 16), y:0 },
          { x: new Date(2019,12, 17), y:90000 }
        ]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default LineChart;    