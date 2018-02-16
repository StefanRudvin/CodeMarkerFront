import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Routes from './../../Api/routes'

class ConfigurableTable extends React.Component {

    deleteItem (item) {
        axios.delete(Routes.courses + item.id + '/')
            .then((response) => {
                window.location.reload()
                this.coursesChanged()
            })
    }
    coursesChanged() {

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
                        {this.props.showEdit ? (
                            <th>Edit</th>
                        ):null}
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
                            {this.props.showEdit ? (
                                <td><a className="button">Edit</a></td>
                            ):null}
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