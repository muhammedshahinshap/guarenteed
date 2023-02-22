import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import AdminDashboard from "./Home/AdminDashboard";
import UserDashboard from "./Home/UserDashboard";
import CompanyDashboard from "./Home/CompanyDashboard";
import ChooseRole from "./Profile/ChooseRole";
import CompanyProfile from "./Profile/CompanyProfile";
import UserProfile from "./Profile/UserProfile";
import JobHire from "./Job Hire/JobHire";
import JobApply from "./JobApply/JobApply";
import Chat from "./Chat/Chat";
import Wishlist from "./WishList/WishList";
import PeopleFilter from "./PeopleFilter/PeopleFilter";
import JobApplicants from "./Jobapplicants/JobApplicants";
import Emailverify from "../components/Input/Email Verify/Emailverify";
import AdminHome from "./Home/AdminDashboard";
import AdminUserReport from "../components/Input/Admin/AdminUserReport";
import AdminJobsReport from "../components/Input/Admin/AdminJobsReport";
import PremiumPayment from "../pages/Paypal/PremiumPayment";
import PageNotFound from "../components/Input/PageNotFound/PageNotFound";
import ForgetPassword from "../components/Input/ForgetPassword/ForgetPassword";
import Verifyotp from "../components/Input/ForgetPassword/Verifyotp";
import ChangePassword from "../components/Input/ForgetPassword/ChangePassword";
import AdminPremiumPayment from "../components/Input/Admin/AdminPremiumPayment";

export const Routes = [
  {
    protected: [
      {
        company: [
          {
            path: "/",
            component: CompanyDashboard,
            role: "company",
          },
          {
            path: "/job-hire",
            component: JobHire,
            role: "company",
          },
          {
            path: "/chats",
            component: Chat,
            role: "company",
          },
          {
            path: "/company-profile/:id",
            component: CompanyProfile,
          },
          {
            path: "/people-filter",
            component: PeopleFilter,
          },
          {
            path: "/job-applications/:id",
            component: JobApplicants,
          },
          {
            path: "/upgrade-account",
            component: PremiumPayment,
          },
          {
            path: "*",
            component: PageNotFound,
          },
        ],
      },
      {
        user: [
          {
            path: "/",
            component: UserDashboard,
            role: "user",
          },
          {
            path: "/job-apply/:id",
            component: JobApply,
            role: "user",
          },
          {
            path: "/chats",
            component: Chat,
            role: "user",
          },
          {
            path: "/user-profile/:id",
            component: UserProfile,
          },
          {
            path: "/book-mark",
            component: Wishlist,
          },
          {
            path: "/job-applications",
            component: JobApplicants,
          },
          {
            path: "/upgrade-account",
            component: PremiumPayment,
          },
          {
            path: "*",
            component: PageNotFound,
          },
        ],
      },
      {
        norole: [
          {
            path: "/",
            component: ChooseRole,
          },
          {
            path: "/user-profile",
            component: UserProfile,
          },
          {
            path: "/company-profile",
            component: CompanyProfile,
          },
          {
            path: "*",
            component: PageNotFound,
          },
        ],
      },
      {
        admin: [
          {
            path: "/",
            component: AdminHome,
            role: "admin",
          },
          {
            path: "/user-report",
            component: AdminUserReport,
            role: "admin",
          },
          {
            path: "/jobs-report",
            component: AdminJobsReport,
            role: "admin",
          },
          {
            path: "*",
            component: PageNotFound,
          },
          {
            path: "/admin-payment",
            component: AdminPremiumPayment,
          },
        ],
      },
    ],
  },
  {
    public: [
      {
        common: [
          {
            path: "/",
            component: Login,
          },
          {
            path: "/signup",
            component: Signup,
          },
          {
            path: "/verify/:id",
            component: Emailverify,
          },
          {
            path: "*",
            component: PageNotFound,
          },
          {
            path: "/forget-password",
            component: ForgetPassword,
          },
          {
            path: "/verify-otp",
            component: Verifyotp,
          },
          {
            path: "/change-password",
            component: ChangePassword,
          },
        ],
      },
    ],
  },
];
