const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function testAdditionalFeatures() {
  try {
    await client.connect();

    // const subscriber = client.duplicate(); //create a new client -> shares the same connection
    // await subscriber.connect(); // connect to redis server for the subscriber

    // await subscriber.subscribe("dummy-channel", (message, channel) => {
    //   console.log(`Received message from ${channel}: ${message}`);
    // });

    //publish message to the dummy channel
    // await client.publish("dummy-channel", "SOme dummy data from publiser");
    // await client.publish(
    //   "dummy-channel",
    //   "Some new message again from publiser"
    // );

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // await subscriber.unsubscribe("dummy-channel");
    // await subscriber.quit(); // close the subscriber connection

    //pipelining & transactions
    //     const multi = client.multi();

    //     multi.set("key-transaction1", "value1");
    //     multi.set("key-transaction2", "value2");
    //     multi.get("key-transaction1");
    //     multi.get("key-transaction2");

    //     const results = await multi.exec();
    //     console.log(results);

    //     const pipeline = client.multi();
    //     multi.set("key-pipeline1", "value1");
    //     multi.set("key-pipeline2", "value2");
    //     multi.get("key-pipeline1");
    //     multi.get("key-pipeline2");

    //     const pipelineresults = await multi.exec();
    //     console.log(pipelineresults);

    //     //batch data operation ->
    //     const pipelineOne = client.multi()

    //     for(let i =0 ;i<1000; i++){
    //         pipeline.set(`user:${i}:action`, `Action ${i}`)
    //     }

    //     await pipelineOne.exec()

    //     const dummyExample = client.multi()
    //     multi.decrBy('account:1234:balance', 100)
    //     multi.incrBy('account:0000:balance', 100)

    //     const finalresults = await multi.exec()

    //    const cartExample = client.multi()
    //    multi.hIncrBy('cart:1234', 'item_count', 1)
    //    multi.hIncrBy('cart:1234', 'total_price', 10)

    //    await multi.exec()
    console.log("Performance test");
    console.time("without pipelining");

    for (let i = 0; i < 1000; i++) {
      await client.set(`user${i}`, `user_value${i}`);
    }

    console.timeEnd("without pipelining");

    console.time("with pipelining");
    const bigPipeline = client.multi();

    for (let i = 0; i < 1000; i++) {
      bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
    }

    await bigPipeline.exec();

    console.timeEnd("with pipelining");
  } catch (e) {
    console.error(e);
  } finally {
    client.quit();
  }
}

testAdditionalFeatures();
