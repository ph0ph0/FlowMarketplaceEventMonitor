// TODO: Try without async/await
var aws = require("aws-sdk");
var lambda = new aws.Lambda();
exports.handler = async (event) => {
  const index = event.iterator.Payload.index + 1;

  const invokeLambdaParams = {
    FunctionName: "FlowEventMonitorLambda",
    InvocationType: "Event", //RequestResponse is sync, Event Async
    LogType: "Tail",
  };
  try {
    console.log(`Invoking FEML`);
    await lambda.invoke(invokeLambdaParams).promise(); // await is essential, it will not work without for some reason
    const isCountReached = index >= event.iterator.Payload.count;
    const count = event.iterator.Payload.count;
    console.log(
      `index: ${index}, isCountReached: ${isCountReached}, count: ${count}`
    );
    return {
      index,
      isCountReached,
      count,
    };
  } catch (error) {
    throw new Error(`Failed to run Iterator Lambda: ${error}`);
  }
};
