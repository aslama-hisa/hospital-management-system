const express = require("express"); //for accessing the package express
const mongoose = require("mongoose"); //for accessing the package mongoose
const admin = require("./models/admin.js");
const Admin = require("./models/admin.js");
const Doc = require("./models/doc.js");
const Pat = require("./models/patlogin.js");
const pat = require("./models/patlogin.js");
const Apo = require("./models/appointment.js");
const Dept = require("./models/department");
const slots = require("./models/slots.js");
const history = require("./models/history.js");
const addhis = require("./models/addhis.js");
mongoose.connect("mongodb+srv://maadycnc:minipro@cluster0.10mxmii.mongodb.net/medic");
const app = express(); //to call express package
app.use(express.json()); //use the package express
let PORT = 3000; //assigning the port numb
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static("public"));

app.post("/login", (req, res) => {
    console.log(req.body);
    login(req, res);
});
app.post("/adminlogin", (req, res) => {
    console.log(req.body);
    adminlogin(req, res);
});
async function adminlogin(req, res) {
    var data = await admin.findOne(req.body);
    data = data || 0;
    if (data != 0) {
        data.pass = null;
        res.send({ status: 200, data: "valid user", user: data });
    } else res.send({ status: 404, data: "invalid user" });
}
app.post("/signup", (req, res) => {
    console.log(req.body);
    res.send({ status: 200, data: "User created Sus" });
    User.create(req.body);
});
app.post("/addadmin", (req, res) => {
    console.log(req.body);
    res.send({ status: 200, data: "Admin created Sus" });
    Admin.create(req.body);
});
app.post("/addhis", (req, res) => {
    console.log(req.body);
    res.send({ status: 200, data: "History updated Sus" });
    addhis.create(req.body);
});
app.post("/signuppatient", (req, res) => {
    console.log(req.body);
    res.send({ status: 200, data: "User created Sus" });
    Pat.create(req.body);
});
app.post("/signupdoctor", (req, res) => {
    console.log(req.body);
    Doc.create(req.body);
    res.send({ status: 200, data: "Doc created Sus" });
});

app.delete('/deletepatient', async(req, res) => {
    console.log(req.query);
    console.log(req.body);
    await datadelete(req, res)
    res.send({ status: 200, data: "Patient deleted" });
  })
  async function datadelete(req, res) {
    console.log(req.query);
    console.log(req.body);
    await Pat.deleteOne({ "email": req.body.email })
  }

  app.delete('/deletedoctor', async(req, res) => {
    console.log(req.query);
    console.log(req.body);
    await datadelete(req, res)
    res.send({ status: 200, data: "Patient deleted" });
  })
  async function datadelete(req, res) {
    console.log(req.query);
    console.log(req.body);
    await Doc.deleteOne({ "email": req.body.email })
  }
app.post("/adddept", (req, res) => {
    console.log(req.body);
    Dept.create(req.body);
    res.send({ status: 200, data: "Dept created Sus" });
});
app.get("/getdept", async (req, res) => {
    const data = await Dept.find({});
    res.send({ status: 200, data: data });
});
app.post("/getdeptdoc", async (req, res) => {
    console.log(req.body);
    const data = await Doc.find(req.body);
    res.send({ status: 200, data: data });
});
app.post("/docsignup", (req, res) => {
    console.log(req.body);
    res.send({ status: 200, data: "Doc created Sus" });
    Doc.create(req.body);
});
app.post("/doclogin", (req, res) => {
    console.log(req.body);
    doclogin(req, res);
});
app.post("/patientreg", async (req, res) => {
    console.log(req.body);
    await pat.create(req.body);
    res.send({ status: 200, data: "Pat created Sus" });
});
app.post("/patlogin", (req, res) => {
    console.log(req.body);
    patlogin(req, res);
});
app.post("/appointment", async (req, res) => {
    const TimeSlots = {
        "8:30AM - 12:30PM": "slot1",
        "1:30PM - 4:30PM": "slot2",
        "5:30PM - 8:30PM": "slot3"
    }
    console.log(req.body);
    const response = await Apo.create(req.body);
    const data = await slots.findOne({ "doctor": req.body.doc, "date": req.body.date });
    let time = TimeSlots[req.body.time];
    let slot = {};
    switch (time) {
        case "slot1": {
            slot = { "slot1": response._id };
            break;
        }
        case "slot2": {
            slot = { "slot2": response._id };
            break;
        }
        case "slot3": {
            slot = { "slot3": response._id };
            break;
        }
    }
    if (!data) {
        await slots.create({ "doctor": req.body.doc, "date": req.body.date });
    }
    await slots.updateOne({ "doctor": req.body.doc, "date": req.body.date }, slot);
    res.send({ status: 200, data: "Apointment scheduled" });
});
app.get("/getappoinments", async (req, res) => {
    console.log(req.query);
    const data = await Apo.find({ "doc": req.query.doctor });
    res.send({ "status": 200, "data": data || [] });
});
app.get("/viewappoinment", async (req, res) => {
    console.log(req.query);
    const data = await Apo.findOne({ "_id": req.query.id });
    res.send({ "status": 200, "data": data || {} });
});
app.get("/gethistory", async (req, res) => {
    console.log(req.query);
    const data = await history.find({ "appoinment": req.query.id });
    res.send({ "status": 200, "data": data || [] });
});
app.post('/addhistory', async (req, res) => {
    console.log(req.body);
    await history.create(req.body);
    res.send({ "status": 200, "data": "History added successfully" });
})
app.post("/checkslot", async (req, res) => {
    console.log(req.body);
    const data = await slots.findOne({ "doctor": req.body.doc, "date": req.body.date });
    if (!data) {
        return res.send({ "status": 200, "data": "all slot avaliable" });
    } else {
        switch (req.body.time) {
            case 'slot1': {
                if (!data.slot1) return res.send({ "status": 200, "data": "slot1 avaliable" });
                else return res.send({ "status": 403, "data": "slot1 not avaliable" });
            }
            case 'slot2': {
                if (!data.slot2) return res.send({ "status": 200, "data": "slot2 avaliable" });
                else return res.send({ "status": 403, "data": "slot2 not avaliable" });
            }
            case 'slot3': {
                if (!data.slot3) return res.send({ "status": 200, "data": "slot3 avaliable" });
                else return res.send({ "status": 403, "data": "slot3 not avaliable" });
            }
        }
        return res.send({ "status": 403, "data": "all slot are unavaliable" });
    }
});
app.get("/view", (req, res) => {
    console.log(req.body);
    fetchusers(req, res);
});
app.get("/docview", (req, res) => {
    console.log(req.body);
    fetchDocView(req, res);
});

async function fetchDocView(req, res) {
    var data = await Doc.find({});
    console.log(data);
    res.send({ status: 200, data: data });
}

app.delete("delpat", async (req, res) => {
    console.log(req.body);
    await datadelete(req, res);
    res.send({ status: 200, data: "Patient deleted" });
});
async function datadelete(req, res) {
    console.log(req.body);
    await Pat.deleteOne({ pid: req.body.pid });
}
app.get("/hisview", (req, res) => {
    console.log(req.body);
    fetchhisView(req, res);
});

async function fetchhisView(req, res) {
    var data = await addhis.find({});
    console.log(data);
    res.send({ status: 200, data: data });
}
app.get("/appoadview", (req, res) => {
    console.log(req.body);
    fetchappoaddView(req, res);
});

async function fetchappoaddView(req, res) {
    /*var data = await Apo.aggregate([{
            $lookup: {
            From: "Doc",
            LocalField: "doc",
            foreignField: "id",
            as: "Doctor_name"
            }}
        ]);
        if(JSON.stringify(data).length > 0){
            console.log(JSON.stringify(data));
            res.json(data);
        }
        else{
            res.json({status: "Data is not Exist."});
            console.log("Data is not Exist.");
        }*/
    var data = await Apo.find({});
    console.log(data);
    res.send({ status: 200, data: data });
}

app.get("/patview", (req, res) => {
    console.log(req.body);
    fetchPatView(req, res);
});

async function fetchPatView(req, res) {
    var data = await Pat.find({});
    console.log(data);
    res.send({ status: 200, data: data });
}
app.get("/apoview", (req, res) => {
    console.log(req.body);
    fetchApoView(req, res);
});

async function fetchApoView(req, res) {
    var data = await Apo.find({});
    console.log(data);
    res.send({ status: 200, data: data });
}

app.get("/", (req, res) => {
    res.send("ok");
});
async function login(req, res) {
    var data = await user.findOne(req.body);
    data = data || 0;
    if (data != 0) {
        res.send({ status: 200, data: "valid user", user: data });
    } else res.send({ status: 404, data: "invalid user" });
}
async function doclogin(req, res) {
    var data = await Doc.findOne(req.body);
    data = data || 0;
    if (data != 0) {
        data.password = null;
        res.send({ status: 200, data: "valid user", user: data });
    } else res.send({ status: 404, data: "invalid user" });
}
async function patlogin(req, res) {
    var data = await Pat.findOne(req.body);
    data = data || 0;
    if (data != 0) {
        data.password = null;
        res.send({ status: 200, data: "valid user", user: data });
    } else res.send({ status: 404, data: "invalid user" });
}
app.delete("/", (req, res) => {
    console.log(req.body);
    datadelete(req, res);
});

// app.delete("/deletedoctor", async (req, res) => {
//     try {
//         const name = req.query.name || req.body.name;
//         await Doc.deleteOne({ name: name });
//         res.status(200).json({ message: "Doctor deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to delete the Doctor" });
//     }
// });
app.put("/", (req, res) => {
    console.log(req.body);
    dataupdate(req, res);
});
async function dataupdate(req, res) {
    console.log(req.body);
    res.send(await User.updateOne({ id: req.query.id }, { $set: req.body }));
}
async function datadelete(req, res) {
    console.log(req.body);
    res.send(await User.deleteOne({ id: req.query.id }));
}
async function fetchusers(req, res) {
    var data = await user.find();
    res.send({ status: 200, data: data });
}
app.delete("/user", (reg, res) => {
    res.send("DELETE LIST");
});
app.listen(PORT, () => console.log(`Project running on http://localhost:${PORT}/`));
