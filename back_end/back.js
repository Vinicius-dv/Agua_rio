const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const app = express()
app.use(express.json())
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(cors({
  origin: 'https://agua-rio.onrender.com',
  credentials: true
}))

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()



app.use(express.static(path.join(__dirname, '../Home')))
app.use('/Verificar_codigo', express.static(path.join(__dirname,'../Verificar_codigo')))
app.use(express.static(path.join(__dirname, '../Perfil_user')))
app.use('/Login', express.static(path.join(__dirname, '../Login')))
app.use(express.static(path.join(__dirname, '../imagens')))
app.use('/logos', express.static(path.join(__dirname, '../logos/fwdlogocontasefaturas')))
app.use('/imagens', express.static(path.join(__dirname, '../imagens')));



console.log("URI do Mongo:", process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err))

const cadastro_Schema = new mongoose.Schema({
    nome:String,
    senha:String,
    email:String,
    cpf:String,
    matricula:Number,
    telefone:String
})

const cadastro = mongoose.model('Cadastro', cadastro_Schema)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
})

const dados = {}

function verificar_acesso(){
    return(req,res)=>{
      const token = req.cookies.token
      if(!token){
        return res.status(401).send('acesso negado')
    }
    }
}


app.post('/receber_codigo',(req,res)=>{
  const { nome, email, senha,cpf,matricula,telefone} = req.body
  const codigo = Math.floor(100000 + Math.random() * 900000).toString()

  cadastro.findOne({
    $or: [
      { email },
      { cpf },
      { matricula },
      { telefone }
    ]
  })
  .then(usuario_existe=>{
      if(usuario_existe){
          return res.status(400).json({message:'dados ja cadastrados',success:false})
      }
      dados[email] = {nome,email,senha,codigo,cpf,matricula,telefone}
      transporter.sendMail({
          from:'<Aguas_rio@gmail.com>',
          to:email,
          subject: "Seu código de verificação",
          text: `Seu código de verificação é: ${codigo}`
      },(err,info)=>{
          if(err){
              console.error('erro ao enviar o email',err)
              return res.status(500).json({ message: 'Erro ao enviar e-mail', success: false })
          }
          console.log('Email enviado:', info.response)
          return res.status(200).json({ message: 'cadastro realizado com sucesso', success: true})
      })
  })
})


app.post('/verificar_codigo',(req,res)=>{
  const {codigo,email} = req.body
  const dados_temporario = dados[email]
  if(!dados_temporario){
      return res.status(400).json({message:'não encontramos esse email'})
  }
  if(dados_temporario.codigo !==codigo){
      return res.status(400).json({message:'codigo invalido'})
  }

  bcrypt.hash(dados_temporario.senha, 10)
  .then(senhaHash => {
    const novoUsuario = new cadastro({
      nome: dados_temporario.nome,
      email: dados_temporario.email,
      senha: senhaHash,
      cpf: dados_temporario.cpf,
      matricula: dados_temporario.matricula,
      telefone: dados_temporario.telefone
    })
    return novoUsuario.save()
  })
  .then(() => {
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', success: true })
    delete dados[email]
  })
  .catch(err => {
    console.error('Erro ao cadastrar usuário:', err)
    res.status(500).json({ message: 'Erro ao cadastrar usuário', success: false })
  })
 
})


app.post('/login', (req, res) => {
  const { email, senha } = req.body

  cadastro.findOne({ email })
  .then(usuario => {
      if (!usuario) {
          return res.status(400).json({ message: 'Usuário não encontrado' })
      }
      bcrypt.compare(senha, usuario.senha)
      .then(senhaValida => {
          if (!senhaValida) {
              return res.status(400).json({ message: 'Senha incorreta' })
          }

          const token = jwt.sign(
              { email: usuario.email },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          )

          res.cookie('token', token, {
              httpOnly: true,
              maxAge: 3600000,
              sameSite: 'lax'
          });

          return res.status(200).json({ message: 'Login bem-sucedido', success: true })
      })
      .catch(err => {
          console.error('Erro ao comparar senha:', err)
          return res.status(500).json({ message: 'Erro ao autenticar usuário', success: false })
      })
  })
  .catch(err => {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro ao buscar usuário', success: false })
  })
})


app.post('/reenviar_codigo', (req, res) => {
  const { email } = req.body

  const dadosTemporarios = dados[email]

  if (!dadosTemporarios) {
    return res.status(400).json({ message: 'Email não encontrado ou cadastro expirado', success: false })
  }

  const novoCodigo = Math.floor(100000 + Math.random() * 900000).toString()
  dadosTemporarios.codigo = novoCodigo

  transporter.sendMail({
    from: '<Aguas_rio@gmail.com>',
    to: email,
    subject: "Seu novo código de verificação",
    text: `Seu novo código de verificação é: ${novoCodigo}`
  }, (err, info) => {
    if (err) {
      console.error('Erro ao reenviar código:', err)
      return res.status(500).json({ message: 'Erro ao reenviar código', success: false })
    }
    console.log('Código reenviado:', info.response)
    return res.status(200).json({ message: 'Código reenviado com sucesso!', success: true })
  })
})

  
app.get('/info_user',(req,res)=>{
  const token = req.cookies.token

  if (!token) {
    return res.json({ logado: false })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ logado: false })
    }

    return res.json({ logado: true, email: user.email })
  })
  })

app.get('/dados_perfil',verificar_acesso,(req,res)=>{
  cadastro.find()
  .then(projetos=>{
      if(!projetos){
          return res.status(400).json({
              success:false,
              message:'Nenhum projeto existente'
          })
      }
      return res.status(200).json({
          success:true,
          projetos
      })
    })
})


app.get('/verificar_codigo', (req, res) => {
  res.sendFile(path.join(__dirname, '../Verificar_codigo/verificar_codigo.html'))
})

app.get('/Login', (req, res) => {
  res.sendFile(path.join(__dirname, '../Login/login.html'))
})

app.delete('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax'
  })
  res.status(200).json({ message: 'Logout feito com sucesso!',success:true})
})


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})


/*const token = jwt.sign(
  { email: dados_temporario.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
)
res.cookie('token', token, {
  httpOnly: true,
  maxAge: 3600000,
  sameSite: 'lax'
})*/