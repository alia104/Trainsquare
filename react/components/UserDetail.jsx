import React, { useState } from "react";
import * as AdminDashboardServices from "../../services/adminDashboardServices";
import User from "./User";

const _logger = debug.extend("UserDetail");

const UserDetail = () => {
  const [idFormData, setIdFormData] = useState({
    userId: "",
    id: "",
    component: "",
  });

  const mapUser = (aUser) => {
    _logger(aUser);
    return <User user={aUser} key={aUser.id} onUserClick={onGetClick}></User>;
  };

  const onFormFieldChange = (event) => {
    _logger("onChange", { syntheticEvent: event });

    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    _logger({ newUserValue, nameOfField });

    setIdFormData((prevState) => {
      _logger("updater onChange");

      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
    _logger("end onChange");
  };

  const onGetClick = (e) => {
    e.preventDefault();

    AdminDashboardServices.getById(idFormData.id)
      .then(onSuccess)
      .catch(onError);
  };

  function onSuccess(response) {
    _logger("Get By ID", response);

    idFormData.id = response.data.item.id;
    setIdFormData((prevState) => {
      _logger("updater onChange");

      const newUserObject = {
        ...prevState,
      };

      newUserObject.component = mapUser(response.data.item);

      return newUserObject;
    });
  }

  function onError(err) {
    _logger("Get By Id", err);
  }

  return (
    <React.Fragment>
      <form>
        <label htmlFor="userId" className="form-label">
          User Id
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="id"
          name="id"
          placeholder="Please Enter ID"
          value={idFormData.id}
          onChange={onFormFieldChange}
        />
        <button type="submit" className="btn btn-primary" onClick={onGetClick}>
          Submit
        </button>
        <div>{idFormData.component}</div>
      </form>
    </React.Fragment>
  );
};

export default UserDetail;
