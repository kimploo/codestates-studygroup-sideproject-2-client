import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import TodoList from '../components/blocks/TodoList';
import { todoInfoSlice } from '../ducks/slices';
import styled from 'styled-components';
import lifeQuotes from '../data/lifeQuotes';
import Button from '../components/atoms/button';
import { Modal } from '../components/atoms/Modal';
import TodoDetail from '../components/blocks/TodoDetail';

const LifeQuotesWrapper = styled.div`
  width:1000px;
  height:100px;
  margin:10px auto;
  display:flex;
  flex-direction: column;
  justify-content: center;
`;

const LifeQuotesTitle = styled.div`
  text-align:center;
  font-size:20px;
  font-weight:bold;
  padding-bottom: 10px;
  min-width:800px;
`;

const LifeQuotesTeller = styled.div`
  text-align:center;
  font-weight:bold;
  min-width:800px;
`;

const CreateButtonWrapper = styled.div`
  width:1000px;
  padding:20px 0;
  margin: 0 auto;
  display:flex;
  justify-content: right;
`;

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginStatus = useSelector(state => state.loginStatus.value);
  const userInfo = useSelector(state => state.userInfo.value);
  const todoInfo = useSelector(state => state.todoInfo.value);

  const randomLifeQuotes = lifeQuotes[Math.floor(Math.random() * lifeQuotes.length)];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!loginStatus) {
      router.push('/login');
    } else {
      axios
      .get(`http://localhost:4000/todoinfo/${userInfo.username}`)
      .then(data => {
        dispatch(todoInfoSlice.actions.read(data.data));
      });
    }
  }, [])

  return (
    <div>
      {loginStatus
      ? (
        <LifeQuotesWrapper>
        <LifeQuotesTitle>{randomLifeQuotes.title}</LifeQuotesTitle>
        <LifeQuotesTeller>- {randomLifeQuotes.teller} -</LifeQuotesTeller>
      </LifeQuotesWrapper>
      )
      : null}
      <CreateButtonWrapper>
        <Button width='150px' height='40px' buttonName='생성하기' buttonEvent={openModalHandler}></Button>
      </CreateButtonWrapper>
      <Modal 
        isModalOpen={isModalOpen} 
        openModalHandler={openModalHandler} 
        modalCont={<TodoDetail openModalHandler={openModalHandler} />} 
      />
      {todoInfo ? <TodoList /> : null}
    </div>
  )
}
