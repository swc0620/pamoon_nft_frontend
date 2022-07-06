import React from 'react'
import styled from 'styled-components'

const LogoText=styled.div`
  background-color:black;
  color:white;
  width:100%;
  text-align:center;
  height:120px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  img{
    margin-top:10px;
    width:240px;
    height:100px;
    margin-right:10px;
  }
`

function Logo(props) {
  return (
    <LogoText>
      <img alt='img' src={process.env.REACT_APP_PUBLIC_URL+`/img/${props.img}.png`}></img>
      {props.children}
    </LogoText>
  )
}

export default Logo