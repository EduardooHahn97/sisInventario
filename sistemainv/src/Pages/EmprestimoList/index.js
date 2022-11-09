import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdOutlineRemoveRedEye, MdDeleteOutline, MdMode, MdDone, MdWarning, MdOutlineQrCode, MdQrCode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';
import Modal from '@mui/material/modal';
import { useEffect } from "react";
import api from '../../service/api';
import {Link} from 'react-router-dom';

export default function EmprestimoList() {
    const [authenticated, setAuthenticated] = React.useState(false);
    const [close, setClose] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [deleteEmprestimo, setDeleteEmprestimo] = React.useState(false);
    const [emprestimos, setEmprestimos] = React.useState([]);
    const [emprestimo, setEmprestimo] = React.useState([
        {
            "id": 1,
            "nome": "mouse",
            "descricao": "mouse preto",
            "estado": "1",
            "imagem": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVERgVEhYYFRIZEhgZGBIYGBgZGBIZGBgZGhgYGBgcIS4lHB4tIRgZJkYnKy8xNTU2GiQ7QDszQi40NTEBDAwMEA8QHxISHzQrJCs0NTQxPTQ2NEAxPzQ9ND8/NT87PTc4PTE4PTE0NDQ2MTE0PjE0NEA0NDU9NDU0MTQ0NP/AABEIAOUA3AMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAIDBQYHAQj/xABIEAACAQICBwQFCAUKBwAAAAABAgADEQQhBQYSMUFRYQcTInEyYoGRoRQjQlJygrHBM0OSotEkNERTVGODstLwF3OTs8LD4v/EABkBAQEBAQEBAAAAAAAAAAAAAAADAgQBBf/EACgRAQACAgEEAgEDBQAAAAAAAAABAgMRMQQSIUFRYRMiMqEzQ3GBkf/aAAwDAQACEQMRAD8A97SdVWwtU47Cgrh2YNWVLg4epfKsttwJt5Nnxy3bULWsY2jsVCBiUUbfAVV3Coo68RwPQibTXopURkdQyMpVlYXDKRYgg7wZwzWHRFbQ+OR6DMMOzFsPVNyKZ+lQqcxa4z9JeoNg7zEwurOnaeMw4qpkw8NSne5pOBmp5jiDxBHlM1AREQEREBERAREQEREBERAREQEREBERAREQEREBERATG6c0PRxeHahXG0jDeN6kbmU8GBzvMlEDgmj8Ri9DaQNOp4rDO2S4uhc2Zb7nGduRuL2Jv2/RuPp16S1qTbVNxcN+II4EG4I4EGYbXXVenj8NsGy10JajW402tuPHZawBHkd4E5nqPrNVwGJfDYsFKe3s1qbb6D7hVXmpFr23izDdmHcYltHBAIIIIuCMwQdxBlyAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAmgdpep5xVMYnDL/LKQ9Ef0mmMzTPrDeD5jiCN/iByfsw1wAC4Su1kJ2aLt9Bv6lr7hf0f2fqidYnIO0/VI0WbH4ZPAxviaS/RJ/XgD963HxczNl7O9bhiqYoVmBxKrdXP9Ipj6X2huI9vEgBvUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREC26BgQwBBBBBFwQd4I4icN1u1Zq6Mxi1sKXGGeptUnXM4Wpmdgn6tr2vvW4N7G/T9Z9ccNgwVJ7zEWyoqcxyLt9AfHkDOOac05icZU2673H0aa3CUxyVfzNyecDfP+KYFJLYc1K+x4xthELc0NmNj1Atuz3zAaR7WdIX+bwyU04kE1GHk2S+9ZqIE9BgZltf6ldTtPX2xnZaj0xc5b0ItLWG10x63AxFSx5uzkeRcn+MxT01b0gL89x94zkZ8Kw9E36Hf7xAzdXSdWpY1KtQv9Go1RyD94k2PUW8jM5ovXvHUVFNnV1ByaspZ19XbuAw8yT8LaSlQr6QKnnuv94MAfefKV99tEbOb3tZb7Tct2xflvO4QOjnX/Hf3X7B/wBUL2g44HMUT0KN+TzS8DoLG7e1tLSonO1U3tzsozHlcSTiaT07mooKD9cjbdP7xGafeAHUwN/wnaSd1bD+bI/4Iw/8pn8DrvgKmRqGk3KoNn94XX4zj4PKeEwPoOlVV1DKwZTuYEEHyIlyfP8AgcfWottUXem3qMQD9obm9s3HRPaLVWy4pBUX+sSyv5lfRb2bMDp8TFaI07hsSt6FQMbZ0zk6+anP27plYCIiAiIgIiICIiAiIgQtJ6QpYek1WuwSmo8THrkABvJJyAGZJnKtYu0atWumEvQpbtv9a48xlTHlc9RukDtl1kc4sYNT8wlNGdLDxOx2gb9F2bfaM57QxWyQCbg7jAzZNzc5km5JzJJ3knjPQsjUqwMkK0D3ZnhWVBoJgW7T0GekTy0CtTKqA2G2kCk8mGf3XttL8R0EtiUmoSdlOfifeF6Dm3wHHkQ80jjMSXDUyWRFJNCw2qYy2mIBJZfXW4G7KX9HadS20rGmw3m+Xv3EdDCU1G7eDtbVyGDfWDDMN1EtV9G0nbaYeLeSLAsTxJAuT1gZXC1MNiagp0GFLFMGK7ClsPVIFztoP0bb/EuRzuDkJGos7A3sGV2RltezKxVrEGxFwc5RgcMtK/dlk2hYlTssRy2ls1ul5IQAABQAALADIDygeeLkPef4SktzB+H5S9PCIFtK+ywZWKMDcMCVZTzByIm66A7QatOyYod8m7vFsKi+fB/gepmlkS0yDl7RkffA+gdG6So4imKlBw6niN6nkQc1PQybPnrR2ka+HqCpQdkbjxVhyYH0h5zq2qmutLFWp1bUsT9W/gqfYJ4+qc+V8zA2+IiAiIgIiICIiB879smDKaXduFSjSceQU0/xQzRUbgcxxH5jkZ2/tu0OXoUcUov3bmm/RalirHyZQv8AiTiFRIEmhXK2BN1O5vyPIzKUq95gUa2RzB3j/e49ZIpVSts7qdx/I8jAzyvKw8x9KteSFeBJ2ovLHeS0G29+Scvr+fq9OPlvC6WL5KbJxYb26LyHX3c5IQACwFgNwHCWw0qDQLwMrDSwGlQaBIDSoNI4aVhoEgNPdqWA09DQLt5SZTtQTA8aW723b+fKVky20DpepWvW0Vw+MbxGwp4g/S5LUPP1uPHPM9InzOxnTezvXEts4TEtdt1Gqx9LlTY8+R47uVw6XERAREQERECDpfR9PEYepQqi6VEKnmL7mHUGxHUCfMGnNFVMPXehVFnRyp5NyYeqwIYdCJ9Wznfapql8po/KaK3r0l8ajfVpi5I6suZHMFhygcJwGBNaoEDKhYHZLZAtbwpfgSbD2yyytTZldSCDsshyII4dCOcu+i2eY/LpMxVQYxAL/wAsRPA39rRR6JP9YoGR4gW4ZBhqb2tncHcfyPIyYlaYxWsSCMtxU5bvwIl4AnLeN9+Y4A9YE1X2zn6HAfX6np+MlCpICPLivAnB5UHkNXlYeBLDyoPIgqSsPAlh5UHkUPKg8CUHlQaRg8qDwJO1G1LAee7cC6WlDGU7cpLQDGUK5BuDY8xwnjNKCYHcdQNZ/ldDYqH+U0wA394u5ag68D18xNwnzfoDS74bEJWp+kjZrfJ1OTIehHuyPCfQujsYlaklWmbo6hlPQ8DyI3W6QJcREBERAREQODdqmqHyat8oor/JqrG4Ayo1DmV6K2ZHtHKc7p1Ch3kWIIYb0YZhhPrDSuj6WIovRrLtU3XZYcehB4EGxB4ECfM+tmgKmCxLUamds0e2VRCTsuPOxBHAgjhAx2mMUtRw2zaqV+dNgFdwPTAHE/HfbOXxhigG19IBgRmCCMrHyy9kxeZIG+2Q68gfwmzUGpug2fDSc+Ef2aod9M+o28GeTOvLVY7p0xL0pb3TIvSKsVYWIlmpRnryYmJ1KKHlQqTx0lEPF8PK1qSJtT0PAmh5UHkQVJUrwJgeVh5DFSVh4EwPAeRQ8qDwJO3PC8s7cF4F0tLZaUFpSWgXFadU7I9O+lhKh5vSv++o/wA37U5OGmS0LpF8PXSsnpJUDAfWA3r5EXHtgfTESxhMStSmlRDdHQMp5hhcfjL8BERAREQE1PX7VVcdhbKAMTTu1Jzlcn0kJ+q1h5EKeE2yIHyHjMOyMVYFWVirKRYqQbEEcCCLSmjVOdja9trPI2OTMOIvv987F2vaoXBx1BeQxCAexav4A+w8DOMOpBgbRhn7+nY5VkFjzYDn1lhRfI75jcBiCCGX01FwL+mo3r1ZRmOYy4ATPV1V0FWn99eR5yW+22p4l1zWM1Nx+6OfuGNq0pFenMpa4karTlXIxrrLZkt0lh0gWtqVK8tsJReBKV5cWpIIeVh4E0PKw8hrUlQeBM257tzZ9S9VPlI76vcUL2VBkahG/Pgv4y1r9oFcLXR6a7NGovhW58DLYMufDMH2nlIRnpOT8ftScVor3Tw13anl5ZDz0NLprwMu02kZTLyGB3Psq0p3uBNJjd6LlfuN4k+O0PuzeJxTsm0hsY40yfDVpstvWTxr8A49s7XAREQEREBERAt1aaspVgCpBBUi4IIsQRxE+c+0bVI4HE+AE4apdqTfV+tTJ5rf2i3WfSEw+s2g6WNwr0Ku5s1bjTcei48uXEEjjA+VqNQqb2BFrEHdMloPSnd1LPbYfJhwF+nKWtOaKq4au9Gsuy6MVYcDxDKeKkEEHkZjSJm1YtGpbx3mlotHpuWPwmwwZc6b5qeXSRXW8varaRSohw1Y5EeBuR4e2MZhXpVCj7xuPAjgRJ47TE9tuY/mFs1YmPyU4n18Sx1RJFdJknWRaiyzmY90lhxJzrIzrAjmLz1hKYFQMbcpiB9E4CitDCqAPBTojIcQiXP4Thek9LVcTWapVa7M2Vz4UF8lHJRO46o41MVo+k5zvT2HHrKNhgfdf2icS1n0DUwWJai4Ozcmm/Col/CQefAjgZ83o9RkvFv3OrqLbrGuG/6L7KnIDYnEAXF9ikNr99sv3TI+vOptHDYVauGDWR9moWYsWDZK3IWOWVvSmPwPahiaWEp0FpI1RECd+7M20FyXwC2YWwvc3tOhavY5dKaM+dttOj0qoAsFYfSA4ZFWExe/U4rRfJP6d68fCWqz4hw9DLyGUYnDPSqPTqCzo7Iw6qbH8J6hn1YnaTN6u43ucVRq3sEqox+yGG18Lz6VnyxSM+ltAYrvcJQqHe9Cmx8yov8AG8DIxEQEREBERAREQNA7UdT/AJZQ7+it8VSXcN9amLkp1YZke0ccvnt0sZ9hzhna5qd3NQ4ygtqFRvnFAypVGPpdFc+5vtCBy5HKsGU2INwZ0TRtVNIYXZNhiqYy9ccv9/xnPCJK0TpCph6q1KZsQcxzHKSy0m0brzHC2LJ2zMTxPLMOpVirCzA2IPAiWXE3LSuCp43DjF4bOoF+cpjebbzbmPiJphMYssXjfExzH2zkp2z9ekd1kd1ktxI7iVTQ3EtmSKgkdhA8nk9nkDbtQtb2wNUrUBfCuRtqPSQ7ttBztvHEeU7XTOC0hQB+bxNE52IDbJ6jeje4z5mkjCYyrSbapO1N/rIzKfeDOTqOkjLPdWdWUrkmI1PDrWvmoeEp4F62EpbFSmQ7WZm2kGTizE2sDtfdnM9GadxeHRkoVmpIxBYIbbRAsDfeMuVpXidZ8fUQpUxNZ0IsyGo1mB3huY6TFKZvBivWnbknflmZiZ3HhLNRmYs7FmJuWYkljzJO8y8hkWmZJQzoZSqRn0F2e19rRdA8ldf2ajKPgBPnukZ3zsva+i6fR6v/AHGP5wNviIgIiICIiAiIgJGxuEStTalVUNTdSrKdxBFiJJiB8wa8ar1MBimptdqbXalU+ul+PrLuPsO4ia0RPqPXHVunj8K1F7LUHipVLX7pwMj9k7iOR52nzPpPAVKFV6VVStRGKup4EfiDkQeIIMDKaoaxPg6wJuaTGzr+Ym4a16vI6fLMHZqbDadF+jfewHLmOH4cvIm36ja3NhX7uqdrDsbEHPYvxHTpOXNjtWfy4+fcfMLUtEx2249fTDsZaadC1t1RV0+VYGzU2G09Nc9kfWTmOnCc8Y898rhzVyxuE7Vms6WHEjuJKeR2lWVozyVGUwERED2eieT1YEinJCSNTklIEmlO89m67OjkHrufeZwrB0yzhRxM+iNS8LsYCkOYLexiSPhae7QyTu0Vj/LYIiJ4uREQEREBERAREQE5/wBp2pIxtLv8Oo+Vou7d36DPYPrDMg+Y43HQIgfHtSmVJBBBBIIIsQRkQQdxlBE7v2l9ngxO1isGoGJtd6QsBiLfSHAP/m885wupTZWKsCrAkFSCCpBsQQcwQeEDbtSNdamEcU6hL4cndxTqv8JuusWp1DG0/lOAZRUYbRQZJU8vqt0/CcYImwara2YjBP4DtUifFTJyPUcj1nHmwWi35MPifcepVreNatwgY/C1KLlKqMjqbFWFiJCczutOto3TFGzAd4F35CrT/wBS/wC8pz7Wbs6xeHu9Id/R37ajxKPWXeJrF1Vbz228THMS8tSY8x5hpBlMqdCDYgg8jKZ1JkRED2erPBK0EC9TEkoJaooTkBc8puWgdU6jAVMQClPeFOTP/AdZjJkrjjcy8mdRt7qhoV6jobZu4VPb6TewXM7/AIekERVG5VAHkJpuouADE4gC1MApR5NbJ3HTLZB6Nzm8TOObWjulLHSdzeeZexESqxERAREQEREBERAREQE0jXjs+w+PBqJaji7ZVQPDUtuWqo38toZjqBabvED5Q1g1dxWCqd3iqZU3Oy+9KgHFHGR8t44gTEkT67x2BpVqZp1kSpTO9HUMD7Dx6zl+sfY5Se7YCp3Z39xVJZPJXzZfaGgcZwmLqUnD03KODcMpsZ07VntRK2TGKeXeoP8AMvH2TSdOao4/CX+UYd1QfrVG3Ttz21uB7bGYG0llwY8sfqjz6n21Fpjh9BV9G6J0km3so7EenTIWoPtD+Imq6T7JFNzhcQOiVBb94fwnLMPiqlNgyOysNxUkWm06O7RNIUrBnFRRwcXP7W/4zk/B1GP+nbcfEt91bcwv4rsx0knoorjmrqfgTMe2oWlAf5s/wm04btbcfpMOD1RyPgbyZ/xbpW/QPf7Y/wBMzObrK/24n/b3tx/LVMN2caTffSCDm7KPzmx6N7KqmRxFZVH1UBY+85SnEdrDkfN4cA83ct8BaYaprjpXGP3VEvtNup0EO1b7udupNpju6/JOtRWP+y8mMcfbeHwGi9HLtNs94BkXIdz9leEjaGTEaXqkKGo6PRrVKu561v1anmeNvR87S3qx2V1ajCtpNiBv+Tq13f8A5jg2Hktz1E65hMKlKmtOkoSmoAVFACqBwAEvh6OKT3ZJm1vvhO0xPp7h6CIiogCoqhVQZBVUWAA5Wl+Inc8IiICIiAiIgIiICIiAiIgIiICIiAmt6Y1L0bic62FpljvdB3bk8yyWJ9sRA1PH9jGCa5o161K/A7NQDyuAfjNT0t2Vdyf53tf4Fv8A2GIgYsag5/zgf9L/AO5n9D9kQq2ZsXYcQKGZ8j3mXuiIG36L7JNGU/0ne1yODvsr+zTC5dCTN20doyhh02MPSSkn1UUKD1Nt56xECZERAREQP//Z",
            "codBarras": 1123132,
            "local": 1,
            "usuario": 1
        }
    ])
    
    const handleOpen = (id) => {
        setOpen(true);
        api.get('emprestimo?emprestimoId='+id).then((response)=>setEmprestimo(response.data))
        console.log(emprestimo)
    };
    const handleCloseModal = () => setOpen(false);

    useEffect(() => {
        api.get('emprestimos')
            .then(response => setEmprestimos(response.data))
    }, [])

    const handleClose = () => {
        setClose(true);
    };

    const Delete = (id) => {
        setClose(true);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(deleteApi(id))
    };
    console.log(emprestimos[0])
    const deleteApi = (id)=>{
        setDeleteEmprestimo(true)
        api.delete('emprestimo?emprestimoId='+id)
        .then(
            ()=>{
                console.log(emprestimos)
                setEmprestimos(emprestimos.filter(emprestimo => emprestimo.id != id))
            })
    }
    return (

        <div className="emprestimo-list-container">
            <Nav />
            <div className="emprestimo-list-content">
                <div className="emprestimo-list-header">
                    <h1>Emprestimos Cadastrados</h1>
                    <div className="buttons">
                        <a href="/emprestimoCreate"> <MdAddCircle size={20}/> <p> Cadastrar Emprestimo</p></a>
                        <a href="/">Home</a>
                    </div>
                    
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Usuario</th>
                            <th>Item</th>
                            <th>Data Retirada</th>
                            <th>Data Devolução</th>
                            <th>Observação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emprestimos.map((emprestimo) => (
                            <tr key={emprestimo.idEmprestimo}>
                                <td>{emprestimo.idEmprestimo}</td>
                                <td>{emprestimo.usuarioInfos['2']}</td>
                                <td>{emprestimo.itemInfos['1']}</td>
                                <td>{emprestimo.dataRetirada}</td>
                                <td>{emprestimo.dataDevolucao}</td>
                                <td>{emprestimo.observacao}</td>
                                <td>
                                    <Link onClick={()=>handleOpen(emprestimo.id)}><MdOutlineRemoveRedEye /></Link>
                                    <a onClick={()=>Delete(emprestimo.id)}><MdDeleteOutline /></a>
                                    <Link to={`/emprestimoEdit/${emprestimo.id}`}><MdMode /></Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}