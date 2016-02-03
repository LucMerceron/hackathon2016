import React from 'react'

import _ from 'underscore'
import {History} from 'react-router'

import Table from 'react-bootstrap/lib/Table'

var Statistics = React.createClass({
  mixins: [ History ],

  shouldComponentUpdate: function(nextProps, nextState){
    return true;
  },
  render: function(){
  	const {content} = this.props;
    let statistics = [];

    if (content.stats && content.stats.stats) statistics = content.stats.stats;

    let lines = [];
    statistics.forEach(function(value, index) {
      let name = value.name.en;
      let a = value.a;
      let b = value.b;
      if (value.type === 'number') {
        let perA = Math.round(a/(a+b)*100);
        let perB = Math.round(b/(a+b)*100);

        let biggest = Math.max(perA, perB);

        let perATemp = (1 / (biggest / perA) * 100);
        let perBTemp = (1 / (biggest / perB) * 100);

        if (!biggest) biggest = 0;

        lines.push(<tr key={index}>
          <td key='1'>{a}</td>
          <td textAlign='right' key='2'>
            <div className="public-event-statistics-left-biggest" style={{width: `${biggest}%`}}>
              <div className="public-event-statistics-left" style={{width: `${perATemp}%`}}></div>
            </div>
          </td>
          <td key='3'>{name}</td>
          <td key='4' align="right">
            <div className="public-event-statistics-right-biggest" style={{width: `${biggest}%`}}>
              <div className="public-event-statistics-right" style={{width: `${perBTemp}%`}}></div>
            </div>
          </td>
          <td key='5'>{b}</td>
        </tr>)
      } else if (value.type === 'percentage') {
        let tota = value.totalA;
        let totb = value.totalB;

        let perA = tota ? Math.round((a/tota)*100) : 0;
        let perB = totb ? Math.round((b/totb)*100) : 0;

        let biggest = Math.max(perA, perB);

        let perATemp = (1 / (biggest / perA) * 100);
        let perBTemp = (1 / (biggest / perB) * 100);
        
        lines.push(<tr key={index}>
          <td key='1'>{a}/{tota}&nbsp;<span style={{fontWeight: 'bold'}}>({perA}%)</span></td>
          <td textAlign='right' key='2'>
            <div className="public-event-statistics-left-biggest" style={{width: `${biggest}%`}}>
              <div className="public-event-statistics-left" style={{width: `${perATemp}%`}}></div>
            </div>
          </td>
          <td key='3'>{name}</td>
          <td key='4' align="right">
            <div className="public-event-statistics-right-biggest" style={{width: `${biggest}%`}}>
              <div className="public-event-statistics-right" style={{width: `${perBTemp}%`}}></div>
            </div>
          </td>
          <td key='5'><span style={{fontWeight: 'bold'}}>({perB}%)</span>&nbsp;{b}/{totb}</td>
        </tr>)
      }
    });

    return (
      <div className="public-event-statistics">
        <Table>
          <tbody>
            {lines}
          </tbody>
        </Table>
	    </div>
    )
  }
});

module.exports = Statistics;
