import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import classnames from "classnames";

export default class FormTabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      console.log(tab);
      this.setState({
        activeTab: tab
      });
      if (tab === "2") {
        this.props.refreshStudents();
      }
    }
  }
  render() {
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Mentors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Students
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent
          activeTab={this.state.activeTab}
          style={{
            borderLeft: "1px dotted #d8d8d8",
            borderRight: "1px dotted #d8d8d8",
            borderTop: "1px dotted #d8d8d8"
          }}
        >
          <TabPane tabId="1">
            {this.props.mentorScreen}
            {/* <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
            */}
          </TabPane>
          <TabPane tabId="2">{this.props.studentScreen}</TabPane>
        </TabContent>
      </Container>
    );
  }
}

{
  /* 
<TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row> 
          </TabPane> */
}
