import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
;
import cros from 'cors';

// Importa o PrismaClient para interagir com o banco de dados
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cros());// Habilita o CORS para permitir requisições de diferentes origens

//CRIAR USUÁRIOS
app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
            },
        });
        res.status(201).json(user);
    } catch (error) {// Erro ao criar usuário
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});

//BUSCAR USUÁRIOS
app.get('/usuarios', async (req, res) => {
    let users = [];
    if(req.query){
        users =  await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }

        })

    } else {
        users = await prisma.user.findMany();// Busca todos os usuários no banco de dados

    }
    res.status(200).json(users);

});

app.listen(3000, () => {// Inicia o servidor na porta 3000
    console.log('Servidor rodando na porta 3000');
});

//ATUALIZAR USUÁRIOS

app.put('/usuarios/:id', async (req, res) => {
    try {// Atualiza o usuário com o ID fornecido
        const user = await prisma.user.update({
            where: {
                id: req.params.id   
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
            },
        });
        res.status(201).json(user);
    } catch (error) {// Erro ao editar usuário
        res.status(500).json({ error: 'Erro ao editar usuário.' });
    }
});

//DELETAR USUÁRIOS
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {// Deleta o usuário com o ID fornecido
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {// Erro ao deletar usuário
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});

