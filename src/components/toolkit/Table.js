import React from 'react';

import Btable from 'react-bootstrap/lib/Table'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'
import _ from 'underscore'
import FilterSimple from './FilterSimple'
import FilterSpec from './FilterSpec'
import AppConstants from '../../constants/AppConstants'
import DateFormat from '../../services/DateFormat'

import {Motion, spring} from 'react-motion';
import {range} from 'lodash';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

function isSorted(arr){
  for (var i = 0; i < arr.length - 1; i++){
    if (arr[i] > arr[i+1]) {
      return false
    }
  }
  return true
}

const springConfig = [300, 50];
const rowHeight = 57

var Table = React.createClass({
  getInitialState: function(){
    return { 
       contentFiltered: [],
       query: '',
       delta: 0,
       mouse: 0,
       isPressed: false,
       lastPressed: 0,
       order: []
     }
  },

  componentWillMount: function(){
    const {content, sorted} = this.props;

    /* If sorted */
    if (sorted) this.setState({contentFiltered: _.sortBy(content, sorted), order: range(_.sortBy(content, sorted).length)});
    else this.setState({contentFiltered: content, order: range(content.length)});
  },
  componentDidMount() {
    if (this.props.reorderable) {
      window.addEventListener('touchmove', this.handleTouchMove);
      window.addEventListener('touchend', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  },
  componentWillUnmount(){
    if (this.props.reorderable) {
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  },
  componentWillReceiveProps: function(nextProps){
    const {contentFiltered, order} = this.state;
    const {content, sorted} = nextProps;

    /* If only the rank change (no deletion or addition) */
    if (this.props.reorderable && contentFiltered.length !== 0 && content.length === order.length) this.setStateOrder(content, sorted);
    else if (sorted) this.setState({contentFiltered: _.sortBy(content, sorted), order: range(_.sortBy(content, sorted).length)});
    else this.setState({contentFiltered: content, order: range(content.length)});
  },
 
  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseDown(pos, pressY, {pageY}) {
    /* delta: beginning*/
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
  },
  handleMouseMove({pageY}) {
    const {isPressed, delta, order, lastPressed, contentFiltered} = this.state;

    if (isPressed) {
      /* Vertical deplacement in function of the beginning */
      const mouse = pageY - delta;
      /* Where should the pressed slide be */
      const row = clamp(Math.round((lastPressed * rowHeight + mouse) / rowHeight), 0, contentFiltered.length);
      /* Reordering the list */
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
    }
  },
  handleMouseUp() {
    this.setState({isPressed: false, delta: 0});
    /* If a rank has been changed */
    // TODO: Improve the verification so it's true only when there is an actual change
    if (!isSorted(this.state.order)) {
      const {order, contentFiltered, lastPressed} = this.state; 
      const {reorderable} = this.props;
      /* Retrieve the new rank of the moved slide (precedent + 1) */
      let newRank = order.indexOf(lastPressed) == 0 ? 0 : contentFiltered[order[order.indexOf(lastPressed) - 1]][reorderable.attribut] + 1
      /* Get the slide in question */
      let slide = contentFiltered[lastPressed]
      /* Call the callback */
      reorderable.func(slide, {[reorderable.attribut]: newRank});
    }
  },

 setStateOrder: function(content, sorted){
    let {order, contentFiltered} = this.state;

    /* isNotCorrupt means that the api state is the same as the user's one*/
    let isNotCorrupt =
      order.every(function (value, index){
        if (contentFiltered[value].id !== content[index].id) return false;
        contentFiltered[value] = content[index];
        return true;
      });
    isNotCorrupt ? this.setState({contentFiltered: sorted ? _sortBy(contentFiltered, sorted) : contentFiltered}) : this.setState({contentFiltered: sorted ? _sortBy(content, sorted) : content, order: range(content.length)})
  },
  isUrl: function(text){
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(text)[1];

    return (ext === 'png' || ext === 'jpg' || ext === 'jpeg') ? true : false
  },
  formatValue: function(value, td) {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    if (!value) return '';
    if (this.isUrl(value)) return <img src={AppConstants.SERVER_ADDR + value} className="image-table" alt={td}/>
    if (DateFormat.isDate(value)) return DateFormat.getStringFromDate(value)
    return value;
  },

  _getHeader: function(){
    const {showHeader, rowHash, editButton, delButton, header} = this.props;

    let headerValues = _.values(header).map(function(value, index){return <td key={index}>{value}</td>})
    let headerEditOrDel = editButton || delButton ? <td key={-1}></td> : null
    let headerRowHash = rowHash ? <td key={-2}>{rowHash}</td> : null
    let headerResult = showHeader ? <thead><tr>{headerRowHash}{headerValues}{headerEditOrDel}</tr></thead> : null

    return headerResult
  },
  _getCase: function(value, td, key){
    const {columnLinks} = this.props;

    let caseValue = _.has(value, td) ? this.formatValue(value[td], td) : null;
    let caseResult = _.has(columnLinks, td) ? <td key={key} className="clickable-case" onClick={() => columnLinks[td](value)}>{caseValue}</td> : <td key={key}>{caseValue}</td>;

    return caseResult;
  },
  _getColumnsValues: function(value, index){ 
    const {header, rowHash, editButton, delButton, reorderable} = this.props;
    const {order} = this.state;

    let column = [];

    if (rowHash) reorderable ? column.push(<td key={-2}>{order.indexOf(index)}</td>) : column.push(<td key={-2}>{index}</td>);

    /* For each column in the order */
    column.push(_.keys(header).map(function(td, key){

      /* Return the associated case */
      return this._getCase(value, td, key)

    }.bind(this)));
  

    if (editButton) column.push(<td key={-1} className="clickable-button edit-img" onClick={() => editButton(value)}><img src='/images/edit.png' alt='edit'/></td>);
    else if (delButton) column.push(<td key={-1} className="clickable-button del-img" onClick={() => delButton(value)}><img src='/images/delete.png' alt='del'/></td>);

    return column;
  },
  _getRows: function(){

    const {rowLink, reorderable} = this.props;
    const {mouse, isPressed, delta, order, lastPressed, contentFiltered} = this.state;

    return reorderable
      ? contentFiltered.map(function(value, index){
          const style = lastPressed === index && isPressed
              ? {
                  scale: spring(1.025, springConfig),
                  y: clamp(mouse, -(index * rowHeight), rowHeight * (contentFiltered.length - index - 1)),
                }
              : {
                  scale: spring(1, springConfig),
                  y: spring((order.indexOf(index) - index) * rowHeight , springConfig),
                };
          return (
            <Motion style={style} key={index}>
              {({scale, shadow, y}) =>
                /* The row cannot be cliquable when reorderable */
                <tr
                  key={index}
                  className="slide"
                  onMouseDown={this.handleMouseDown.bind(null, index, y)}
                  onTouchStart={this.handleTouchStart.bind(null, index, y)}
                  style={{
                      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      zIndex: index === lastPressed && isPressed ? 99 : order.indexOf(index)
                    }}
                  >
                    {this._getColumnsValues(value, index)}
                </tr>
              }
            </Motion>
          )
        }.bind(this))
    : contentFiltered.map(function(value, index){
        // If the row is clickable
        return rowLink 
          ? 
          <tr key={index} className="clickable-row" onClick={() => rowLink(value)}>
            {this._getColumnsValues(value, index)}
          </tr>
          :
          <tr key={index}>
            {this._getColumnsValues(value, index)}
          </tr>
      }.bind(this))
  },

  /* Function which return the columns position where the object is or false*/
  _findPatternInObject: function(object, pattern, columns){
    let col;

    // result is true or false
    let result = _.keys(object).some(function(value, index){
      if ((columns.indexOf(value) > -1) && !this.isUrl(object[value]) && (object[value].toLowerCase().indexOf(pattern.toLowerCase()) > -1)){
        col = columns.indexOf(value);
        return true
      }
    }.bind(this))

    return result ? col : false;
  },

  /* Function which return true if the pattern of object is find at the column */
  _findPatternInObjectForColumn: function(object, pattern, column){
    return object[column] ? object[column].toLowerCase().indexOf(pattern.toLowerCase()) > -1 : false;
  },

  _changeQuery: function(query){

    if (query !== '') {

      let queryResult = [];
      let columns;
      // Separate the queries and clean the empty string
      let splitQueries = query.split(' ').filter(Boolean);
      /* Get all object of content */
      this.props.content.map(function(object, index){
        /* Each object get all the columns to find its need */
        columns =  _.keys(this.props.header);
        /* Every queries must have return true */
        return splitQueries.every(function(pattern, key){
          // result is position or false
          let result = this._findPatternInObject(object, pattern, columns);

          if (result !== false) {
            // remove this column choice
            columns.splice(result, 1);
            // continue if multiple query
            return true;
          } 
          else return false;
        }.bind(this)) ? queryResult.push(object) : void(0)
      }.bind(this));

      this.setState({query: query, contentFiltered: queryResult});
    } else {
      /* Add all object of content */
      this.setState({query: '', contentFiltered: this.props.content});
    }
  },

  _changeQuerySpec: function(query, column){
    if (query !== '') {
      let queryResult = [];

      // Retrive the column id
      let col = _.keys(this.props.header)[_.values(this.props.header).indexOf(column)];

      /* Get all object of content */
      this.props.content.map(function(object, index){
        // Search the query on this object for this column
        this._findPatternInObjectForColumn(object, query, col) ? queryResult.push(object) : void(0)
      }.bind(this));

      this.setState({query: query, contentFiltered: queryResult});
    } else {
      /* Add all object of content */
      this.setState({query: '', contentFiltered: this.props.content});
    }
  },

  _getBody: function(){
    let y = (this.state.order.length) * rowHeight + this.state.order.length;
    return this.props.reorderable ? <tbody style={{height: y, position: 'relative'}}>{this._getRows()}</tbody> : <tbody>{this._getRows()}</tbody>;
  },

  _getFilterSimple: function(){
    return <FilterSimple query={this.state.query} callback={this._changeQuery} />;
  },

  _getFilterSpec: function(){
    /* Retrieve the list of options without links */
    let options = _.values(this.props.header);

    this.props.content.map(function(value,index){
      _.keys(this.props.header).map(function(val, key){
        if (this.isUrl(value[val])){
          if (options.indexOf(this.props.header[val]) > -1) {
            options.splice(options.indexOf(this.props.header[val]), 1);
          }
        } 
      }.bind(this))
    }.bind(this))

    return <FilterSpec query={this.state.query} callback={this._changeQuerySpec} dropdown={options}/>;
  },

  render: function(){
    const {createButton, filter, kind, reorderable} = this.props;

    /* Get all possible kind */
    let responsive, bordered, condensed, hover, striped;
    if (kind) {
      responsive = kind.indexOf('responsive') > -1;
      bordered = kind.indexOf('bordered') > -1;
      condensed = kind.indexOf('condensed') > -1;
      hover = kind.indexOf('hover') > -1;
      striped = kind.indexOf('striped') > -1;
    }    

    /* Get the header */
    let header = this._getHeader();

    /* Get the body */
    let body = this._getBody();

    /* Get the create Button */
    let create = createButton ? <ButtonInput className="text-center green-button" value={createButton.name} onClick={createButton.func} /> : null;

    /* Get the filter if present */
    let filterContent = null
    if (filter === 'simple') filterContent = this._getFilterSimple()
    else if (filter=== 'spec') filterContent = this._getFilterSpec()

    return (
      <div className="filtered-table">
        {filterContent}
        <Btable className={this.props.reorderable ? 'slide-container' : null} responsive={responsive} bordered={bordered} condensed={condensed} hover={hover} striped={striped}>
          {header}
          {body}
        </Btable>
        {create}
      </div>
    )
  }
});

module.exports = Table;