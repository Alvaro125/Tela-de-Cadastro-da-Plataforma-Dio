import { MdEmail, MdLock, MdAccountCircle } from "react-icons/md";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import {
  Column,
  Container,
  SubtitleRegister,
  Title,
  TitleRegister,
  Wrapper,
} from "./styles";
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Button } from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{email:string,name:string,senha:string}>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData: any) => {
    try {
        const {data} = await api.get(`/users?email=${formData.email}`);

        if(errors.name){
            toast.error("Nome é Obrigatório",{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
        }
        if(errors.email){
            toast("Email é Obrigatório",{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
        }
        if(errors.senha){
            toast.error("Senha é Obrigatório",{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
        }
        
        if (data.length && data[0].id) {
            alert("Email já cadastrado");
            return;
        }else{
            await api.post(
                `/users`,{ "name": formData.name, "email": formData.email, "senha": formData.senha }
            );
            
        }

      navigate('/feed') 
    } catch (e) {
      //TODO: HOUVE UM ERRO
    }
  };


  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleRegister>Comece agora grátis</TitleRegister>
            <SubtitleRegister>
              Crie sua conta e make the change._
            </SubtitleRegister>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="Nome Completo"
                leftIcon={<MdAccountCircle />}
                name="name"
                control={control}
              />
              {errors.name && <span>Nome é obrigatório</span>}
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button title="Entrar" variant="secondary" types="submit" />
            </form>
          </Wrapper>
        </Column>
      </Container>
      <ToastContainer/>
    </>
  );
};

export { Register };
