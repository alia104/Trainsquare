import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Statistics from "./Statistics";
import TopWorkshops from "./TopWorkshops";
import TotalSalesApex from "./TotalSalesApex";
import SiteVenueList from "./SiteVenueList";
import PageTitle from "./PageTitle";
import UsersTable from "./UsersTable";
import UserCards from "./UserCards";
import User from "./User";
import * as AdminDashboardServices from "../../services/adminDashboardServices";
import * as newsletterSubscriptionService from "../../services/newsletterSubscriptionService";
import venuesServ from "../../services/venueService";
import FavoriteWorkshopsAdminDashboard from "../favoriteWorkshops/FavoriteWorkshopsAdminDashboard";
import * as favoriteWorkshopService from "../../services/favoriteWorkshopService";

const _logger = debug.extend("AdminDashboard");

const AdminDashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [pageData, setPageData] = useState({
    arrayOfUsers: [],
    usersComponent: [],
  });
  const [workshopData, setWorkshopData] = useState({
    arrayOfWorkshops: [],
    workshopsComponent: [],
  });
  const [favoriteWorkshops, setFavoriteWorkshops] = useState([]);
  const [venueData, setVenueData] = useState({
    arrayofVenues: [],
    venuesComponent: [],
  });

  const pageSize = 5;

  const [pageIndex] = useState(0);

  _logger("check data", pageData);
  _logger(setPageData);
  _logger(favoriteWorkshops);

  const [userTotal, setUserTotal] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [workshopTotal, setWorkshopTotal] = useState(0);
  const [subscriberTotal, setsubscriberTotal] = useState(0);

  _logger("check data", pageData, workshopData);

  useEffect(() => {
    AdminDashboardServices.getAll(0, 30).then(onGetSuccess).catch(onGetError);
    AdminDashboardServices.getTotalSessions(0, 1)
      .then(onGetTotalSessionsSuccess)
      .catch(onGetTotalSessionsError);
    AdminDashboardServices.getTotalWorkShops(0, 9)
      .then(onGetTotalWorkshopsSuccess)
      .catch(onGetTotalWorkshopsError);
    newsletterSubscriptionService
      .getAll(0, 30)
      .then(onGetTotalSubscribersSuccess)
      .catch(onGetTotalSubscribersError);
    favoriteWorkshopService
      .getAllFavoriteWorkshops(pageIndex, pageSize)
      .then(onGetAllFavoriteWorkshopsSuccess)
      .catch(onGetAllFavoriteWorkshopsError);
    venuesServ.getAll().then(onGetVenuesSuccess).catch(onGetVenuesError);
  }, []);

  const onGetTotalSubscribersSuccess = (response) => {
    let total = response.item.totalCount;
    setsubscriberTotal(total);
  };
  const onGetTotalSubscribersError = (response) => {
    _logger(response);
  };

  const onGetTotalSessionsSuccess = (response) => {
    let total = response.data.item.totalCount;
    setSessionTotal(total);
  };
  const onGetTotalSessionsError = (response) => {
    _logger(response);
  };

  const onGetVenuesSuccess = (response) => {
    _logger(response);

    let arraywithVenues = response.data.items;

    _logger("Checking venues data", { arraywithVenues });

    setVenueData((prevState) => {
      const pd = { ...prevState };
      pd.arrayofVenues = arraywithVenues;

      pd.venuesComponent = arraywithVenues;
      return pd;
    });
  };

  const onGetVenuesError = (err) => {
    _logger(err);
  };

  const onGetTotalWorkshopsSuccess = (data) => {
    _logger(data);

    let total = data.item.totalCount;
    let arrayWithWorkshops = data.item.pagedItems;

    _logger("Checking workshop data", { arrayWithWorkshops });

    setWorkshopData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfWorkshops = arrayWithWorkshops;

      pd.workshopsComponent = arrayWithWorkshops;
      return pd;
    });

    setWorkshopTotal(total);
  };

  const onGetTotalWorkshopsError = (err) => {
    _logger(err);
  };

  const onGetSuccess = (data) => {
    _logger(data);

    let total = data.item.totalCount;
    let arrayWithUsers = data.item.pagedItems;

    _logger("Checking user data", { arrayWithUsers });

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfUsers = arrayWithUsers;

      pd.usersComponent = arrayWithUsers.map(mapUser);
      return pd;
    });

    setUserTotal(total);
  };

  const onGetError = (err) => {
    _logger("Getting", err);
  };

  const onGetAllFavoriteWorkshopsSuccess = (response) => {
    setFavoriteWorkshops(response.item.pagedItems);
  };

  const onGetAllFavoriteWorkshopsError = (response) => {
    _logger(response);
  };

  const mapUser = (aUser) => {
    return (
      <User user={aUser} key={aUser.id} onUserClicked={onDeleteRequested} />
    );
  };

  const onDeleteRequested = (myUser) => {
    _logger(myUser.id, { myUser });

    const handler = getDeleteSuccessHandler(myUser.id);

    AdminDashboardServices.deleteUser(myUser.id)
      .then(handler)
      .catch(onDeleteError);
  };

  const onDeleteError = (err) => {
    _logger("Deleting", err);
  };

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    _logger("getDeleteSuccessHandler", idToBeDeleted);

    return () => {
      _logger("onDeleteSuccess", idToBeDeleted);

      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfUsers = [...pd.arrayOfUsers];

        const idxOf = pd.arrayOfUsers.findIndex((user) => {
          let result = false;

          if (user.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          pd.arrayOfUsers.splice(idxOf, 1);
          pd.usersComponent = pd.arrayOfUsers.map(mapUser);
        }
        return pd;
      });
    };
  };

  const onToggleClicked = () => {
    setToggle((prevState) => {
      const result = !prevState;
      return result;
    });
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Admin", path: "/admin" },
          { label: "Dashboard", path: "/admin/dashboard", active: true },
        ]}
        title={"Administrator Dashboard"}
      />

      <Row>
        <Statistics
          totalUsers={userTotal}
          totalSessions={sessionTotal}
          totalWorkshops={workshopTotal}
          totalSubscribers={subscriberTotal}
        />
      </Row>
      <Row>
        <Col xl={9} lg={8}>
          <TopWorkshops workshops={workshopData.workshopsComponent} />
        </Col>
        <Col xl={3} lg={4}>
          <TotalSalesApex />
        </Col>

        <Col xl={12} sm={12}>
          <SiteVenueList venues={venueData.venuesComponent} />
        </Col>
      </Row>
      <Row>
        <Col xl={12} lg={12}>
          <FavoriteWorkshopsAdminDashboard
            favoriteWorkshop={favoriteWorkshops}
          />
        </Col>
      </Row>

      <Row>
        <Col xl={12} lg={12}>
          <Card>
            <Card.Body>
              <Row className="mb-2">
                <Col sm={5}>
                  <Link to="#" className="btn btn-danger mb-2">
                    <i className="mdi mdi-plus-circle me-2"></i> Add User
                  </Link>
                </Col>

                <Col sm={7}>
                  <div className="text-sm-end">
                    <Button variant="success" className="mb-2 me-1">
                      <i className="mdi mdi-cog-outline"></i>
                    </Button>

                    <Button
                      onClick={onToggleClicked}
                      variant="light"
                      className="mb-2 me-1"
                    >
                      {toggle ? "Table" : "Cards"}
                    </Button>
                  </div>
                </Col>
              </Row>

              <div>
                {toggle ? (
                  <UserCards
                    users={pageData.arrayOfUsers}
                    onDeleteRequested={onDeleteRequested}
                  />
                ) : (
                  <UsersTable
                    users={pageData.arrayOfUsers}
                    onDeleteRequested={onDeleteRequested}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AdminDashboard;
