const express = require('express');
const app = express();


app.use(express.json());

function obterNumerosCPF(cpf) { // Função onde eu Pego o cpf e tiro os 9 primeiros digitos
    return cpf.replace(/\D/g, '').split('').slice(0, 9).map(Number); // faz a limpeza de letras e caracteres e deixa somente os numeros, no .split, faz a separação de numero por array, e slice seleciona os 9 primeiros numeros
}

function calcularDigito(cpfArray, multiplicadorInicial) { // Aqui os indices são o cpf da função acima, e o multiplicador conforme a etapa do calculo
    let resultado = cpfArray.reduce((acumulador, numero, index) => {
        return acumulador + numero * (multiplicadorInicial - index);
    }, 0);
    return resultado % 11 < 2 ? 0 : 11 - (resultado % 11); // if ternarion onde se o resultado for menor que < 2 (0 ou 1) ele retorna 0, : se não pega o Resultado do resto da divisão e diminui por 11
}

function validarCPF(cpf) { // função que roda todo o calculo 
    let cpfNumeros = obterNumerosCPF(cpf); // aqui ele pega o cpf da função obterNumerosCPF() e torna uma variavel
    let primeiroDigito = calcularDigito(cpfNumeros, 10); // aqui executa a primeira ação do calculo que seria 9 digitos, Multiplicando cada numero do cpf da esqueda para direitoa  por 10,9,8,7,6,5,4,3,2 
    let segundoDigito = calcularDigito([...cpfNumeros, primeiroDigito], 11);// aqui e a segunda etapa, onde adiciona o numero verificador do calculo anterior
    
    let cpfCompleto = [...cpfNumeros, primeiroDigito, segundoDigito].join(''); // aqui Junta todo o cpf com os verificadores do primeiroDigito e do segundoDigito
    return cpf.replace(/\D/g, '') === cpfCompleto; // e retorna o cpf completo comparando com o cpf inicial.
}


app.get('/validar/:cpf', (req, res) => {
    const { cpf } = req.params;
    const valido = validarCPF(cpf);
    res.json({ cpf, valido });
});


app.post('/validar', (req, res) => {
    const { cpf } = req.body;
    if (!cpf) return res.status(400).json({ erro: 'CPF não informado' });

    const valido = validarCPF(cpf);
    res.json({ cpf, valido });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
