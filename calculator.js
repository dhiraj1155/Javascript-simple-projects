
//jshint esversion:6
const express= require("express");
const bodyParser=require("body-parser");//using body parser we able to pass http request 

const app=express();
app.use(bodyParser.urlencoded({extended:true}));// using urlencoded we can get access of form data

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");// we can also use name of the html file but we use __dirname to get access on other PC's too.
});
app.get("/BMI_calculator",function(req,res){
    res.sendFile(__dirname +"/BMI_calculator.html");// we can also use name of the html file but we use __dirname to get access on other PC's too.
});

app.post("/",function(req,res){
    var num1=Number(req.body.num1);// here Number is taken to convert the numbers to NUMBER DATATYPE 
    var num2=Number(req.body.num2);// here Number is taken to convert the numbers to NUMBER DATATYPE

    var result= num1+num2;
  
    console.log("first number is" +req.body.num1);//this will display the numbers we have enterd at browser window on terminal window.
    console.log("second number is "+req.body.num2);//this will display the numbers we have enterd at browser window on terminal window.

    res.send("the result of calculation is "+result);
});
app.post("/BMI_calculator",function(req,res){
    var weight=parseFloat(req.body.weight);
    var height=parseFloat(req.body.height);

    var bmi=weight / (height*height);
    res.send("your bmi is " +bmi);// it shows result to new tab in browser
})
app.listen(3000,function(){
    console.log("server started on port 3000"); // 3000 is localhost
})