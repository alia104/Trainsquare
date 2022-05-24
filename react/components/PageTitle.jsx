import React from "react";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import PropTypes from "prop-types";

const _logger = debug.extend("PageTitle");

const PageTitle = (props) => {
  _logger(props);
  return (
    <Row>
      <Col>
        <div className="page-title-box">
          <div className="page-title-right">
            <Breadcrumb listProps={{ className: "m-0" }}>
              <Breadcrumb.Item href="/">TrainSquare</Breadcrumb.Item>

              {props.breadCrumbItems.map((item, index) => {
                return item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={index} href={item.path}>
                    {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          <h4 className="page-title">{props.title}</h4>
        </div>
      </Col>
    </Row>
  );
};

PageTitle.propTypes = {
  breadCrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

export default PageTitle;
