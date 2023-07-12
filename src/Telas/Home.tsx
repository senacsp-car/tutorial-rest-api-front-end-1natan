import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import styles from '../Telas/Home.module.css'

type Item = {
    id?: number
    nome: string
    descricao: string
}

export default function Home() {
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [criar, setCriar] = useState(false);
    const [itens, setItens] = useState<Item[]>([]);
    const [nome, setNome] = useState<string>();
    const [descricao, setDescricao] = useState<string>();


    function recarregarItens() {
        setCarregando(true);
        axios.get('http://localhost:4000/api/itens')
        .then(function(response) {
            setItens(response.data);
        })
        .catch(function(error) {
            alert(error);
        })
        .finally(function () {
            setCarregando(false);
        });
    }

    useEffect(function () {
        recarregarItens();
    }, []);

    function botaoRecarregarClicado() {
        recarregarItens();
    }

    function botaoSalvarClicado() {
        if ((nome !== undefined) && (descricao !== undefined)) {
        
        setCarregando(true);
        const item: Item = {
            nome,
            descricao
        }  
        axios.post('http://localhost:4000/api/itens', item)
        .finally(function () {
            setCarregando(false);
            setCriar(false);
        })
        .then(function () {
            setNome('');
            setDescricao('');
            recarregarItens();
        })
        .catch(function (error) {
            alert(error);
        });
    }
    }

    function criarItem(){
        setCriar(true)
    }

    function fechar(){
        setCriar(false)
    }
   

    return (
        <div className={styles.fundo}>
            <h1>Home</h1>
                <div className={styles.lista}>
                <button onClick={botaoRecarregarClicado}>Recarregar Lista</button>
                    {(carregando) ? (<div>Carregando...</div>
                    ) : (<>
                    {(erro !== '') && (
                        <div>ERRO: {erro}</div>
                    )}
                        <ul>
                            {itens.map(function (item){
                                return <li><Link to={`/itens/${item.id}`}>
                                    {item.nome}
                                </Link></li>    
                            })}
                        </ul>
                    </>)}
                </div>
            <div className={styles.botaoCriar}>
                <button onClick={criarItem}>Criar Item</button>
                {(criar) && (
                <><div className={styles.input}>
                    <input
                        placeholder='Nome'
                        onChange={function (e) { setNome(e.target.value); }}/>
                    <input
                        placeholder='Descrição'
                        onChange={function (e) { setDescricao(e.target.value); }}/>
                </div>
                <div>
                    <button onClick={botaoSalvarClicado}>Salvar</button>
                    <button onClick={fechar}>Fechar</button>
                </div></>)}
            </div>
        </div>
    );
}