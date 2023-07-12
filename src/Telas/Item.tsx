import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from '../Telas/Item.module.css'

type Item = {
    id?: number
    nome: string
    descricao: string
}

export default function Item() {
    const {id} = useParams();
    const [item, setItem] = useState<Item>();
    const [editar, setEditar] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [nome, setNome] = useState<string>();
    const [descricao, setDescricao] = useState<string>();

    const navigate = useNavigate();
    
    useEffect(function () {
        recarregarItens();
    }, []);
    function recarregarItens() {
        setCarregando(true);
        axios.get(`http://localhost:4000/api/itens/${id}`)
        .then(function(response) {
            setItem(response.data);
        })
        .catch(function(error) {
            alert(error);
        })
        .finally(function () {
            setCarregando(false);
        });
    }
    function botaoEditarClicado() {
        if ((nome !== undefined) && (descricao !== undefined)) {
            setCarregando(true);
            const item: Item = {
                nome,
                descricao
            }  
            axios.put(`http://localhost:4000/api/itens/${id}`, item)
            .finally(function () {
                setCarregando(false);
                setEditar(false);
            })
            .then(function () {
                setNome('');
                setDescricao('');
                recarregarItens();
            })
            .catch(function (error) {
                alert(error);
            });
    }}

    function botaoExcluirClicado() {
        axios.delete(`http://localhost:4000/api/itens/${id}`)
        .then(function () {
            navigate("/")
        })
    }

    function editarItem(){
        setEditar(true)
    }

    function cancelar(){
        setEditar(false)
    }

    return(
        <div className={styles.fundo}>
            <h1>{item?.nome}</h1>
            <p>{item?.descricao}</p>
            <div className={styles.botoes}>
                <button onClick={editarItem}>Editar</button>
                {(editar) && (
                <><div className={styles.input}>
                    <input
                        placeholder='Nome'
                        onChange={function (e) { setNome(e.target.value); }}/>
                    <input
                        placeholder='Descrição'
                        onChange={function (e) { setDescricao(e.target.value); }}/>
                </div>
                <div className={styles.salvar}>
                    <button onClick={botaoEditarClicado}>Salvar Alterações</button>
                    <button onClick={cancelar}>Cancelar</button>
                </div>
            </>)}
            </div>
            <div>

            </div>
            <div className={styles.botoes}>
                <button onClick={botaoExcluirClicado}>Excluir</button>
                <Link to={'/'}>
                    <button>Voltar</button>
                </Link> 
            </div>   
        </div>
    );
}
