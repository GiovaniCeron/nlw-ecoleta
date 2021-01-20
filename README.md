<p align="center">
 <img width=200px height=200px src="./frontend/src/assets/logo.svg" alt="Logo do Projeto">
</p>

<h3 align="center">NLW - ECOLETA</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-building-yellow)]()
[![GitHub Issues](https://img.shields.io/github/issues/GiovaniCeron/nlw-ecoleta)](https://github.com/GiovaniCeron/nlw-ecoleta/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/GiovaniCeron/nlw-ecoleta)](https://github.com/GiovaniCeron/nlw-ecoleta/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
Seu Ecommerce de coleta de resíduos
<br> 
</p>

## Tabela de Conteudos

- [Tabela de Conteudos](#tabela-de-conteudos)
- [Sobre <a name = "sobre"></a>](#sobre-)
- [Iniciando <a name = "iniciando"></a>](#iniciando-)
- [Instalação <a name = "instalacao"></a>](#instalação-)
- [Executando <a name = "executando"></a>](#executando-)
- [Ferramentas Utilizadas <a name = "ferramentas"></a>](#ferramentas-utilizadas-)
- [Autores <a name = "autores"></a>](#autores-)

## Sobre <a name = "sobre"></a>

Projeto desenvolvido com base na semana NLW da Rockeseat com o intuito de obter novos conhecimentos.

## Iniciando <a name = "iniciando"></a>

Antes de começar, é necessário ter em sua máquina o [GIT](https://git-scm.com/downloads) e o [Node.js](https://nodejs.org/en/download/) instalados.
Recomendo também a utilização do editor [VSCode](https://code.visualstudio.com/download) ou similar.

Possuindo esses requisitos, agora pode ser feito o clone do repositório utilizando o git no seu terminal.

``` bash
#Clone do repositório
$git clone https://github.com/GiovaniCeron/nlw-ecoleta.git

#Acesse a pasta do projeto em seu terminal
$cd nlw-ecoleta
```

O Projeto contém as pastas backend, frondend e mobile. Com o desenvolvimento específico de cada plataforma.

## Instalação <a name = "instalacao"></a>
Para a instalação deve ser acessado cada pasta e instalado as dependências necessárias.

```bash
#Instalando as dependências do backend 
$cd backend
$backend/ npm install

#Instalando as dependências do frontend
$cd frontend 
$frontend/ npm install

#Instalando as dependências do mobile
$cd mobile 
$mobile/ npm install
```
## Executando <a name = "executando"></a>

Primeiramente é necessário executar o backend que ficará respondendo as aplicações e devolvendo as ações requeridas.

```bash
#Entrando na pasta backend 
$cd backend

#Executando o servidor 
$backend/ npm run dev

#O servidor iniciará na porta:3333 - acesse <http://localhost:3333>
```
Após pode ser iniciado as aplicações do frontend e do mobile.

```bash
#Entrando na pasta frontend 
$cd frontend

#Executando o aplicação web 
$frontend/ npm start

#Entrando na pasta mobile 
$cd mobile

#Executando o aplicação mobile 
$frontend/ npm start
```
A aplicação web iniciará na [porta:3000](http://localhost:3000).
<br>
Já na aplicação mobile estamos utilizando o framework [Expo](https://expo.io/) dessa forma pode ser feito download do aplicativo seu Smartphone [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US) ou [IOS](https://apps.apple.com/br/app/expo-client/id982107779). 
<br>
Ainda se preferir pode ser utilizado um emulador para rodar. 
<br>
Aqui se encontra uma detalhada instrução para instalação e configuração dos emuladores feito pela [Rocketseat](http://react-native.rocketseat.dev/).

## Ferramentas Utilizadas <a name = "ferramentas"></a>

- [Node.js](https://nodejs.org/en/) - Linguagem
- [Express](https://expressjs.com/) - Server Framework
- [React.js](reactjs.org) - Web Framework
- [React Native](https://reactnative.dev/) - Mobile Framework
- [Expo](https://expo.io/) - Mobile Framework

## Autores <a name = "autores"></a>

- [@giovaniceron](https://github.com/GiovaniCeron)