const tf = require("@tensorflow/tfjs")
const {data,classes} = require("./convertData")
//porcentagem de test

function convertToTensors(data,target,porcent){
 const indices = data.map((e,i)=>i)
 tf.util.shuffle(indices)
 const suffleData = []
 const suffleTarget = []
 indices.map(i=>{
	suffleData.push(data[i])
	suffleTarget.push(target[i])
 })
 const qtdDataToTest = Math.round(indices.length*porcent)
 const qtdDataToTrain = indices.length-qtdDataToTest

 const xDimension = suffleData[0].length
 //console.log(suffleData,suffleTarget,qtdDataToTest,qtdDataToTrain,xDimension)
 const xTensor = tf.tensor2d(suffleData,[data.length,xDimension])
 const yTensor = tf.oneHot(tf.tensor1d(suffleTarget).toInt(),classes.length)

 const xTrain = xTensor.slice([0, 0], [qtdDataToTrain, xDimension]);
 const xTest = xTensor.slice([qtdDataToTrain, 0], [qtdDataToTest, xDimension]);
 const yTrain = yTensor.slice([0, 0], [qtdDataToTrain, classes.length]);
 const yTest = yTensor.slice([0, 0], [qtdDataToTest, classes.length]);
 return [xTrain, yTrain, xTest, yTest];
}
module.exports = function(porcent){
 return tf.tidy(() => {
	const dataByClass = [[],[],[]]
	const targetByClass = [[],[],[]]
	data.map(flor=>{
	 const classFlower= flor[4]
	 dataByClass[classFlower].push([
		flor[0],
		flor[1],
		flor[2],
		flor[3]
	 ])
	 targetByClass[classFlower].push(classFlower)
	})
	//console.log(dataByClass,targetByClass)

	const xTrains = []
	const yTrains = []
	const xTests = []
	const yTests = []
	dataByClass.map((d,i)=>{
	 const [xTrain, yTrain, xTest, yTest] = convertToTensors(d,targetByClass[i],porcent)
	 xTrains.push(xTrain);
	 yTrains.push(yTrain);
	 xTests.push(xTest);
	 yTests.push(yTest);
	})

	const concatAxis = 0;
	return {tensors:
	 [
		tf.concat(xTrains, concatAxis), tf.concat(yTrains, concatAxis),
		tf.concat(xTests, concatAxis), tf.concat(yTests, concatAxis)
	 ],
		classes
	}
 })
}
