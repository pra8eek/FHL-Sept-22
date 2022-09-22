import React from 'react';
import '../css/form.css';
import CulpritPrTriggerResponse from './CulpritPrTriggerResponse';

class TriggerCulpritPR extends React.Component {
    constructor(props){
        super();
        this.state = {
          triggerApiRequestParams: {
            name: '',
            config: '',
            scenarioId: '',
            pullRequestId: '',
            emailId: ''
          },
          triggerApiResponseParams: {
            id: '',
            statusQueryGetUri: 'https://culpritpranalyzer.azurewebsites.net/runtime/webhooks/durabletask/instances/wac-ap-wonca-ws2019-sharedserver%3A368346_1451545?taskHub=culpritpranalyzer&connection=Storage&code=Hjr/aMPaBS6DyPweFHoxTrAOazr7yneeBWtaTTbGOjSdJz4UdGeinQ==',
            sendEventPostUri: '',
            terminatePostUri: '',
            purgeHistoryDeleteUri: '',
            restartPostUri: ''
          },
          showTriggerApiResponseTable: props.showTriggerApiResponseTable,
          triggerApiResponseStatus: ''
        };
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleScenarioIdChange = this.handleScenarioIdChange.bind(this);
        this.handlePullRequestIdChange = this.handlePullRequestIdChange.bind(this);
        this.handleEmailIdChange = this.handleEmailIdChange.bind(this);
        this.handleConfigChange = this.handleConfigChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      };

      componentDidUpdate(prevProps, prevState) {
        if (prevState.showTriggerApiResponseTable !== this.props.showTriggerApiResponseTable) {
          this.setState({
            showTriggerApiResponseTable: this.props.showTriggerApiResponseTable
          });
        }
      }

      handleNameChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.name = event.target.value;
        this.setState({triggerApiRequestParams});
      }
    
      handleScenarioIdChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.scenarioId = event.target.value;
        this.setState({triggerApiRequestParams});
      }
    
      handlePullRequestIdChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.pullRequestId = event.target.value;
        this.setState({triggerApiRequestParams});
      }
    
      handleEmailIdChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.emailId = event.target.value;
        this.setState({triggerApiRequestParams});
      }

      handleConfigChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.config = event.target.value;
        this.setState({triggerApiRequestParams});
      }
    
      async handleSubmit(event) {
        event.preventDefault();

        var body = {
          'Config' : this.state.triggerApiRequestParams.config,
          'Scenario': this.state.triggerApiRequestParams.scenarioId,
          'PullRequestId': this.state.triggerApiRequestParams.pullRequestId,
          'Email': this.state.triggerApiRequestParams.emailId
        };

        const requestOptions = {
          method: 'POST',
          mode: 'cors', 
          headers: {
            'x-functions-key': 'SuXP1WXXLcvCAnZ3OQJoSrMIEwGdkomQZrlE16TtuVwvX3aqNFNPig==',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(body)
        };

        console.log('Triggering SuspectPR Tool with following request options: ' + JSON.stringify(requestOptions));

        const response = await fetch('https://culpritpranalyzer.azurewebsites.net/api/SuspectPrHttpTrigger', requestOptions);
        const data = await response.json();
        console.log('fetched data: response: ' + JSON.stringify(data));

        if (data !== null) {
          let triggerApiResponseStatus = 'fetched data: response status: ' + JSON.stringify(response.status);
          this.setState({
            showTriggerApiResponseTable: true,
            triggerApiResponseStatus: triggerApiResponseStatus
          });
          this.props.parentCallback({showTriggerApiResponseTable: true});

          const triggerApiResponseParams = {
            id: data.id,
            statusQueryGetUri: data.statusQueryGetUri,
            sendEventPostUri: data.sendEventPostUri,
            terminatePostUri: data.terminatePostUri,
            purgeHistoryDeleteUri: data.purgeHistoryDeleteUri,
            restartPostUri: data.restartPostUri
          }

          this.setState({triggerApiResponseParams: triggerApiResponseParams});
        }
      }

      render() {

        const checkStatus = this.state.showTriggerApiResponseTable;
        let renderComponent;
        if (checkStatus) {
          renderComponent = <CulpritPrTriggerResponse 
                              triggerApiResponseParams={this.state.triggerApiResponseParams}
                              parentCallback={this.props.parentCallback}>
                            </CulpritPrTriggerResponse>
        } else {
          renderComponent = <form>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.name} onChange={this.handleNameChange} />
                                <label>Name</label>
                              </div>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.emailId} onChange={this.handleEmailIdChange} />
                                <label>Email Address</label>
                              </div>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.config} onChange={this.handleConfigChange} />
                                <label>Config</label>
                              </div>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.scenarioId} onChange={this.handleScenarioIdChange} />
                                <label>Scenario ID</label>
                              </div>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.pullRequestId} onChange={this.handlePullRequestIdChange} />
                                <label>Pull Request ID</label>
                              </div>
                              <a onClick={this.handleSubmit}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Submit
                              </a>

                              <label>
                                <span></span>
                                <span></span>
                                {this.state.triggerApiResponseStatus}
                              </label>
                            </form>;
        }

        return (
          <div>
            {renderComponent}
          </div>
        );
      }
}

export default TriggerCulpritPR;