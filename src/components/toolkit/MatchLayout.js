import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import AppConstants from '../../constants/AppConstants'
import moment from 'moment';
import {History} from 'react-router'

var MatchLayout = React.createClass({
  mixins: [ History ],

  getInitialState: function(){
    return({
      match: this.props.content,
      playerA1Name: '',
      playerA2Name: '',
      playerB1Name: '',
      playerB2Name: '',
      playerA1Photo: '',
      playerB1Photo: '',
      playerA2Photo: '',
      playerB2Photo: ''
    })
  },
  componentWillMount: function(){
    this.initPlayersPhotosName();
  },

  initPlayersPhotosName: function(){
    const {match} = this.state;

    let playerA1 = match.playerA1 && match.playerA1.photos ? AppConstants.SERVER_ADDR + match.playerA1.photos['512'] : '';
    let playerA2 = match.playerA2 && match.playerA2.photos ? AppConstants.SERVER_ADDR + match.playerA2.photos['512'] : '';
    let playerB1 = match.playerB1 && match.playerB1.photos ? AppConstants.SERVER_ADDR + match.playerB1.photos['512'] : '';
    let playerB2 = match.playerB2 && match.playerB2.photos ? AppConstants.SERVER_ADDR + match.playerB2.photos['512'] : '';

    let playerA1Name = match.playerA1 ? match.playerA1.firstname.charAt(0) + '. ' + match.playerA1.lastname : '';
    let playerA2Name = match.playerA2 ? match.playerA2.firstname.charAt(0) + '. ' + match.playerA2.lastname : '';
    let playerB1Name = match.playerB1 ? match.playerB1.firstname.charAt(0) + '. ' + match.playerB1.lastname : '';
    let playerB2Name = match.playerB2 ? match.playerB2.firstname.charAt(0) + '. ' + match.playerB2.lastname : '';

    this.setState({
      playerA1Photo: playerA1,
      playerB2Photo: playerB2,
      playerB1Photo: playerB1,
      playerA2Photo: playerA2,
      playerA1Name: playerA1Name,
      playerB2Name: playerB2Name,
      playerB1Name: playerB1Name,
      playerA2Name: playerA2Name,
    })
  },

  getCategory: function(){
    const {match} = this.state;

    let category = match.category ? match.category : null;
    if (category === 'MS') return 'Man Simple';
    if (category === 'WS') return 'Woman Simple';
    if (category === 'MD') return 'Men Double';
    if (category === 'WD') return 'Women Double';
    if (category === 'XD') return 'Mixed Double';
    return '';
  },

  getTime: function(){
    const {match} = this.state;

    var a = match.startDate ? moment(match.startDate) : moment(new Date());
    var b = match.endDate ? moment(match.endDate) : moment(new Date());
    var c = moment(new Date());
    if (match.status == 'ongoing') return ' - ' + moment(c.diff(a)).utc().format('H:m', 'fr')
    else if (match.status == 'ended') return ' - ' + moment(b.diff(a)).utc().format('H:m', 'fr')
    else return ''
  },
  onPlayerClick: function(playerId, event){
    event.stopPropagation();
    this.history.pushState(null, '/' + this.props.eventId + '/players/' + playerId);
  },
  onTeamClick: function(teamId, event){
    event.stopPropagation();
    this.history.pushState(null, '/' + this.props.eventId + '/teams/' + teamId);
  },
  getPlayersInfo: function(playerA){
    /* playerA = true, playerB = false */
    const {match, switchA, switchB, playerA1Name, playerA2Name, playerB2Name, playerB1Name, playerA2Photo, playerB1Photo, playerB2Photo, playerA1Photo} = this.state;
    
    let player1Photo, player2Photo, player1Name, player2Name;
    if (playerA){
      player1Photo = playerA1Photo ? <div onClick={this.onPlayerClick.bind(this, match.playerA1.id)} className="public-event-matchLayout-photo" style={{backgroundImage: 'url("' + playerA1Photo + '")'}}></div> : <div className="public-event-matchLayout-photo"></div>;
      player2Photo = playerA2Photo ? <div onClick={this.onPlayerClick.bind(this, match.playerA2.id)} className="public-event-matchLayout-photo" style={{backgroundImage: 'url("' + playerA2Photo + '")'}}></div> : null;
      player1Name = playerA1Name ? <div onClick={this.onPlayerClick.bind(this, match.playerA1.id)} className="public-event-matchLayout-name">{playerA1Name}</div> : null;
      player2Name = playerA2Name ? <div onClick={this.onPlayerClick.bind(this, match.playerA2.id)} className="public-event-matchLayout-name">{playerA2Name}</div> : null;;
    } else {
      player1Photo = playerB1Photo ? <div onClick={this.onPlayerClick.bind(this, match.playerB1.id)} className="public-event-matchLayout-photo" style={{backgroundImage: 'url("' + playerB1Photo + '")'}}></div> : <div className="public-event-matchLayout-photo"></div>;
      player2Photo = playerB2Photo ? <div onClick={this.onPlayerClick.bind(this, match.playerB2.id)} className="public-event-matchLayout-photo" style={{backgroundImage: 'url("' + playerB2Photo + '")'}}></div> : null;
      player1Name = playerB1Name ? <div onClick={this.onPlayerClick.bind(this, match.playerB1.id)} className="public-event-matchLayout-name">{playerB1Name}</div> : null;;
      player2Name = playerB2Name ? <div onClick={this.onPlayerClick.bind(this, match.playerB2.id)} className="public-event-matchLayout-name">{playerB2Name}</div> : null;;
    }

    return (
      <div className="public-event-matchLayout-divise col-xs-4">
        <div className="public-event-matchLayout-photo-group">{player1Photo}{player2Photo}</div>
        {player1Name}{player2Name}
      </div>
    )
  },
  getPlayerSet: function(playerA){
    const {match} = this.state;

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
  getMatchScore: function(){
    const {match} = this.state;
    if (match.score && match.status === 'ongoing') {
      
      let firstLine = []
      firstLine.push(<tr key='0'>{this.getPlayerSet(true)}</tr>)
      let secondLine = []
      secondLine.push(<tr key='1'>{this.getPlayerSet(false)}</tr>)

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
    } else if ((match.score && match.status === 'ended')  || (match.score && match.status === 'withdrawal')){
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
    } else if (!match.score && match.status === 'upcoming') {
      return (
      <div className="public-event-matchLayout-scores public-event-matchLayout-table-center">
        <table>
          <tbody>
            <tr><td>Upcoming</td></tr>
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
    const {match} = this.state;

    let withdraw = []
    if (match.status === 'withdrawal') withdraw.push(<div style={{height: '32px', lineHeight: '32px', textAlign: 'center'}}> Withdrawal </div>);

    return ( match ?
      <div key={Math.random()}><div className="public-event-matchLayout-place">{match.teamA ? <div className="public-event-matchLayout-team">({match.teamA.shortName})</div> : null}{match.place? match.place.name : <span>&nbsp;&nbsp;&nbsp;</span>}{match.teamB ? <div className="public-event-matchLayout-team">({match.teamB.shortName})</div> : null}</div>
      <div className="public-event-matchLayout-main">
        {this.getPlayersInfo(true)}
        <div className="public-event-matchLayout-divise public-event-matchLayout-middle col-xs-4">
          <div className="public-event-matchLayout-category">{this.getCategory()}{this.getTime()}</div>
          <div className="public-event-matchLayout-orangeline"></div>
          {this.getMatchScore()}
          <div className="public-event-matchLayout-blueline"></div>
          {withdraw}
        </div>
        {this.getPlayersInfo(false)}
      </div></div> : null
    )
  }
});

module.exports = MatchLayout;
