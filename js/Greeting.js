var today = new Date();
var hourNow = today.getHours();
var greeting;
if (hourNow >= 18 && hourNow < 24) {
    greeting = "Good Evening ^_-";
}
else if (hourNow >= 13 && hourNow < 18) {
    greeting = "Good Afternoon =_=";
}
else if (hourNow >= 4 && hourNow < 11) {
    greeting = "Good Morning :)";
}
else if (hourNow >= 0 && hourNow < 4) {
    greeting = "Hurry To Sleep o_O";
}
else {
    greeting = "Welecome ^_^";
}
document.write(greeting);