// eslint-disable-next-line no-restricted-globals
addEventListener("message", message => {
  console.log("Message received from main script");
  console.log("in webworker", message.data);
  // eslint-disable-next-line no-undef
  wholeTest();
  postMessage("this is the response " + message.data * 2);
});
