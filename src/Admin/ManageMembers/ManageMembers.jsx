import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import AddMember from "./AddMember";
import RemoveMember from "./RemoveMember";

function ManageMembers(){

    const [activeTab, setActiveTab] = useState('1');
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div>
            <h3 className="m-3 text-center">Manage Members</h3><br/>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Add New Members
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Remove Existing Members
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              
                  <AddMember/>
                
            </TabPane>
            <TabPane tabId="2">
              
                  <RemoveMember/>

            </TabPane>
          </TabContent>
        </div>
      );
}

export default ManageMembers