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

      render() {
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
                                <a href="#">Contact Dev</a>
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