const express = require("express")
const UserModel = require("./../models/user")
const router = express.Router()

router.post("/api/add_user" , async (req, res) => {
    const it = await UserModel.find({ email: user.email })
    if (it && it.length > 0) {
        res.json({ error_message: "Користувач з такою електронною адресою вже існує: " + user.email })
        return;
    }

    const newUser  = { };
    for (let key of ["email", "password", "name", "sex", "age"]) {
        const it = req.body[key]
        if (!it) continue;
        newUser[key] = key === "sex" && it !== "male" && it !== "female" && it !== "other" ? "other" : it;
    }

    await new UserModel(newUser)
        .save()
        .then(it => res.json(it))
        .catch(t => res.status(500).send(t.message));
});

router.post("/api/edit_user:id?" , async (req, res) => {
    const id = req.query.id
    if (!id) {
        res.status(400).send("У запиті відсутній обов'язковий параметр: id");
        return
    }

    const update  = { };

    for (let key of ["email", "password", "name", "sex", "age"]) {
        const it = req.body[key]
        if (!it || (key === "sex" && it !== "male" && it !== "female" && it !== "other")) continue;
        update[key] = it;
    }

    await UserModel.findByIdAndUpdate(id, update, { new: true })
        .then(it => res.json(it))
        .catch(t => res.status(500).send(t.message))
});

router.get("/api/get_all_users" , async (req, res) => {
    await UserModel.find()
        .then(it => res.json(it))
        .catch(t => res.status(500).send(t.message));
});

router.get("/api/get_user:id?" , async (req, res) => {
    const id = req.query.id
    if (!id) {
        res.status(400).send("У запиті відсутній обов'язковий параметр: id");
        return
    }
    await UserModel.findById(id)
        .then(it => {
            if (it) res.json(it);
            else res.json({ error_message: "Користувача з таким 'id' не знайдено" })
        }).catch(t => res.status(500).send(t.message));
});

router.delete("/api/delete_user:id?" , async (req, res) => {
    const id = req.query.id
    if (!id) {
        res.status(400).send("У запиті відсутній обов'язковий параметр: id");
        return
    }
    await UserModel.findByIdAndDelete(id)
        .then(it => res.json(it))
        .catch(t => res.status(500).send(t.message));
});

router.delete("/api/delete_all" , async (req, res) => {
    await UserModel.deleteMany()
        .then(it => res.json(it))
        .catch(t => res.status(500).send(t.message));
});


module.exports.userRouter = router