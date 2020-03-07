// eslint-disable-next-line import/no-webpack-loader-syntax
import * as workerPath from "file-loader?name=[name].js!./test.worker";

export const spawnWorker = () => {
  const myWorker = new Worker(workerPath);
  myWorker.onmessage = function(e) {
    console.log("Message received from worker", e);
  };
  myWorker.postMessage("hello");
  // @ts-ignore
  window.myWorker = myWorker;
};
