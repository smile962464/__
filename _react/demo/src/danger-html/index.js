import React from 'react';
import ReactDOM from 'react-dom'

var Danger=React.createClass({
  componentDidMount(){
    ReactDOM.findDOMNode(this).innerHTML=this.props.html;
  },
  componentDidUpdate(prevProps){
    if(prevProps.html !== this.props.html){
      this.componentDidMount();
    }
  },
	render(){
  	var tag = this.props.tag;
  	return React.createElement(tag);
  }
})

var Hello = React.createClass({
    getInitialState() {
       return {
         html:'a</span><span>b'
       };
    },
    componentDidMount() {
      setTimeout(() => {
      	this.setState({
           html:'x'
        });
      },2000);
    },
    render: function() {
        return <div>
          <Danger tag="span" html={this.state.html} />
          <span dangerouslySetInnerHTML={{__html:this.state.html}}></span>
          </div>;
    }
});

ReactDOM.render(<div>demo <Hello name="World" /></div>, document.getElementById('example'));
