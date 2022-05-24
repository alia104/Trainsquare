import React from "react";
import { Row, Col } from "react-bootstrap";
import StatisticsWidget from "./StatisticsWidget";
import PropTypes from "prop-types";

const _logger = debug.extend("Statistics");

const Statistics = (props) => {
  _logger(props);

  return (
    <>
      <Row>
        <Col xxl={3} sm={6}>
          <StatisticsWidget
            icon="mdi mdi-account-multiple bg-white text-success"
            description="User Profiles"
            title="User Profiles"
            stats={props.totalUsers}
            trend={{
              textClass: "badge bg-primary",
              icon: "mdi mdi-arrow-up-bold",
              value: "5.27%",
              time: "Since last month",
            }}
            bgclassName="bg-success"
            textClass="text-white"
          ></StatisticsWidget>
        </Col>
        <Col xxl={3} sm={6}>
          <StatisticsWidget
            icon="mdi mdi-hammer-wrench bg-light-lighten rounded-circle text-white"
            description="Workshops"
            title="Workshops"
            stats={props.totalWorkshops}
            trend={{
              textClass: "badge bg-success",
              icon: "mdi mdi-arrow-up-bold",
              value: "22.54%",
              time: "Since last month",
            }}
            bgclassName="bg-primary"
            textClass="text-white"
          ></StatisticsWidget>
        </Col>
        <Col xxl={3} sm={6}>
          <StatisticsWidget
            icon="mdi mdi-account-group bg-light-lighten rounded-circle text-white"
            description="Subscribers"
            title="Subscribers"
            stats={props.totalSubscribers}
            trend={{
              textClass: "badge bg-success",
              icon: "mdi mdi-arrow-up-bold",
              value: "17.26%",
              time: "Since last month",
            }}
            bgclassName="bg-primary"
            textClass="text-white"
          ></StatisticsWidget>
        </Col>
        <Col xxl={3} sm={6}>
          <StatisticsWidget
            icon="mdi mdi-trending-up bg-white text-success"
            description="Sessions"
            title="Sessions"
            stats={props.totalSessions}
            trend={{
              textClass: "badge bg-primary",
              icon: "mdi mdi-arrow-up-bold",
              value: "10.78%",
              time: "Since last month",
            }}
            bgclassName="bg-success"
            textClass="text-white"
          ></StatisticsWidget>
        </Col>
      </Row>
    </>
  );
};

Statistics.propTypes = {
  totalUsers: PropTypes.number,
  totalSessions: PropTypes.number,
  totalWorkshops: PropTypes.number,
  totalSubscribers: PropTypes.number,
};
export default Statistics;
