import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [reposList, setReposList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [userFound, setUserFound] = useState(true)



    // Utilizando setTimeOut para simular demora na resposta da API e usando um aviso para notificar o usuário que as informações estão sendo carregadas

    useEffect(() => {
        setIsLoading(true)
        setUserFound(true)

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if(!res.ok){throw new Error ('Falha na requisição')};
                return res.json()})
            .then(resJson => {
                setTimeout(() => {
                    setIsLoading(false)
                    setReposList(resJson)
                }, 3000)
            })
            .catch( e => {
                console.error(e)
                setUserFound(false)
            })
            
    }, [nomeUsuario]);

    return (
        <div className="container">
            {!userFound && (
                <>
                    <h2 className={styles.warning}>Usuário não encontrado. Favor, verificar o nome inserido</h2>
                </>
            ) }
            
            {isLoading && userFound && (
                <h2 className={styles.warning}>Carregando as informações. Por favor aguarde...</h2>
            ) }
            {!isLoading && userFound && (
                
                <ul className={styles.list}>
                    {reposList.map((item) => (
                        <li className={styles.list__item} key={item.id} >

                            <div className={styles.list__item__name}>
                                <b>Nome:</b>{item.name} <br />
                            </div>

                            <div className={styles.list__item__language}>
                                <b>Linguagem:</b>{item.language} <br />
                            </div>

                            <a className={styles.list__item__link} target="_blank" href={item.html_url}>Visitar no Github</a>


                        </li>

                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReposList;