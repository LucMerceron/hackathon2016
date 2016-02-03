import React from 'react'
import ReactDOM from 'react-dom'
import Input from 'react-bootstrap/lib/Input'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'
import Button from 'react-bootstrap/lib/Button'
import Tooltip from './Tooltip'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import _ from 'underscore'
import DateFormat from '../../services/DateFormat'

var Form = React.createClass({
	getInitialState: function(){
		return({showTooltip: false, tooltipText: '', offsetTop: null, offsetLeft: null});
	},
	_getLocationForm: function(form, id){

		let parent;
		if (form[_.findIndex(form, {id: id})].type === 'radio'){
			parent = form[_.findIndex(form, {id: id})].parentElement.parentElement.parentElement;
		}else {
		  parent = form[_.findIndex(form, {id: id})].parentElement;	
		}

		let y = parent.offsetLeft;

		// If InputWrapper
		if (parent.parentElement.parentElement.className == 'row') {
			 parent = parent.parentElement;
			 y += parent.offsetLeft;
		}

		let x = parent.offsetTop + parent.clientHeight + 15;

		return [x, y];
	},
	_onChange: function(){
		this.setState({showTooltip: false, tooltipText: '', offsetTop: null, offsetLeft: null});
	},
	_formatValue: function(value){
		return (value || value === 0) ? DateFormat.isDate(value) ? DateFormat.getStringFromDate(value, '/') : value : '';
	},
	_onClick: function(object){
		let form = ReactDOM.findDOMNode(this.refs.form);
		// Get all id: value  && required value
		let inputs = {};
		let required = [];
		_.mapObject(form, function(val, key){
			if (val.id) {
				if (val.required) {
					required.push(val.id);
				}
				if (val.type == 'checkbox' || val.type == 'radio') inputs[val.id] = val.checked;
				else if (val.type == 'file') inputs[val.id] = val.files[0]; 
				else if (val.value !== '') inputs[val.id] = val.value;
				else if (val.value == '' && val.dataset['cannull']) inputs[val.id] = null;
			}
		});

		if (object.requireAll && this.props.tooltips) {
			let canClick = true;

			// Check every tooltip
			this.props.tooltips.some(function(value, index){
				// If the tooltip got multiple id
				if (value.id instanceof Array){
					/* Create an array with all the values id */
					let result = value.func(_.values(_.pick(inputs, value.id)));
					if (!result) {
						let [x, y] = this._getLocationForm(form, _.first(value.id));
						this.setState({showTooltip: true, tooltipText: value.description, offsetTop: x, offsetLeft: y});
						canClick = false;
						return true;
					}
				}
				// If (not(empty && notrequired) || (notempty && func))
				else if ( !( (!inputs[value.id] && required.indexOf(value.id) == -1) || ( (inputs[value.id]) && value.func(inputs[value.id]) ) ) ){
					// Display a tooltip under the value.id case
					let [x, y] = this._getLocationForm(form, value.id);
					this.setState({showTooltip: true, tooltipText: value.description, offsetTop: x, offsetLeft: y});
					canClick = false;
					return true;
				}
				return false;
			}.bind(this));

			// Send the inputs if no tooltip
			canClick ? object.func(inputs) : void(0)
		} else {
			object.func(inputs);
		}
		
	},
	_getInput: function(object, index){
		let input = []
		object.required ? object.label ? object.label.indexOf('*') == -1 ? object['label'] = object.label + '*' : null : null : null;
		if (this.props.content && (this.props.content[object.id] || this.props.content[object.id] === 0)) {
			if (object.type === 'checkbox' || object.type ==='radio') {
				input = <Input onChange={() => this._onChange()} key={index} name={object.name} data-cannull={object.cannull} id={object.id} defaultChecked={this.props.content[object.id]} readOnly={object.readOnly} type={object.type} label={object.label} placeholder={object.placeholder} required={object.required} help={object.help} className={object.className}/> 
			}	else {
				input = <Input onChange={() => this._onChange()} onKeyPress={object.onkeypress} key={index} name={object.name} data-cannull={object.cannull} id={object.id} checked={object.checked} defaultChecked={object.defaultChecked} readOnly={object.readOnly} type={object.type} label={object.label} placeholder={object.placeholder} defaultValue={this._formatValue(this.props.content[object.id])} required={object.required} help={object.help} className={object.className}/> 
			}
		} else {
	 		input = <Input onChange={() => this._onChange()} onKeyPress={object.onkeypress} key={index} name={object.name} data-cannull={object.cannull} id={object.id} checked={object.checked} readOnly={object.readOnly} type={object.type} label={object.label} placeholder={object.placeholder} value={null} required={object.required} help={object.help} className={object.className}/>
		}
		return input;
	},
	_getInputWrapper: function(object, index){
		let size = 12 / (object.content.length);
		let result = [];
		
		object.content.forEach(function(value, key){
			result.push(<Col key={key} xs={size}>{this._getObject(value)}</Col>);
		}.bind(this));

		return (
			<Input key={index} label={object.label}>
				<Row>
					{result}
				</Row>
			</Input>
		)
	},
	_getButtonInput: function(object, index){
		return <ButtonInput key={index} id={object.id} className={object.className} value={object.value} onClick={() => this._onClick(object)}/>
	},
	_getInputSelect: function(object, index){
		let options = [];

		// retrieve all options
		object.content.forEach(function(option, key){
			options.push(<option key={key} value={option.value}>{option.content}</option>)
		}.bind(this))
		return (
			(object.value || object.value === 0)
			? 
				<Input key={index} type={object.type} id={object.id} label={object.label} value={object.value} data-cannull={object.cannull} ref={object.ref} onChange={object.onChange ? () => object.onChange(ReactDOM.findDOMNode(this.refs[object.ref]).lastChild.value) : null}>
					{options}
				</Input>
			:
			(object.defaultValue || object.defaultValue === 0)
			?
				<Input key={index} type={object.type} id={object.id} label={object.label} data-cannull={object.cannull} defaultValue={object.defaultValue} ref={object.ref} onChange={object.onChange ? () => object.onChange(ReactDOM.findDOMNode(this.refs[object.ref]).lastChild.value) : null}>
					{options}
				</Input>
			:
			(this.props.content && (this.props.content[object.id] || this.props.content[object.id] === 0)) 
			? <Input key={index} type={object.type} id={object.id} label={object.label} data-cannull={object.cannull} defaultValue={this.props.content[object.id]} ref={object.ref} onChange={object.onChange ? () => object.onChange(ReactDOM.findDOMNode(this.refs[object.ref]).lastChild.value) : null}>
					{options}
				</Input>
			: <Input key={index} type={object.type} id={object.id} label={object.label} data-cannull={object.cannull} ref={object.ref} onChange={object.onChange ? () => object.onChange(ReactDOM.findDOMNode(this.refs[object.ref]).lastChild.value) : null}>
					{options}
				</Input>
		)

	},
	_getObject: function(object, index){
		switch (object.tag) {
			case 'Input':
				return this._getInput(object, index);
				break;
			case 'InputWrapper':
				return this._getInputWrapper(object, index);
				break;
			case 'ButtonInput':
				return this._getButtonInput(object, index);
				break;
			case 'InputSelect':
				return this._getInputSelect(object, index);
				break;
			default:
				return null
		}
	},
  render: function(){
  	let form = this.props.tags.map(function(value, index){
  		return value ? this._getObject(value, index) : null;
  	}.bind(this));

  	let title = this.props.title ? <h2>{this.props.title}</h2> : null;

  	let titleButton = this.props.titleButton ? <Button className="title-button" onClick={this.props.titleButton.func}>{this.props.titleButton.name}</Button> : null

  	let content = this.props.tooltips ? (<form ref='form'><Tooltip id="SupaTooltip" placement="bottom" className="in" show={this.state.showTooltip} left={this.state.offsetLeft} top={this.state.offsetTop}>{this.state.tooltipText}</Tooltip>{form}</form>): (<form ref='form'>{form}</form>);

    return (
    	<div>
    		{titleButton}
    		{title}
	      {content}
	     </div>
    )
  }
});

module.exports = Form;
