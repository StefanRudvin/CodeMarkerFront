import React from 'react';
import { Table } from 'react-bootstrap';

class ConfigurableTable extends React.Component {
  render() {
    return (
      <div>
        <Table responsive>
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
              <td>{item.name}</td>
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