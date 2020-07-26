module.exports = {
    //Define o arquivo principal do projeto
    entry: ['@babel/polyfill','./src/main.js'],
    //Define o arquivo de Saida
    output: {
        path: __dirname + "/public",
        filename: 'bundle.js',
    },
    devServer: {
        //Caminho para onde se deve abrir o servidor da aplicação
        contentBase:  __dirname + "/public",
    },
    module: {
        //A propriedade rules de module define como o webpack deve se portar quando o usuário estiver importanto arquivos js
        rules: [
            {   
                //Por meio de uma regex, o babel procura por arquivos com terminação em .js
                test: /\.js/,
                //Exclui as pastas que o babel não irá olhar para procurar arquivos pra executar
                exclude: /node_modules/,
                //Define qual o loader será utilizado para executar os arquivos, e nesse caso é o babel.
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};