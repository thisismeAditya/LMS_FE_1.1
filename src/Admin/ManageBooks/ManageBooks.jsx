import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import AddBook from "./AddBook";
import SearchBook from "./SearchBook";
import ViewAllBooks from "./ViewAllBooks";

function ManageBooks(){

    const [activeTab, setActiveTab] = useState('1');
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div>
            <h3 className="m-3 text-center">Manage Books</h3><br/>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Add a New Book
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Search Book
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
                View All Books
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              
                  <AddBook/>
                
            </TabPane>
            <TabPane tabId="2">
              
                  <SearchBook/>

            </TabPane>
            <TabPane tabId="3">
              
                  <ViewAllBooks/>

            </TabPane>
          </TabContent>
        </div>
      );
}

export default ManageBooks