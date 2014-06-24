/* Copyright (c) 2012 David Siegel

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE. */

(function(){function t(e){return 2*e+1}function n(e){return 2*e+2}function r(e){return Math.floor((e+1)/2)-1}var e=typeof module!="undefined"&&module.exports?module.exports:window.priority_queue={};e.PriorityQueue=function o(e,i){function u(e,t){var n=i[e];i[e]=i[t],i[t]=n}function a(r){var s=i.length,o,a,f;for(;;){o=r,a=t(r),f=n(r),a<s&&e(i[a],i[o])<0&&(o=a),f<s&&e(i[f],i[o])<0&&(o=f);if(o===r)break;u(r,o),r=o}}function f(e){var t=i[e],n=i.pop();return i.length===e?t:(i.length>0&&(i[e]=n,a(e)),t)}function l(e){var t=0,n=i.length,r;for(;t<n;++t){r=i[t];if(e(r))return f(t),r}return null}if(!(this instanceof o))return new o(e,i);e=e||s,i=i||[],this.deleteAll=function(t){while(l(t));},this.push=function(){var n=i.length,s=n+arguments.length,o,a;i.push.apply(i,arguments);for(;n<s;++n){o=n,a=r(n);for(;o>0&&e(i[o],i[a])<0;o=a,a=r(o))u(o,a)}return i.length},this.shift=function(){return f(0)},this.__defineGetter__("length",function(){return i.length});for(var c=r(i.length-1);c>=0;--c)a(c)};var i=e.max_first=function(t,n){return n-t},s=e.min_first=function(t,n){return t-n}})(),define("priority_queue",function(e){return function(){var t,n;return t||e.priority_queue}}(this)),define("graph_search/frontier",["priority_queue"],function(e){var t=function(){this._queue=e.PriorityQueue(function(e,t){return e.priority()-t.priority()}),this._states={}};return t.prototype.pop=function(){var e=this._queue.shift();return e?(delete this._states[e.state],e):null},t.prototype.top=function(){var e=this.pop();return e?(this.add(e),e):null},t.prototype.getNodeWithState=function(e){var t=this._states[e];return t!==undefined?t:null},t.prototype.add=function(e){if(this._states[e.state]!==undefined)throw new Error("Node with state "+e.state+" already exists in the frontier");return this._queue.push(e),this._states[e.state]=e,this},t.prototype.delete=function(e){return this._queue.deleteAll(function(t){return t.state===e.state}),delete this._states[e.state],this},t.prototype.isEmpty=function(){return this._queue.length===0},t}),define("graph_search/node",["underscore","graph_search/frontier"],function(e,t){var n=function(t){t=t||{},e.each(["problem","state","action","parent","pathCost"],function(e){if(t[e]===undefined)throw new Error("Missing option "+e+" for node constructor")}),this.problem=t.problem,this.state=t.state,this.action=t.action,this.parent=t.parent,this.pathCost=t.pathCost};return n.initialNode=function(e){return new n({problem:e,state:e.initialState,pathCost:0,parent:null,action:null})},n.prototype.child=function(e){var t=this.problem.result(this.state,e),r=this.pathCost+this.problem.stepCost(this.state,e);return new n({problem:this.problem,state:t,parent:this,action:e,pathCost:r})},n.prototype.priority=function(){return this.pathCost+this.problem.goalDistanceHeuristic(this.state)},n.prototype.path=function(){var e=[],t=this;while(t)e.push(t),t=t.parent;return e.reverse()},n}),define("graph_search/solvers/cheapest_first_search",["underscore","graph_search/frontier","graph_search/node"],function(e,t,n){var r=function(e){var r=n.initialNode(e);this.problem=e,this.frontier=new t,this.frontier.add(r),this.exploredSet={}};return r.prototype.solve=function(){var t,n,r=this;for(;;){if(this.frontier.isEmpty())return null;t=this.frontier.pop();if(this.problem.goalReached(t.state))return t.path();this.exploredSet[t.state]=!0,e.each(this.problem.possibleActions(t.state),function(e){var n=t.child(e),i=r.frontier.getNodeWithState(n.state);!i&&!r.exploredSet[n.state]?r.frontier.add(n):i&&i.priority>n.priority&&(r.frontier.delete(n),r.frontier.add(n))})}},r}),define("graph_search/problems/sliding_tile_puzzle",["underscore"],function(e){var t=function(e,t){this.size=e||3,this.initialState=t||this._goalState()};return t.RANDOM_ITERATIONS=100,t.prototype.shuffle=function(){return this.initialState=this._randomState(),this},t.prototype.possibleActions=function(e){var t=[],n,r,i;return n=this._blankCoordinate(e),r=n[0],i=n[1],i<this.size&&t.push("up"),i>1&&t.push("down"),r<this.size&&t.push("left"),r>1&&t.push("right"),t},t.prototype.result=function(t,n){var r,i,s,o,u,a,f,l;r=this._blankCoordinate(t),i=r[0],s=r[1];switch(n){case"left":o=i+1,u=s;break;case"right":o=i-1,u=s;break;case"up":o=i,u=s+1;break;case"down":o=i,u=s-1}return a=this._blankIndex(t),f=this._coordinateToIndex(o,u),l=e.clone(t),l[f]=t[a],l[a]=t[f],l},t.prototype.stepCost=function(e,t){return 1},t.prototype.goalReached=function(e){return e.join(",")===this._goalState().join(",")},t.prototype.goalDistanceHeuristic=function(t){var n=0,r=this,i,s,o,u,a,f;return e.each(t,function(e,t){if(e===null)return;i=r._indexToCoordinate(t),s=i[0],o=i[1],u=r._indexToCoordinate(e-1),a=u[0],f=u[1],n+=Math.abs(a-s)+Math.abs(f-o)}),n},t.prototype._randomState=function(){var n=this._goalState(),r=this,i,s;return e(t.RANDOM_ITERATIONS).times(function(){s=r.possibleActions(n),i=s[e.random(s.length-1)],n=r.result(n,i)}),n},t.prototype._goalState=function(){var t=[];return e(Math.pow(this.size,2)-1).times(function(e){t.push(e+1)}),t.push(null),t},t.prototype._blankCoordinate=function(e){return this._indexToCoordinate(this._blankIndex(e))},t.prototype._blankIndex=function(t){return e.indexOf(t,null)},t.prototype._indexToCoordinate=function(e){var t=e%this.size+1,n=Math.floor(e/this.size)+1;return[t,n]},t.prototype._coordinateToIndex=function(e,t){return(t-1)*this.size+(e-1)},t}),define("ui/sliding_tile_puzzle",["jquery","graph_search/problems/sliding_tile_puzzle","graph_search/solvers/cheapest_first_search"],function(e,t,n){var r={imageSize:300,puzzleSize:3,imageUrl:"http://www.acclaimimages.com/_gallery/_free_images/0124-1103-0716-0350_planet_earth_from_space_s.jpg"},i=function(n,i){this.options=e.extend({},r,i||{}),this.maxTileIndex=Math.pow(this.options.puzzleSize,2),this.squareSize=this.options.imageSize/this.options.puzzleSize,this.elementId=n,this.boardId=n+"Board",this.boardSelector="#"+this.boardId,this.puzzle=new t(this.options.puzzleSize),this.zi=1,this._render()};return i.prototype.shuffle=function(){this.puzzle.shuffle(),this._moveToState(this.puzzle.initialState)},i.prototype.solve=function(){var e,t,r;this.puzzle.initialState=this._getCurrentState(),e=new n(this.puzzle),t=e.solve();for(r=1;r<t.length;r++)this._moveToState(t[r].state)},i.prototype._render=function(){var t=this.options.puzzleSize,n=this.squareSize*t+"px",r=this.elementId,i=this,s,o,u;e("#"+r).html("<div id = '"+this.boardId+"'></div>"),e(this.boardSelector).css({position:"relative",width:n,height:n,border:"1px solid gray"});for(u=0;u<this.maxTileIndex;u++)s=u%t+1,o=Math.floor(u/t)+1,e(this.boardSelector).append("<div id='square"+(u+1)+"' data-coord-x='"+s+"' data-coord-y='"+o+"' style = 'position: absolute; "+"left: "+u%t*this.squareSize+"px; "+"top: "+Math.floor(u/t)*this.squareSize+"px; "+"width: "+this.squareSize+"px; "+"height: "+this.squareSize+"px; "+"text-align: center; "+"-moz-box-shadow: inset 0 0 20px #555555; "+"-webkit-box-shadow: inset 0 0 20px #555555; "+"box-shadow: inset 0 0 20px #555555; "+"background: #ffffff "+"url("+this.options.imageUrl+") "+ -(u%t)*this.squareSize+"px "+ -Math.floor(u/t)*this.squareSize+"px "+"no-repeat !important'>"+"</div>");e(this.boardSelector+" > #square"+this.maxTileIndex).css({backgroundImage:"",background:"#ffffff"}),e(this.boardSelector).children("div").click(function(){i._moveClickedSquare(this)})},i.prototype._moveClickedSquare=function(t){var n=e(this.boardSelector+" > #square"+Math.pow(this.options.puzzleSize,2)),r=parseInt(n.attr("data-coord-x")),i=parseInt(n.attr("data-coord-y")),s=!1,o,u;t=e(t),o=parseInt(t.attr("data-coord-x")),u=parseInt(t.attr("data-coord-y")),i==u&&Math.abs(o-r)==1&&(s=!0),r==o&&Math.abs(u-i)==1&&(s=!0),s&&(e(t).css("z-index",this.zi++),this._swapTiles(n,t))},i.prototype._swapTiles=function(e,t){var n=parseInt(e.attr("data-coord-x")),r=parseInt(e.attr("data-coord-y")),i=parseInt(t.attr("data-coord-x")),s=parseInt(t.attr("data-coord-y")),o=e.css("left"),u=e.css("top"),a=t.css("left"),f=t.css("top");e.attr("data-coord-x",i),e.attr("data-coord-y",s),t.attr("data-coord-x",n),t.attr("data-coord-y",r),e.animate({left:a,top:f},200,function(){}),t.animate({left:o,top:u},200,function(){})},i.prototype._moveTile=function(e,t){var n=t%this.options.puzzleSize+1,r=Math.floor(t/this.options.puzzleSize)+1,i=t%this.options.puzzleSize*this.squareSize+"px",s=Math.floor(t/this.options.puzzleSize)*this.squareSize+"px";e.attr("data-coord-x",n),e.attr("data-coord-y",r),e.animate({left:i,top:s},200,function(){})},i.prototype._moveToState=function(t){var n,r;for(r=0;r<t.length;r++)t[r]===null?n=e(this.boardSelector+" > #square"+this.maxTileIndex):n=e(this.boardSelector+" > #square"+t[r]),this._moveTile(n,r)},i.prototype._getCurrentState=function(){var t=[],n={},r=this,i;e(this.boardSelector+" > div[id^='square']").each(function(){var t=parseInt(e(this).attr("data-coord-x")),i=parseInt(e(this).attr("data-coord-y")),s=parseInt(e(this).attr("id").slice(-1)),o=(i-1)*r.options.puzzleSize+(t-1);n[o]=s});for(i=0;i<this.maxTileIndex;i++)n[i]==this.maxTileIndex?t.push(null):t.push(n[i]);return t},i}),define("graph_search/problems/maze",["underscore"],function(e){var t=function(e){this.options=e||{};if(this.options.height&&this.options.width)this._height=this.options.height,this._width=this.options.width,this.maze=t.randomMaze(this._height,this._width);else{if(!this.options.maze)throw"To initialize a Maze you must provide either a height and width or a maze";this.maze=this.options.maze,this._height=this.maze.length,this._width=this.maze[0].length}this.options.initialState?this.initialState=this.options.initialState:this.initialState=[0,0]};return t.N=1,t.S=2,t.E=4,t.W=8,t.DX={},t.DX[t.N]=0,t.DX[t.S]=0,t.DX[t.E]=1,t.DX[t.W]=-1,t.DY={},t.DY[t.N]=-1,t.DY[t.S]=1,t.DY[t.E]=0,t.DY[t.W]=0,t.OPPOSITE={},t.OPPOSITE[t.E]=t.W,t.OPPOSITE[t.W]=t.E,t.OPPOSITE[t.N]=t.S,t.OPPOSITE[t.S]=t.N,t.TRANSLATION={},t.TRANSLATION[t.N]="North",t.TRANSLATION[t.S]="South",t.TRANSLATION[t.E]="East",t.TRANSLATION[t.W]="West",t.randomMaze=function(n,r){function s(n,r,i){var o=e.shuffle([t.N,t.S,t.E,t.W]),u=i.length,a=i[0].length;e.each(o,function(e){var o=n+t.DX[e],f=r+t.DY[e];f>=0&&f<=u-1&&o>=0&&o<=a-1&&i[f][o]===0&&(i[r][n]=i[r][n]|e,i[f][o]=i[f][o]|t.OPPOSITE[e],s(o,f,i))})}var i=[];return e(n).times(function(t){var n=[];i.push(n),e(r).times(function(e){n.push(0)})}),s(0,0,i),i},t.prototype.possibleActions=function(n){var r=[],i=n[0],s=n[1],o=this;return e.each([t.N,t.S,t.E,t.W],function(e){(o.maze[s][i]&e)!=0&&r.push(e)}),r},t.prototype.result=function(e,n){var r=e[0],i=e[1];return[r+t.DX[n],i+t.DY[n]]},t.prototype.stepCost=function(e,t){return 1},t.prototype.goalReached=function(e){return e.join(",")===this._goalState().join(",")},t.prototype._goalState=function(){return[this._width-1,this._height-1]},t.prototype.goalDistanceHeuristic=function(e){var t=e[0],n=e[1],r=this._goalState(),i=r[0],s=r[1];return Math.abs(i-t)+Math.abs(s-n)},t}),define("ui/maze",["jquery","underscore","graph_search/problems/maze","graph_search/solvers/cheapest_first_search"],function(e,t,n,r){var i={height:10,width:10},s=function(t,r){this.options=e.extend({},i,r||{}),this._elementId=t,this._maze=new n(this.options),this._render()};return s.prototype.solve=function(){var n=new r(this._maze),i=n.solve(),s=this;t.each(i,function(t){var n=t.state[0],r=t.state[1];e("#"+s._elementId+" [data-y="+r+"]"+" [data-x="+n+"]").addClass("solution")})},s.prototype._render=function(){var r=this.options.height,i=this.options.width,s=e("#"+this._elementId);console.log(s),t.each(this._maze.maze,function(r,i){var o=e("<div />",{"class":"row","data-y":i}).appendTo(s);t.each(r,function(t,r){var i="";(t&n.N)===0&&(i+=" north"),(t&n.S)===0&&(i+=" south"),(t&n.E)===0&&(i+=" east"),(t&n.W)===0&&(i+=" west"),e("<div />",{"class":"cell"+i,"data-x":r}).appendTo(o)})})},s}),require(["graph_search/frontier","graph_search/node","graph_search/solvers/cheapest_first_search","graph_search/problems/sliding_tile_puzzle","ui/sliding_tile_puzzle","ui/maze"],function(){}),define("graph_search_ui_main",function(){});