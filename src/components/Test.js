import React from 'react';

import Table from './toolkit/Table'
import Form from './toolkit/Form'

import StringFormat from '../services/StringFormat'
import { Link, History } from 'react-router'

var Test = React.createClass({

  mixins: [ History ],

  handleCreatePlayer: function(){
    this.history.pushState(null, '/')
  },

  render: function(){  
    let playerList = [
      {firstname: "Luc", lastname: "Merceron", teamName: "Try"},
      {firstname: "Jérémie", lastname: "Goas", teamName: "Try"},
      {firstname: "Matthias", lastname: "Gradaive", teamName: "Try"}
    ]

    let teamList = [
      {teamId: "1", content: "Try"},
      {teamId: "2", content: "Hard"}
    ]
    /*
    * filter={'spec'}
    * sorted='teamName'
    * editButton={this.handleEditPlayer}
    * createButton={{name: 'Create Player', func: this.handleCreatePlayer}}
    */
    return (
      <div id="bodyContent">
      	<Table 
    		 	kind="responsive"
    			showHeader
    			header={{firstname: 'Name', lastname: 'Last Name', teamName: 'Team'}} 
    			content={playerList}
          createButton={{name: 'Create Player', func: this.handleCreatePlayer}}
		    />

        <Form 
          title='New Player'
          tags={[
            {id: 'firstname', tag: 'Input', type: 'text', label: 'First Name', placeholder: 'First Name', required: true},
            {id: 'lastname', tag: 'Input', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true},
            {id: 'sex', tag: 'InputSelect', type: 'select', label: 'Sex', required: true, content:[
              {value: 'M', content: 'Man'},
              {value: 'W', content: 'Woman'}
            ]},
            {id: 'teamId', tag: 'InputSelect', type: 'select', label: 'Team', required: true, content: teamList}
          ]}
          tooltips={[
            {id: 'firstname', description: 'The firt name must be at least 1 caracteres long', func: StringFormat.StringMinSize1},
            {id: 'lastname', description: 'The last name must be at least 1 caracteres long', func: StringFormat.StringMinSize1},
          ]}
        />
      </div>
    )
  }
});

module.exports = Test;