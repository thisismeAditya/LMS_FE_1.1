import React, { useContext } from "react";
import ManageIssues from "./ManageIssues/ManageIssues";
import {AdminContext} from "./AdminContext";
import ManageBooks from "./ManageBooks/ManageBooks";
import ManageMembers from "./ManageMembers/ManageMembers";
import ManageRecommendations from "./ManageRecommendations/ManageRecommendations";
import ManageRequestForIssues from "./ManageRequestForIssues/ManageRequestForIssues";
import { BrowserRouter as Router, Route, Switch, Link , useHistory, Redirect} from "react-router-dom";
import axios from "axios";


function AdminDashboard(){
    
    const [admin,setAdmin]=useContext(AdminContext);
    const history = useHistory();

    const updatePenalty= () => {
        axios.put('http://localhost:8080/admin/updateAllPenalties')
        .then( response => {
            if(response.data===true){
                alert('All penalties updated successfully !');
            }
            }).catch( (err) =>{
                alert(err.response.data);
            });
    }

    return(
        <div>
            <Router>
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" onClick={ e => {
                                e.preventDefault();
                                history.push({
                                    pathname : "/adminDashboard"
                                });
                            }}><h3>LMS</h3></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link className="nav-link active" to="/adminDashboard" >Requests For Issue</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/manageIssues">Manage Issues</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/manageMembers" >Manage Members</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/manageBooks">Manage Books</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/manageRecommendations" >Manage Recommendations</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" onClick={updatePenalty} >Update Penalty</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <label className="nav-link" style={{color : "grey"}}>Hello, {admin.adminMailId}</label>
                             
                                <button className="btn btn-outline-danger" type="submit" 
                                    onClick={ e => {e.preventDefault();
                                                    history.push({
                                                    pathname : "/admin"
                                                    });
                                }}>Logout</button>
                        </form>
                        </div>
                    </div>
                </nav>
                
            </div>

            <Switch>
                <div className="container">
                <Route path="/manageIssues" exact component={ManageIssues} />
                <Route path="/adminDashboard" exact component={ManageRequestForIssues} />
                <Route path="/manageMembers" component={ManageMembers} />
                <Route path="/manageBooks" component={ManageBooks}/>
                <Route path="/manageRecommendations" component={ManageRecommendations}/>
                </div>
            </Switch>
            </Router>
        </div>

    )
}

export default AdminDashboard