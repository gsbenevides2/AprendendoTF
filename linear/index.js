const tf =  require('@tensorflow/tfjs')
console.log("Criando Modelo de ML")
const model = tf.sequential(); 
console.log("Modelo Sequencial Criado")
console.log("Adicionando camadas ao modelo")
model.add(tf.layers.dense({inputShape: [1], units: 1}));
console.log("Camada densa criada")
console.log("Compilando modelo")
model.compile({
	loss:"meanSquaredError",
	optimizer:"sgd"
})
console.log("Modelo compilado")
console.log("Adicionando tensores")
const xs = tf.tensor2d([
1,2,3,4
],[4,1])
const ys = tf.tensor2d([
2,3,4,5
],[4,1])
console.log("Tensores x e y adicionados")
console.log("Treinado o modelo 500 vezes. Aguarde isso pode demorar um pouco")
model.fit(xs,ys,{epochs:500}).then(info=>{
	console.log("Modelo treinado")
	model.predict(tf.tensor2d([10],[1,1])).print()
})
