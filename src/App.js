import "./App.css";
import StudentDetails from "./pages/StudentDetails";
import AddEditStudent from "./pages/AddEditStudent";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Header";
import {useState} from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ManageStudent from "./pages/ManageStudent";
import Controller from "./components/Controller";
import {AuthContextProvider} from "./Context/AuthContext";

function App() {
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Controller activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="wrapper">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ManageStudent
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  }
                />
                <Route
                  path="/add"
                  element={
                    <AddEditStudent
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  }
                />
                <Route
                  path="/student/edit/:id"
                  element={
                    <AddEditStudent
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  }
                />
                <Route
                  path="/student/:id"
                  element={
                    <StudentDetails
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  }
                />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
