import React from "react";
import { Badge, Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Admin.css";

const _logger = debug.extend("SiteVenueList");

const SiteVenueList = (props) => {
  const venues = props.venues || [];
  _logger(props);
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="header-title">Venues Awaiting Approval</h4>
        </div>
        <Table responsive className="table-centered mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Website</th>
              <th scope="col">Location</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(venues || []).map((venue, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 ms-2">{venue.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex-grow-1 ms-2">{venue.description}</div>
                  </td>
                  <td>
                    <i className="mdi mdi-web"></i>
                    <span className="font-14 mt-1 fw-normal urlfix">
                      {venue.url}
                    </span>
                  </td>
                  <td>
                    <Badge>
                      <i className="mdi mdi-map-marker"></i>
                      {venue.location.city}
                    </Badge>
                  </td>

                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Approve</Tooltip>}
                    >
                      <Link to="#" className="action-icon text-success me-2">
                        <i className="mdi mdi-progress-check"></i>
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Deny</Tooltip>}
                    >
                      <Link to="#" className="action-icon text-danger">
                        <i className="mdi mdi-progress-close"></i>
                      </Link>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
SiteVenueList.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      createdBy: PropTypes.number,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      location: PropTypes.shape(),
      locationId: PropTypes.number,
      modifiedBy: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};
export default SiteVenueList;
