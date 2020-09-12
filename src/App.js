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
import pdfjs from 'pdfjs-dist/es5/build/pdf.js';
import pdfjsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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

    // @TODO resolve error pdf.js:24519 Not allowed to load local resource
    // const loadFile = pdfjs.getDocument(filePath);
    // parse Common App requirements grid below to demonstrate functionality
    // (https://appsupport.commonapp.org/applicantsupport/s/article/Where-can-I-find-the-Requirements-Grid)
    const loadFile = pdfjs.getDocument('https://content.commonapp.org/Files/ReqGrid.pdf');
    loadFile.promise.then(pdf => {
      this.chain("", pdf, 1, pdf._pdfInfo.numPages);
    }, reason => {
      console.error(reason);
    })
  }

  chain(text, pdf, pageNumber, pageCount) {
    if (pageNumber <= pageCount) {
      const page = pdf.getPage(pageNumber);
      pageNumber++;
      page.then(page => {
        let pageText = page.getTextContent();
        let hyphen = false;
        pageText.then(pageText => {
          for (let i = 0; i < pageText.items.length; i++) {
            let next = pageText.items[i].str;
            if (next.charAt(next.length - 1) === "-") {
                text += next.substring(0, next.length - 1);
                hyphen = true;
            } else if (hyphen) {
                text += next;
                hyphen = false;
            } else {
                text += " " + next;
            }
          }
          return this.chain(text, pdf, pageNumber, pageCount);
        });
      });
    } else {
      const wordCount = text.split(/\s+/).length;
      this.setState({
        wordCount: wordCount,
        parsedPDF: text,
        isParsing: false
      });
      const parsedHistory = this.state.history === null ? [] : JSON.parse(this.state.history);
      parsedHistory.push({
        nickname: this.state.nickname,
        fileName: this.state.file.name,
        timestamp: moment().format("dddd, M/DD/YY, h:mm a"),
        wordCount: wordCount
      });
      const historyString = JSON.stringify(parsedHistory);
      this.setState({ history: historyString});
      localStorage.setItem("uploads", historyString);
      return Promise.resolve();
    }
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
