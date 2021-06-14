import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "./Admin/AdminLogin";
import LandingPage from "./LandingPage/LandingPage";
import MemberLandingPage from "./Member/MemberLandingPage";
import MemberLogin from "./Member/MemberLogin";
import RequestBook from "./Member/RequestBook";
import SearchBookBy from "./Member/SearchBooksPage";
import ViewIssuesByMember from "./Member/ViewIssuesByMember";
import AdminDashboard from "./Admin/AdminDashboard";
import {AdminProvider} from "./Admin/AdminContext";

function App(){
  
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/landingPage" component={LandingPage} />
        <Route path="/member" component={MemberLogin} />
        <Route path="/memberLandingPage" component={MemberLandingPage}/>
        <Route path="/searchBooksBy" component={SearchBookBy} />
        <Route path="/viewIssuesByMember" component={ViewIssuesByMember} />
        <Route path="/viewAndSubmitRequest" component={RequestBook} />
        <AdminProvider>
        <Route path="/admin" component={AdminLogin} />
        <Route path="/adminDashboard" component={() => <AdminDashboard /> } />
        </AdminProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;