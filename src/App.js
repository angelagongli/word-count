import React, { Component } from 'react';
import Header from "./components/Header";
import Intro from "./components/Intro";
import Upload from "./components/Upload";
import Output from "./components/Output";
import History from "./components/History";
import Submit from "./components/Submit";
import { initializeIcons } from '@uifabric/icons';
import 'office-ui-fabric-react/dist/css/fabric.css';
import "./assets/css/style.css"
import moment from "moment";
// import parse from "./utils/parse";

initializeIcons();

class App extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
      nickname: "",
      timestamp: "",
      isParsing: false,
      parsedPDF: "",
      wordCount: null,
      history: localStorage.getItem("uploads")
    };
    this.updateUpload = this.updateUpload.bind(this);
  }

  updateUpload(file, filePath, nickname) {
    this.setState({
      file: file,
      nickname: nickname,
      timestamp: moment().format("dddd, M/DD/YY, h:mm a"),
      isParsing: true
    });

    // const text = parse(filePath);

    file.text().then(text => {
      const splitArr = text.split(/\s+/);
      this.setState({
        wordCount: splitArr.length,
        parsedPDF: text,
        isParsing: false
      });
      const parsedHistory = this.state.history === null ? [] :
        JSON.parse(this.state.history);
      parsedHistory.push({
        nickname: nickname,
        fileName: file.name,
        timestamp: moment().format("dddd, M/DD/YY, h:mm a"),
        wordCount: splitArr.length
      });
      const historyString = JSON.stringify(parsedHistory);
      this.setState({ history: historyString});
      localStorage.setItem("uploads", historyString);
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Intro />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <Upload updateUpload={this.updateUpload} />
            </div>
            <div className="col-12 col-md-6">
              <Output
                file={this.state.file}
                nickname={this.state.nickname}
                timestamp={this.state.timestamp}
                isParsing={this.state.isParsing}
                parsedPDF={this.state.parsedPDF}
                wordCount={this.state.wordCount}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <History history={this.state.history} />
            </div>
            <div className="col-12 col-md-6">
              <Submit />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
