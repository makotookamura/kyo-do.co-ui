import React from 'react'
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {
  red600,
  grey400
} from 'material-ui/styles/colors';

/**
* 行き先掲示板コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
export default class Board extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
    this.state = {
      current_filter_text:""
    }
    this.hundleFilterChange = this.hundleFilterChange.bind(this);
  }


  /**
  * 描画メソッド
  * @return {undefined}
  */

  hundleFilterChange(event,newValue){
//    const line = this.props.memberStatus;
//    const line = this.props.memberStatus.filter((name) => (
//      name.toLowerCase().indexOf(newValue) >= 0
//    ));
//
    this.setState({current_filter_text : newValue});
  }

  render(){
    //チームの数だけTeamBoardコンポーネントを作成する
    //const teamBoards = this.props.memberStatus.map(team => <TeamBoard key={team.teamId} team={team}/>);
    //const memberRows = this.state.filterdMemberStatus.map((member,idx) => <MemberRow key={idx} member={member}/>);

    const filterMemberRows = this.props.memberStatus.filter((member) => (
      member.name.toLowerCase().indexOf(this.state.current_filter_text) >= 0
    ));

    const memberRows = filterMemberRows.map((member,idx) => <MemberRow key={idx} member={member}/>);
    const date = new Date().toLocaleDateString('ja-JP');

    return (
      <div>
      <h3>行き先掲示板</h3>
      <p>{date}</p>
      <TextField
        hintText="Filter"
        value={this.state.current_filter_text}
        onChange={this.hundleFilterChange}
        />
      {memberRows}
      </div>);
  }
}
/**
* チーム別行き先掲示板コンポーネント
* @see http://qiita.com/nownabe/items/2d8b92d95186c3941de0
*/
class TeamBoard extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
  }
  /**
  * 描画メソッド
  * @return {undefined}
  */
  render(){
    //メンバーの数だけMemberRowコンポーネント作成する
//    const memberRows = this.props.team.members.map((member,idx) => <MemberRow key={idx} member={member}/>);
    return (
      <div>
        <h4>{this.props.team.name}</h4>
        <table>
        <tbody>
        {memberRows}
        </tbody>
        </table>
      </div>
    );
  }
}
/**
* 描画メソッド
* @return {undefined}
*/
class MemberRow extends React.Component{
  /**
  * コンストラクタ
  * @param {Object} props プロパティ
  * @return {undefined}
  */
  constructor(props){
    super(props);
  }
  /**
  * 描画メソッド
  * @return {undefined}
  {this.props.member.name}
  <td>{this.props.member.name}</td>
  <td>{this.props.member.inBusiness ? "出勤" : "退勤"}</td>
  <td>{this.props.member.comment}</td>
  leftAvatar={<Avatar>{this.props.member.name.charAt(0).toUpperCase()}</Avatar>}
  */
  render(){
      //const memberRows = this.props.memberStatus.map((member,idx) => <MemberRow key={idx} member={member}/>);
    return (
      <List>
        <ListItem
          primaryText={this.props.member.name + "：" + this.props.member.contact}
            secondaryText={"最終更新日:" + this.props.member.lastUpdate.substr(0,16)+" "+(this.props.member.comment == null ? "" : this.props.member.comment)}
          leftAvatar={<Avatar backgroundColor={this.props.member.inBusiness ? red600 : grey400} > {this.props.member.inBusiness ? "出" : "退"}</Avatar>} />
      </List>
    );
  }
}
