const fs = require("fs")
const tiposDeIris = [
	"Iris-setosa",
	"Iris-versicolor",
	"Iris-virginica"
]
function lerIrisData(){
	const arquivo = fs.readFileSync("./iris.data").toString()
	const linhas = arquivo.split("\n")
	return linhas.map(linha=>{
		const retorno = linha.split(",")
		tiposDeIris.map((tipo,indice)=>{
			if(tipo === retorno[4]){
				retorno[4] = indice
			}
		})
		return retorno
	})
}
function separarFlores(matriz){
	return tiposDeIris.map((elemento,indice)=>{
		return matriz.filter(elemento=>elemento[4]===indice)
	})
}
function separarDadosParaTesteETreino(porcentagemDeTeste,matriz){
	const dadosDeTeste = []
	const dadosDeTreinamento = []
	const totalDeFlores = matriz.length;
	const floresSeparadas = separarFlores(matriz)
	floresSeparadas.map(flor=>{
		const porcentagem = parseInt((flor.length-1)*porcentagemDeTeste)
		flor.map((linha,indice)=>{
			if(indice<porcentagem){
				dadosDeTeste.push(linha)
			}
			else{
				dadosDeTreinamento.push(linha)
			}
		})
	})
	return {dadosDeTeste , dadosDeTreinamento}
}
function separarXEY(matriz){
	const x = []
	const y= matriz.map(linha=>{
		x.push([
			linha[0],
			linha[1],
			linha[2],
			linha[3]
		])
		return [linha[4]]
	})
	return {y,x}
}
function converterParaTensores(){
	
}
function obterDadosDeIris(porcentagemDeTeste){
	const matriz = lerIrisData()
	const {dadosDeTeste , dadosDeTreinamento} = separarDadosParaTesteETreino(.2,matriz)
	const xEyTeste = separarXEY(dadosDeTeste)
	const xEyTreino = separarXEY(dadosDeTreinamento)
	return matriz
}
module.exports= {
	obterDadosDeIris,
	lerIrisData,
	tiposDeIris
}
