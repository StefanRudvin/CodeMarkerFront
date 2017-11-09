import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class ConfigurableTable extends React.Component {

  render() {
    const tableStyle = {
      textAlign: "left",
    }
    return (
      <div>
        <Table responsive style={tableStyle}>
          <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Course Description</th>
          </tr>
          </thead>
          <tbody>
          {this.props.items.map(item => (
            <tr>
              <td>{item.id}</td>
              <td><Link to={this.props.link + "/" + item.id}>{item.name}</Link></td>
              <td>{item.code}</td>
              <td>{item.description}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ConfigurableTable;