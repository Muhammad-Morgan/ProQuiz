import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { getResult } from '../../utilities/result'
import Loading from '../../components/Loading'
import './result.css'
const Result = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const {
        userInfo,
        loading,
        startLoading,
        endLoading,
        updateInfo,
        showAlert
    } = useGlobalContext()
    const [result, setResult] = useState({})
    useEffect(() => {
        authorize({ updateInfo, showAlert, navigate })
        if (userInfo.type === 'instructor') return navigate('/myquizes')
    }, [userInfo.name])
    useEffect(() => {
        getResult(_id, startLoading, endLoading, setResult)
    }, [userInfo.name, _id]);
    if (loading) return <Loading />
    return (
        <main className='result-page'>
            <div className='result-center'>
                <h1 className='text-primary-emphasis text-capitalize mb-5 text-center'>Hello {result?.name}</h1>
                <h3 className='fw-normal text-body fs-2 mb-4'>Check your results for <span class="text-capitalize">{result?.quizName}</span></h3>
                <hr style={{ marginBottom: '3rem' }} />
                <article className='row mb-4 row-cols-1 row-cols-md-2'>
                    <section className='col'>
                        <div
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                            className='card'>
                            <h1 className='mb-4'>Final Result</h1>
                            <h2 className='mb-4'>Wrong Answers</h2>
                            <h3 className='mb-0'>What should it be</h3>
                        </div>
                    </section>
                    <section className='col'>
                        <div
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                            className='card'>
                            <h1 className='mb-4'> {result?.result?.resultValue} / {result?.result?.ref}</h1>
                            <div className='mb-4'>
                                {result?.mistakes?.actualMistakeArray.map((item, index) => {
                                    return <h2
                                        key={index} className='mb-0'>{item}</h2>
                                })}
                            </div>
                            {result?.mistakes?.rightAnsCon.map((item, index) => {
                                return <h3
                                    key={index} className='mb-0'>{item}</h3>

                            })}
                        </div>
                    </section>
                </article>
                <hr style={{ marginBlock: '1rem' }} />
                <Link to='/allquizes' className='my-save mt-4 rounded shadow-sm'>Take another one</Link>
            </div>
        </main>
    )
}

export default Result
