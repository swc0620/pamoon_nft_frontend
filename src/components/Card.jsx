import React from 'react'
import styled from 'styled-components'

const Wrap=styled.div`
  background-color:white;
  margin:20px 10px;
  border:1px solid #DBDBDB;
  border-radius:10px;
  width:300px;
  height:400px;
  box-shadow: 0px 0px 21px 3px rgba(0, 0, 0, 0.25);
  .text{
    text-align:center;
    margin-top:20px;
    .token-number{
      font-size:20px;
      font-weight:700;
      margin-bottom:10px;
    }
    .wallet-address{
      font-size:11px;
      color:#6A6A6A;
    }
  }
`;

const ImgWrap=styled.div`
  border-radius:10px 10px 0px 0px;
  width:300px;
  height:300px;
  background-color:${props=>props.color};
  text-align:center;
`;

const Img=styled.img`
  height:${props=>props.className<5?'140px':'300px'};
  padding:${props=>props.className<5?'80px 0px':'0px'};;
`;

function Card(props) {
  const collorArray=['#FFB5E8','#DCD3FF','#AFF8D8','#B28DFF','#BFFCC6','#FFC9DE','#C5A3FF','#FF9CEE','#A79AFF','#C4FAF8','#FFABAB','#D8FFD6','#3FFCCF9','#D5AAFF','#B5B9FF','#85E3FF','#FFBEBC','#F3FFE3','#FCC2FF','#97A2FF','#ACE7FF','#E7FFAC','#FFCBC1','#F6A6FF','#AFCBFF','#FFF5BA','#FFFFD1','#6EB5FF','#FBE4FF']
  const img=props.img;
  const wallet=props.wallet;
  const number=props.number;
  return (
    <Wrap>
      <ImgWrap color={collorArray[number%30]}><Img alt='img' src={img} className={number}></Img></ImgWrap>
      <div className='text'>
        <div className='token-number'>#{number}</div>
        <div className='wallet-address'>{wallet}</div>
      </div>
    </Wrap>
  )
}

export default Card