const fs = require("fs")
const classes = [
 "Iris-setosa",
 "Iris-versicolor",
 "Iris-virginica"
]
const data = fs.readFileSync("iris.data").toString()

const parsedData = []

data.split("\n").map(flor=>{
 if(flor !== "") parsedData.push(
	flor.split(",").map((data,index)=>{
	 if(index===4) return classes.indexOf(data)
	 else return parseFloat(data)
	})
 )
})
module.exports={
 data:parsedData,
 classes
}
