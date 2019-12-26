import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  DatePicker
} from "shards-react";
import * as moment from "moment";

import Chart from "../../utils/chart";

import { fetchIncome } from "../../actions/actionStatic";

const ChartOverview = props => {
  const canvasRef = React.createRef();

  const [fromDate, setFromDate] = useState(
    moment()
      .startOf("isoweek")
      .format()
  );
  const [toDate, setToDate] = useState(moment().format());
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [valueSelect, setValueSelect] = useState("week");
  const [numOfValue, setNumOfValue] = useState(0);

  const { data, fetchIncome } = props;
  const token = localStorage.getItem("token");

  const getDate = date => {
    if (date === "day") {
      setFromDate(
        moment()
          .startOf("date")
          .format()
      );
      setToDate(moment().format());
    }
    if (date === "week") {
      setFromDate(
        moment()
          .startOf("isoweek")
          .format()
      );
      setToDate(moment().format());
    }
    if (date === "month") {
      setFromDate(
        moment()
          .startOf("month")
          .format()
      );
      setToDate(moment().format());
    }
    if (date === "year") {
      setFromDate(
        moment()
          .startOf("year")
          .format()
      );
      setToDate(moment().format());
    }
  };

  async function reload() {
    try {
      await fetchIncome(token, fromDate, toDate);

      const count = moment(toDate).diff(fromDate, "days") + 1;
      setNumOfValue(count);

      const listDates = [];
      for (let i = 0; i < count; i++) {
        const date = moment(fromDate)
          .add(i, "days")
          .format("DD/MM/YYYY");
        listDates.push(date);
      }

      setDates(listDates);
    } catch (error) {
      console.log(error);
    }
  }

  function getValues() {
    const listValues = Array(numOfValue).fill(0);
    let sum = 0;
    if (data !== []) {
      data.forEach(({ x, y }) => {
        var pos = moment(x, "DD/MM/YYYY").diff(fromDate, "days");
        listValues.splice(pos, 1, y);
        sum += y;
      });

      setTotal(sum);
    }

    setCounts(listValues);
  }

  useEffect(() => {
    reload();
  }, [fromDate, toDate]);

  useEffect(() => {
    getValues();
  }, [data, numOfValue]);

  useEffect(() => {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 120,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using VND for thousands.
                  return tick.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND"
                  });
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...props.chartOptions
    };

    const chartDataTest = {
      labels: dates,
      datasets: [
        {
          label: "Doanh thu",
          fill: "start",
          data: counts,
          backgroundColor: "rgba(0,123,255,0.1)",
          borderColor: "rgba(0,123,255,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(0,123,255)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        }
      ]
    };

    if (window.bar !== undefined) {
      window.bar.destroy();
    }

    window.bar = new Chart(canvasRef.current, {
      type: "LineWithLine",
      data: chartDataTest,
      options: chartOptions
    });

    // // They can still be triggered on hover.
    // const buoMeta = window.bar.getDatasetMeta(0);
    // buoMeta.data[0]._model.radius = 0;
    // buoMeta.data[chartDataTest.datasets[0].data.length - 1]._model.radius = 0;

    // Render the chart.
    window.bar.update();
  });

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h3 className="m-0">
          <center>Biểu đồ doanh thu</center>
        </h3>
      </CardHeader>
      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-light">
          <Col className="d-flex mb-2 mb-sm-0">
            <label className="mr-2 mt-1">Thời gian:</label>
            <FormSelect
              size="sm"
              style={{ maxWidth: "130px" }}
              value={valueSelect}
              onChange={e => {
                getDate(e.target.value);
                setValueSelect(e.target.value);
              }}
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="year">Trong năm</option>
              <option value="custom">Tùy chỉnh</option>
            </FormSelect>
          </Col>
          <Col sm="4.5">
            <InputGroup className="d-flex my-auto date-range mr-5">
              <DatePicker
                size="sm"
                selected={new Date(fromDate)}
                value={moment(fromDate).format("DD/MM/YYYY")}
                onChange={date => {
                  setFromDate(date);
                  setValueSelect("custom");
                }}
                placeholderText="Từ ngày"
                dropdownMode="select"
                className="text-center"
              />
              <DatePicker
                size="sm"
                selected={new Date(toDate)}
                value={moment(toDate).format("DD/MM/YYYY")}
                onChange={date => {
                  setToDate(date);
                  setValueSelect("custom");
                }}
                placeholderText="Đến ngày"
                dropdownMode="select"
                className="text-center"
              />
              <InputGroupAddon type="append">
                <InputGroupText>
                  <i className="material-icons">&#xE916;</i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <canvas
          height="130"
          ref={canvasRef}
          style={{ maxWidth: "100% !important" }}
        />
      </CardBody>
      <strong className="text-center mb-3 d-flex justify-content-center">
        <h5> Tổng: </h5>{" "}
        <b>
          <h5 className="text-dark ml-2">
            {" "}
            {total.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND"
            })}
          </h5>
        </b>
      </strong>
    </Card>
  );
};

ChartOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

ChartOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Doanh thu",
        fill: "start",
        data: [
          500,
          800,
          320,
          180,
          240,
          320,
          230,
          650,
          590,
          1200,
          750,
          940,
          1420,
          1200,
          960,
          1450,
          1820,
          2800,
          2102,
          1920,
          4000,
          3202,
          3140,
          2800,
          3200,
          3200,
          3400,
          2910,
          3100,
          4250
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      }
      //   {
      //     label: "Past Month",
      //     fill: "start",
      //     data: [
      //       380,
      //       430,
      //       120,
      //       230,
      //       410,
      //       740,
      //       472,
      //       219,
      //       391,
      //       229,
      //       400,
      //       203,
      //       301,
      //       380,
      //       291,
      //       620,
      //       700,
      //       300,
      //       630,
      //       402,
      //       320,
      //       380,
      //       289,
      //       410,
      //       300,
      //       530,
      //       630,
      //       720,
      //       780,
      //       1200
      //     ],
      //     backgroundColor: "rgba(255,65,105,0.1)",
      //     borderColor: "rgba(255,65,105,1)",
      //     pointBackgroundColor: "#ffffff",
      //     pointHoverBackgroundColor: "rgba(255,65,105,1)",
      //     borderDash: [3, 3],
      //     borderWidth: 1,
      //     pointRadius: 0,
      //     pointHoverRadius: 2,
      //     pointBorderColor: "rgba(255,65,105,1)"
      //   }
    ]
  }
};

const mapStateToProps = state => {
  return {
    message: state.staticReducer.message,
    data: state.staticReducer.data,
    isFetching: state.staticReducer.isFetching
  };
};

export default connect(mapStateToProps, { fetchIncome })(ChartOverview);
