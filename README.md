# video-maker-bot
video-maker-bot projeto acompanhando os videos do Filipe Deschamps:

https://github.com/filipedeschamps/video-maker

# Pré requisitos

- Git (https://git-scm.com/)
- Node (https://nodejs.org)

## Api: Algorithmia ##
É necessário criar a sua chave de acesso para poder testar os robôs, pra isso você precisa acessar o site do [Algorithmia](https://algorithmia.com/).

![Algorithmin](https://i.imgsafe.org/ba/ba1d23897c.gif)

No projeto navegue até o arquivo `config.json`, dentro desse arquivo você irá trocar a `API KEY` pela que copiou no site **Algorithmia**, estrutura abaixo:
``` js
{ 
    "algorithmia":{ 
       "apiKey":"API_KEY"
    }
}