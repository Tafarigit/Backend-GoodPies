const express = require("express");
const piesController = express.Router()
const db = require("../db/dbConfig");
const {getAllPies, getPie, createPie, updatePie, deletePie} = require("../queries/pies")
//When querying the database you need to use async, await syntax
function validateId (req, res, next) {
  console.log(req.params.pieId)
  // console.log(req.params.pieId)
  const pieId = req.params.pieId
  if(!Number.isInteger(pieId) || pieId < 1) {
    //this isn't a valid id , not positive integer , not number
    console.log("You have requested the wrong id")
  }
  next()
}


piesController.get("/", async (req, res) => {
  try {
    //get all pies
    // const goodPies = await db.any("SELECT * FROM goodPies");
    const goodPies = await getAllPies()
    console.log(goodPies)
    res.status(200).send(goodPies);
  } catch (error) {
    res.status(404).send("Resource could not be found");
  }

});

piesController.get("/:pieId", async(req, res) => {
    const pieId = req.params.pieId;
    // const pie = await db.oneOrNone("SELECT * FROM goodPies WHERE id=$1", [pieId])
    //console.log(pie)
    const pie = await getPie()
    if(pie){
        res.status(200).send(pie)
    }else if (pie === null) {
        res.status(400).send("The pie you requested does not exist in our database")
    }
   
})

piesController.post("/new", async(req, res) => {
//we want to add a new resource to or database
//from the user we need more information
//about the new resource they are adding
//we get this infor from the body of the request
//console.log(req.body)
const body = req.body
if(body.name) {
    const pie = await createPie()
    //** piesController to dbConfig file - db.oneOrNone("INSERT INTO goodPies(name) VALUES($1) RETURNING*", [body.name])
    //console.log(pie)
    res.status(200).send(pie)
}
else {
    res.status(400).send("please make sure you include a name")
}

})

piesController.put("/:pieId", validateId, async (req, res) => {
  const pieId = req.params.pieId;
  const body = req.body
  if(pieId) {
  const pie = await updatePie(body, pieId)
  res.send(pie)
}else {
  res.status(400).send("A pie with that ID does not exist")
}
})

piesController.delete("/:goodPiesId", async (req, res) => {
  const goodPiesId = req.params.goodPiesId;
  const goodPie = await db.oneOrNone("SELECT * FROM goodPies WHERE id=$1", [
    goodPiesId,
  ]);
  if (goodPie) {
    let deletedPie = await db.oneOrNone(
      "DELETE FROM goodPies WHERE id=$! RETURNING*",
      [goodPiesId]
    );
  }
  
});
module.exports = piesController;
