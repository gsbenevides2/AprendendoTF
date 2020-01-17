const tf = require("@tensorflow/tfjs")
const readline = require("readline-sync")
const irisData = require("./getIrisData")(.2)
const [xTrain,yTrain,xTest,yTest] = irisData.tensors
async function trainModel(){
 const model = tf.sequential()
 const taxaDeAprendizado = .01
 const epocas = 40
 const otmizador = tf.train.adam(taxaDeAprendizado)

 model.add(
	tf.layers.dense({
	 units:10,
	 activation:'sigmoid',
	 inputShape:[xTrain.shape[1]]
	})
 )
 model.add(
	tf.layers.dense({
	 units:3,
	 activation:'softmax'
	})
 )
 model.compile({
	optimizer:otmizador,
	loss:'categoricalCrossentropy',
	metrics:[
	 'accuracy'
	]
 })
 await model.fit(xTrain,yTrain,{
	epochs:epocas,
	validationData:[xTest,yTest],
	calbacks:{
	 onEpochEnd:async(epoch,logs)=>{
		console.log(epoch,logs.loss)
		await tf.nextFrame()
	 }
	}
 })
 return model
}
trainModel().then(model=>{
 console.log("Bora classificar um iris?")
 	const q1 = readline.questionFloat("Comprimento da sépala em cm?")
	const q2 = readline.questionFloat("Largura da sépala em cm?")
	const q3 = readline.questionFloat("Comprimento dq pétala em cm?")
	const q4 = readline.questionFloat("Largura da pérala em cm?")

 const input = tf.tensor2d([q1,q2,q3,q4],[1,4])
 const prevision = model.predict(input).argMax(-1).dataSync()
 console.log("Resultado:",irisData.classes[prevision[0]])
})
