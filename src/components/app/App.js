import React from "react";
import "./App.scss";
import FriendsService from "../../services/friendsService/friendsService";
import MDSpinner from "react-md-spinner";
import Header from "../header/Header";
import Body from "../body/body";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      friends: null,
      error: null
    };
  }

  componentDidMount() {
    let _this = this;
    FriendsService.getFriendsList()
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            _this.setState({ friends: data.friends });
          });
        } else {
          this.setState({
            error: "Failed to get list of friends"
          });
        }
      })
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    const { friends, error } = this.state;

    if (error) {
      return <div className="app-error"> {error} </div>;
    } else if (friends === null) {
      return (
        <div className="app-loading">
          <MDSpinner size={200} />
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header />
          <Body friends={friends} />
        </div>
      );
    }
  }
}
