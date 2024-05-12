const express = require("express");
const cors = require("cors");
const piesController = require("./Controllers/piesController")

const app = express();
app.use(express.json())
app.use("/pies", piesController)
app.use(cors());

const goodPies = [ 
{name: "apple pies"},
{name: "sweet potato pies"}, 
{name: "cherry pies"}
]

app.get("/", (req,res) => {
  res.send("Welcome to The House of Pies")
})

app.get("/pies", (req, res) => {
  try{
    res.send(goodPies)
  } catch(error){
    res.send(error)
  }
});

app.get("/goodPies/:goodPiesId", (req, res) => {
  const goodPiesId = req.params.goodPiesId // const {goodPiesId} = req.params /* alternate way to write the same thing */
  if(goodPiesId < goodPies.length && goodPiesId >= 0) {
    res.send(goodPies[goodPiesId])
  }else {
    res.send("The resource you are looking for does not exist in our database")
  }
})

app.post("/pies", (req, res) => {
  //We want to a dd a new resource to our database 
  //from the user we need more information 
  //the new resource they are adding , we get this
  //information from the body of the request
  console.log(req.body)
  const body = req.body
  if(body.name) {
  goodPies.push({name: body.name})
  res.send(goodPies)
  }else {
    res.send("please make sure you include a name")
  }
})


app.put('/goodPies/:goodPiesId', (req, res) => {
  const goodPiesId = req.params.goodPiesId
  const body = req.body

  if(goodPies[goodPiesId]) {
    if(goodPies.name){
      goodPies[goodPiesId] = {name: body.name}
      res.send(goodPies)
  }else  {
    res.send("please make sure you include a name")
  }
}else  {
    res.send("an anime with that id, doesn't exist")
  }
})

app.delete('/goodPies/:goodPiesId', (req, res) => {
  const id = req.params.goodPiesId 
  //we want to find a resource in our database and remove it from the datababse
  if(goodPies[id]) {
    goodPies.splice(id, 1)
    res.send("Deleted")
  }else {
    res.send('No pie with this id exists')
  }
  
})
// app.use("/goodPies");

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });


module.exports = app;
