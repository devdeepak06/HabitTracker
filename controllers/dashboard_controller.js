const User = require("../models/user");
const Habit = require("../models/habit");
const passport = require("../config/passport-local-stretegy");


// Get deshboard 
module.exports.dashboard = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render("dashboard");
    }
    return res.redirect("/user/register");
};

var email = "";

// ........Get habbit  on deshboard........
module.exports.get_habit = async function (req, res) {
    try {
        if (!req.user) {
            return res.status(401).send("User not authenticated");
        }
        email = req.user.email;
        let user = await User.findOne({ email: email });
        if (user) {
            let habits = await Habit.find({
                email: email,
            });

            if (habits) {
                var days = [];
                days.push(getD(0));
                days.push(getD(1));
                days.push(getD(2));
                days.push(getD(3));
                days.push(getD(4));
                days.push(getD(5));
                days.push(getD(6));

                return res.render("dashboard", { habits, user, days });
            }
        }
    } catch (error) {
        console.log("Error to fetch dashboard", error);
    }
};

//------------------Function to return date string--------------//
function getD(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    var newDate = d.toLocaleDateString("pt-br").split("/").reverse().join("-");
    var day;
    switch (d.getDay()) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
            break;
    }
    return { date: newDate, day };
}
// add habit in database
module.exports.add_habit = async function (req, res) {
    try {
        if (req.user && req.user.email) {
            const { content } = req.body;
            const email = req.user.email;

            let habit = await Habit.findOne({ content: content, email: email });
            if (!habit) {
                let dates = [],
                    tzoffset = new Date().getTimezoneOffset() * 60000;
                var localISOTime = new Date(Date.now() - tzoffset)
                    .toISOString()
                    .slice(0, 10);
                dates.push({
                    date: localISOTime,
                    complete: "none",
                });

                await Habit.create({
                    content: content,
                    email: email,
                    dates: dates,
                });
                res.redirect("back");

            } else {
                req.flash("error", "Habit already exist");
                res.redirect("back");
            }
        } else {
            return res.redirect("/user/register");
        }
    }
    catch (error) {
        console.log("Error to add habit", error);
    }
};




    //-------------Handle Change View: Daily <--> Weekly--------------//
    module.exports.changeView = async (req, res) => {
        try {
            let user = await User.findOne({ email });
            if (user) {
                user.view = user.view === "daily" ? "weekly" : "daily";
                user.save();
            }
            res.redirect("back");
        } catch (error) {
            console.log("Error changing view");
            return;
        }
    };



    //-------------Update status of habit completion--------------//
    module.exports.updateStatus = async (req, res) => {
        try {
            var d = req.query.date;
            var id = req.query.id;
            console.log("d=", req.query.date);
            console.log("id=", req.query.id);
            let habit = await Habit.findById(id);
            if (habit) {
                let dates = habit.dates;
                let found = false;

                await dates.find(function (item, index) {
                    if (item.date === d) {
                        if (item.complete === "yes") {
                            item.complete = "no";
                        } else if (item.complete === "no") {
                            item.complete = "none";
                        } else if (item.complete === "none") {
                            item.complete = "yes";
                        }
                        found = true;
                    }
                });

                if (!found) {
                    dates.push({ date: d, complete: "yes" });
                }
                habit.dates = dates;
                habit.save();
                res.redirect("back");
            }
        } catch (error) {
            console.log("Error to update ", error);
        }
    };

    //---------Deleting a habit----------//
    module.exports.removeHabit = async (req, res) => {
        try {
            let id = req.query.id;
            console.log(req.query.id);
            await Habit.deleteMany({
                _id: {
                    $in: [id],
                },
                email,
            });

            return res.redirect("back");
        } catch (error) {
            console.log("Error in deleting record(s)!", error);
        }
    };