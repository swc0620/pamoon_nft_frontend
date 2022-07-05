import React from 'react'
import styled from 'styled-components'

const Wrap=styled.div`
  background-color:white;
  margin:20px 10px;
  border:1px solid #DBDBDB;
  border-radius:10px;
  width:300px;
  height:270px;
  box-shadow: 0px 0px 21px 3px rgba(0, 0, 0, 0.25);
  img{
    width:300px;
    height:140px;
    border-radius:10px 10px 0px 0px;
  }
  .text{
    text-align:center;
    margin-top:30px;
    .wallet-address{
      font-size:20px;
      font-weight:700;
      padding:5px;
    }
    .token-number{
      color:#6A6A6A;
    }
  }
`;

function Card(props) {
  const img=props.img;
  const wallet=props.wallet;
  const number=props.number;
  return (
    <Wrap>
      <img alt='img' src={img}></img>
      <div className='text'>
        <div className='wallet-address'>{wallet}</div>
        <div className='token-number'>#{number}</div>
      </div>
    </Wrap>
  )
}

export default Card