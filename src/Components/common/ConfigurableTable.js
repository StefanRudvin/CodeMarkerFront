import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ConfigurableTable extends React.Component {

    deleteItem (id) {
        axios.delete(this.props.link + '/' + id)
            .then((response) => {
                console.log('Item ' + id + 'deleted via ConfigurableTable')
            })
            .then((json) => {
            })
    }
    render () {
        const tableStyle = {
            textAlign: 'left',
        }
        return (
            <div>
                <Table responsive style={tableStyle} striped hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>{this.props.tableHeader}</th>
                        <th>{this.props.tableDescription}</th>
                        {this.props.showDelete ? (
                        <th>Delete</th>
                        ):null}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td><Link to={this.props.link + '/' + item.id}>{item.name}</Link></td>
                            <td>{item.description}</td>
                            {this.props.showDelete ? (
                                <button>Delete</button>
                            ):null}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ConfigurableTable