import {Jumbotron, Col} from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import Routes from './../Api/routes'

import {ClimbingBoxLoader} from 'react-spinners'

class NewAssessment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessment: {},
            loading: false,
            uploading: false,
            sample_code: {},
            input_generator: {},
            modal: false,
            name: '',
            description: '',
            additional_help: '',
            course_id: '',
            assessment_url: '',
            sampleCodeUploaded: false,
            inputGeneratorUploaded: false,
            languages: {
                Python2: true,
                Python3: true,
                Ruby: true,
                C: true,
                CPlus: true,
                Java: true
            }
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAdditionalHelpChange = this.handleAdditionalHelpChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setState({course_id: this.props.match.params.id});
        this.state.course_id = this.props.match.params.id;
    }

    toggleModal() {
        if (this.state.modal) {
            this.setState({modal: false})
        } else {
            this.setState({modal: true})
        }
    }

    onSampleCodeDrop(files) {
        this.setState({sample_code: files[0]});
        this.setState({sampleCodeUploaded: true})
    }

    onInputGeneratorDrop(files) {
        this.setState({input_generator: files[0]});
        this.setState({inputGeneratorUploaded: true})
    }

    upload() {
        this.setState({modal: true});
        this.setState({loading: true});
        this.setState({uploading: true});
        let formData = new FormData();

        formData.append('resource', this.state.sample_code);
        formData.append('input_generator', this.state.input_generator);

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('additional_help', this.state.additional_help);

        formData.append('languages', this.state.languages);

        axios.post(Routes.get.assessments + this.state.course_id + '/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                    this.setState({uploading: false});
                    this.setState({assessment_url: Routes.local.assessments + response.data})
                }
            )
            .catch(function (error) {
                console.log(JSON.stringify(error.response.data))
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.upload();

        this.setState((prevState) => ({
            description: '',
            additional_help: '',
            name: '',
            sample_code: {},
            input_generator: {},
        }))
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value})
    }

    handleAdditionalHelpChange(e) {
        this.setState({additional_help: e.target.value})
    }

    togglePython2() {
        let langCopy = this.state.languages;
        langCopy.Python2 = !langCopy.Python2;
        this.setState({languages: langCopy});
    }

    togglePython3() {
        let langCopy = this.state.languages;
        langCopy.Python3 = !langCopy.Python3;
        this.setState({languages: langCopy});
    }

    toggleJava() {
        let langCopy = this.state.languages;
        langCopy.Java = !langCopy.Java;
        this.setState({languages: langCopy});
    }

    toggleRuby() {
        let langCopy = this.state.languages;
        langCopy.Ruby = !langCopy.Ruby;
        this.setState({languages: langCopy});
    }

    toggleC() {
        let langCopy = this.state.languages;
        langCopy.C = !langCopy.C;
        this.setState({languages: langCopy});
    }

    toggleCPlus() {
        let langCopy = this.state.languages;
        langCopy.CPlus = !langCopy.CPlus;
        this.setState({languages: langCopy});
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Create New Assessment</h1>
                </Jumbotron>

                <div className="modal">
                    <div className="modal-background"/>
                    <div className="modal-content">
                    </div>
                    <button className="modal-close is-large" aria-label="close"/>
                </div>

                <div className="new-assessment">
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                onChange={this.handleNameChange}
                                value={this.state.name}
                                type="text"
                                placeholder="Assessment Name"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}
                                placeholder="Assessment Description">
                            </textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={this.handleAdditionalHelpChange}
                                value={this.state.additional_help}
                                placeholder="Assessment Additional Information">
                            </textarea>
                        </div>
                    </div>

                    <Col sm={4}>
                        <h1>Choose Available Languages</h1>
                        <br/>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>
                                    <input
                                        name="Python2"
                                        type="checkbox"
                                        checked={this.state.languages.Python2}
                                        onChange={this.togglePython2.bind(this)}/>
                                </th>
                                <th>
                                    Python2
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        name="Python3"
                                        type="checkbox"
                                        checked={this.state.languages.Python3}
                                        onChange={this.togglePython3.bind(this)}/>
                                </th>
                                <th>
                                    Python3
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        name="Java"
                                        type="checkbox"
                                        checked={this.state.languages.Java}
                                        onChange={this.toggleJava.bind(this)}/>
                                </th>
                                <th>
                                    Java
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        name="Ruby"
                                        type="checkbox"
                                        checked={this.state.languages.Ruby}
                                        onChange={this.toggleRuby.bind(this)}/>
                                </th>
                                <th>
                                    Ruby
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        name="C"
                                        type="checkbox"
                                        checked={this.state.languages.C}
                                        onChange={this.toggleC.bind(this)}/>
                                </th>
                                <th>
                                    C
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        name="C++"
                                        type="checkbox"
                                        checked={this.state.languages.CPlus}
                                        onChange={this.toggleCPlus.bind(this)}/>
                                </th>
                                <th>
                                    C++
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </Col>

                    <Col sm={4}>
                        <div className="content">
                            <div className="dropzone">
                                <Dropzone onDrop={this.onSampleCodeDrop.bind(this)}>
                                    {this.state.sampleCodeUploaded ? (
                                        <h2>{this.state.sample_code.name}</h2>
                                    ) : <h2>Upload Sample Code</h2>}
                                </Dropzone>
                            </div>
                        </div>
                    </Col>

                    <Col sm={4}>
                        <div className="content">
                            <div className="dropzone">
                                <Dropzone onDrop={this.onInputGeneratorDrop.bind(this)}>
                                    {this.state.inputGeneratorUploaded ? (
                                        <h2>{this.state.input_generator.name}</h2>
                                    ) : <h2>Upload input generator file</h2>}
                                </Dropzone>
                            </div>
                        </div>
                    </Col>
                    <br/>
                    <div className="button" onClick={this.handleSubmit}>
                        Submit
                    </div>
                </div>

                <div className={'modal ' + (this.state.modal ? 'is-active' : '')}>
                    <div className="modal-background"/>
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">Report</p>
                            <button className="delete" onClick={this.toggleModal.bind(this)}
                                    aria-label="close"/>
                        </header>

                        <section className="modal-card-body">
                            {this.props.uploading ? (
                                <h2>Uploading...</h2>
                            ) : null}
                            {this.props.loading ? (
                                <h2>Loading...</h2>
                            ) : null}
                            {!this.props.loading ? (
                                <div><h1>Assessment created</h1><br/><a className="bd-tw-button button"
                                                                        href={this.state.assessment_url}>
                                        <span>
                                        Open Assessment
                                        </span>
                                </a></div>
                            ) : null}
                            {this.props.loading ? (
                                <ClimbingBoxLoader
                                    loading={this.state.loading}
                                />
                            ) : null}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.toggleModal.bind(this)}>Close</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewAssessment