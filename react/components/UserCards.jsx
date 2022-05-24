import React from "react";
import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import User from "./User";

const _logger = debug.extend("UserCards");

const UserCards = (props) => {
  const users = props.users || {};

  const mapUser = (aUser) => {
    _logger(aUser);

    return (
      <User
        user={aUser}
        key={aUser.id}
        onDeleteClicked={props.onDeleteRequested}
      ></User>
    );
  };

  _logger(props);
  return (
    <>
      <Container fluid="true">
        <Row xxl={4} sm={4}>
          {users.map(mapUser)}
        </Row>
      </Container>
    </>
  );
};

UserCards.propTypes = {
  onDeleteRequested: PropTypes.func,

  users:
    PropTypes.arrayOf(PropTypes.object) ||
    PropTypes.shape({
      avatarUrl: PropTypes.string,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string,
      role: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
      ),
      status: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    }),
};

export default UserCards;
