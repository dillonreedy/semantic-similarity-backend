(this["webpackJsonpsemantic-similarity"]=this["webpackJsonpsemantic-similarity"]||[]).push([[0],{49:function(e,t,n){e.exports=n(78)},54:function(e,t,n){},59:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(15),i=n.n(r),o=(n(54),n(10)),c=n(16),l=n(11),u=n(17),p=n(18),m=n(21),h=n(4),d=n(106),w=n(104),b=n(100),f=n(107),g=n(102),v=n(105),y=n(103),A=function(e){return s.a.createElement("div",{className:e.className,style:{width:"".concat(e.percentage,"%")}},e.percentage,"%")},E=function(e){return s.a.createElement("div",{className:e.className},s.a.createElement(A,{className:e.fillerClassName,percentage:e.percentage}))},O=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes;return s.a.createElement("div",null,s.a.createElement("div",{style:{display:"inline-block",verticalAlign:"middle"}},s.a.createElement(E,{className:e.progressBar,fillerClassName:e.filler,percentage:this.props.percentage})))}}]),t}(s.a.Component),j=Object(h.a)((function(e){return{progressBar:{position:"relative",height:20,width:350,borderRadius:50,border:"1px solid #333",textAlign:"center"},filler:{background:"#1DA598",height:"100%",borderRadius:"inherit",transition:"width 1.5s ease-in"},percentageText:{fontFamily:"Roboto",padding:5}}}))(O),C=(n(59),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e="";this.props.isDisabled&&(this.props.userAnswer===this.props.value&&this.props.userAnswer!==this.props.answer&&(e="wrong-answer"),this.props.answer===this.props.value&&(e="right-answer"));var t=s.a.createElement("span",{className:e},this.props.label);return s.a.createElement("div",null,s.a.createElement("div",{style:{display:"inline-block",verticalAlign:"middle",width:150}},s.a.createElement(v.a,{value:this.props.value,control:s.a.createElement(y.a,{color:"default"}),disabled:this.props.isDisabled,label:t})),s.a.createElement("div",{style:{display:"inline-block",verticalAlign:"middle"}},s.a.createElement(j,{percentage:this.props.percentage})))}}]),t}(s.a.Component));function S(e){return e.isDisplayed?s.a.createElement("div",{style:{color:"red",fontSize:".9em"}},"User must select an answer to submit."):null}var k=n(30),N=n.n(k),Q=n(40),x=n(41),D=n.n(x);function B(){return(B=Object(Q.a)(N.a.mark((function e(t){var n;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/getQuestion",e.next=3,D.a.get("/getQuestion",{params:t});case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var M={getQuestion:function(e){return B.apply(this,arguments)}},R=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={answer:"",isDisabled:!1,userAnswer:"",noAnswerOnSubmit:!1,words:[],synonym:"",totalQuestions:1,correctAnswers:0,aiCorrectAnswers:0},n.handleSubmit=function(e){if(n.state.userAnswer){n.state.userAnswer===n.state.answer&&n.setState({correctAnswers:n.state.correctAnswers+1});var t=Math.max.apply(Math,Object(o.a)(n.state.words.map((function(e){return e.percentage})))),a=[];n.state.words.forEach((function(e){e.percentage===t&&a.push(e.word)})),a.includes(n.state.answer)&&n.setState({aiCorrectAnswers:n.state.aiCorrectAnswers+1}),n.setState({isDisabled:!0,noAnswerOnSubmit:!1})}else n.setState({noAnswerOnSubmit:!0})},n.handleNext=function(e){M.getQuestion().then((function(e){n.setState(e)})).then((function(){n.setState({userAnswer:"",isDisabled:!1,noAnswerOnSubmit:!1,totalQuestions:n.state.totalQuestions+1})}))},n.handleChange=function(e){n.setState({userAnswer:e.target.value})},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this;M.getQuestion().then((function(t){e.setState(t)}))}},{key:"render",value:function(){var e=this,t=this.props.classes,n=this.state.words.map((function(t,n){return s.a.createElement(C,{userAnswer:e.state.userAnswer,answer:e.state.answer,isDisabled:e.state.isDisabled,label:t.word,value:t.word,percentage:t.percentage,key:n})}));return s.a.createElement("div",null,s.a.createElement(w.a,{component:"fieldset",className:t.formControl},s.a.createElement("div",null,"Correct user answers per question: ",this.state.correctAnswers,"/",this.state.totalQuestions),s.a.createElement("div",null,"Correct AI answers per question: ",this.state.aiCorrectAnswers,"/",this.state.totalQuestions),s.a.createElement(f.a,{component:"legend"},"Select the closest synonym to ",s.a.createElement("b",null,this.state.synonym),":"),s.a.createElement(S,{isDisplayed:this.state.noAnswerOnSubmit}),s.a.createElement(d.a,{"aria-label":"synonym",name:"synonym1",value:this.state.userAnswer,onChange:this.handleChange},n),s.a.createElement(g.a,{m:2},s.a.createElement(b.a,{variant:"contained",onClick:this.handleSubmit},"Submit"),s.a.createElement(b.a,{color:"primary",onClick:this.handleNext},"Next Question"))))}}]),t}(s.a.Component),W=Object(h.a)((function(e){return{formControl:{margin:e.spacing(3)}}}))(R);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.0812a888.chunk.js.map