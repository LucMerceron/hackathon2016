import React from 'react';

import { Link } from 'react-router'
import Table from './Table'

var TestComponents = React.createClass({

  getInitialState: function(){
    return { 
      content: [
            {id: '1', name: 'Roger', bann: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Gwenn_ha_Du_%2811_mouchetures%29.svg/langfr-800px-Gwenn_ha_Du_%2811_mouchetures%29.svg.png', sexe: 'M', equipe: 'Dinasty'},
            {id: '2', name: 'Janny', bann: 'http://www.all-flags-world.com/country-flag/France/flag-france-XL.jpg', sexe: 'W', equipe: 'LMNplayers'},
            {id: '3', name: 'Matt', bann: 'http://www.flaginstitute.org/wp/wp-content/uploads/2012/10/UK-Union-Flag.png', sexe: 'M', equipe: 'FRT', real_id: '122551'},
            {id: '4', name: 'Bryan', sexe: 'M', equipe: 'Republic', real_id: '122551'},
            {id: '5', name: 'Oconel', bann: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/US_flag_48_stars.svg/220px-US_flag_48_stars.svg.png', sexe: 'W', equipe: 'Majoritary', real_id: '122551'},
            {id: '6', name: 'Sylvie', sexe: 'W', equipe: 'Idolic', real_id: '122551'},
            {id: '7', name: 'Sophia', bann: 'http://www.flaginstitute.org/wp/wp-content/uploads/2012/10/UK-Union-Flag.png', sexe: 'M', equipe: 'SmartphoneX', real_id: '122551'}
          ],
     }
  },

  componentDidMount: function(){   

  },
  componentWillUnmount: function(){

  },

  _gestionRowCall: function(row){
    console.log('Gestion Row Called for', row);
  },
  _gestionColumnCall1: function(row){
    console.log('Gestion Column1 Called for', row);
  },
  _gestionColumnCall2: function(row){
    console.log('Gestion Column2 Called for', row);
  },
  _gestionEdit: function(row){
    console.log('Gestion Edit Called for', row);    
  },

  render: function(){
    return (
      <div className="col12">
        <div className="col4 min-width-2">
          <Table 
            kind="responsive" 
            editButton={this._gestionEdit}
            showHeader
            filter={'spec'}
            columnLinks={{bann: this._gestionColumnCall1}} 
            header={{id: '#', name: 'Name', bann: 'Bannière', sexe: 'Sexe', equipe: 'Equipe'}} 
            content={this.state.content}
          />
          <Table 
            kind="responsive bordered" 
            editButton={this._gestionEdit}
            showHeader
            filter={'simple'}
            rowLink={this._gestionRowCall} 
            columnLinks={{name: this._gestionColumnCall1, sexe: this._gestionColumnCall2}} 
            header={{id: '#', name: 'Name', bann: 'Bannière', sexe: 'Sexe', equipe: 'Equipe'}} 
            content={this.state.content}
          />
        	<Table 
            kind="responsive striped" 
            editButton={this._gestionEdit}
            showHeader
            columnLinks={{bann: this._gestionColumnCall1, equipe: this._gestionColumnCall2}} 
            header={{id: '#', name: 'Name', bann: 'Bannière', sexe: 'Sexe', equipe: 'Equipe'}} 
            content={this.state.content}
          />
          <Table 
            kind="responsive striped" 
            columnLinks={{bann: this._gestionColumnCall1, equipe: this._gestionColumnCall2}} 
            header={{id: '#', name: 'Name', bann: 'Bannière', sexe: 'Sexe', equipe: 'Equipe'}} 
            content={this.state.content}
          />
        </div>
        <div className="col4 min-width-2">

        </div>
      </div>
    )
  }
});

module.exports = TestComponents;