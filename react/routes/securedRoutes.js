const AdminDashboard = lazy(() =>
  import("../components/admin/AdminDashboardPage")
);

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard",
        name: "AdminDashboard",
        element: AdminDashboard,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
      },
      {
        path: "/dashboard/analytics",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

export default dashboardRoutes;
