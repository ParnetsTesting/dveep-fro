import logo from "./logo.svg";
import "./App.css";
import Header from "./Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
// import WhyChooseUs from './Component/WhyChooseUs';
import Home from "./Component/Home";
import { Routes, Route } from "react-router-dom";
import Aboutus from "./Component/Aboutus";
import Gallery from "./Component/Gallery";
import Contactus from "./Component/Contactus";
import Projects from "./Component/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Footer from "./Component/Footer";
import ProjectOverview from "./Component/ProjectOverview";
import Main from "./Component/Admin/Main";
import AdminSlider from "./Component/Admin/AdminSlider";
import AdminServices from "./Component/Admin/AdminServices";
import AdminProjects from "./Component/Admin/AdminProjects";
import WhatsAppButton from "./Component/WhatsAppButton";
import AdminWelcomeNote from "./Component/Admin/AdminWelcomeNote";
import AdminWhyus from "./Component/Admin/AdminWhyus";
import AdminWhatOurClientSays from "./Component/Admin/AdminWhatOurClientSays";
import AdminFaq from "./Component/Admin/AdminFaq";
import AdminAboutBanner from "./Component/Admin/AdminAboutBanner";
import AdminAboutMissionVisson from "./Component/Admin/AdminAboutMissionVisson";
import AdminGalleryBanner from "./Component/Admin/AdminGalleryBanner";
import AdminGalleryImage from "./Component/Admin/AdminGalleryImage";
import AdminGalleryVideo from "./Component/Admin/AdminGalleryVideo";
import AdminContactBanner from "./Component/Admin/AdminContactBanner";
import AdminContactUs from "./Component/Admin/AdminContactUs";
import AdminProjectOverview from "./Component/Admin/AdminProjectOverview";
import AdminFeaturesAndAminities from "./Component/Admin/AdminFeaturesAndAminities";
import AdminPropertyOverview from "./Component/Admin/AdminPropertyOverview";
import AdminGetInTouch from "./Component/Admin/AdminGetInTouch";
import ReactSlickerComponent from "./Component/ReactSlickerComponent";
import ScrollToTop from "./Component/ScrollToTop";
import OnGoingProject from "./Component/OnGoingProject";
import UpcomingProject from "./Component/UpcomingProject";
import AdminOnGoingProjectBanner from "./Component/Admin/AdminOnGoingProjectBanner";
import AdminUpComingProjectBanner from "./Component/Admin/AdminUpComingProjectBanner";
import AdminDownloadBrochure from "./Component/Admin/AdminDownloadBrochure";
import SignUp from "./Component/Admin/SignUp";
import Login from "./Component/Admin/Login";
import AdminScheduleVisit from "./Component/Admin/AdminScheduleVisit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              <Header />
              <Aboutus />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
        {/* <Route
          path="/gallery"
          element={
            <>
              <Header />
              <Gallery />
              <Footer />
              <WhatsAppButton />
            </>
          }
        /> */}
        <Route
          path="/ongoing_project"
          element={
            <>
              <Header />
              <OnGoingProject />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
        <Route
          path="/upcoming_project"
          element={
            <>
              <Header />
              <UpcomingProject />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              <Header />
              <Contactus />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Header />
              <Projects />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
        <Route
          path="/projectoverview"
          element={
            <>
              <Header />
              <ScrollToTop />
              <ReactSlickerComponent />
              <ProjectOverview />
              <Footer />
              <WhatsAppButton />
            </>
          }
        />

        <Route
          path="/admin_slider"
          element={
            <Main
              children={
                <>
                  <AdminSlider />
                </>
              }
            />
          }
        />

        <Route
          path="/admin_Welcome"
          element={
            <Main
              children={
                <>
                  <AdminWelcomeNote />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_Services"
          element={
            <Main
              children={
                <>
                  <AdminServices />
                </>
              }
            />
          }
        />
        {/* <Route
          path="/admin_Projects"
          element={
            <Main
              children={
                <>
                  <AdminProjects />
                </>
              }
            />
          }
        /> */}
        {/* <Route
          path="/admin_Upcoming_project"
          element={
            <Main
              children={
                <>
                  <AdminUpcomingProject />
                </>
              }
            />
          }
        /> */}

        <Route
          path="/admin_why_us"
          element={
            <Main
              children={
                <>
                  <AdminWhyus />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_what_our_client_says"
          element={
            <Main
              children={
                <>
                  <AdminWhatOurClientSays />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_Faq"
          element={
            <Main
              children={
                <>
                  <AdminFaq />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_aboutbanner"
          element={
            <Main
              children={
                <>
                  <AdminAboutBanner />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_about_vision_mision"
          element={
            <Main
              children={
                <>
                  <AdminAboutMissionVisson />
                </>
              }
            />
          }
        />
        <Route
          path="/Admin_about_get_in_touch"
          element={
            <Main
              children={
                <>
                  <AdminGetInTouch />
                </>
              }
            />
          }
        />
        <Route
          path="/ongoing_project_banner"
          element={
            <Main
              children={
                <>
                  <AdminOnGoingProjectBanner />
                </>
              }
            />
          }
        />
        <Route
          path="/upcoming_project_banner"
          element={
            <Main
              children={
                <>
                  <AdminUpComingProjectBanner />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_gallery_image"
          element={
            <Main
              children={
                <>
                  <AdminGalleryImage />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_gallery_video"
          element={
            <Main
              children={
                <>
                  <AdminGalleryVideo />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_contact_banner"
          element={
            <Main
              children={
                <>
                  <AdminContactBanner />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_contact_us"
          element={
            <Main
              children={
                <>
                  <AdminContactUs />
                </>
              }
            />
          }
        />

        <Route
          path="/admin_contact_us"
          element={
            <Main
              children={
                <>
                  <AdminContactUs />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_Schedule_Visit"
          element={
            <Main
              children={
                <>
                  <AdminScheduleVisit />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_project_overview"
          element={
            <Main
              children={
                <>
                  <AdminProjectOverview />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_Features_aminities"
          element={
            <Main
              children={
                <>
                  <AdminFeaturesAndAminities />
                </>
              }
            />
          }
        />
        <Route
          path="/admin_Property_Overview"
          element={
            <Main
              children={
                <>
                  <AdminPropertyOverview />
                </>
              }
            />
          }
        />

        <Route
          path="/download_Brochure"
          element={
            <Main
              children={
                <>
                  <AdminDownloadBrochure />
                </>
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
