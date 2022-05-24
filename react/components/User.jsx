import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Dropdown, Button, Col, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classNames from "classnames";
import PropTypes from "prop-types";
import userProfileSchema from "../../schema/userDashBoardSchema";
import * as userDashBoardService from "../../services/userDashBoardServices";
import toastr from "../../utils/toastr";

const _logger = debug.extend("User");

function User(props) {
  _logger(props);
  const navigate = useNavigate();
  const aUser = props.user || {};
  const status = aUser.status.name;
  const dateCreatedConvert = new Date(aUser.dateCreated).toLocaleString();
  const dateModifiedConvert = new Date(aUser.dateModified).toLocaleString();
  const dateMessagedConvert = new Date(aUser.dateModified).toDateString();

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    avatarUrl: "",
  });
  const [editUserProfile, setEditUserProfile] = useState({
    id: aUser.id,
    data: {
      editFirstName: "",
      editLastName: "",
      editMiddleName: "",
      editAvatarUrl: "",
    },
  });

  const [editModalProfile, setModalEditProfile] = useState(false);
  const handleEditProfileClose = () => {
    setModalEditProfile(false);
  };

  const handleEditProfileShow = () => {
    setEditUserProfile({
      id: aUser.id,
      data: {
        editFirstName: userProfile.firstName,
        editLastName: userProfile.lastName,
        editMiddleName: userProfile.middleName,
        editAvatarUrl: userProfile.avatarUrl,
      },
    });
    setModalEditProfile(true);
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    if (aUser.id) {
      userDashBoardService
        .getUserProfile(aUser.id)
        .then(onGetUserProfileSuccess)
        .catch(onGetUserProfileError);
    }
  };

  const onGetUserProfileSuccess = (response) => {
    _logger(response);
    const { firstName, middleName, lastName, avatarUrl } = response.data.item;

    setUserProfile({ firstName, middleName, lastName, avatarUrl });
  };
  const onGetUserProfileError = () => {};

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setEditUserProfile((prevState) => {
      const newUserObj = { ...prevState };
      newUserObj.data[name] = value;
      return newUserObj;
    });
  };

  const onUpdateClicked = (e) => {
    _logger(e);
    e.preventDefault();
    userDashBoardService
      .updateUserProfile({
        id: aUser.id,
        data: {
          firstName: aUser.data.editFirstName,
          lastName: aUser.data.editLastName,
          middleName: aUser.data.editMiddleName,
          avatarUrl: aUser.data.editAvatarUrl,
        },
      })
      .then(onUpdateUserProfileSuccess)
      .catch(onUpdateUserProfileError);
  };

  const onUpdateUserProfileSuccess = () => {
    setModalEditProfile(false);
    getUserProfile();
    toastr.success("Your Profile has been updated");
  };
  const onUpdateUserProfileError = () => {
    toastr.error("Oops something is wrong");
  };

  const StatusColumn = (status) => {
    return (
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
    );
  };

  _logger(props);
  return (
    <Col key={aUser} xxl={{ span: 3, order: 2 }} xl={{ span: 6, order: 1 }}>
      <Card>
        <Card.Body>
          <Dropdown className="float-end" align="end">
            <Dropdown.Toggle
              variant="link"
              className="arrow-none card-drop p-0 shadow-none"
            >
              <i className="mdi mdi-dots-horizontal"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEditProfileShow}>
                Edit User Info
              </Dropdown.Item>
              <Dropdown.Item onClick={aUser.onDeleteClicked} id={aUser.id}>
                Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="mt-3 text-center">
            <img
              src={aUser.avatarUrl}
              alt="avatar"
              className="img-thumbnail avatar-lg rounded-circle"
            />
            <h4>{aUser.name}</h4>
            <Button
              onClick={() => {
                navigate(`/chat`);
              }}
              className="btn-sm mt-1"
              color="primary"
            >
              <i className="mdi mdi-message-outline me-1"></i>Send Message
            </Button>
            <p className="text-muted mt-2 font-14">
              Last Interacted: <strong>{dateMessagedConvert}</strong>
            </p>
          </div>
          <Modal
            show={editModalProfile}
            onHide={handleEditProfileClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                enableReinitialize={true}
                initialValues={editUserProfile}
                validationSchema={userProfileSchema}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="editFirstName">First Name</label>
                    <Field
                      className="form-control mb-3"
                      type="text"
                      name="editFirstName"
                      value={editUserProfile.data.editFirstName}
                      onChange={onFormChange}
                    ></Field>
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editLastName">Last Name</label>
                    <Field
                      className="form-control mb-3"
                      type="text"
                      name="editLastName"
                      value={editUserProfile.data.editLastName}
                      onChange={onFormChange}
                    ></Field>
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editMiddleName">Middle Name</label>
                    <Field
                      className="form-control mb-3"
                      type="text"
                      name="editMiddleName"
                      value={editUserProfile.data.editMiddleName}
                      onChange={onFormChange}
                    ></Field>
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editAvatarUrl">Avatar Url</label>
                    <Field
                      className="form-control mb-3"
                      type="text"
                      name="editAvatarUrl"
                      value={editUserProfile.data.editAvatarUrl}
                      onChange={onFormChange}
                    ></Field>
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="has-error"
                    />
                  </div>
                </Form>
              </Formik>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditProfileClose}>
                Close
              </Button>
              <Button variant="primary" onClick={onUpdateClicked}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="mt-3">
            <hr className="" />

            <p className="mt-4 mb-1">
              <strong>
                <i className="mdi mdi-card-account-details-outline"></i> Name:
              </strong>
            </p>
            <p>{aUser.firstName}</p>

            <p className="mt-3 mb-1">
              <strong>
                <i className="mdi mdi-email-box"></i> Email:
              </strong>
            </p>
            <p>{aUser.email}</p>

            <p className="mt-3 mb-1">
              <strong>
                <i className="mdi mdi-badge-account-outline"></i> Roles:
              </strong>
            </p>
            <p>{aUser.roles}</p>

            <p className="mt-3 mb-1">
              <strong>
                <i className="mdi mdi-account-plus"></i> Date Created:
              </strong>
            </p>
            <p>{dateCreatedConvert}</p>

            <p className="mt-3 mb-1">
              <strong>
                <i className="mdi mdi-account-wrench"></i> Last Modified:
              </strong>
            </p>
            <p>{dateModifiedConvert}</p>

            <p className="mt-3 mb-2">
              <strong>
                <i className="mdi mdi-list-status"></i> Status:
              </strong>
            </p>
            <p>{StatusColumn(status)}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

User.propTypes = {
  user: PropTypes.shape({}),
};

export default React.memo(User);
