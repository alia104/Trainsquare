import React from "react";
import { Card, Table } from "react-bootstrap";
import PropTypes from "prop-types";

const _logger = debug.extend("TopWorkshops");

function TopWorkshops(props) {
  const workshops = props.workshops || [];

  _logger(props);
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-2 mb-3">Workshops</h4>

        <Table hover responsive className="mb-0">
          <tbody>
            {(workshops || []).map((workshop, i) => {
              const dateStartConvert = new Date(
                workshop.dateCreated
              ).toDateString();
              const dateEndConvert = new Date(workshop.dateEnd).toDateString();
              return (
                <tr key={i}>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">{workshop.name}</h5>
                  </td>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">
                      {dateStartConvert}
                    </h5>
                    <span className="text-muted font-13">Start Date</span>
                  </td>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">{dateEndConvert}</h5>
                    <span className="text-muted font-13">End Date</span>
                  </td>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">Free</h5>
                    <span className="text-muted font-13">Price</span>
                  </td>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">
                      {workshop.numberOfSessions}
                    </h5>
                    <span className="text-muted font-13">Sessions</span>
                  </td>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">
                      {workshop.workShopStatus}
                    </h5>
                    <span className="text-muted font-13">Status</span>
                  </td>
                  <td>
                    <h5 className="font-14 my-1 fw-normal">
                      {workshop.host.firstName}
                    </h5>
                    <span className="text-muted font-13">Host</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

TopWorkshops.propTypes = {
  workshops: PropTypes.arrayOf(
    PropTypes.shape({
      dateCreated: PropTypes.string.isRequired,
      dateEnd: PropTypes.string,
      dateModified: PropTypes.string,
      dateStart: PropTypes.string.isRequired,
      externalSiteUrl: PropTypes.string,
      host: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      isFree: PropTypes.bool,
      languageId: PropTypes.number,
      name: PropTypes.string.isRequired,
      numberOfSessions: PropTypes.number,
      shortDescription: PropTypes.string,
      summary: PropTypes.string,
      venueId: PropTypes.number,
      workShopStatus: PropTypes.string.isRequired,
      workShopType: PropTypes.string,
    })
  ),
};

export default TopWorkshops;
