import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
const cors = require("cors");
const fetch = require("node-fetch");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore(); // Add this

const app = express();
const main = express();
app.use(cors());
main.use("/api/v1", app);
main.use(bodyParser.json());
export const webApi = functions.https.onRequest(main);

app.post("/users", async (request, response) => {
  try {
    const {username, name, password, phone, address, type} = request.body;
    const data = {
      username,
      name,
      password,
      phone,
      address,
      type,
    };
    const obj = await db.collection("users").add(data);
    const final = await obj.get();

    response.json({
      id: obj.id,
      data: final.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/users/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    if (!userId) throw new Error("User ID is required");
    const user = await db.collection("users").doc(userId).get();
    if (!user.exists) {
      throw new Error("User doesnt exist.");
    }
    response.json({
      data: user.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});
app.put("/users/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const {username, name, password, phone, address, type} = request.body;
    if (!userId) throw new Error("id is blank");
    const data = {
      username,
      name,
      password,
      phone,
      address,
      type,
    };
    const obj = await db.collection("users")
        .doc(userId)
        .set(data, {merge: true});
    response.json({
      time: obj,
      data: data,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/menu", async (request, response) => {
  try {
    const {name, image, available, price} = request.body;
    const data = {
      name,
      image,
      available,
      price,
    };
    const obj = await db.collection("menu").add(data);

    response.json({
      id: obj.id,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});


app.get("/menu", async (request, response) => {
  try {
    const menuSnapshot = await db.collection("menu").get();
    interface MenuType {
      id: string;
      data: object;
    }
    const menu: MenuType[] = [];
    menuSnapshot.forEach(
        (item) => {
          menu.push({
            id: item.id,
            data: item.data(),
          });
        }
    );
    response.json(menu);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.put("/menu/:id", async (request, response) => {
  try {
    const menuId = request.params.id;
    const {name, image, available, price} = request.body;
    if (!menuId) throw new Error("id is blank");
    const data = {
      name,
      image,
      available,
      price,
    };
    const obj = await db.collection("menu")
        .doc(menuId)
        .set(data, {merge: true});
    response.json({
      time: obj,
      data: data,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});


// app.put("/order/:id", async (request, response) => {
//     try {
//       const orderId = request.params.id;
//       const {name, quantity, foodId, price} = request.body;
//       if (!OrderId) throw new Error("id is blank");
//       const data = {
//         name,
//         quantity,
//         foodId,
//         price,
//       };
//       const obj = await db.collection("order")
//           .doc(orderId)
//           .set(data, {merge: true});
//       response.json({
//         time: obj,
//         data: data,
//       });
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });


// /rest - User can post the food by sending
app.post("/rest", async (request, response) => {
  try {
    const {name, price} = request.body;
    const data = {
      name,
      price,
    };
    await db.collection("restaurant").add(data);
    response.json({
      status: "success",
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

// /rest - get the food items
app.get("/rest", async (request, response) => {
  try {
    const restSnapshot = await db.collection("restaurant").get();
    interface RestType {
      id: string;
      data: object;
    }
    const rest: RestType[] = [];
    restSnapshot.forEach(
        (item) => {
          rest.push({
            id: item.id,
            data: item.data(),
          });
        }
    );
    response.json(rest);
  } catch (error) {
    response.status(500).send(error);
  }
});


// /rest - update the rest food items
app.put("/rest/:id", async (request, response) => {
  try {
    const menuId = request.params.id;
    const {name, price} = request.body;
    if (!menuId) throw new Error("id is blank");
    const data = {
      name,
      price,
    };
    const obj = await db.collection("restaurant")
        .doc(menuId)
        .set(data, {merge: true});
    response.json({
      time: obj,
      data: data,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

// delete a food item
app.delete("/rest/:id", async (request, response) => {
  try {
    const foodId = request.params.id;
    const obj = await db.collection("restaurant")
        .doc(foodId).delete();
    response.json({obj});
  } catch (error) {
    response.status(500).send(error);
  }
});

// get all orders.
// TODO make time global in response
app.get("/orders", async (request, response) => {
  try {
    const restSnapshot = await db.collection("orders").get();
    interface RestType {
      id: string;
      orderDetails: object;
    }
    const order: RestType[] = [];
    restSnapshot.forEach(
        (item) => {
          order.push({
            id: item.id,
            orderDetails: item.data(),
          });
        }
    );
    response.json(order);
  } catch (error) {
    response.status(500).send(error);
  }
});


// post a new order
app.post("/orders/:id", async (request, response) => {
  try {
    const userId : string = request.params.id;
    const {food, time, pickUpTime, carDescription} = request.body;
    const data = {
      food,
      "userId": userId,
      "status": 0,
      "time": time,
      "pickUpTime:": pickUpTime,
      "carDescription": carDescription,
    };
    await db.collection("orders").add(data);
    response.json({
      status: "success",
    });
  } catch (error) {
    response.status(500).send(error);
  }
});


// get orders by order id.
app.get("/orders/:id", async (request, response) => {
  try {
    const restSnapshot = await db.collection("orders").get();
    interface RestType {
      foodItems: object;
    }
    const order: RestType[] = [];
    restSnapshot.forEach(
        (item) => {
          if (request.params.id === item.id) {
            order.push({
              foodItems: item.data(),
            });
          }
        }
    );
    response.json(order);
  } catch (error) {
    response.status(500).send(error);
  }
});

// get orders by user id.
// TODO
app.get("/orders/users/:id", async (request, response) => {
  try {
    const coll = db.collection("orders");
    const orSnap = await coll.where("userId", "==", request.params.id).get();
    interface RestType {
      food: object;
      orderId: string;
    }
    const food: RestType[] = [];
    orSnap.forEach(
        (item) => {
          food.push({
            food: item.data(),
            orderId: item.id,
          });
        }
    );
    response.json(food);
  } catch (error) {
    response.status(500).send(error);
  }
});


// change status to complete in restaurant id.
app.put("/orders/rest/:id", async (request, response) => {
  try {
    const menuId = request.params.id;
    const {status} = request.body;
    const data = {
      status,
    };
    const obj = await db.collection("orders")
        .doc(menuId)
        .set(data, {merge: true});
    response.json({
      time: obj,
      data: data,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

// token for signin

app.post("/users/signIn", async (request, response) => {
  try {
    const coll = db.collection("users");
    const {email} = request.body;
    const orSnap = await coll.where("username", "==", email).get();
    orSnap.forEach(
        (item) => {
          response.json(item.id);
        }
    );
    response.json("User Not found!");
  } catch (error) {
    response.status(500).send(error);
  }
});

// filter api with time
app.post("/orders/time", async (request, response) => {
  try {
    const coll = db.collection("orders");
    const {begin, end} = request.body;
    console.log(begin);
    console.log(end);
    const orSnap = await coll.where("time", ">=", begin).get();
    interface RestType {
      food: object;
      orderId: string;
    }
    const food: RestType[] = [];
    orSnap.forEach(
        (item) => {
          const data = item.data();
          console.log(data);
          food.push({
            food: item.data(),
            orderId: item.id,
          });
        }
    );
    response.json(food);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.post("/signIn", async (request, response)=>{
  const {email, password} = request.body;

  const p = await fetch("https://worker.chokkarapu.workers.dev/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"email": email, "password": password}),
  });
  const k = await p.json()
  // response.json("This is working");
  response.json(k);
});


// app.post("/signIn", async (request, response)=>{
//   const {email, password, name, phone, address, type} = request.body;

//   const p = await fetch("https://worker.chokkarapu.workers.dev/signUp", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({"email": email,
//  "password": password, "name": name, "
// phone": phone, "address": address, "type": type}),
//   });

//   response.json(p);
// });
