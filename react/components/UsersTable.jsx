import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import classNames from "classnames";
import Table from "./Table";
import PropTypes from "prop-types";

const _logger = debug.extend("UsersTable");

function UsersTable(props) {
  const UserColumn = ({ row }) => {
    return (
      <>
        <img
          src={row.original.avatarUrl}
          alt={row.original.lastName}
          title={row.original.lastName}
          className="rounded me-3"
          height="48"
        />
        <p className="m-0 d-inline-block align-middle font-16">
          <Link to="#" className="text-body">
            {row.original.firstName}
          </Link>
          <br />
        </p>
      </>
    );
  };

  const StatusColumn = ({ row }) => {
    const status = row.original.status.name || [];
    return (
      <>
        <span
          className={classNames("badge", {
            "bg-success": status === "Active" ? true : false,
            "bg-danger": status === "Inactive" ? true : false,
            "bg-warning": status === "Flagged" ? true : false,
            "bg-dark": status === "Removed" ? true : false,
            "bg-info": status === "Pending" ? true : false,
          })}
        >
          {status === "Active"
            ? "Active"
            : status === "Inactive"
            ? "Inactive"
            : status === "Flagged"
            ? "Flagged"
            : status === "Removed"
            ? "Removed"
            : "Pending"}
        </span>
      </>
    );
  };

  const ActionColumn = ({ row }) => {
    return (
      <React.Fragment>
        <>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Update</Tooltip>}
          >
            <Link
              to={{
                pathname: `#`,
                search: `${row.original.id}`,
                state: `${row.original.id}`,
                key: `${row.original.id}`,
              }}
              className="action-icon"
            >
              {" "}
              <i className="mdi mdi-square-edit-outline"></i>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Delete</Tooltip>}
          >
            <Link to="#" className="action-icon">
              {""}
              <i
                className="mdi mdi-delete"
                onClick={() => props.onDeleteRequested(row)}
              ></i>
            </Link>
          </OverlayTrigger>
        </>
      </React.Fragment>
    );
  };

  const columns = [
    {
      Header: "Id",
      accessor: "id",
      sort: true,
    },
    {
      Header: "User",
      accessor: "firstName",
      sort: true,
      Cell: UserColumn,
    },
    {
      Header: "Email address",
      accessor: "email",
      sort: false,
    },
    {
      Header: "Role",
      accessor: "roles",
      sort: true,
    },

    {
      Header: "Status",
      accessor: "status",
      sort: true,
      Cell: StatusColumn,
    },
    {
      Header: "Action",
      accessor: "action",
      sort: false,
      classes: "table-action",
      Cell: ActionColumn,
    },
  ];

  const sizePerPageList = [
    {
      text: "5",
      value: 5,
    },
    {
      text: "10",
      value: 10,
    },
    {
      text: "20",
      value: 20,
    },
    {
      text: "All",
      value: props.users.length,
    },
  ];

  _logger(props);

  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                data={props.users}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                isSearchable={true}
                theadClass="table-light"
                searchBoxClass="mb-2"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

UsersTable.propTypes = {
  onDeleteRequested: PropTypes.func,

  users: PropTypes.arrayOf(
    PropTypes.shape({
      avatarUrl: PropTypes.string,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string,
      role: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
      status: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    })
  ),
  row:
    PropTypes.shape({}) ||
    PropTypes.shape({
      original: PropTypes.shape({
        avatarUrl: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        status: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
        id: PropTypes.number,
      }),
    }),
};

export default UsersTable;
