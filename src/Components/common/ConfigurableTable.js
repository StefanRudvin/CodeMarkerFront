import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ConfigurableTable extends React.Component {

    deleteItem (item) {
        axios.delete('http://127.0.0.1:8000/api/courses/' + item.id + '/')
            .then((response) => {
                //this.props.listMethod();
            })

    }
    render () {
        return (
            <div>
                <table className="table">
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
                                <td><a className="button" onClick={() => this.deleteItem(item)}>Delete</a></td>
                            ):null}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ConfigurableTable