/*
View for creating a new assessment.

@TeamAlpha 2018
CodeMarker
*/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron, Col, Row } from 'react-bootstrap'
import { ClimbingBoxLoader } from 'react-spinners'
import NumericInput from 'react-numeric-input'
import { toast } from 'react-toastify'
import Datetime from 'react-datetime'
import Dropzone from 'react-dropzone'
import Dropdown from 'react-dropdown'
import Routes from './../Api/routes'
import React from 'react'
import axios from 'axios'
import moment from 'moment'

class NewAssessment extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            inputGeneratorUploaded: false,
            sampleCodeUploaded: false,
            solution_language: '',
            input_generator: {},
            additional_help: '',
            assessment_url: '',
            uploading: false,
            date: new Date(),
            description: '',
            assessment: {},
            loading: false,
            sample_code: {},
            course_id: this.props.match.params.id,
            modal: false,
            name: '',
            languages: {
                Python2: true,
                Python3: true,
                Ruby: true,
                C: true,
                CPlus: true,
                Java: true
            },
            dynamicInput: false,
            staticInput: false,
            numOfStatic: 0,
            staticInputs: [{}],
            staticOutputs: [{}],
            staticInputsUploaded: [],
            staticOutputsUploaded: [],
        }

        this.handleAdditionalHelpChange = this.handleAdditionalHelpChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange (newDate) {
        this.setState({date: newDate})
    }

    toggleModal () {
        if (this.state.modal) {
            this.setState({modal: false})
            this.setState({uploading: false})
        } else {
            this.setState({modal: true})
        }
    }

    onSampleCodeDrop (files) {
        this.setState({sample_code: files[0]})
        this.setState({sampleCodeUploaded: true})
    }

    onInputGeneratorDrop (files) {
        this.setState({input_generator: files[0]})
        this.setState({inputGeneratorUploaded: true})
    }

    /*
        Upload i.e. create new assessment.
    */
    upload () {
        this.setState({modal: true})
        this.setState({loading: true})
        this.setState({uploading: true})
        let formData = new FormData()

        formData.append('resource', this.state.sample_code)
        formData.append('input_generator', this.state.input_generator)

        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('additional_help', this.state.additional_help)

        let date = moment(this.state.date).format('YYYY-MM-DD HH:mm')

        formData.append('deadline', date)

        formData.append('selected_language', this.state.solution_language)

        let choices = []
        for (var i in this.state.languages) {
            if (this.state.languages[i]) { choices.push(i) }
        }

        formData.append('languages', JSON.stringify(choices))
        formData.append('course_id', this.state.course_id)

        formData.append('dynamicInput', this.state.dynamicInput)
        formData.append('staticInput', this.state.staticInput)
        formData.append('numOfStatic', this.state.numOfStatic)

        for (var i = 0; i < this.state.numOfStatic; i++) {
            formData.append('inputFile' + i, this.state.staticInputs[i])
            formData.append('outputFile' + i, this.state.staticOutputs[i])
        }

        let self = this

        axios.post(Routes.assessments, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                    this.setState({uploading: false})
                    this.setState({assessment_url: Routes.assessments + response.data})
                    toast('Assessment Created!')
                }
            )
            .catch(function (error) {
                self.toggleModal()
            })
    }

    handleSubmit (e) {
        e.preventDefault()

        this.upload()

        this.setState((prevState) => ({
            description: '',
            additional_help: '',
            name: '',
            sample_code: {},
            input_generator: {},
        }))
    }

    handleNameChange (e) {
        this.setState({name: e.target.value})
    }

    handleDescriptionChange (e) {
        this.setState({description: e.target.value})
    }

    handleAdditionalHelpChange (e) {
        this.setState({additional_help: e.target.value})
    }

    togglePython2 () {
        let langCopy = this.state.languages
        langCopy.Python2 = !langCopy.Python2
        this.setState({languages: langCopy})
    }

    togglePython3 () {
        let langCopy = this.state.languages
        langCopy.Python3 = !langCopy.Python3
        this.setState({languages: langCopy})
    }

    toggleJava () {
        let langCopy = this.state.languages
        langCopy.Java = !langCopy.Java
        this.setState({languages: langCopy})
    }

    toggleRuby () {
        let langCopy = this.state.languages
        langCopy.Ruby = !langCopy.Ruby
        this.setState({languages: langCopy})
    }

    toggleC () {
        let langCopy = this.state.languages
        langCopy.C = !langCopy.C
        this.setState({languages: langCopy})
    }

    toggleCPlus () {
        let langCopy = this.state.languages
        langCopy.CPlus = !langCopy.CPlus
        this.setState({languages: langCopy})
    }

    toggleStaticInput () {
        this.setState({staticInput: !this.state.staticInput})
    }

    toggleDynamicInput () {
        if (!this.state.dynamicInput) {
            this.setState({input_generator: {}})
            this.setState({sample_code: {}})
            this.setState({inputGeneratorUploaded: false})
            this.setState({sampleCodeUploaded: false})
        }
        this.setState({dynamicInput: !this.state.dynamicInput})

    }

    onLanguageSelected (choice) {
        this.setState({solution_language: choice.value})
    }

    changeStaticQuantity (quantity) {
        this.setState({numOfStatic: quantity})

        let newFiles = []
        let newStates = []
        for (var i = 0; i < quantity; i++) {
            newFiles.push({})
            newStates.push(false)
        }
        this.setState({staticInputs: newFiles})
        this.setState({staticInputsUploaded: newStates})

        newFiles = []
        newStates = []
        for (var i = 0; i < quantity; i++) {
            newFiles.push({})
            newStates.push(false)
        }
        this.setState({staticOutputs: newFiles})
        this.setState({staticOutputsUploaded: newStates})
    }

    onStaticInputDrop (i, file) {
        let filesAray = this.state.staticInputs
        filesAray[i] = file[0]
        let uploaded = this.state.staticInputsUploaded
        uploaded[i] = true
        this.setState({staticInputs: filesAray})
        this.setState({staticInputsUploaded: uploaded})
    }

    onStaticOutputDrop (i, file) {
        let filesAray = this.state.staticOutputs
        filesAray[i] = file[0]
        let uploaded = this.state.staticOutputsUploaded
        uploaded[i] = true
        this.setState({staticOutputs: filesAray})
        this.setState({staticOutputsUploaded: uploaded})
    }

    render () {
        const options = [
            {label: 'Python2', value: 'python2'},
            {label: 'Python3', value: 'python3'},
            {label: 'Java 8', value: 'java'},
            {label: 'Ruby', value: 'ruby'},
            {label: 'C++', value: 'cpp'},
            {label: 'C', value: 'c'},
        ]
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionName="SlideIn"
            >
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
                                placeholder="Assessment Description (Markdown Supported)">
                            </textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={this.handleAdditionalHelpChange}
                                value={this.state.additional_help}
                                placeholder="Assessment Additional Information (Markdown Supported)">
                            </textarea>
                        </div>
                    </div>

                    <div className="field deadline">
                        <div>
                            <Col sm={3}>

                            </Col>

                            <Col sm={3}>
                                <h1>Select Deadline</h1>
                            </Col>
                            <Col sm={3}>
                                <Datetime onChange={this.onChange.bind(this)}
                                          value={this.state.date}
                                          dateFormat='DD/MM/YYYY'
                                          timeFormat='hh:mm:ss'/>
                                {/*<DatePicker
                                    onChange={this.onChange.bind(this)}
                                    value={this.state.date}
                                />*/}
                            </Col>
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
                                    Java 8
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
                    <Col sm={5}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>
                                    <input
                                        name="Generator"
                                        type="checkbox"
                                        checked={this.state.dynamicInput}
                                        onChange={this.toggleDynamicInput.bind(this)}/>
                                </th>
                                <th>
                                    Include dynamically generated input
                                </th>

                            </tr>
                            <tr>
                                <th>
                                    <input
                                        name="Static"
                                        type="checkbox"
                                        checked={this.state.staticInput}
                                        onChange={this.toggleStaticInput.bind(this)}/>
                                </th>
                                <th>
                                    Include static input. Select quantity:
                                </th>
                                <th>
                                    <NumericInput
                                        min={0}
                                        max={100}
                                        style={{input: {width: 50}}}
                                        onChange={this.changeStaticQuantity.bind(this)}
                                        value={this.state.numOfStatic}/>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col>
                        <div className="button" onClick={this.handleSubmit}>
                            Submit
                        </div>
                    </Col>
                    {this.state.dynamicInput && <div>
                        <Col sm={8}>
                            <div>
                                <Dropdown
                                    className="dropDown"
                                    options={options}
                                    onChange={this.onLanguageSelected.bind(this)}
                                    value={this.state.solution_language}
                                    placeholder="Select Solution Language"/>
                                <br/>
                            </div>
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
                            <br/>
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
                            <br/>
                        </Col>
                    </div>}
                    <br/>
                    <br/>

                    {this.state.staticInput && this.state.numOfStatic != 0 &&
                    [...Array(this.state.numOfStatic)].map((x, i) =>
                        <div>
                            <Col sm={4}>
                                <div className="content">
                                    <div className="dropzone">
                                        <Dropzone onDrop={this.onStaticInputDrop.bind(this, i)}>
                                            {this.state.staticInputsUploaded[i] ? (
                                                <h2>{this.state.staticInputs[i].name}</h2>
                                            ) : <h2>Upload input file number {i + 1}</h2>}
                                        </Dropzone>
                                    </div>
                                </div>
                                <br/>
                            </Col>
                            <Col sm={4}>
                                <div className="content">
                                    <div className="dropzone">
                                        <Dropzone onDrop={this.onStaticOutputDrop.bind(this, i)}>
                                            {this.state.staticOutputsUploaded[i] ? (
                                                <h2>{this.state.staticOutputs[i].name}</h2>
                                            ) : <h2>Upload output file number {i + 1}</h2>}
                                        </Dropzone>
                                    </div>
                                </div>
                                <br/>
                            </Col>
                        </div>)}
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
            </ReactCSSTransitionGroup>
        )
    }
}

export default NewAssessment