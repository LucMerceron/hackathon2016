import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import AppConstants from '../../constants/AppConstants'
import moment from 'moment';
import {History} from 'react-router'

var MatchLayoutSimplified = React.createClass({
  mixins: [ History ],

  getCategory: function(match){

    let category = match.category ? match.category : null;
    if (category === 'MS') return 'Man Simple';
    if (category === 'WS') return 'Woman Simple';
    if (category === 'MD') return 'Men Double';
    if (category === 'WD') return 'Women Double';
    if (category === 'XD') return 'Mixed Double';
    return '';
  },

  getPlayerSet: function(playerA, match){

    let result = [];

    match.score.sets ?
      match.score.sets.forEach(function(value, index){
        playerA ? result.push(<td key={index}>{value.gameA}</td>) : result.push(<td key={index}>{value.gameB}</td>);
      })
    : null

    playerA ? match.score.scoreA || match.score.scoreA === 0 ? result.push(<td key='-1' className="score">{match.score.scoreA === 4444 ? 'AV' : match.score.scoreA}</td>) : null
            : match.score.scoreB || match.score.scoreB === 0 ? result.push(<td key='-1' className="score">{match.score.scoreB === 4444 ? 'AV' : match.score.scoreB}</td>) : null

    result.length === 0 ? result.push(<td key='0'>&nbsp;</td>) : null;

    return result;
  },
  getPlayerSetEnded: function(playerA, match){
    let result = [];

    match.score.sets ?
      match.score.sets.forEach(function(value, index){
        playerA ? result.push(<td key={index}>{value.gameA}</td>) : result.push(<td key={index}>{value.gameB}</td>);
      })
    : null

    result.length === 0 ? result.push(<td key='0'>&nbsp;</td>) : null;

    return result;
  },
  getMatchScore: function(match){
    if (match.score && match.status === 'ongoing' ) {
      
      let firstLine = []
      firstLine.push(<tr key='0'>{this.getPlayerSet(true, match)}</tr>)
      let secondLine = []
      secondLine.push(<tr key='1'>{this.getPlayerSet(false, match)}</tr>)
      
      let service = null;
      // Right & left to 0 because no 5 sets /!\
      if (match.score.server === 'A') {
        service = <img alt="service" src="/images/tennis-ball.png" className="service" style={{left: '0', marginTop: '25px'}}/>
      } else if (match.score.server === 'B') {
        service = <img alt="service" src="/images/tennis-ball.png" className="service" style={{right: '-10px', marginTop: '5px'}}/>
      }

      let winner = null;
      // Right & left to 0 because no 5 sets /!\
      if (match.winner === 'A') {
        winner = <img alt="winner" src="/images/check.png" className="winner" style={{left: '0', marginTop: '25px'}}/>
      } else if (match.winner === 'B') {
        winner = <img alt="winner" src="/images/check.png" className="winner" style={{right: '-10px', marginTop: '5px'}}/>
      }

      return (
      <div className="public-event-matchLayout-scores">
        {service}
        {winner}
        <table>
          <tbody>
            {secondLine}
            {firstLine}
          </tbody>
        </table>
      </div>)
    } else if ((match.score && match.status === 'ended') || (match.score && match.status === 'withdrawal')){
      let firstLine = []
      firstLine.push(<tr key='0'>{this.getPlayerSetEnded(true, match)}</tr>)
      let secondLine = []
      secondLine.push(<tr key='1'>{this.getPlayerSetEnded(false, match)}</tr>)

      let winner = null;
      // Right & left to 0 because no 5 sets /!\
      if (match.winner === 'A') {
        winner = <img alt="winner" src="/images/check.png" className="winner" style={{left: '0', marginTop: '25px'}}/>
      } else if (match.winner === 'B') {
        winner = <img alt="winner" src="/images/check.png" className="winner" style={{right: '-10px', marginTop: '5px'}}/>
      }

      return (
      <div className="public-event-matchLayout-scores">
        {winner}
        <table>
          <tbody>
            {secondLine}
            {firstLine}
          </tbody>
        </table>
      </div>)
    } else if (!match.score && match.status === 'upcoming') {
      return (
      <div className="public-event-matchLayout-scores  public-event-matchLayout-table-center">
        <table>
          <tbody>
            <tr key='1'><td>Upcoming</td></tr>
          </tbody>
        </table>
      </div>)
    } else if (!match.score && match.status === 'ended') {
      let winner = null;
      // Right & left to 0 because no 5 sets /!\
      if (match.winner === 'A') {
        winner = <img alt="winner" src="/images/check.png" className="winner" style={{left: '0', marginTop: '25px'}}/>
      } else if (match.winner === 'B') {
        winner = <img alt="winner" src="/images/check.png" className="winner" style={{right: '-10px', marginTop: '5px'}}/>
      }

      return (
      <div className="public-event-matchLayout-scores">
        {winner}
        <table>
          <tbody>
            <tr><td>&nbsp;</td></tr>
            <tr><td>&nbsp;</td></tr>
          </tbody>
        </table>
      </div>)
    } else {
      return (
      <div className="public-event-matchLayout-scores">
        <table>
          <tbody>
            <tr key='1'><td>&nbsp;</td></tr>
            <tr key='2'><td>&nbsp;</td></tr>
          </tbody>
        </table>
      </div>)
    }

  },

  render: function(){
    const {match, key} = this.props;

    let withdraw = []
    if (match.status === 'withdrawal') withdraw.push(<div style={{height: '32px', lineHeight: '32px', textAlign: 'center'}}> Withdrawal </div>);

    return ( match ?
      <div className="public-event-matchLayout-simplified" key={Math.random()}>
       <div className="public-event-matchLayout-main-simplified">
        <div className="public-event-matchLayout-divise-simplified col-xs-4">
          <div className="left-first-name">
            {match.playerA2Name ? match.playerA2Name : <span>&nbsp;</span>}
          </div>
          <div className="left-second-name">
            {match.playerA1Name} 
          </div>
        </div>
        <div className="public-event-matchLayout-divise-simplified public-event-matchLayout-middle col-xs-4">
          <div className="public-event-matchLayout-category">
            <b>{this.getCategory(match)}</b>
          </div>
          <div className="public-event-matchLayout-orangeline"></div>
            {this.getMatchScore(match)}
          <div className="public-event-matchLayout-blueline"></div>
          {withdraw}
        </div>
        <div className="public-event-matchLayout-divise-simplified col-xs-4">
          <div className="right-first-name">
            {match.playerB1Name}
          </div>
          <div className="right-second-name">
            {match.playerB2Name}
          </div>
        </div>
      </div>
     </div> : null
    )
  }
});

module.exports = MatchLayoutSimplified;
