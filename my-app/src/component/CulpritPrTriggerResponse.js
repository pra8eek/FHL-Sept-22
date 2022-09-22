import React from 'react';
import '../css/form.css';
import '../css/table.css';

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
                <div className="user-box">
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Check Status URI</td>
                            <td> <a onClick={this.handleStatusCheckUriClick}>{this.state.triggerApiResponseParams.statusQueryGetUri}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
          </div>
        );
      }
}