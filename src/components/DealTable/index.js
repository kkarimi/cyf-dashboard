import React, { Component } from "react";
import { Table, Button, Collapse } from "reactstrap";

const renderDeal = deal => {
  const { id, name, email, owner_name, stage } = deal;
  return (
    <tr key={`${name}-${id}`}>
      <th scope="row">
        <a href={`https://codeyourfuture.pipedrive.com/deal/${id}`}>{id}</a>
      </th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{owner_name}</td>
      <td>{stage}</td>
    </tr>
  );
};

const renderDeals = deals => {
  return deals
    .sort((a, b) => {
      if (a.owner_name < b.owner_name) return -1;
      if (a.owner_name > b.owner_name) return 1;
      return 0;
    })
    .map(deal => renderDeal(deal));
};

export default class MentorTable extends Component {
  state = { collapse: true, status: "Closed" };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  render() {
    const { deals } = this.props;
    const resultCount = deals.length;

    // if (resultCount < 1) return <div>Loading..</div>;
    // <h5>Current state: {this.state.status}</h5>
    return (
      <div className="panel-box">
        <Button
          outline
          color="success"
          onClick={this.toggle}
          style={{ marginBottom: "0.5rem" }}
          size="sm"
        >
          {this.state.collapse === true ? "+" : "-"}
        </Button>
        {"  "}
        <span style={{ padding: "10px" }}>
          <strong>Results.. {resultCount}</strong>
        </span>

        <Collapse isOpen={!this.state.collapse}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Stage</th>
              </tr>
            </thead>
            <tbody>{renderDeals(deals)}</tbody>
          </Table>
        </Collapse>
      </div>
    );
  }
}
