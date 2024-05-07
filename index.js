const express = require("express");
const Razorpay = require("razorpay");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  try {
    var instance = new Razorpay({
      key_id: "xxxxxx",
      key_secret: "xxxxx",
    });

    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_test_1",
    };

    const myOrder = await instance.orders.create(options);

    res.status(201).json({
      success: true,
      amount,
      order: myOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

app.listen(4000, () => {
  console.log("Running on port 4000");
});
