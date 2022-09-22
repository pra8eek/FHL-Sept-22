import React, { Profiler } from 'react';
import '../css/form.css';
import '../css/table.css';
import '../css/cards.css';

export default class CulpritPrTriggerResponse extends React.Component {
    constructor(props){
        super();
        this.state = {
            triggerApiResponseParams: props.triggerApiResponseParams
        };

        this.handleStatusCheckUriClick = this.handleStatusCheckUriClick.bind(this);
        this.contactCandidate = this.contactCandidate.bind(this);
      };

      handleStatusCheckUriClick(event) {
        event.preventDefault();
        this.setState({checkStatus: true});
        console.log('CulpritPrResponse props: ' + JSON.stringify(this.props));
        this.props.parentCallback({
            showTriggerApiResponseTable: true, 
            checkStatus: true,
            triggerApiResponseParams: this.state.triggerApiResponseParams
        });
      }

      async contactCandidate(event){
        event.preventDefault();
        this.setState({checkStatus: true});
        console.log('Contacted candidate ');

        var body = {
            "CandidateEmailID": this.state.triggerApiResponseParams.candidates[0].email_id[0],
            "RecruiterEmailID": "tanviagarwal@microsoft.com",
            "IsCandidate": "false",
            "IsCandidateInterested": "false",
            "JDLink": "https://careers.microsoft.com/i/us/en/job/1467744/Cloud-Solution-Architecture"
          };
  
          const requestOptions = {
            method: 'POST',
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
          };
        const response = await fetch(
            'https://prod-26.westcentralus.logic.azure.com:443/workflows/717edc33336c4213ad455d23ee8a8311/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=spTfT0NLIO_mHlgAsKnaCkeTNTx_ieClpBeOYZloGTc', 
            requestOptions);
        // const data = await response.json();
        // console.log('fetched data: response: ' + JSON.stringify(data));
      }

      render() {
        let candidate = this.state.triggerApiResponseParams.candidates[0];
        let record = Object.keys(candidate).map( key => {
            return (<tr>
                    <td>{key}</td>
                    <td>{(candidate.isIdentityVisible && !(key === "first_name" || key === "last_name" || key === "email_id")) 
                    ? JSON.stringify(candidate[key]) : "Hidden"}</td>
                </tr>)
        }
        );
        return (
            <div className="container">
                {console.log(this.props.triggerApiResponseParams)}
                <div>
                
                {
                this.props.triggerApiResponseParams.data.map(person => 
                (        <div class="card">
                            <div class="box">
                            <div class="content">
                                <h2>{person.YoE}</h2>
                                <h6> YoE </h6>
                                <h3>{person.first_name}</h3>

                                <p>{person.languages_known.join(" ")}</p>
                                <a onClick={this.contactCandidate}> Contact Dev</a>
                            </div>
                            </div>
                        </div>
                     )
                )
                }
                </div>
            </div>
        );
      }
}