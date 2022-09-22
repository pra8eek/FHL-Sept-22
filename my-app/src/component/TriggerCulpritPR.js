import React from 'react';
import '../css/form.css';
import CulpritPrTriggerResponse from './CulpritPrTriggerResponse';

import response from "../resources/response.json";

class TriggerCulpritPR extends React.Component {
    constructor(props){
        super();
        this.state = {
          triggerApiRequestParams: {

            query: '',

          },
          triggerApiResponseParams: {
            id: '',
            statusQueryGetUri: 'https://culpritpranalyzer.azurewebsites.net/runtime/webhooks/durabletask/instances/wac-ap-wonca-ws2019-sharedserver%3A368346_1451545?taskHub=culpritpranalyzer&connection=Storage&code=Hjr/aMPaBS6DyPweFHoxTrAOazr7yneeBWtaTTbGOjSdJz4UdGeinQ==',
            sendEventPostUri: '',
            terminatePostUri: '',
            purgeHistoryDeleteUri: '',
            restartPostUri: '',
            candidates: []
          },
          showTriggerApiResponseTable: props.showTriggerApiResponseTable,
          triggerApiResponseStatus: ''
        };
    
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      };

      componentDidUpdate(prevProps, prevState) {
        if (prevState.showTriggerApiResponseTable !== this.props.showTriggerApiResponseTable) {
          this.setState({
            showTriggerApiResponseTable: this.props.showTriggerApiResponseTable
          });
        }
      }


      handleQueryChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.Query = event.target.value;
        this.setState({triggerApiRequestParams});
      }
    
      async handleSubmit(event) {
        event.preventDefault();

        var body = {
          'Query' : this.state.triggerApiRequestParams.query,
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


        const data = response;
        console.log('fetched data: response: ' + JSON.stringify(data));

        if (data !== null) {
          let triggerApiResponseStatus = 'fetched data: response status: ';
          this.setState({
            showTriggerApiResponseTable: true,
            triggerApiResponseStatus: triggerApiResponseStatus
          });
          this.props.parentCallback({showTriggerApiResponseTable: true});

          const triggerApiResponseParams = {

            data: data.response.docs
          }
          console.log(triggerApiResponseParams);

          this.setState({triggerApiResponseParams: triggerApiResponseParams});
          console.log('inner');
        }
        console.log('fetched data: response: ' + JSON.stringify(this.state.triggerApiResponseParams));
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
                                <input type="text" value={this.state.triggerApiRequestParams.query} onChange={this.handleQueryChange} />
                                <label>Query</label>
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