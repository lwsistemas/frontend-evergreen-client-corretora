import React from 'react';
import { Link } from 'react-router-dom';
import Header3 from '../layout/header3';

function failed (){
    return (
        <>
        <Header3/>
            <div class="authincation section-padding">
                <div class="container h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-xl-5 col-md-6">
                            <div class="auth-form card">
                                <div class="card-header justify-content-center">
                                    <h4 class="card-title">Ocorrou um erro no cadastro. Tente Novamente</h4>
                                </div>
                                <div class="card-body">
                                    <div class="new-account mt-3">
                                         <Link class="text-primary" to={"/signup/createUser"}>Cadastrar</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default failed